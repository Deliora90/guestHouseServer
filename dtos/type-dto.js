export default class TypeDto {
  typeId;
  type;
  descriptions;
  mainPicture;
  square;
  sleepingPlaces;
  maxGuests;
  equipment;
  payment;
  photos;
  amountFree;
  sumWithoutFood;
  sumWithFood;

  constructor(typeRoom) {
    this.typeId = typeRoom._id;
    this.type = typeRoom.type;
    this.descriptions = typeRoom.descriptions;
    this.mainPicture = typeRoom.mainPicture;
    this.square = typeRoom.square;
    this.sleepingPlaces = typeRoom.sleepingPlaces ;
    this.maxGuests = typeRoom.maxGuests;
    this.equipment = typeRoom.equipment;
    this.payment = typeRoom.payment;
    this.photos = typeRoom.photos;
    this.amountFree = typeRoom.amountFree;
    this.sumWithoutFood = typeRoom.sumWithoutFood;
    this.sumWithFood = typeRoom.sumWithFood;
  }
}
