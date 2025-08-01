import { IoMdAdd } from "react-icons/io";
import initialPost from "./initialPost.json";
import PostPictureModal from "../modal/PostPictureModal";
import { useState, useEffect, useCallback } from "react";
export default function MainPosts() {
  const [pictureModal, setPictureModal] = useState(false);
  const [pictureInfo, setPictureInfo] = useState(null);
  const handlePictureClick = (event) => {
    setPictureModal(true);
    console.log(event);
    setPictureInfo(event.target);
  };
  const handlePictureModalClose = useCallback((event) => {
    if (
      !event.target.closest(".picture-modal") &&
      !event.target.closest(".picture")
    ) {
      setPictureModal(false);
    }
  }, []);
  useEffect(() => {
    if (pictureModal) {
      document.addEventListener("click", handlePictureModalClose);
    }
  }, [pictureModal]);
  return (
    <>
      {pictureModal ? (
        <PostPictureModal info={initialPost} pictureInfo={pictureInfo} />
      ) : (
        ""
      )}
      <div className="h-screen w-200 overflow-auto">
        <div className="flex justify-center items-center bg-[var(--bg-secondary)] p-1  my-1.5 rounded-md">
          <span className="flex justify-center items-center font-semibold p-1.5 rounded-lg transition-all hover:bg-[var(--bg-primary)] hover:text-blue-400 active:scale-90">
            <IoMdAdd className="text-2xl" />
            <button className="text-xl">Create a post</button>
          </span>
        </div>
        <div className="bg-[var(--bg-secondary)] border-2 flex flex-col justify-center rounded-md p-1">
          <div className="flex justify-start items-center gap-1 m-1 w-max h-max cursor-pointer">
            <img
              src={initialPost.authorData[0].avatar}
              alt="authorAvatar"
              className="rounded-full w-12.5 h-12.5"
            />
            <span className="flex flex-col justify-center items-start">
              <a className="font-semibold text-xl text-left transition-colors hover:text-blue-500">
                {initialPost.authorData[0].name}
              </a>
              <p className="font-medium text-[var(--text-secondary)]">
                {initialPost.postData[0].createdAt}
              </p>
            </span>
          </div>
          <ul
            className={` grid-cols-3 grid-rows-3  justify-center items-center gap-0`}
          >
            {initialPost.postData[0].pictures.map((element, index) => {
              return (
                  <li
                    onClick={(event) => handlePictureClick(event)}
                    key={index}
                    className="m-1 w-max cursor-pointer picture"
                  >
                    <img
                      className="object-cover w-50 h-50"
                      src={element}
                      alt={index}
                    />
                  </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
