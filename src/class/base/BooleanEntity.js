const Entity = require('./Entity.js');

const priv = Symbol('private');

class BooleanEntity extends Entity {

  constructor(config) {
    super(config);
    this[priv] = {
      highHandlers: [],
      lowHandlers: [],
      toggleHandlers: [],
    };
    super.onStateChange(() => {
      if(this.state === 'on' && this.previousState === 'off') {
        this.triggerHigh();
      } else if(this.state === 'off' && this.previousState === 'on') {
        this.triggerLow();
      }
    });
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

  triggerHigh() {
    this[priv].highHandlers.forEach((handler) => handler(this));
    this.triggerToggle();
  }

  triggerLow() {
    this[priv].lowHandlers.forEach((handler) => handler(this));
    this.triggerToggle();
  }

  triggerToggle() {
    this[priv].toggleHandlers.forEach((handler) => handler(this));
  }

  isHigh() {
    if(typeof this.state !== 'string') return;
    const state = this.state.toLowerCase();
    if(state === 'on') return true;
    if(state === 'off') return false;
  }

  isLow() {
    if(typeof this.state !== 'string') return;
    const state = this.state.toLowerCase();
    if(state === 'on') return false;
    if(state === 'off') return true;
  }

  isOn() {
    return this.isHigh();
  }

  isOff() {
    return this.isLow();
  }

}

module.exports = BooleanEntity;
