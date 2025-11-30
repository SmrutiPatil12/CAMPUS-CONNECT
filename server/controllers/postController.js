// server/controllers/postController.js
import Post from "../models/Post.js";
import { createGlobalNotification } from "../utils/createNotification.js";


// Fake user (replace later with real auth)
const FAKE_USER_ID = "66f8a1b2c3d4e5f607182930";
const FAKE_USER_NAME = "You";

// ──────────────────────────────────────
// CREATE POST
// ──────────────────────────────────────
export const createPost = async (req, res) => {
  try {
    const { content, category } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ msg: "Content is required" });
    }

    const post = await Post.create({
      user: FAKE_USER_ID,
      content: content.trim(),
      category: category || "General Discussion",
    });

    // ADD NOTIFICATION
    await createGlobalNotification(
      `New post in ${post.category}: "${post.content.substring(0, 50)}${post.content.length > 50 ? "..." : ""}"`,
      "post",
      "/community"
    );

    res.status(201).json({
      _id: post._id,
      user: FAKE_USER_NAME,
      content: post.content,
      category: post.category,
      likes: 0,
      time: "Just now",
    });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ──────────────────────────────────────
// GET POSTS + STATS
// ──────────────────────────────────────
export const getPosts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

    // Count posts per category
    const counts = await Post.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const categoryCounts = {
      "General Discussion": 0,
      "Doubts & Help": 0,
      "Project Showcase": 0,
      "Tech News": 0,
    };

    counts.forEach(c => {
      if (categoryCounts.hasOwnProperty(c._id)) {
        categoryCounts[c._id] = c.count;
      }
    });

    // Trending topics (simple word frequency + likes boost)
    const wordMap = {};
    posts.forEach(p => {
      const words = p.content.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
      words.forEach(w => {
        wordMap[w] = (wordMap[w] || 0) + 1 + (p.likes || 0);
      });
    });

    const trendingTopics = Object.entries(wordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

    const formattedPosts = posts.map(p => ({
      _id: p._id,
      user: p.user.toString() === FAKE_USER_ID ? FAKE_USER_NAME : "Student",
      content: p.content,
      category: p.category,
      likes: p.likes || 0,
      time: formatTime(p.createdAt),
    }));

    res.json({
      posts: formattedPosts,
      categoryCounts,
      trendingTopics: trendingTopics.length > 0 ? trendingTopics : ["No trends yet"],
    });
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ──────────────────────────────────────
// LIKE POST
// ──────────────────────────────────────
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.likes += 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Helper: time ago
function formatTime(date) {
  const diff = Date.now() - new Date(date);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}