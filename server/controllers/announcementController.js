import Announcement from "../models/Announcement.js";
import { createGlobalNotification } from "../utils/createNotification.js";

// GET all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};

// CREATE new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    const saved = await newAnnouncement.save();

    // ADD NOTIFICATION
    await createGlobalNotification(
      `New announcement: ${saved.title || "Check it out!"}`,
      "announcement",
      "/announcements"
    );

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

// UPDATE announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // ← This returns the updated doc
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(updatedAnnouncement);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update announcement" });
  }
};

// DELETE announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
    // Or send back deletedAnnouncement if you want
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};