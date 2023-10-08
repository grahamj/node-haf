const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Schedule class', () => {
  let Schedule;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class BooleanEntity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    Schedule = proxyquire('../../../../src/class/domain/Schedule', {
      '../base/BooleanEntity.js': BooleanEntity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new Schedule({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'schedule',
      });
    });

  });

});
