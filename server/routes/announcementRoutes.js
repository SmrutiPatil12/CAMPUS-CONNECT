import express from "express";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router.get("/", getAnnouncements);
router.post("/", createAnnouncement);
router.put("/:id", updateAnnouncement);        // ← PUT for update
router.delete("/:id", deleteAnnouncement);     // ← DELETE

export default router;