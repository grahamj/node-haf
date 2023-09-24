const BinarySensor = require('../domain/BinarySensor.js');

class Motion extends BinarySensor {

  onMotion(handler) {
    this.onHigh(handler);
  }

  onClear(handler) {
    this.onLow(handler);
  }

}

module.exports = Motion;
