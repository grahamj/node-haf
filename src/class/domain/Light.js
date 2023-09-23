import Entity from '../base/Entity.mjs';

class Light extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'light',
    });
  }

  onTurnOn(handler) {
    this.onHigh(handler);
  }

  onTurnOff(handler) {
    this.onLow(handler);
  }

}

export default Light;
