const { expect } = require('chai');
const Room = require('../../../../src/class/group/Room');
const entities = require('../../../../src/lib/entities');

describe('Room class', () => {

  describe('constructor()', () => {

    it('Throws if no identifier supplied', () => {
      try {
        new Room();
      } catch(err) {
        expect(err.message).to.match(/identifier/);
        return;
      }
      throw new Error('Should not succeed');
    });

    it('Stores supplied identifier', () => {
      const room = new Room({ identifier: 'fancy room' });
      expect(room.identifier).to.equal('fancy room');
    });

    it('Adds entities supplied in config', () => {
      const entity1 = {
        identifier: 'fancy entity 1',
        entityId: 'fancy id 1',
        fancy: true,
      };
      entities.add(entity1);
      const entity2 = {
        identifier: 'fancy entity 2',
        entityId: 'fancy id 2',
        fancy: true,
      };
      entities.add(entity2);
      const room = new Room({
        identifier: 'fancy room',
        entities: [entity1.identifier, entity2.identifier],
      });
      expect(room.entityMap.get('fancy entity 1')).to.deep.equal(entity1);
      expect(room.entityMap.get('fancy entity 2')).to.deep.equal(entity2);
    });

  });

  describe('addEntity()', () => {

    it('Adds an entity', () => {
      const entity = {
        identifier: 'fancy entity',
        entityId: 'fancy id',
        fancy: true,
      };
      entities.add(entity);
      const config = { identifier: 'fancy room' };
      const room = new Room(config);
      room.addEntity('fancy entity');
      expect(room.entityMap.get('fancy entity')).to.deep.equal(entity);
    });

    it('Saves config', () => {
      const entity = {
        identifier: 'fancy entity',
        entityId: 'fancy id',
        fancy: true,
      };
      entities.add(entity);
      const roomConfig = { identifier: 'fancy room' };
      const room = new Room(roomConfig);
      const config = { fancy: true };
      room.addEntity('fancy entity', config);
      expect(room.configMap.get('fancy entity')).to.deep.equal(config);
    });

    it('Throws if no identifier supplied', () => {
      const config = { identifier: 'fancy room' };
      const room = new Room(config);
      try {
        room.addEntity();
      } catch(err) {
        expect(err.message).to.match(/required/);
        return;
      }
      throw new Error('Should not succeed');
    });

  });

});
