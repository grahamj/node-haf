import BooleanEntity from '../util/BooleanEntity.mjs';

class Button extends BooleanEntity {

  constructor(config) {
    super({
      ...config,
      domain: 'button',
    });
  }

  onPress(handler) {
    this.onHigh(handler);
  }

  onRelease(handler) {
    this.onLow(handler);
  }

}

export default Button;
