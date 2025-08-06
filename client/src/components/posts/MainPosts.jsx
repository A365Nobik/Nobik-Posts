import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Post, CreatePost, initialPost } from "./";
import { AiOutlineLoading } from "react-icons/ai";

export default function MainPosts() {
  const [posts, setPosts] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getPosts = useCallback(async () => {
    try {
      const request = await axios.get(`${apiUrl}/posts`);
      console.log(request.data);
      // setPosts(initialPost);
      setPosts(request.data);
    } catch (error) {
      console.log(error);
      setPosts(initialPost);
    }
  }, [apiUrl]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="h-screen w-200 flex flex-col gap-2 items-center">
      <CreatePost />
      {!posts ?(
        <div className="flex flex-col justify-center items-center gap-1 font-semibold">
          <p className="text-3xl">Please wait the posts are loading</p>
           <AiOutlineLoading className="animate-spin text-2xl"/>
          </div>
      ) : null}
      {posts?.map((post, index) => {
        // console.table(post);
        return <Post key={index} post={post} />;
      })}
    </div>
  );
}
