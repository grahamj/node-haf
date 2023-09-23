const Entity = require('../base/Entity.js');

class Virtual extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'virtual',
    });
  }

}

module.exports = Virtual;
