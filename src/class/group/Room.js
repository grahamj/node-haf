const Joi = require('joi');

class Room {

  constructor(config = {}) {
    Object.assign(this, {
      identifier: undefined,
      entityMap: new Map(),
    });
    this.configure(config);
  }

  configure(config = {}) {
    Joi.assert(config, Joi.object({
      identifier: Joi.string().required(),
      entities: Joi.array(),
    }));
    this.identifier = config.identifier;
    if(config.entities) {
      config.entities.forEach(this.addEntity.bind(this));
    }
  }

  addEntity(entity) {
    Joi.assert(entity, Joi.object({
      identifier: Joi.string().required(),
    }));
    this.entityMap.set(entity.identifier, entity);
  }

  getEntity(identifier) {
    Joi.assert(identifier, Joi.string().required());
    return this.entityMap.get(identifier);
  }

}

module.exports = Room;
