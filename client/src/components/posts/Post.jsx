import defaultAvatar from "../../../public/default-avatar.png";
import { FaClock } from "react-icons/fa6";
import { dateFormatter } from "../custom/functions/date-formatter";
import PostPicture from "./PostPicture";

export default function Post({ post }) {
  return (
    <div className="bg-[var(--bg-secondary)] border-2 flex flex-col justify-center rounded-md p-1">
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
      </div>
      {post?.thumbnail ? <PostPicture pictures={post?.thumbnail} /> : null}
      <div className="m-1 flex justify-center items-center overflow-auto text-left text-xl font-semibold">
        <p>{post?.content}</p>
      </div>
    </div>
  );
}
