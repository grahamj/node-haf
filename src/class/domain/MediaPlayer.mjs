import Entity from '../base/Entity.mjs';

class MediaPlayer extends Entity {

  constructor(config) {
    super({
      ...config,
      domain: 'media_player',
    });
  }

}

export default MediaPlayer;
