const connection = require('./lib/connection.js');
const SocketConnection = require('./lib/SocketConnection.js');
const entities = require('./lib/entities.js');
const Entity = require('./class/base/Entity.js');
const Room = require('./class/base/Room.js');
const BinarySensor = require('./class/domain/BinarySensor.js');
const Button = require('./class/domain/Button.js');
const Counter = require('./class/domain/Counter.js');
const InputBoolean = require('./class/domain/InputBoolean.js');
const InputButton = require('./class/domain/InputButton.js');
const InputText = require('./class/domain/InputText.js');
const Light = require('./class/domain/Light.js');
const MediaPlayer = require('./class/domain/MediaPlayer.js');
const Sensor = require('./class/domain/Sensor.js');
const Alexa = require('./class/util/Alexa.js');
const BooleanEntity = require('./class/util/BooleanEntity.js');
const Door = require('./class/util/Door.js');
const Home = require('./class/util/Home.js');
const Motion = require('./class/util/Motion.js');
const Pico = require('./class/util/Pico.js');
const Window = require('./class/util/Window.js');

module.exports = {
  SocketConnection,
  entities,
  base: {
    Entity,
    Room,
  },
  domain: {
    BinarySensor,
    Button,
    Counter,
    InputBoolean,
    InputButton,
    InputText,
    Light,
    MediaPlayer,
    Sensor,
  },
  util: {
    Alexa,
    BooleanEntity,
    Door,
    Home,
    Motion,
    Pico,
    Window,
  },
  getConnection: connection.get,
  setConnection: connection.set,
};
