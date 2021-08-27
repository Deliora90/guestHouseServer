export default class RoomDto {
  type;
  number;
  dateIn;
  dateOut;
  amountPerson;
  cost;
  withFood;
  constructor(typeRoom, room) {
    this.type = typeRoom;
    this.number = room.number;
    this.dateIn = room.dateIn;
    this.dateOut = room.dateOut;
    this.amountPerson = room.amountPerson;
    this.cost = room.cost;
    this.withFood = room.withFood;
  }
}
