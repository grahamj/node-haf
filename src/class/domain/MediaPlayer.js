const Entity = require('../base/Entity.js');

class MediaPlayer extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'media_player',
    });
  }

}

module.exports = MediaPlayer;
