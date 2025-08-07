import db from "../db/db.js";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabase/client.js";

class PostServiceClass {
  primaryPosts = new Map();
  async getAllPosts() {
    const posts = await db.query(`SELECT posts.id
,posts.content
,posts.thumbnail
,posts.author_id
,posts.created_at
,users.login
,users.avatar
FROM posts 
full JOIN users ON posts.author_id = users.id;`);
    return posts.rows.map(({ password, ...post }) => post);
  }

  async createNewPost(author_id, files, content) {
    const postId = uuidv4();
    this.primaryPosts.set(postId, {
      postId: postId,
      author_id: author_id,
      content: content,
    });
  }
}

export const PostService = new PostServiceClass();
