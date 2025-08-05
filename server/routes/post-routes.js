import { Router } from "express";
import { PostController } from "../controllers/post-controller.js";
const router = new Router();

router.get("/posts", PostController.getAllPosts);

export default router;
