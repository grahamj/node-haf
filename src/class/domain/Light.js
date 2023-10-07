const Entity = require('../base/Entity.js');

class Light extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'light',
    });
  }

  onTurnOn(handler) {
    this.onHigh(handler);
  }

  onTurnOff(handler) {
    this.onLow(handler);
  }

  async turnOn() {
    return super.callService({
      domain: 'light',
      service: 'turn_on',
      target: {
        entity_id: this.entityId,
      },
    });
  }

  async turnOff() {
    return super.callService({
      domain: 'light',
      service: 'turn_off',
      target: {
        entity_id: this.entityId,
      },
    });
  }

}

module.exports = Light;
