import express from "express";
import {
  getMemories,
  getMemoriesBySearch,
  getMemoriesByCreator,
  getMemoriesById,
  updateMemory,
  likePost,
  commentPost,
  deletePost,
  createMemory,
} from "../controllers/memories.js";
import  singleUpload from "../middleware/multer.js";
const router = express.Router();
import auth from "../middleware/verifytoken.js";

router.get("/creator", getMemoriesByCreator);
router.get("/search", getMemoriesBySearch);
router.get("/", getMemories);
router.get("/:id", getMemoriesById);

router.post("/", auth, singleUpload, createMemory);
router.patch("/:id", auth, singleUpload, updateMemory);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost",auth, commentPost);
export default router;
