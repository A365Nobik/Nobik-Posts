import { Router } from "express";
import { PostController } from "../controllers/post-controller.js";
import multer from "multer";

const router = new Router();
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("You can upload only image or video!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize:5 * 1024* 1024,
    files: 10,
  },
});

router.get("/posts", PostController.getAllPosts);
router.post(
  "/create-post",
  upload.array("files", 10),
  PostController.createPost
);

export default router;
