import db from "../db/db.js";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabase/client.js";

class PostServiceClass {
  primaryPosts = new Map();
  async getAllPosts() {
    const posts = await db.query(`SELECT posts.id
,posts.content
,posts.thumbnails
,posts.author_id
,posts.created_at
,users.login
,users.avatar
FROM posts 
full JOIN users ON posts.author_id = users.id;`);

    return posts.rows.map(({ password, ...post }) => post);
  }

  async createNewPost(author_id, content, files) {
    const postId = uuidv4();
    this.primaryPosts.set(postId, {
      postId: postId,
      author_id: author_id,
      content: content,
      files: files,
    });
    const uploadedPromice = files.map(async (file, idx) => {
      try {
        const extension = file.mimetype.split("/")[1];
        const name = `${postId}/${idx}/${extension}`;

        const { data, error } = await supabase.storage
          .from("posts-thumbnails")
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
        console.log(error);
        throw error;
      }
    });
    const filesUrl = await Promise.all(uploadedPromice);
    console.log(filesUrl);
    const newPost = await db.query(
      "INSERT INTO posts (id,content,thumbnails,author_id) values($1,$2,$3,$4) RETURNING *",
      [postId, content, filesUrl, author_id]
    );
    return newPost.rows[0];
  }
}

export const PostService = new PostServiceClass();
