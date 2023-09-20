import Joi from 'joi';
import Virtual from '../domain/Virtual.mjs';

const priv = Symbol('private');

class Pico extends Virtual {

  constructor(config) {
    super(config);
    this.configure(config);
    this[priv] = {
      pressHandlers: [],
    };
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
