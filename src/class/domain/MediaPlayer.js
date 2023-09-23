const Entity = require('../base/Entity.js');

class MediaPlayer extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'media_player',
    });
  }

  async callService(options) {
    return super.callService({
      domain: 'media_player',
      ...options,
    });
  }

}

module.exports = MediaPlayer;
