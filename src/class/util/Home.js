class Home {

  constructor() {
    this.rooms = new Map();
  }

  addRoom(room) {
    this.rooms.set(room.identifier, room);
  }

  addRooms(rooms) {
    rooms.forEach(this.addRoom.bind(this));
  }

}

export default Home;
