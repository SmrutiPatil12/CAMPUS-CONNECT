import Event from "../models/Event.js";
import { createGlobalNotification } from "../utils/createNotification.js";

// GET ALL EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE EVENT — NO createdBy
export const createEvent = async (req, res) => {
  const { title, date, description } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and date are required" });
  }

  try {
    const newEvent = new Event({
      title,
      date,
      description: description || "",
    });
    const saved = await newEvent.save();

    // ADD NOTIFICATION
    await createGlobalNotification(
      `New event: ${saved.title} on ${new Date(saved.date).toLocaleDateString()}`,
      "event",
      "/events"
    );

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};