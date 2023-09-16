import Joi from 'joi';
import log from '../../lib/log.mjs';

const priv = Symbol('private');

class Room {

  constructor(config = {}) {
    this[priv] = {
      motionSensors: new Map(),
      lights: new Map(),
      windows: new Map(),
      doors: new Map(),
      picos: new Map(),
      alexas: new Map(),
    };
    Object.assign(this, {
      identifier: undefined,
    });
    this.configure(config);
  }

  configure(config = {}) {
    Joi.assert(config, Joi.object({
      identifier: Joi.string().required(),
    }));
    Object.assign(this, config);
  }

  addMotionSensor(sensor) {
    this[priv].motionSensors.set(sensor.identifier, sensor);
    sensor.onStateChange(() => {
      log.info(`Room ${this.identifier} motion sensor ${sensor.identifier} state change: ${sensor.state}`);
    });
  }

  addLight(light) {
    this[priv].lights.set(light.identifier, light);
    light.onStateChange(() => {
      log.info(`Room ${this.identifier} light ${light.identifier} state change: ${light.state}`);
    });
  }

  addWindow(window) {
    this[priv].windows.set(window.identifier, window);
    window.onStateChange(() => {
      log.info(`Room ${this.identifier} window ${window.identifier} state change: ${window.state}`);
    });
  }

  addDoor(door) {
    this[priv].windows.set(door.identifier, door);
    door.onStateChange(() => {
      log.info(`Room ${this.identifier} door ${door.identifier} state change: ${door.state}`);
    });
  }

  addPico(pico) {
    this[priv].picos.set(pico.identifier, pico);
    pico.onPress((pressPico, type) => {
      log.info(`Room ${this.identifier} pico ${pico.identifier} button press: ${type}`);
    });
  }

  addAlexa(alexa) {
    this[priv].alexas.set(alexa.identifier, alexa);
  }

}

export default Room;
