import BinarySensor from '../domain/BinarySensor.mjs';

class Door extends BinarySensor {

  onOpen(handler) {
    this.onHigh(handler);
  }

  onClose(handler) {
    this.onLow(handler);
  }

}

export default Door;
