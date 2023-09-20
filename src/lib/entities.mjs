import Joi from 'joi';

const identifierMap = new Map();
const entityIdMap = new Map();

const add = (entity) => {
  Joi.assert(entity, Joi.object({
    identifier: Joi.string().required(),
    entityId: Joi.string().required(),
  }).unknown());
  identifierMap.set(entity.identifier, entity);
  entityIdMap.set(entity.entityId, entity);
};

export default {
  add,
  get: (identifier) => identifierMap.get(identifier),
  getByEntityId: (entityId) => entityIdMap.get(entityId),
};
