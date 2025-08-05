import colors from "colors";
import { PostServise } from "../services/post-service.js";

class PostControllerClass {
  async getAllPosts(req, res) {
    try {
      const posts = await PostServise.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.log(colors.bgRed("Get All Posts Error:", error));
      res.status(400).json(error.message);
    }
  }
}

export const PostController = new PostControllerClass();
