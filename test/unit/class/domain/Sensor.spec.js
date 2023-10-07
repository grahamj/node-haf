const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Sensor class', () => {
  let Sensor;
  let constructorStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    class Entity {
      constructor(...args) {
        constructorStub(...args);
      }
    }
    Sensor = proxyquire('../../../../src/class/domain/Sensor', {
      '../base/Entity.js': Entity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new Sensor({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'sensor',
      });
    });

  });

});
