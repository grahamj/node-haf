const Entity = require('../base/Entity.js');

class InputText extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'input_text',
    });
  }

}

module.exports = InputText;
