import db from "../db/db.js";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../index.js";

class PostServiceClass {
  bucket = "posts-thumbnails";
  async getAllPosts() {
    const posts = await db.query(`SELECT posts.id
,posts.content
,posts.thumbnails
,posts.author_id
,posts.created_at
,users.login
,users.avatar
FROM posts 
JOIN users ON posts.author_id = users.id
ORDER BY posts.created_at DESC;`);

    return posts.rows.map(({ password, ...post }) => post);
  }

  async createNewPost(author_id, content, files) {
    const postId = uuidv4();
    const uploadedPromise = files.map(async (file, idx) => {
      try {
        const extension = file.mimetype.split("/")[1];
        const type = file.mimetype.split("/")[0];
        const name = `${postId}/${type + idx}/${extension}`;
        const { data, error } = await supabase.storage
          .from(this.bucket)
          .upload(name, file.buffer, {
            contentType: file.mimetype,
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw new Error(error);
        }
        const {
          data: { publicUrl },
        } = supabase.storage.from("posts-thumbnails").getPublicUrl(name);
        return publicUrl;
      } catch (error) {
        throw error;
      }
    });
    const filesUrl = await Promise.all(uploadedPromise);
    const newPost = await db.query(
      "INSERT INTO posts (id,content,thumbnails,author_id) values($1,$2,$3,$4) RETURNING *",
      [postId, !content ? " " : content, filesUrl, author_id]
    );
    return newPost.rows[0];
  }
  async deletedPost(id, author_id) {
    const postCandidate = await db.query("SELECT * FROM posts WHERE id=$1", [
      id,
    ]);
    if (!postCandidate.rows[0]) {
      throw new Error("Post is not found!");
    }
    if (postCandidate.rows[0].author_id !== author_id) {
      throw new Error("You can't delete this post!");
    }
    const files = postCandidate.rows[0].thumbnails;
    if (postCandidate.rows[0].thumbnails.length > 0) {
      const filesUrls = files.map((file) => file.split("/").slice(8).join("/"));
      try {
        const { data, error } = await supabase.storage
          .from(this.bucket)
          .remove(filesUrls);
        if (error) {
          throw new Error(error);
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    const deletedPost = await db.query("DELETE FROM posts WHERE id=$1", [id]);
    return deletedPost.rows[0];
  }
}

export const PostService = new PostServiceClass();
