const Entity = require('./Entity.js');

const priv = Symbol('private');

class BooleanEntity extends Entity {

  constructor(config) {
    super({
      ...config,
    });
    this[priv] = {
      highHandlers: [],
      lowHandlers: [],
      toggleHandlers: [],
    };
  }

  handleStateChange() {
    if(this.state === 'on' && this.previousState === 'off') {
      this[priv].highHandlers.forEach((handler) => handler(this));
      this[priv].toggleHandlers.forEach((handler) => handler(this));
    } else if(this.state === 'off' && this.previousState === 'on') {
      this[priv].lowHandlers.forEach((handler) => handler(this));
      this[priv].toggleHandlers.forEach((handler) => handler(this));
    }
    super.handleStateChange();
  }

  onHigh(handler) {
    this[priv].highHandlers.push(handler);
  }

  onLow(handler) {
    this[priv].lowHandlers.push(handler);
  }

  onToggle(handler) {
    this[priv].toggleHandlers.push(handler);
  }

}

module.exports = BooleanEntity;
