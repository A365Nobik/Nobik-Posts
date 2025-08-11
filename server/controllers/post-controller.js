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
      const { author_id, content } = req.body;
      const files = req.files;
      const newPost =await PostService.createNewPost(author_id, content, files);
      res.status(200).json(newPost);
    } catch (error) {
      console.log(colors.bgRed("Create Post Error:", error));
      res.status(400).json(error.message);
    }
  }
  async deletePost(req, res) {
    try {
      const { id, author_id } = req.params;
      const deletedPost =await PostService.deletedPost(id, author_id);
      res.status(200).json(deletedPost);
    } catch (error) {
      console.log(colors.bgRed("Delete Posts Error:", error));
      res.status(400).json(error.message);
    }
  }
}

export const PostController = new PostControllerClass();
