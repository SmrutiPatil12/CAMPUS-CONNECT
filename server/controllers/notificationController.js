import Notification from "../models/Notification.js";

// Get all notifications for a user (global + personal)
export const getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;

    const notifications = await Notification.find({
      $or: [
        { userId: null },      // Global notifications
        { userId: userId }     // Personal notifications
      ]
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (err) {
    console.error("getNotifications error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Mark single notification as read
export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notif) {
      return res.status(404).json({ msg: "Notification not found" });
    }

    res.json(notif);
  } catch (err) {
    console.error("markAsRead error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Optional: Create notification manually (for testing)
export const createNotification = async (req, res) => {
  try {
    const { message, type = "general", link = "" } = req.body;

    const notif = await Notification.create({
      userId: null,
      message,
      type,
      link
    });

    res.status(201).json(notif);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create notification" });
  }
};