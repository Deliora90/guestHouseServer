import RoomService from "../services/room-service.js";

class RoomController {
  async createRoom(req, res, next) {
    try {
      const room = await RoomService.createRoom(req.body);
      return res.json(room);
    } catch (err) {
      next(err);
    }
  }
  async createTypeRoom(req, res, next) {
    try {
      const type = await RoomService.createTypeRoom(req.body);
      return res.json(type);
    } catch (err) {
      next(err);
    }
  }
  async addPicturesRoom(req, res, next) {
    try {
      const type = await RoomService.addPictureRoom(req.body, req.files);
      return res.json(type);
    } catch (err) {
      next(err);
    }
  }
  async getAll(req, res, next) {
    try {
      const { dateIn, dateOut, amountPerson } = req.body;
      const rooms = await RoomService.getAll(dateIn, dateOut, amountPerson);
      return res.json(rooms);
    } catch (err) {
      next(err);
    }
  }
  async bookRoom(req, res, next) {
    try {
      const { typeId, dateIn, dateOut, amountPerson, userId, withFood } = req.body;
      const room = await RoomService.bookRoom(typeId, userId, dateIn, dateOut, amountPerson, withFood);
      return res.json(room);
    } catch (err) {
      next(err);
    }
  }
  async unbookRoom(req, res, next) {
    try {
      const { userId, roomId } = req.body;
      const room = await RoomService.unbookRoom(userId, roomId);
      return res.json(room);
    } catch (err) {
      next(err);
    }
  }
  // async getOne(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const room = await RoomService.getOne(id);
  //     res.status(200).json(room);
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
  // }
  // async update(req, res) {
  //   try {
  //     const room = req.body;
  //     const updatedRoom = await RoomService.update(room);
  //     res.status(200).json(updatedRoom);
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
  // }
  // async delete(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const deleteRoom = await RoomService.delete(id);
  //     res.status(200).json(deleteRoom);
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
  // }
}
export default new RoomController();
