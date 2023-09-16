import Joi from 'joi';

class Home {

  constructor() {
    this.rooms = new Map();
  }

  addRoom(room) {
    this.rooms.set(room.identifier, room);
  }

}

export default Home;
