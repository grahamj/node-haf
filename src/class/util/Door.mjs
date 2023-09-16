import BinarySensor from '../domain/BinarySensor.mjs';
import log from '../../lib/log.mjs';

class Door extends BinarySensor {

  onOpen(handler) {
    this.onHigh((door) => {
      log.info(`Door ${this.identifier} opened`);
      handler(door);
    });
  }

  onClose(handler) {
    this.onLow((door) => {
      log.info(`Door ${this.identifier} closed`);
      handler(door);
    });
  }

}

export default Door;
