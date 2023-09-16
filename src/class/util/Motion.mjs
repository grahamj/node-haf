import BinarySensor from '../domain/BinarySensor.mjs';
import log from '../../lib/log.mjs';

class Motion extends BinarySensor {

  onMotion(handler) {
    this.onHigh((sensor) => {
      log.info(`Motion ${this.identifier} detected`);
      handler(sensor);
    });
  }

  onClear(handler) {
    this.onLow((sensor) => {
      log.info(`Motion ${this.identifier} clear`);
      handler(sensor);
    });
  }

}

export default Motion;
