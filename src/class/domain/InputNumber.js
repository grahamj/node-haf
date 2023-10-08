const Entity = require('../base/Entity.js');

class InputNumber extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'input_number',
    });
  }

}

module.exports = InputNumber;
