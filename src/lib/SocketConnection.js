import EventEmitter from 'events';
import Websocket from 'ws';

const defaultConfig = {
  host: 'localhost',
  protocol: 'ws',
  retryTimeout: 5000,
  timeout: 5000,
  port: 8123,
  password: '',
  token: '',
};

class SocketConnection extends EventEmitter {

  constructor(options = {}) {
    super();
    Object.assign(this, {
      id: 1,
      config: {},
      replyHandlers: {},
    });
    this.configure(Object.assign(defaultConfig, options));
  }

  configure(config = {}) {
    Object.assign(this.config, config);
    this.url = `${this.config.protocol}://${this.config.host}:${this.config.port}/api/websocket`;
  }

  async connect() {
    this.ws = new Websocket(this.url);

    this.ws.on('message', async (data) => {
      const parsedData = JSON.parse(data);

      if(parsedData.type === 'auth_ok') {
        this.emit('connection', 'authenticated');
        return;
      }

      if(parsedData.type === 'auth_required') {
        if(!this.config.password && !this.config.token) throw new Error('Password required');
        if(this.config.token) return this.send({ type: 'auth', access_token: this.config.token }, false);
        return this.send({ type: 'auth', api_password: this.config.password }, false);
      }

      if(parsedData.type === 'auth_invalid') {
        throw new Error('Invalid password');
      }

      const { timeout, callback } = this.replyHandlers[parsedData.id] || {};
      if(!callback) return false;
      if(timeout) clearTimeout(timeout);
      if(callback) callback(parsedData);
    });

    this.ws.on('open', () => {
      this.emit('connection', 'connected');
      if(this.retry) {
        clearTimeout(this.retry);
        this.retry = null;
      }
    });

    this.ws.on('error', () => {
      this.emit('connection', 'connection_error');
      this.reconnect();
    });

    this.ws.on('close', () => {
      this.emit('connection', 'connection_closed');
      this.reconnect();
    });

    await new Promise((resolve) => {
      this.on('connection', (info) => {
        if(info === 'authenticated') resolve(this);
      });
    });

    return this.subscribe((change) => {
      this.emit(change.event.event_type, change.event.data);
    });
  }

  reconnect() {
    if(this.retry) return true;

    this.retry = setInterval(() => {
      try {
        this.emit('connection', 'reconnecting');
        this.connect();
      } catch(err) {
        // noop
      }
    }, this.config.retryTimeout);
  }

  async callService(options) {
    const response = await this.send({ type: 'call_service', ...options });
    if(response.success) return response.result;
    throw Object.assign(new Error(), response.error);
  }

  async send(data, addId = true) {
    const newData = { ...data };
    if(addId) {
      newData.id = this.id;
      this.id++;
    }

    return new Promise((resolve, reject) => {
      this.replyHandlers[newData.id] = {
        timeout: newData.id === undefined ? undefined : setTimeout(() => {
          return reject(new Error(`No response received for ID ${newData.id}`));
        }, this.config.timeout),
        callback: resolve,
      };
      this.ws.send(JSON.stringify(newData));
    });
  }

  async subscribe(handlerFunc) {
    const data = { type: 'subscribe_events' };
    const response = await this.send(data, true, true);
    if(!response.success) throw Object.assign(new Error(), response.error);
    this.replyHandlers[response.id] = {
      callback: handlerFunc,
      timeout: undefined,
    };
    return response;
  }

  unsubscribe(subscription) {
    return this.send({
      type: 'unsubscribe_events',
      subscription,
    });
  }

  async getStates() {
    const response = await this.send({ type: 'get_states' });
    if(!response.success) throw Object.assign(new Error(), response.error);
    return response.result;
  }

}

export default SocketConnection;
