import Entity from '../base/Entity.mjs';

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

export default MediaPlayer;
