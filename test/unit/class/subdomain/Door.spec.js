const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

describe('Door class', () => {
  let Door;
  let onHighStub;
  let onLowStub;

  beforeEach(() => {
    onHighStub = sinon.stub().resolves('success');
    onLowStub = sinon.stub().resolves('success');
    class BinarySensor {}
    BinarySensor.prototype.onHigh = onHighStub;
    BinarySensor.prototype.onLow = onLowStub;
    Door = proxyquire('../../../../src/class/subdomain/Door', {
      '../domain/BinarySensor.js': BinarySensor,
    });
  });

  describe('onOpen()', () => {

    it('Calls onHigh with same args', () => {
      const door = new Door();
      door.onOpen('fancy');
      expect(onHighStub.firstCall.args[0]).to.equal('fancy');
    });

  });

  describe('onClose()', () => {

    it('Calls onLow with same args', () => {
      const door = new Door();
      door.onClose('fancy');
      expect(onLowStub.firstCall.args[0]).to.equal('fancy');
    });

  });

});
