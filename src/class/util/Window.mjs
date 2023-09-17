import BinarySensor from '../domain/BinarySensor.mjs';

class Window extends BinarySensor {

  onOpen(handler) {
    this.onHigh(handler);
  }

  onClose(handler) {
    this.onLow(handler);
  }

}

export default Window;
