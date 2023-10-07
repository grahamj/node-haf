const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('MediaPlayer class', () => {
  let MediaPlayer;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class Entity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    MediaPlayer = proxyquire('../../../../src/class/domain/MediaPlayer', {
      '../base/Entity.js': Entity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new MediaPlayer({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'media_player',
      });
    });

  });

});
