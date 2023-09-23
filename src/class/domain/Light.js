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

}

module.exports = Light;
