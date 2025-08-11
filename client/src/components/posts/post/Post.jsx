import { PostThumbnails } from "../";
import defaultAvatar from "../../../assets/default-avatar.png";
import { FaClock } from "react-icons/fa6";
import { dateFormatter } from "../../custom/";
import { Options } from "../../custom/";
import { PostOptionsModal } from "../../modal";

export default function Post({ post, index }) {
  return (
    <div className="bg-[var(--bg-secondary)] border-2 flex flex-col justify-center rounded-md w-full">
      <div className={`inset-0 relative post-card${index}`}>
        <div className="flex justify-between items-center gap-1 m-1 w-full h-max">
          <div className="flex justify-start items-center gap-1.5 m-1 w-max h-max cursor-pointer">
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
          <div className="mr-10">
            <Options>
              <PostOptionsModal index={index} post={post} />
            </Options>
          </div>
        </div>
        {post?.thumbnails ? <PostThumbnails files={post?.thumbnails} /> : null}
        {post?.content !== "null" ? (
          <div className="block m-1 font-semibold">
            <p className="text-left text-xl ">{post?.content}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
