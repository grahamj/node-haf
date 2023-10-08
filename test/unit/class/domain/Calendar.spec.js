const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Calendar class', () => {
  let Calendar;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class BooleanEntity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    Calendar = proxyquire('../../../../src/class/domain/Calendar', {
      '../base/BooleanEntity.js': BooleanEntity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new Calendar({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'calendar',
      });
    });

  });

});
