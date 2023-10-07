const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Light class', () => {
  let Light;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class Entity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    Light = proxyquire('../../../../src/class/domain/Light', {
      '../base/Entity.js': Entity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new Light({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'light',
      });
    });

  });

});
