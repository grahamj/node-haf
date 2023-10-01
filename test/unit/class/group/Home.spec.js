const { expect } = require('chai');
const Home = require('../../../../src/class/group/Home');

describe('Home class', () => {

  describe('addRoom()', () => {

    it('Adds a room', () => {
      const home = new Home();
      const room = { identifier: 'fancy' };
      home.addRoom(room);
      expect(home.rooms.get('fancy')).to.deep.equal(room);
    });

  });

  describe('addRooms()', () => {

    it('Adds rooms', () => {
      const home = new Home();
      const room1 = { identifier: 'fancy' };
      const room2 = { identifier: 'plain' };
      home.addRooms([room1, room2]);
      expect(home.rooms.get('fancy')).to.deep.equal(room1);
      expect(home.rooms.get('plain')).to.deep.equal(room2);
    });

  });

});
