const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

describe('InputBoolean class', () => {
  let InputBoolean;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class BooleanEntity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    InputBoolean = proxyquire('../../../../src/class/domain/InputBoolean', {
      '../base/BooleanEntity.js': BooleanEntity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new InputBoolean({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'input_boolean',
      });
    });

  });

});
