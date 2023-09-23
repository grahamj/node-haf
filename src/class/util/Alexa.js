const MediaPlayer = require('../domain/MediaPlayer.js');

class Alexa extends MediaPlayer {

  async say(message) {
    return super.callService({
      domain: 'notify',
      service: 'alexa_media',
      service_data: {
        message,
        target: this.entityId,
      },
    });
  }

}

module.exports = Alexa;
