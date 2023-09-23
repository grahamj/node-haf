const BinarySensor = require('../domain/BinarySensor.js');

class Window extends BinarySensor {

  onOpen(handler) {
    this.onHigh(handler);
  }

  onClose(handler) {
    this.onLow(handler);
  }

}

module.exports = Window;
