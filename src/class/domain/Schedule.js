const BooleanEntity = require('../base/BooleanEntity.js');

class Schedule extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'schedule',
    });
  }

}

module.exports = Schedule;
