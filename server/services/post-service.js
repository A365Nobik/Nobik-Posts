import db from "../db/db.js";

class PostServiseClass {
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
}

export const PostServise = new PostServiseClass();
