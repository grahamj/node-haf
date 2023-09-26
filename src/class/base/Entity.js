const Joi = require('joi');
const entities = require('../../lib/entities.js');
const connection = require('../../lib/connection.js');

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
    Joi.assert(config, Joi.object({
      identifier: Joi.string().required(),
      entityId: Joi.string().required(),
      domain: Joi.string().required(),
    }).unknown());
    const { identifier, domain, entityId } = config;
    Object.assign(this, {
      identifier,
      domain,
    });
    this.entityId = `${domain}.${entityId}`;
    if(entities.getByEntityId(this.entityId)) {
      throw new Error(`Cannot instantiate more than one Entity with the same entityID (${this.entityId})`);
    } else {
      entities.add(this);
    }
  }

  setState(data) {
    Joi.assert(data, Joi.object({
      state: Joi.string().required(),
      attributes: Joi.object().required(),
      last_changed: Joi.string().required(),
      last_updated: Joi.string().required(),
    }).unknown());
    Object.assign(this, {
      state: data.state,
      attributes: data.attributes,
      lastChange: new Date(data.last_changed),
      lastUpdate: new Date(data.last_updated),
    });
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

  async callService(options) {
    const ha = connection.get();
    const { domain } = this;
    return ha.callService({
      domain,
      ...options,
    });
  }
}

module.exports = Entity;
