const BooleanEntity = require('../util/BooleanEntity.js');

class BinarySensor extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'binary_sensor',
    });
  }

}

module.exports = BinarySensor;
