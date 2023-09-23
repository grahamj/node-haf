import BooleanEntity from '../util/BooleanEntity.mjs';

class BinarySensor extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'binary_sensor',
    });
  }

}

export default BinarySensor;
