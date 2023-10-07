const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire')
  .noPreserveCache().noCallThru();

describe('Entity base class', () => {
  let Entity;
  let entitiesStub;
  let connectionStub;
  let callServiceStub;

  beforeEach(() => {
    entitiesStub = {
      add: sinon.stub(),
      get: sinon.stub(),
      getByEntityId: sinon.stub(),
    };
    callServiceStub = sinon.stub();
    connectionStub = {
      get: sinon.stub().returns({
        callService: callServiceStub,
      }),
    };
    Entity = proxyquire('../../../../src/class/base/Entity', {
      '../../lib/entities.js': entitiesStub,
      '../../lib/connection.js': connectionStub,
    });
  });

  describe('constructor()', () => {

    it('Throws if identifier is not a string', () => {
      try {
        const config = {
          identifier: 123,
          entityId: 'id',
          domain: 'domain',
        };
        // eslint-disable-next-line no-unused-vars
        const e = new Entity(config);
      } catch(err) {
        expect(err.message).to.match(/identifier/).and.to.match(/string/);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Throws if entityId is not a string', () => {
      try {
        const config = {
          identifier: 'fancy',
          entityId: 123,
          domain: 'domain',
        };
        // eslint-disable-next-line no-unused-vars
        const e = new Entity(config);
      } catch(err) {
        expect(err.message).to.match(/entityId/).and.to.match(/string/);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Throws if domain is not a string', () => {
      try {
        const config = {
          identifier: 'fancy',
          entityId: 'id',
          domain: 123,
        };
        // eslint-disable-next-line no-unused-vars
        const e = new Entity(config);
      } catch(err) {
        expect(err.message).to.match(/entityId/).and.to.match(/string/);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Saves identifier and domain to root', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const e = new Entity(config);
      expect(e.identifier).to.equal('fancy');
      expect(e.domain).to.equal('domain');
    });

    it('Saves identifier and domain to root', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const e = new Entity(config);
      expect(e.identifier).to.equal('fancy');
      expect(e.domain).to.equal('domain');
    });

    it('Correctly builds final entityId', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const e = new Entity(config);
      expect(e.entityId).to.equal('domain.id');
    });

    it('Throws if an entity with the same ID is already in the entity cache', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      // eslint-disable-next-line no-unused-vars
      const first = new Entity(config);
      try {
        entitiesStub.getByEntityId.returns('exists');
        // eslint-disable-next-line no-unused-vars
        const second = new Entity(config);
      } catch(err) {
        expect(err.message).to.match(/more than one/);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Adds instance to entity cache', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const e = new Entity(config);
      expect(entitiesStub.add.firstCall.args[0]).to.equal(e);
    });

  });

  describe('setState()', () => {

    it('Assigns state', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const e = new Entity(config);
      e.setState({
        state: 'fancy state',
        attributes: { fancy: true },
        last_changed: '2023-09-24T21:58:06.307784+00:00',
        last_updated: '2023-09-25T01:06:00.214177+00:00',
      });
      expect({
        state: e.state,
        attributes: e.attributes,
        lastChange: e.lastChange,
        lastUpdate: e.lastUpdate,
      }).to.matchSnapshot();
    });

  });

  describe('processStateChange()', () => {

    it('Assigns state and calls handleStateChange', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const e = new Entity(config);
      e.handleStateChange = sinon.stub();
      e.processStateChange({
        new_state: {
          state: 'fancy state',
          attributes: { fancy: true },
          last_changed: '2023-09-24T21:58:06.307784+00:00',
          last_updated: '2023-09-25T01:06:00.214177+00:00',
        },
        old_state: {
          state: 'decrepit state',
        },
      });
      expect({
        state: e.state,
        previousState: e.previousState,
        attributes: e.attributes,
        lastChange: e.lastChange,
        lastUpdate: e.lastUpdate,
        event: e.event,
      }).to.matchSnapshot();
      expect(e.handleStateChange.called).to.be.true;
    });

  });

  describe('State change handlers', () => {

    it('Can set and trigger multiple handlers', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const handler1 = sinon.stub();
      const handler2 = sinon.stub();
      const e = new Entity(config);
      e.onStateChange(handler1);
      e.onStateChange(handler2);
      e.handleStateChange();
      expect(handler1.firstCall.args[0]).to.equal(e);
      expect(handler2.firstCall.args[0]).to.equal(e);
    });

  });

  describe('callService()', () => {

    it('Works', () => {
      const config = {
        identifier: 'fancy',
        entityId: 'id',
        domain: 'domain',
      };
      const e = new Entity(config);
      e.callService({ fancy: true });
      expect(connectionStub.get.called).to.be.true;
      expect(callServiceStub.firstCall.args[0]).to.deep.equal({
        domain: 'domain',
        fancy: true,
      });
    });

  });

});
