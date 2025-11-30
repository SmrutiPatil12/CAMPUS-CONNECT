import express from "express";
import {
  getNotifications,
  markAsRead,
  createNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/create", createNotification);     // optional for testing
router.get("/:userId", getNotifications);
router.put("/read/:id", markAsRead);

export default router;