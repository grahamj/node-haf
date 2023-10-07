const BinarySensor = require('../domain/BinarySensor.js');

class Motion extends BinarySensor {

  onDetect(handler) {
    return super.onHigh(handler);
  }

  onClear(handler) {
    return super.onLow(handler);
  }

  triggerHigh() {
    this.triggerDetect();
  }

  triggerLow() {
    this.triggerClear();
  }

  triggerDetect() {
    if(this.latch && !this.latchInterval) {
      this.latchInterval = setInterval(() => this.triggerDetect(), Math.floor(this.latch / 4));
    }
    super.triggerHigh();
  }

  triggerClear() {
    if(this.latchInterval) clearInterval(this.latchInterval);
    super.triggerLow();
  }

}

module.exports = Motion;
