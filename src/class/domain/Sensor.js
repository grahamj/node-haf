import Entity from '../base/Entity.mjs';

class Sensor extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'sensor',
    });
  }

}

export default Sensor;
