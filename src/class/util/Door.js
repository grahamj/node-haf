const BinarySensor = require('../domain/BinarySensor.js');

class Door extends BinarySensor {

  onOpen(handler) {
    this.onHigh(handler);
  }

  onClose(handler) {
    this.onLow(handler);
  }

}

module.exports = Door;
