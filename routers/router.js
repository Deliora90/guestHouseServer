import Router from 'express';
import userController from "../controllers/user-controller.js";
import RoomController from "../controllers/room-controller.js";
import { body } from "express-validator";
// import authMiddleware from "../middlewares/auth-middleware.js";

const router = new Router();

router.post("/registration",
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
//router.get("/users", authMiddleware, userController.getUsers);

router.post('/types', RoomController.createTypeRoom);
router.post('/pictures', RoomController.addPicturesRoom);
router.post('/types/getAll', RoomController.getAll);
router.post('/room/book', RoomController.bookRoom);
router.post('/room/unbook', RoomController.unbookRoom);

export default router;
