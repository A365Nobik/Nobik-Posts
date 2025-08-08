import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Post,
  CreatePost,
  CreatePostLoading,
  initialPost,
  LoadingPosts,
} from "./";
import { AiOutlineLoading } from "react-icons/ai";

export default function MainPosts() {
  const [posts, setPosts] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getPosts = useCallback(async () => {
    try {
      const request = await axios.get(`${apiUrl || "172.16.0.2:4200"}/posts`);
      console.log(request.data);
      setPosts(request.data);
    } catch (error) {
      console.log(error);
      setPosts(initialPost);
    }
  }, [apiUrl]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    if (!posts) {
      document.body.classList.remove("overflow-y-auto");
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");

      document.body.classList.add("overflow-y-auto");
    }
  }, [posts]);

  return (
    <div className="h-screen w-200 flex flex-col gap-2 items-center">
      {!posts ? <CreatePostLoading /> : <CreatePost />}
      {!posts && new Array(3).fill(0).map((_,idx) => <LoadingPosts key={idx}/>)}
      {posts?.map((post, index) => {
        // console.table(post);
        return <Post key={index} post={post} />;
      })}
    </div>
  );
}
