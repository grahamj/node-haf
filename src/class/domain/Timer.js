const Joi = require('joi');
const Entity = require('../base/Entity.js');

class Timer extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'timer',
    });
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

}

module.exports = Timer;
