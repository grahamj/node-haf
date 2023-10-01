const BinarySensor = require('../domain/BinarySensor.js');

class Window extends BinarySensor {

  onOpen(handler) {
    return super.onHigh(handler);
  }

  onClose(handler) {
    return super.onLow(handler);
  }

}

module.exports = Window;
