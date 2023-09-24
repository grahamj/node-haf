/* eslint-disable max-classes-per-file */
const proxyquire = require('proxyquire').noPreserveCache();
const sinon = require('sinon');
const { expect } = require('chai');

describe('SocketConnection class', () => {
  let wsConstructorStub;
  let wsOnHandlers;
  let wsSendStub;
  let eventEmitStub;
  let eventOnHandlers;
  let SocketConnection;

  beforeEach(() => {
    wsConstructorStub = sinon.stub();
    wsOnHandlers = new Map();
    wsSendStub = sinon.stub();
    eventEmitStub = sinon.stub();
    eventOnHandlers = new Map();

    class EventEmitter {
      // eslint-disable-next-line class-methods-use-this
      on(type, handler) {
        eventOnHandlers.set(type, handler);
        // to avoid await connect() hanging
        if(type === 'connection') setTimeout(() => handler('authenticated'), 50);
      }
    }
    EventEmitter.prototype.emit = eventEmitStub;

    class Websocket {
      constructor(url) {
        wsConstructorStub(url);
      }

      // eslint-disable-next-line class-methods-use-this
      on(type, handler) {
        wsOnHandlers.set(type, handler);
      }
    }
    Websocket.prototype.send = wsSendStub;

    SocketConnection = proxyquire('../../../src/lib/SocketConnection.js', {
      events: EventEmitter,
      ws: Websocket,
    });
  });

  describe('constructor()', () => {

    it('Configs with defaults', () => {
      const connection = new SocketConnection();
      expect(connection.config).to.matchSnapshot();
    });

    it('Injests config and builds url properly', () => {
      const connection = new SocketConnection({
        protocol: 'proto',
        host: 'fancyhost',
        port: 123,
        retryTimeout: 456,
        timeout: 789,
      });
      expect(connection.config).to.matchSnapshot();
      expect(connection.url).to.matchSnapshot();
    });

  });

  describe('connect()', () => {

    it('Passes url to Websocket constructor', async () => {
      const connection = new SocketConnection();
      connection.subscribe = () => {};
      await connection.connect();
      expect(wsConstructorStub.firstCall.args[0]).to.matchSnapshot();
    });

    it('Subscribes on connect', async () => {
      const connection = new SocketConnection();
      connection.subscribe = sinon.stub();
      await connection.connect();
      expect(connection.subscribe.called).to.be.true;
    });

    it('Callback passed to subscribe() emits change data', async () => {
      const connection = new SocketConnection();
      connection.subscribe = sinon.stub();
      await connection.connect();
      expect(connection.subscribe.called).to.be.true;
      connection.subscribe.firstCall.args[0]({
        event: {
          event_type: 'fancy',
          data: 'fancy data',
        },
      });
      expect(eventEmitStub.firstCall.args).to.contain.members(['fancy', 'fancy data']);
    });

  });

  describe('send()', () => {

    it('Sends JSON data', async () => {
      const connection = new SocketConnection();
      connection.subscribe = () => {};
      await connection.connect();
      wsSendStub.callsFake((stringData) => {
        const data = JSON.parse(stringData);
        expect(data).to.include({ data: 'fancy' });
        connection.replyHandlers.get(data.id).callback();
      });
      await connection.send({ data: 'fancy' });
      expect(wsSendStub.called).to.be.true;
    });

    it('Injects id', async () => {
      const connection = new SocketConnection();
      connection.subscribe = () => {};
      await connection.connect();
      wsSendStub.callsFake((stringData) => {
        const data = JSON.parse(stringData);
        expect(data).to.have.property('id');
        connection.replyHandlers.get(data.id).callback();
      });
      await connection.send({ data: 'fancy' });
      expect(wsSendStub.called).to.be.true;
    });

    it('Returns the response', async () => {
      const connection = new SocketConnection();
      connection.subscribe = () => {};
      await connection.connect();
      wsSendStub.callsFake((stringData) => {
        const data = JSON.parse(stringData);
        connection.replyHandlers.get(data.id).callback('response');
      });
      const result = await connection.send({ data: 'fancy' });
      expect(result).to.equal('response');
    });

    it('Rejects on timeout', async () => {
      const connection = new SocketConnection({ timeout: 30 });
      connection.subscribe = () => {};
      await connection.connect();
      try {
        await connection.send({ data: 'fancy' });
      } catch(err) {
        expect(err.message).to.match(/No response received/);
        return;
      }
      throw new Error('Should not succeed');
    });

  });

  describe('subscribe()', () => {

    it('Rejects on send failure', async () => {
      const connection = new SocketConnection();
      const response = { success: false, error: { message: 'fancy error' } };
      connection.send = sinon.stub().resolves(response);
      try {
        await connection.subscribe();
      } catch(err) {
        expect(err.message).to.equal(response.error.message);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Saves response handler and returns response on success', async () => {
      const connection = new SocketConnection();
      const response = { id: 123, success: true };
      connection.send = sinon.stub().resolves(response);
      const handler = () => {};
      const result = await connection.subscribe(handler);
      expect(connection.send.firstCall.args).to.deep.equal([{ type: 'subscribe_events' }, true, true]);
      expect(connection.replyHandlers.get(123).callback).to.equal(handler);
      expect(result).to.deep.equal(response);
    });

  });

  describe('unsubscribe()', () => {

    it('Sends unsubscribe_events message and returns response', async () => {
      const connection = new SocketConnection();
      const response = { success: true };
      connection.send = sinon.stub().resolves(response);
      const subscription = { fancy: true };
      const result = await connection.unsubscribe(subscription);
      expect(connection.send.firstCall.args[0]).to.deep.equal({
        type: 'unsubscribe_events',
        subscription,
      });
      expect(result).to.equal(response);
    });

  });

  describe('getStates()', () => {

    it('Rejects on send failure', async () => {
      const connection = new SocketConnection();
      const response = { success: false, error: { message: 'fancy error' } };
      connection.send = sinon.stub().resolves(response);
      try {
        await connection.getStates();
      } catch(err) {
        expect(err.message).to.equal(response.error.message);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Sends get_states message and returns response', async () => {
      const connection = new SocketConnection();
      const response = { success: true, result: 'excellent' };
      connection.send = sinon.stub().resolves(response);
      const result = await connection.getStates();
      expect(connection.send.firstCall.args[0]).to.deep.equal({ type: 'get_states' });
      expect(result).to.equal('excellent');
    });

  });

  describe('callService()', () => {

    it('Rejects on send failure', async () => {
      const connection = new SocketConnection();
      const response = { success: false, error: { message: 'fancy error' } };
      connection.send = sinon.stub().resolves(response);
      try {
        await connection.callService();
      } catch(err) {
        expect(err.message).to.equal(response.error.message);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Sends get_states message and returns response', async () => {
      const connection = new SocketConnection();
      const response = { success: true, result: 'excellent' };
      connection.send = sinon.stub().resolves(response);
      const options = { fancy: true };
      const result = await connection.callService(options);
      expect(connection.send.firstCall.args[0]).to.deep.equal({ type: 'call_service', ...options });
      expect(result).to.equal('excellent');
    });

  });

  describe('Websocket events', () => {

    describe('on message', () => {

      it('For auth_ok, emits connection authenticated', async () => {
        const connection = new SocketConnection();
        connection.subscribe = () => {};
        await connection.connect();
        const message = JSON.stringify({ type: 'auth_ok' });
        wsOnHandlers.get('message')(message);
        expect(eventEmitStub.callCount).to.equal(1);
        expect(eventEmitStub.firstCall.args).to.contain.members(['connection', 'authenticated']);
      });

      it('For auth_required, throws if no password and token in config', async () => {
        const connection = new SocketConnection({ password: '', token: '' });
        connection.subscribe = () => {};
        await connection.connect();
        try {
          const message = JSON.stringify({ type: 'auth_required' });
          wsOnHandlers.get('message')(message);
        } catch(err) {
          expect(err.message).to.match(/password required/i);
          return;
        }
        throw new Error('Should not succeed');
      });

      it('For auth_required, sends token if configured', async () => {
        const connection = new SocketConnection({ password: 'secret', token: 'abc123' });
        connection.subscribe = () => {};
        await connection.connect();
        connection.send = sinon.stub();
        const message = JSON.stringify({ type: 'auth_required' });
        wsOnHandlers.get('message')(message);
        expect(connection.send.callCount).to.equal(1);
        expect(connection.send.firstCall.args[0]).to.deep.equal({
          type: 'auth',
          access_token: 'abc123',
        });
      });

      it('For auth_required, sends password if token not configured', async () => {
        const connection = new SocketConnection({ password: 'secret' });
        connection.subscribe = () => {};
        await connection.connect();
        connection.send = sinon.stub();
        const message = JSON.stringify({ type: 'auth_required' });
        wsOnHandlers.get('message')(message);
        expect(connection.send.callCount).to.equal(1);
        expect(connection.send.firstCall.args[0]).to.deep.equal({
          type: 'auth',
          api_password: 'secret',
        });
      });

      it('For auth_invalid, throws', async () => {
        const connection = new SocketConnection({ password: 'secret', token: 'abc123' });
        connection.subscribe = () => {};
        await connection.connect();
        try {
          const message = JSON.stringify({ type: 'auth_invalid' });
          wsOnHandlers.get('message')(message);
        } catch(err) {
          expect(err.message).to.match(/invalid password/i);
          return;
        }
        throw new Error('Should not succeed');
      });

      it('For others, returns false if no handler', async () => {
        const connection = new SocketConnection({ password: 'secret', token: 'abc123' });
        connection.subscribe = () => {};
        await connection.connect();
        const message = JSON.stringify({ type: 'fancy' });
        const result = wsOnHandlers.get('message')(message);
        expect(result).to.be.false;
      });

      it('For others, calls handler', async () => {
        const connection = new SocketConnection({ password: 'secret', token: 'abc123' });
        connection.subscribe = () => {};
        await connection.connect();
        const message = JSON.stringify({ id: 123, type: 'fancy' });
        const handlerStub = sinon.stub();
        connection.replyHandlers.set(123, { callback: handlerStub });
        wsOnHandlers.get('message')(message);
        expect(handlerStub.called).to.be.true;
      });

    });

    describe('on open', () => {

      it('Emits connection connected', async () => {
        const connection = new SocketConnection();
        connection.subscribe = () => {};
        await connection.connect();
        wsOnHandlers.get('open')();
        expect(eventEmitStub.callCount).to.equal(1);
        expect(eventEmitStub.firstCall.args).to.contain.members(['connection', 'connected']);
      });

    });

    describe('on error', () => {

      it('Emits connection connection_error and reconnects', async () => {
        const connection = new SocketConnection();
        connection.subscribe = () => {};
        connection.reconnect = sinon.stub();
        await connection.connect();
        wsOnHandlers.get('error')();
        expect(eventEmitStub.callCount).to.equal(1);
        expect(eventEmitStub.firstCall.args).to.contain.members(['connection', 'connection_error']);
        expect(connection.reconnect.called).to.be.true;
      });

    });

    describe('on close', () => {

      it('Emits connection connection_closed and reconnects', async () => {
        const connection = new SocketConnection();
        connection.subscribe = () => {};
        connection.reconnect = sinon.stub();
        await connection.connect();
        wsOnHandlers.get('close')();
        expect(eventEmitStub.callCount).to.equal(1);
        expect(eventEmitStub.firstCall.args).to.contain.members(['connection', 'connection_closed']);
        expect(connection.reconnect.called).to.be.true;
      });

    });

  });

});
