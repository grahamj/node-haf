const Joi = require('joi');
const Light = require('../domain/Light');
const Door = require('../subdomain/Door');
const Window = require('../subdomain/Window');
const Motion = require('../subdomain/Motion');
const Timer = require('../domain/Timer');
const Alexa = require('../subdomain/Alexa');
const Pico = require('../thirdparty/Pico');

class Room {

  constructor(config = {}) {
    Object.assign(this, {
      identifier: undefined,
      entityMap: new Map(),
      configMap: new Map(),
      lightMap: new Map(),
      doorMap: new Map(),
      windowMap: new Map(),
      motionMap: new Map(),
      voiceMap: new Map(),
      picoMap: new Map(),
      timerMap: new Map(),
      presenceTimer: undefined,
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
      config.entities.forEach((entity) => this.addEntity(entity));
    }
  }

  addEntity(entity, config = {}) {
    Joi.assert(entity, Joi.object({
      identifier: Joi.string().required(),
    }).unknown().required());
    Joi.assert(config, Joi.object().unknown());
    this.entityMap.set(entity.identifier, entity);
    this.configMap.set(entity.identifier, config);
    if(entity instanceof Light) {
      this.lightMap.set(entity.identifier, entity);
    } else if(entity instanceof Door) {
      this.doorMap.set(entity.identifier, entity);
    } else if(entity instanceof Window) {
      this.windowMap.set(entity.identifier, entity);
    } else if(entity instanceof Motion) {
      this.motionMap.set(entity.identifier, entity);
    } else if(entity instanceof Alexa) {
      this.voiceMap.set(entity.identifier, entity);
    } else if(entity instanceof Pico) {
      this.picoMap.set(entity.identifier, entity);
    } else if(entity instanceof Timer) {
      this.timerMap.set(entity.identifier, entity);
      if(config.presence) this.presenceTimer = entity;
    }
  }

  getEntity(identifier) {
    Joi.assert(identifier, Joi.string().required());
    return this.entityMap.get(identifier);
  }

}

module.exports = Room;
