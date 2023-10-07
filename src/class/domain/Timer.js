const Joi = require('joi');
const Entity = require('../base/Entity.js');

const priv = Symbol('private');

class Timer extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'timer',
    });
    this[priv] = {
      startHandlers: [],
      stopHandlers: [],
    };
    super.onStateChange(() => {
      if(this.state === 'active' && this.previousState === 'idle') {
        this.triggerStart();
      } else if(this.state === 'idle' && this.previousState === 'active') {
        this.triggerStop();
      }
    });
  }

  onStart(handler) {
    this[priv].startHandlers.push(handler);
  }

  onStop(handler) {
    this[priv].stopHandlers.push(handler);
  }

  triggerStart() {
    this[priv].startHandlers.forEach((handler) => handler(this));
  }

  triggerStop() {
    this[priv].stopHandlers.forEach((handler) => handler(this));
  }

  async start(seconds) {
    Joi.assert(seconds, Joi.number().positive().integer());
    return super.callService({
      domain: 'timer',
      service: 'start',
      target: {
        entity_id: this.entityId,
      },
      ...seconds ? { service_data: { duration: seconds } } : {},
    });
  }

  async cancel() {
    return super.callService({
      domain: 'timer',
      service: 'cancel',
      target: {
        entity_id: this.entityId,
      },
    });
  }

  async finish() {
    return super.callService({
      domain: 'timer',
      service: 'finish',
      target: {
        entity_id: this.entityId,
      },
    });
  }

  isRunning() {
    return this.state === 'active';
  }

}

module.exports = Timer;
