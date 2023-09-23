import BinarySensor from '../domain/BinarySensor.mjs';

class Motion extends BinarySensor {

  onMotion(handler) {
    this.onHigh(handler);
  }

  onClear(handler) {
    this.onLow(handler);
  }

}

export default Motion;
