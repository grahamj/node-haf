const Entity = require('../base/Entity.js');

class Counter extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'counter',
    });
  }

  getCount() {
    return this.state ? parseInt(this.state, 10) : 0;
  }

}

module.exports = Counter;
