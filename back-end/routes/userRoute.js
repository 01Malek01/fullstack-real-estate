import express from "express";
import {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  toFav,
  getAllFav,
} from "../controllers/userController.js";
import jwtCheck from "../config/Auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:resdId", jwtCheck, bookVisit);
router.post("/cancelBooking/:resdId", jwtCheck, cancelBooking);
router.post("/allBookings", jwtCheck,getAllBookings);
router.post("/toFav/:resdId", jwtCheck, toFav);
router.post("/allFav", jwtCheck, getAllFav);

export default router;
