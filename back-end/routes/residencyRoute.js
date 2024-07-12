import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyController.js";
import jwtCheck from "../config/Auth0Config.js";

const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/allresdencies", getAllResidencies);
router.get("/:id", getResidency);

export default router;
