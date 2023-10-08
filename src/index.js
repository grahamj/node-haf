const connection = require('./lib/connection.js');
const SocketConnection = require('./lib/SocketConnection.js');
const entities = require('./lib/entities.js');
const Entity = require('./class/base/Entity.js');
const Room = require('./class/group/Room.js');
const BinarySensor = require('./class/domain/BinarySensor.js');
const Button = require('./class/domain/Button.js');
const Counter = require('./class/domain/Counter.js');
const InputBoolean = require('./class/domain/InputBoolean.js');
const InputButton = require('./class/domain/InputButton.js');
const InputNumber = require('./class/domain/InputNumber.js');
const InputText = require('./class/domain/InputText.js');
const Light = require('./class/domain/Light.js');
const MediaPlayer = require('./class/domain/MediaPlayer.js');
const Sensor = require('./class/domain/Sensor.js');
const Schedule = require('./class/domain/Schedule.js');
const Timer = require('./class/domain/Timer.js');
const Alexa = require('./class/subdomain/Alexa.js');
const BooleanEntity = require('./class/base/BooleanEntity.js');
const Door = require('./class/subdomain/Door.js');
const Home = require('./class/group/Home.js');
const Motion = require('./class/subdomain/Motion.js');
const Pico = require('./class/thirdparty/Pico.js');
const Window = require('./class/subdomain/Window.js');

module.exports = {
  SocketConnection,
  entities,
  base: {
    Entity,
    BooleanEntity,
  },
  group: {
    Home,
    Room,
  },
  domain: {
    BinarySensor,
    Button,
    Counter,
    InputBoolean,
    InputButton,
    InputNumber,
    InputText,
    Light,
    MediaPlayer,
    Sensor,
    Schedule,
    Timer,
  },
  subdomain: {
    Alexa,
    Door,
    Motion,
    Window,
  },
  thirdparty: {
    Pico,
  },
  getConnection: connection.get,
  setConnection: connection.set,
};
