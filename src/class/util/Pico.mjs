import Joi from 'joi';

const priv = Symbol('private');

class Pico {

  constructor(config = {}) {
    this[priv] = {
      pressHandlers: [],
    };
    this.configure(config);
  }

  configure(config = {}) {
    Joi.assert(config, Joi.object({
      identifier: Joi.string().required(),
      entityId: Joi.string().required(),
      on: Joi.object().required(),
      off: Joi.object().required(),
      raise: Joi.object().required(),
      lower: Joi.object().required(),
      stop: Joi.object().required(),
    }));
    Object.assign(this, config);
    ['on', 'off', 'raise', 'lower', 'stop']
      .forEach((type) => {
        this[type].onPress(() => {
          this[priv].pressHandlers.forEach((handler) => handler(this, type));
        });
      });
  }

  onPress(handler) {
    this[priv].pressHandlers.push(handler);
  }

}

export default Pico;
