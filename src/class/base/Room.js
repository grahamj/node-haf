import Joi from 'joi';

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
    Object.assign(this, config);
    if(config.entities) {
      config.entities.forEach(this.addEntity.bind(this));
    }
  }

  addEntity(entity) {
    this.entityMap.set(entity.identifier, entity);
  }

  getEntity(identifier) {
    return this.entityMap.get(identifier);
  }

}

export default Room;
