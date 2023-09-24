const BooleanEntity = require('../base/BooleanEntity.js');

class Button extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'button',
    });
  }

  onPress(handler) {
    this.onHigh(handler);
  }

  onRelease(handler) {
    this.onLow(handler);
  }

}

module.exports = Button;
