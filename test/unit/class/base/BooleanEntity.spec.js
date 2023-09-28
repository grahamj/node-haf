const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

describe('BooleanEntity class', () => {
  let BooleanEntity;
  let constructorStub;
  let onStateChangeStub;
  let onStateChangeHandler;

  beforeEach(() => {
    constructorStub = sinon.stub();
    onStateChangeStub = sinon.stub().callsFake((handler) => {
      onStateChangeHandler = handler;
    });
    onStateChangeHandler = undefined;
    class Entity {
      constructor(...args) {
        constructorStub(...args);
      }

      onStateChange(...args) {
        onStateChangeStub(...args);
      }
    }
    BooleanEntity = proxyquire('../../../../src/class/base/BooleanEntity', {
      './Entity.js': Entity,
    });
  });

  describe('constructor()', () => {

    it('Passes config to super', () => {
      new BooleanEntity({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({ fancy: true });
    });

    it('Installs state change handler', () => {
      new BooleanEntity({ fancy: true });
      expect(onStateChangeStub.called).to.be.true;
      expect(onStateChangeHandler).to.be.a('function');
    });

    it('Handles state going high', () => {
      const be = new BooleanEntity({ fancy: true });
      const onHighStub = sinon.stub();
      be.onHigh(onHighStub);
      const onLowStub = sinon.stub();
      be.onLow(onLowStub);
      const onToggleStub = sinon.stub();
      be.onToggle(onToggleStub);
      be.state = 'on';
      be.previousState = 'off';
      onStateChangeHandler();
      expect(onHighStub.called).to.be.true;
      expect(onLowStub.called).to.be.false;
      expect(onToggleStub.called).to.be.true;
    });

    it('Handles state going low', () => {
      const be = new BooleanEntity({ fancy: true });
      const onHighStub = sinon.stub();
      be.onHigh(onHighStub);
      const onLowStub = sinon.stub();
      be.onLow(onLowStub);
      const onToggleStub = sinon.stub();
      be.onToggle(onToggleStub);
      be.state = 'off';
      be.previousState = 'on';
      onStateChangeHandler();
      expect(onHighStub.called).to.be.false;
      expect(onLowStub.called).to.be.true;
      expect(onToggleStub.called).to.be.true;
    });

  });

});
