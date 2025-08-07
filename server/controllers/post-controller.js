import colors from "colors";
import { PostService } from "../services/post-service.js";

class PostControllerClass {
  async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.log(colors.bgRed("Get All Posts Error:", error));
      res.status(400).json(error.message);
    }
  }
  async createPost(req, res) {
    try {
      const {author_id,content}=req.body
      console.log(req.body)
      const files = req.files
      const newPost = PostService.createNewPost(author_id,content,files)
    } catch (error) {
      console.log(colors.bgRed("Get All Posts Error:", error));
      res.status(400).json(error.message);
    }
  }
}

export const PostController = new PostControllerClass();
