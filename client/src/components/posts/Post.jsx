import defaultAvatar from "../../assets/default-avatar.png";
import { FaClock } from "react-icons/fa6";
import {Options} from "../custom/"

import { dateFormatter } from "../custom/";
import PostPicture from "./PostPicture";
import { useUser } from "../../context/UserContext";
export default function Post({ post }) {
  const { user } = useUser();
  const options=["hello","dumbass"]
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
        <Options options={options}/>
      </div>
      {post?.thumbnails ? <PostPicture pictures={post?.thumbnails} /> : null}
      <div className="m-1 flex justify-center items-center overflow-auto text-left text-xl font-semibold">
        <p>{post?.content}</p>

        {user.id === post.author_id && <h1>Hello</h1>}
      </div>
    </div>
  );
}
