const BooleanEntity = require('../base/BooleanEntity.js');

class Calendar extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'calendar',
    });
  }

}

module.exports = Calendar;
