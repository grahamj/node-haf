import Entity from '../base/Entity.mjs';
import log from '../../lib/log.mjs';

class Light extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'light',
    });
  }

  onTurnOn(handler) {
    this.onHigh((light) => {
      log.info(`Light ${this.identifier} turned on`);
      handler(light);
    });
  }

  onTurnOff(handler) {
    this.onLow((light) => {
      log.info(`Light ${this.identifier} turned off`);
      handler(light);
    });
  }

}

export default Light;
