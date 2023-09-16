import Entity from '../base/Entity.mjs';
import log from '../../lib/log.mjs';

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
      log.info(`InputButton ${this.identifier} pressed`);
      this[priv].pressHandlers.forEach((handler) => handler(this));
    }
    super.handleStateChange();
  }

  onPress(handler) {
    this[priv].pressHandlers.push(handler);
  }

}

export default InputButton;
