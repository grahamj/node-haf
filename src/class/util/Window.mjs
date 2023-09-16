import BinarySensor from '../domain/BinarySensor.mjs';
import log from '../../lib/log.mjs';

class Window extends BinarySensor {

  onOpen(handler) {
    this.onHigh((window) => {
      log.info(`Window ${this.identifier} opened`);
      handler(window);
    });
  }

  onClose(handler) {
    this.onLow((window) => {
      log.info(`Window ${this.identifier} closed`);
      handler(window);
    });
  }

}

export default Window;
