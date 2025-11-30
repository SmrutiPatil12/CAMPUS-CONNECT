import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  // createdBy REMOVED COMPLETELY
});

export default mongoose.model("Event", eventSchema);