import Entity from '../base/Entity.mjs';

class InputText extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'input_text',
    });
  }

}

export default InputText;
