const { expect } = require('chai');
const Room = require('../../../../src/class/group/Room');

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
      const entity1 = { identifier: 'fancy' };
      const entity2 = { identifier: 'plain' };
      const room = new Room({
        identifier: 'fancy room',
        entities: [entity1, entity2],
      });
      expect(room.entityMap.get('fancy')).to.deep.equal(entity1);
      expect(room.entityMap.get('plain')).to.deep.equal(entity2);
    });

  });

  describe('addEntity()', () => {

    it('Adds an entity', () => {
      const config = { identifier: 'fancy room' };
      const room = new Room(config);
      const entity = { identifier: 'fancy' };
      room.addEntity(entity);
      expect(room.entityMap.get('fancy')).to.deep.equal(entity);
    });

    it('Saves config', () => {
      const roomConfig = { identifier: 'fancy room' };
      const room = new Room(roomConfig);
      const entity = { identifier: 'fancy' };
      const config = { fancy: true };
      room.addEntity(entity, config);
      expect(room.configMap.get('fancy')).to.deep.equal(config);
    });

    it('Throws if no entity supplied', () => {
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

    it('Throws if no identifier supplied', () => {
      const config = { identifier: 'fancy room' };
      const room = new Room(config);
      try {
        room.addEntity({});
      } catch(err) {
        expect(err.message).to.match(/identifier/);
        return;
      }
      throw new Error('Should not succeed');
    });

  });

  describe('getEntity()', () => {

    it('Gets entity by identitifer', () => {
      const config = { identifier: 'fancy room' };
      const room = new Room(config);
      const entity = { identifier: 'fancy' };
      room.addEntity(entity);
      const foundEntity = room.getEntity('fancy');
      expect(room.entityMap.get('fancy')).to.deep.equal(foundEntity);
    });

    it('Throws if no identifier supplied', () => {
      const config = { identifier: 'fancy room' };
      const room = new Room(config);
      const entity = { identifier: 'fancy' };
      room.addEntity(entity);
      try {
        room.getEntity();
      } catch(err) {
        expect(err.message).to.match(/required/);
        return;
      }
      throw new Error('Should not succeed');
    });

  });

});
