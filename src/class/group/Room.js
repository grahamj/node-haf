const Joi = require('joi');
const Light = require('../domain/Light');
const Door = require('../subdomain/Door');
const Window = require('../subdomain/Window');
const Motion = require('../subdomain/Motion');
const Timer = require('../domain/Timer');
const Alexa = require('../subdomain/Alexa');
const Pico = require('../thirdparty/Pico');
const entities = require('../../lib/entities');

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
      config.entities.forEach((identifier) => this.addEntity(identifier));
    }
  }

  addEntity(identifier, config = {}) {
    Joi.assert(identifier, Joi.string().required());
    Joi.assert(config, Joi.object().unknown());
    const entity = entities.get(identifier);
    this.entityMap.set(identifier, entity);
    this.configMap.set(identifier, config);
    if(entity instanceof Light) {
      this.lightMap.set(identifier, entity);
    } else if(entity instanceof Door) {
      this.doorMap.set(identifier, entity);
    } else if(entity instanceof Window) {
      this.windowMap.set(identifier, entity);
    } else if(entity instanceof Motion) {
      this.motionMap.set(identifier, entity);
    } else if(entity instanceof Alexa) {
      this.voiceMap.set(identifier, entity);
    } else if(entity instanceof Pico) {
      this.picoMap.set(identifier, entity);
    } else if(entity instanceof Timer) {
      this.timerMap.set(identifier, entity);
    }
  }

}

module.exports = Room;
