import Entity from '../base/Entity.mjs';

class Virtual extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'virtual',
    });
  }

}

export default Virtual;
