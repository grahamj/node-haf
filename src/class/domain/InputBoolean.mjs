import BooleanEntity from '../util/BooleanEntity.mjs';

class InputBoolean extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'input_boolean',
    });
  }

}

export default InputBoolean;
