import defaultAvatar from "../../assets/default-avatar.png";
import { FaClock } from "react-icons/fa6";
import { Options } from "../custom/";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { dateFormatter } from "../custom/";
import { PostThumbnails } from "./";

export default function Post({ post }) {
  const { user } = useUser();
  const apiUrl = import.meta.env.VITE_API_URL;

  const deletePost = async () => {
    try {
      const request = await axios.delete(
        `${apiUrl}/delete-post/${post.id}/${user.id}`
      );
      console.log(request);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] border-2 flex flex-col justify-center rounded-md p-1 w-full">
      <div className="flex justify-start items-center gap-1 m-1 w-max h-max cursor-pointer">
        <img
          src={post?.avatar ? post?.avatar : defaultAvatar}
          alt="authorAvatar"
          className="rounded-full w-12.5 h-12.5 object-cover"
        />
        <div className="flex flex-col justify-center items-start">
          <a className="font-semibold text-xl text-left transition-colors hover:text-blue-500">
            {post?.login}
          </a>
          <span className="flex justify-center items-center gap-1 text-center font-medium">
            <FaClock />
            <p className="text-[var(--text-secondary)]">
              {dateFormatter(post?.created_at)}
            </p>
          </span>
        </div>
        <Options
          isAuthor={user?.id === post?.author_id}
          deletePost={deletePost}
        />
      </div>
      {post?.thumbnails ? <PostThumbnails files={post?.thumbnails} /> : null}
      <div className="m-1 flex justify-center items-center overflow-auto text-left text-xl font-semibold">
        <p>{post?.content}</p>
      </div>
    </div>
  );
}
