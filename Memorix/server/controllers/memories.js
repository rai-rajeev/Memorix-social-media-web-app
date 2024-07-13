import express from "express";
import mongoose from "mongoose";
import { Memory } from "../models/memories.js";
import streamifier from "streamifier";
const router = express.Router();
import cloudinary from "../middleware/cloudinary.js";
import { error } from "console";

export const getMemories = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const memoriesToBeSkipped = (Number(page) - 1) * LIMIT; // get the how many memories to skip

    const total = await Memory.countDocuments({});
    const Memories = await Memory.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(memoriesToBeSkipped);

    return res.json({
      data: Memories,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getMemoriesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const Memories = await Memory.find({
      $or: [{ title: title }, { tags: { $in: tags.split(",") } }],
    });

    return res.json({ data: Memories });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getMemoriesByCreator = async (req, res) => {
  const { name } = req.query;

  try {
    const Memories = await Memory.find({ name: name });

    return res.json({ data: Memories });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getMemoriesById = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  try {
    const post = await Memory.findById(id);
    if (!post) return res.status(404).send("Not found");
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createMemory = (req, res) => {
  const newMemory = req.body;
  console.log(newMemory);

  if (!req.userId) {
    return res.status(401).send("Unauthenticated");
  }

  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const createdMemory = new Memory({ ...newMemory, creator: req.userId });

  // Determine the resource type for Cloudinary
  const resourceType = createdMemory.isVideo ? "video" : "image";

  const upload_stream = cloudinary.uploader.upload_stream(
    { resource_type: resourceType },
    async (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }

      createdMemory.selectedFile = result.secure_url;

      try {
        await createdMemory.save();
        return res.status(201).json(createdMemory);
      } catch (error) {
        return res.status(409).json({ message: error.message });
      }
    }
  );

  console.log("logging file buffer", req.file);
  streamifier.createReadStream(req.file.buffer).pipe(upload_stream);
};

export const updateMemory = async (req, res) => {
  const id = req.params.id;
  const updatingData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Memory with id: ${id}`);
  const updatingMemory = await Memory.findById(id);
  if (!updatingMemory) return res.send(404).send("Memory not found");
  if (req.userId != updatingMemory.creator)
    return res.status(403).send("Unauthorized ");

  if (req.file) {
    const resourceType = updatingData.isVideo ? "video" : "image";
    const upload_stream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      async (error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        updatingData.selectedFile = result.secure_url;
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(upload_stream);
  }
  try {
    const updatedMemory = await Memory.findByIdAndUpdate(id, updatingData, {
      new: true,
    });
    return res.status(201).json(updatedMemory);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const deletingMemory = await Memory.findById(id);
  if (!deletingMemory) return res.status(404).send("Not Found");
  if (req.userId === deletingMemory.creator) {
    await Memory.findByIdAndDelete(id);

    return res.status(200).json({ message: "Post deleted successfully." });
  } else {
    return res.status(403).send("unauthorised access");
  }
};

export const likePost = async (req, res) => {
  const id = req.params.id;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Memory.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Memory.findByIdAndUpdate(id, post, { new: true });

  return res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const id = req.params.id;
  const { value } = req.body;
  console.log(value);
  if (!req.userId) return res.status(401).send("unauthenticated");
  const post = await Memory.findById(id);
  post.comments.push(value);
  post.save();
  return res.status(200).json(post);
};
export default router;
