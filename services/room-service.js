import TypeRoom from "../models/type-room.js";
import ApiError from "../exceptions/api-error.js";
import mailService from "./mail-service.js";
import UserModel from "../models/user.js";
import TypeDto from "../dtos/type-dto.js";
import RoomDto from "../dtos/room-dto.js";
import FileService from "./file-service.js";

class RoomService {

  getAmountOfFreeRoom(rooms, inputDateIn, inputDateOut) {
    let result = 0;
    if (rooms && rooms.length > 0) {
      result = rooms.reduce((prev, room) => {
        const dateIn = room.dateIn ? new Date(room.dateIn) : null;
        const dateOut = room.dateOut ? new Date(room.dateOut) : null;
        if ((!dateIn && !dateOut)
          || (dateIn > inputDateIn && dateIn >= inputDateOut)
          || (inputDateOut > dateOut && inputDateIn >= dateOut)) {
          prev += 1;
        }
        return prev;
      }, 0);
    }
    return result;
  }
  getSumWithoutFood(room, amountPerson) {
    const { cost, additionalCost } = room;
    let result = cost;
    if (amountPerson > 1) {
      const additionalCostSum = additionalCost * amountPerson;
      result = cost + additionalCostSum;
    }
    return result;
  }
  getSumWithFood(room, amountPerson) {
    const { costFood } = room;
    const costSumWithoutFood = this.getSumWithoutFood(room, amountPerson);
    const costFoodSum = costFood * amountPerson;
    return costSumWithoutFood + costFoodSum;
  }
  async getAll(dateIn, dateOut, amountPerson) {
    let result = [];
    const inputDateIn = new Date(dateIn);
    const inputDateOut = new Date(dateOut);

    const types = await TypeRoom.find();
    if (types && types.length > 0) {
      result = types.map((type) => {
        if (type.maxGuests >= amountPerson) {
          const amount = this.getAmountOfFreeRoom(type.rooms, inputDateIn, inputDateOut);
          const costWithoutFood = this.getSumWithoutFood(type, amountPerson);
          const costWithFood = this.getSumWithFood(type, amountPerson);
          type.amountFree = amount;
          type.sumWithoutFood = costWithoutFood;
          type.sumWithFood = costWithFood;
          return type;
        }
      })
      .filter((el) => el)
      .map((el) => new TypeDto(el));
    }
    return {rooms: result};
  }
  async createTypeRoom(type) {
    const createType = await TypeRoom.create(type);
    return createType;
  }
  async addPictureRoom(room, files) {
    const { typeId } = room;
    const typeRoom = await TypeRoom.findOne({ _id: typeId });

    if(!typeRoom) {
      throw ApiError.BadRequest("Такой тип комнаты не найден");
    }
    if(files.mainPicture) {
      const fileName = FileService.saveFiles(files.mainPicture);
      typeRoom.mainPicture = fileName;
    }
    if(files.photos) {
      const photosName = FileService.saveFiles(files.photos);
      typeRoom.photos = photosName;
    }
    const updateType = await TypeRoom.updateOne({ _id: typeId }, typeRoom);
    return updateType;
  }
  async bookRoom(typeId, userId, dateIn, dateOut, amountPerson, withFood) {
    const typeRoom = await TypeRoom.findOne({ _id: typeId });
    const user = await UserModel.findOne({ _id: userId});
    if (!typeRoom
      || !user
      || !userId
      || !dateIn
      || !dateOut
      || !amountPerson
      || !typeRoom.rooms
      || typeRoom.rooms.length <= 0) {
      throw ApiError.BadRequest("Ошибка при бронировании номера");
    }

    const { rooms, type, descriptions } = typeRoom;
    const cost = withFood ? this.getSumWithFood(typeRoom, amountPerson) : this.getSumWithoutFood(typeRoom, amountPerson);
    const roomIndex = rooms.findIndex((room) => !room.dateId && !room.dateOut);
    if (roomIndex === -1) {
      throw ApiError.BadRequest("Нет свободных номеров");
    }
    rooms[roomIndex].dateIn = dateIn;
    rooms[roomIndex].dateOut = dateOut;
    rooms[roomIndex].amountPerson = amountPerson;
    rooms[roomIndex].user = userId;
    rooms[roomIndex].cost = cost;
    rooms[roomIndex].withFood = withFood;
    typeRoom.rooms = rooms;
    typeRoom.save();
    await mailService.sendBookingInfo(user.email, type, descriptions, dateIn, dateOut, amountPerson, cost, withFood);
    const response = new RoomDto(typeRoom.type, rooms[roomIndex]);
    return response;
  }
  async unbookRoom(userId, roomId) {
    if (!userId
      || !roomId) {
      throw ApiError.BadRequest("Ошибка при передаче данных для отмены бронирования");
    }
    const type = await TypeRoom.findOne({rooms: {$elemMatch: { user: userId, _id: roomId}}});
    if (!type
      || !type.rooms
      || type.rooms.length <= 0) {
      throw ApiError.BadRequest("Ошибка при отмене бронирования номера");
    }
    const { rooms } = type;
    const roomIndex = rooms.findIndex((room) => room._id == roomId && room.user == userId);
    if (roomIndex === -1) {
      throw ApiError.BadRequest("Нет введеного номера");
    }
    rooms[roomIndex].dateIn = undefined;
    rooms[roomIndex].dateOut = undefined;
    rooms[roomIndex].amountPerson = undefined;
    rooms[roomIndex].user = undefined;
    rooms[roomIndex].cost = undefined;
    rooms[roomIndex].withFood = undefined;
    type.rooms = rooms;
    return type.save();
  }
}

export default new RoomService();
