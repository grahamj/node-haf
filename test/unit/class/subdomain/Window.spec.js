const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Window class', () => {
  let Window;
  let onHighStub;
  let onLowStub;

  beforeEach(() => {
    onHighStub = sinon.stub().resolves('success');
    onLowStub = sinon.stub().resolves('success');
    class BinarySensor {}
    BinarySensor.prototype.onHigh = onHighStub;
    BinarySensor.prototype.onLow = onLowStub;
    Window = proxyquire('../../../../src/class/subdomain/Window', {
      '../domain/BinarySensor.js': BinarySensor,
    });
  });

  describe('onOpen()', () => {

    it('Calls onHigh with same args', () => {
      const window = new Window();
      window.onOpen('fancy');
      expect(onHighStub.firstCall.args[0]).to.equal('fancy');
    });

  });

  describe('onClose()', () => {

    it('Calls onLow with same args', () => {
      const window = new Window();
      window.onClose('fancy');
      expect(onLowStub.firstCall.args[0]).to.equal('fancy');
    });

  });

});
