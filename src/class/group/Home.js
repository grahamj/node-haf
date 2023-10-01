const Joi = require('joi');

class Home {

  constructor() {
    this.rooms = new Map();
  }

  addRoom(room) {
    Joi.assert(room, Joi.object({
      identifier: Joi.string().required(),
    }).unknown());
    this.rooms.set(room.identifier, room);
  }

  addRooms(rooms) {
    rooms.forEach(this.addRoom.bind(this));
  }

}

module.exports = Home;
