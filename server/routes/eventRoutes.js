import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/create", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;