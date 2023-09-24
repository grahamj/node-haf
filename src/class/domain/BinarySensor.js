const BooleanEntity = require('../base/BooleanEntity.js');

class BinarySensor extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'binary_sensor',
    });
  }

}

module.exports = BinarySensor;
