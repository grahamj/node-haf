import BooleanEntity from '../util/BooleanEntity.mjs';
import log from '../../lib/log.mjs';

class Button extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'button',
    });
  }

  onPress(handler) {
    this.onHigh((button) => {
      log.info(`Button ${button.identifier} pressed`);
      handler(button);
    });
  }

  onRelease(handler) {
    this.onLow((button) => {
      log.info(`Button ${button.identifier} released`);
      handler(button);
    });
  }

}

export default Button;
