const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

describe('Button class', () => {
  let Button;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class BooleanEntity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    Button = proxyquire('../../../../src/class/domain/Button', {
      '../base/BooleanEntity.js': BooleanEntity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new Button({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'button',
      });
    });

  });

});
