const Entity = require('../base/Entity.js');

class Sensor extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'sensor',
    });
  }

}

module.exports = Sensor;
