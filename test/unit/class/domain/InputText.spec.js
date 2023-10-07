const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('InputText class', () => {
  let InputText;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class Entity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    InputText = proxyquire('../../../../src/class/domain/InputText', {
      '../base/Entity.js': Entity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new InputText({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'input_text',
      });
    });

  });

});
