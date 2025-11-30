// server/models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  message: { type: String, required: true },
  type: { type: String, enum: ["event", "announcement", "file", "post", "general"], default: "general" },
  link: { type: String, default: "" },
  read: { type: Boolean, default: false }
}, { 
  timestamps: true   // ← THIS IS CRITICAL (gives createdAt & updatedAt)
});

export default mongoose.model("Notification", notificationSchema);