import SocketConnection from './lib/SocketConnection.mjs';
import entityMap from './lib/entityMap.mjs';
import Entity from './class/base/Entity.mjs';
import Room from './class/base/Room.mjs';
import BinarySensor from './class/domain/BinarySensor.mjs';
import Button from './class/domain/Button.mjs';
import InputBoolean from './class/domain/InputBoolean.mjs';
import InputButton from './class/domain/InputButton.mjs';
import InputText from './class/domain/InputText.mjs';
import Light from './class/domain/Light.mjs';
import MediaPlayer from './class/domain/MediaPlayer.mjs';
import Sensor from './class/domain/Sensor.mjs';
import Alexa from './class/util/Alexa.mjs';
import BooleanEntity from './class/util/BooleanEntity.mjs';
import Door from './class/util/Door.mjs';
import Home from './class/util/Home.mjs';
import Motion from './class/util/Motion.mjs';
import Pico from './class/util/Pico.mjs';
import Window from './class/util/Window.mjs';

export default {
  SocketConnection,
  entityMap,
  base: {
    Entity,
    Room,
  },
  domain: {
    BinarySensor,
    Button,
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
};
