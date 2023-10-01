const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

describe('Motion class', () => {
  let Motion;
  let onHighStub;
  let onLowStub;

  beforeEach(() => {
    onHighStub = sinon.stub().resolves('success');
    onLowStub = sinon.stub().resolves('success');
    class BinarySensor {}
    BinarySensor.prototype.onHigh = onHighStub;
    BinarySensor.prototype.onLow = onLowStub;
    Motion = proxyquire('../../../../src/class/subdomain/Motion', {
      '../domain/BinarySensor.js': BinarySensor,
    });
  });

  describe('onMotion()', () => {

    it('Calls onHigh with same args', () => {
      const motion = new Motion();
      motion.onMotion('fancy');
      expect(onHighStub.firstCall.args[0]).to.equal('fancy');
    });

  });

  describe('onClear()', () => {

    it('Calls onLow with same args', () => {
      const motion = new Motion();
      motion.onClear('fancy');
      expect(onLowStub.firstCall.args[0]).to.equal('fancy');
    });

  });

});
