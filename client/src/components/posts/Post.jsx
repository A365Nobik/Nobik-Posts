import defaultAvatar from "../../../public/default-avatar.png";
import { FaClock } from "react-icons/fa6";
import { dateFormatter } from "../custom/functions/date-formatter";
import PostPictureModal from "../modal/PostPictureModal";
import PostPicture from "./PostPicture";
import { useState, useEffect, useCallback } from "react";

export default function Post({ post }) {
  const [photoIndex, setPhotoIndex] = useState(null);
  const [pictureModal, setPictureModal] = useState(false);
  const [scale, setScale] = useState(100);

  const handlePictureClick = (event, index) => {
    setPhotoIndex(index);
    setPictureModal(true);
    setTimeout(() => {
      setScale(100);
    }, 10);
  };

  const handlePictureModalClose = useCallback((event) => {
    if (
      !event.target.closest(".picture-modal") &&
      !event.target.closest(".picture")
    ) {
      setScale(0);
      setTimeout(() => {
        setPictureModal(false);
      }, 300);
    }
  }, []);
  const handlePictureModalCloseKey = (event) => {
    if (event.key === "Escape") {
      setScale(0);
      setTimeout(() => {
        setPictureModal(false);
      }, 300);
    }
  };
  useEffect(() => {
    if (pictureModal) {
      document.addEventListener("keydown", handlePictureModalCloseKey);
    }
    return () =>
      document.addEventListener("keydown", handlePictureModalCloseKey);
  }, [pictureModal, handlePictureModalClose]);
  return (
    <>
      {pictureModal ? (
        <PostPictureModal
          postInfo={post}
          photoIndex={photoIndex}
          scale={scale}
        />
      ) : null}
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
            <span className="flex justify-center items-center gap-1 text-centerfont-medium">
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
    </>
  );
}
