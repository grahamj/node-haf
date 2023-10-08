const BooleanEntity = require('../base/BooleanEntity.js');

class Schedule extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'schedule',
    });
  }

  isOn() {
    return this.state ? this.state.toLowerCase() === 'on' : undefined;
  }

  isOff() {
    return this.state ? this.state.toLowerCase() === 'off' : undefined;
  }

}

module.exports = Schedule;
