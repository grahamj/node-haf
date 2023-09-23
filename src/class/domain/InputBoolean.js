const BooleanEntity = require('../util/BooleanEntity.js');

class InputBoolean extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'input_boolean',
    });
  }

  isOn() {
    return this.state ? this.state.toLowerCase() === 'on' : undefined;
  }

  isOff() {
    return this.state ? this.state.toLowerCase() === 'off' : undefined;
  }

}

module.exports = InputBoolean;
