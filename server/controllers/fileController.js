// server/controllers/fileController.js
import File from "../models/File.js";
import { createGlobalNotification } from "../utils/createNotification.js";
import fs from "fs";
import path from "path";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newFile = new File({
      fileName: req.file.originalname,
      filePath: req.file.path,
      size: req.file.size,
      type: req.file.mimetype,
      uploadedBy: req.body.uploadedBy || "Guest"
    });

    await newFile.save();

    const fileData = {
      _id: newFile._id,
      name: newFile.fileName,
      size: (newFile.size / (1024 * 1024)).toFixed(2) + " MB",
      uploaded: new Date(newFile.createdAt).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
      }),
      downloadUrl: `http://localhost:3200/uploads/${req.file.filename}`
    };

    // ADD NOTIFICATION
    await createGlobalNotification(
      `New file uploaded: ${newFile.fileName}`,
      "file",
      "/files"
    );

    res.status(201).json({ message: "Success", file: fileData });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
export const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });

    const formatted = files
      .filter(f => f.filePath && typeof f.filePath === "string") // ← THIS SAVES YOU
      .map(f => ({
        _id: f._id,
        name: f.fileName || "Unknown File",
        size: f.size ? (f.size / (1024 * 1024)).toFixed(2) + " MB" : "Unknown",
        uploaded: new Date(f.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        }),
        downloadUrl: `http://localhost:3200/uploads/${path.basename(f.filePath)}`
      }));

    res.json(formatted);
  } catch (err) {
    console.error("getFiles error:", err);
    res.status(500).json({ message: "Failed to load files", error: err.message });
  }
};


export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "Not found" });

    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }
    await file.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};