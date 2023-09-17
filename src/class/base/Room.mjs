import Joi from 'joi';

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
  }

  addLight(light) {
    this[priv].lights.set(light.identifier, light);
  }

  addWindow(window) {
    this[priv].windows.set(window.identifier, window);
  }

  addDoor(door) {
    this[priv].windows.set(door.identifier, door);
  }

  addPico(pico) {
    this[priv].picos.set(pico.identifier, pico);
  }

  addAlexa(alexa) {
    this[priv].alexas.set(alexa.identifier, alexa);
  }

}

export default Room;
