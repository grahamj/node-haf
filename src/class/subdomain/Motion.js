const BinarySensor = require('../domain/BinarySensor.js');

class Motion extends BinarySensor {

  onMotion(handler) {
    return super.onHigh(handler);
  }

  onClear(handler) {
    return super.onLow(handler);
  }

}

module.exports = Motion;
