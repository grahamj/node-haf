import Entity from '../util/BooleanEntity.mjs';

class Counter extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'counter',
    });
  }

  getCount() {
    return this.state ? parseInt(this.state, 10) : 0;
  }

}

export default Counter;
