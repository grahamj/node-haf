import MediaPlayer from '../domain/MediaPlayer.mjs';

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

export default Alexa;
