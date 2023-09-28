const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

describe('Virtual class', () => {
  let Virtual;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class Entity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    Virtual = proxyquire('../../../../src/class/domain/Virtual', {
      '../base/Entity.js': Entity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new Virtual({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'virtual',
      });
    });

  });

});
