const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

describe('BinarySensor class', () => {
  let BinarySensor;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class BooleanEntity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    BinarySensor = proxyquire('../../../../src/class/domain/BinarySensor', {
      '../base/BooleanEntity.js': BooleanEntity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new BinarySensor({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'binary_sensor',
      });
    });

  });

});
