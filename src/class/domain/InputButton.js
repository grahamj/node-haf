const Entity = require('../base/Entity.js');

const priv = Symbol('private');

class InputButton extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'input_button',
    });
    this[priv] = {
      pressHandlers: [],
    };
  }

  handleStateChange() {
    if(this.state !== this.previousState && this.state.includes('-')) {
      this[priv].pressHandlers.forEach((handler) => handler(this));
    }
    super.handleStateChange();
  }

  onPress(handler) {
    this[priv].pressHandlers.push(handler);
  }

}

module.exports = InputButton;
