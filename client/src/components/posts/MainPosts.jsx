import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Post, CreatePost, initialPost } from "./";

export default function MainPosts() {
  const [posts, setPosts] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getPosts = useCallback(async () => {
    try {
      const request = await axios.get(`${apiUrl}/posts`);
      console.log(request.data);
      setPosts(initialPost);
    } catch (error) {
      console.log(error);
      setPosts(initialPost);
      cosnole.log(posts);
    }
  }, [apiUrl]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="h-screen w-200 fixed flex flex-col justify-center items-center gap-2.5">
      <CreatePost />
      {posts?.map((post, index) => {
        // console.table(post);
        return <Post key={index} post={post} />;
      })}
    </div>
  );
}
