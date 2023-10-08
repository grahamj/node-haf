const BooleanEntity = require('../base/BooleanEntity.js');

class InputBoolean extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'input_boolean',
    });
  }

}

module.exports = InputBoolean;
