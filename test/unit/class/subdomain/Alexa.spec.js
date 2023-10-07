const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Alexa class', () => {
  let Alexa;
  let callServiceStub;

  beforeEach(() => {
    callServiceStub = sinon.stub().resolves('success');
    class MediaPlayer {}
    MediaPlayer.prototype.callService = callServiceStub;
    Alexa = proxyquire('../../../../src/class/subdomain/Alexa', {
      '../domain/MediaPlayer.js': MediaPlayer,
    });
  });

  describe('say()', () => {

    it('Calls service with proper args', () => {
      const alexa = new Alexa();
      alexa.entityId = 'fancy entity';
      alexa.say('Hi!');
      expect(callServiceStub.firstCall.args).to.matchSnapshot();
    });

  });

});
