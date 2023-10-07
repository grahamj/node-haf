const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Timer class', () => {
  let Timer;
  let constructorStub;
  let callServiceStub;
  let onStateChangeStub;

  beforeEach(() => {
    constructorStub = sinon.stub();
    callServiceStub = sinon.stub();
    onStateChangeStub = sinon.stub();
    callServiceStub = sinon.stub();

    const Entity = class {
      constructor(...args) {
        this.entityId = args[0].entityId;
        constructorStub(...args);
      }

      onStateChange(...args) {
        onStateChangeStub(...args);
      }

      callService(...args) {
        callServiceStub(...args);
      }
    };
    Timer = proxyquire('../../../../src/class/domain/Timer', {
      '../base/Entity.js': Entity,
    });
  });

  describe('constructor()', () => {

    it('Passes config and proper domain to super', () => {
      new Timer({ fancy: true });
      expect(constructorStub.firstCall.args[0]).to.deep.equal({
        fancy: true,
        domain: 'timer',
      });
    });

  });

  describe('start()', () => {

    it('Calls service with proper params, duration specified', async () => {
      const timer = new Timer({ entityId: 'fancy' });
      await timer.start(5);
      expect(callServiceStub.firstCall.args).to.matchSnapshot();
    });

    it('Calls service with proper params, no duration', async () => {
      const timer = new Timer({ entityId: 'fancy' });
      await timer.start();
      expect(callServiceStub.firstCall.args).to.matchSnapshot();
    });

    it('Throws if duration is not a number', async () => {
      const timer = new Timer({ entityId: 'fancy' });
      try {
        await timer.start('abc');
      } catch(err) {
        expect(err.message).to.match(/number/);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Throws if duration is below 1', async () => {
      const timer = new Timer({ entityId: 'fancy' });
      try {
        await timer.start(0);
      } catch(err) {
        expect(err.message).to.match(/number/);
        return;
      }
      throw new Error('Should not succeed');
    });

  });

  describe('cancel()', () => {

    it('Calls service with proper params', async () => {
      const timer = new Timer({ entityId: 'fancy' });
      await timer.cancel();
      expect(callServiceStub.firstCall.args).to.matchSnapshot();
    });

  });

  describe('finish()', () => {

    it('Calls service with proper params', async () => {
      const timer = new Timer({ entityId: 'fancy' });
      await timer.finish();
      expect(callServiceStub.firstCall.args).to.matchSnapshot();
    });

  });

});
