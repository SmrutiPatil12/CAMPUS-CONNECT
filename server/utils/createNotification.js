// server/utils/createNotification.js
import Notification from "../models/Notification.js";

export const createGlobalNotification = async (message, type = "general", link = "") => {
  try {
    const notif = await Notification.create({
      userId: null,
      message,
      type,
      link
    });
    console.log("NOTIFICATION CREATED:", notif.message);
  } catch (err) {
    console.error("FAILED TO CREATE NOTIFICATION:", err);
  }
};