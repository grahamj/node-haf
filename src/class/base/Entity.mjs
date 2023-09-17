import Joi from 'joi';
import entityMap from '../../lib/entityMap.mjs';

const priv = Symbol('private');

class Entity {

  constructor(config = {}) {
    this[priv] = {
      stateChangeHandlers: [],
    };
    Object.assign(this, {
      identifier: undefined,
      entityId: undefined,
      domain: undefined,
      state: undefined,
      attributes: {},
      lastChange: undefined,
      lastUpdate: undefined,
      event: undefined,
    });
    this.configure(config);
  }

  configure(config = {}) {
    Joi.assert(config, Joi.object({
      identifier: Joi.string().required(),
      entityId: Joi.string().required(),
      domain: Joi.string().required(),
    }));
    Object.assign(this, config);
    this.entityId = `${this.domain}.${this.entityId}`;
    if(!entityMap.has(this.entityId)) entityMap.set(this.entityId, this);
  }

  processStateChange(data) {
    Object.assign(this, {
      state: data.new_state.state,
      previousState: data.old_state.state,
      attributes: data.new_state.attributes,
      lastChange: new Date(data.new_state.last_changed),
      lastUpdate: new Date(data.new_state.last_updated),
      event: {
        newState: data.new_state,
        oldState: data.old_state,
      },
    });
    this.handleStateChange();
  }

  handleStateChange() {
    this[priv].stateChangeHandlers.forEach((handler) => handler(this));
  }

  onStateChange(handler) {
    this[priv].stateChangeHandlers.push(handler);
  }
}

export default Entity;
