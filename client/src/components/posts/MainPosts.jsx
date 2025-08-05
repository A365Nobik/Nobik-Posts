import { IoMdAdd } from "react-icons/io";
import PostPictureModal from "../modal/PostPictureModal";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import defaultAvatar from "../../../public/default-avatar.png";
import { FaClock } from "react-icons/fa6";
import { dateFormatter } from "../custom/functions/date-formatter";

export default function MainPosts() {
  const [pictureModal, setPictureModal] = useState(false);
  const [pictureInfo, setPictureInfo] = useState(null);
  const [posts, setPosts] = useState(null);

  const handlePictureClick = (event) => {
    setPictureModal(true);
    console.log(event);
    setPictureInfo(event.target);
  };

  const apiUrl = import.meta.env.VITE_API_URL;
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
  }, [pictureModal, handlePictureModalClose]);
  const getPosts = useCallback(async () => {
    try {
      const request = await axios.get(`${apiUrl}/posts`);
      console.log(request.data);
      setPosts(request.data);
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  console.log(posts);
  return (
    <>
      {posts?.map((post) => {
        console.table(post);
        return (
          <>
            {pictureModal ? (
              <PostPictureModal info={""} pictureInfo={pictureInfo} />
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
                    src={post.avatar ? post.avatar : defaultAvatar}
                    alt="authorAvatar"
                    className="rounded-full w-12.5 h-12.5 object-cover"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <a className="font-semibold text-xl text-left transition-colors hover:text-blue-500">
                      {post.login}
                    </a>
                    <span className="flex justify-center items-center gap-1 text-centerfont-medium">
                      <FaClock />
                      <p className="text-[var(--text-secondary)]">
                        {dateFormatter(post.created_at)}
                      </p>
                    </span>
                  </div>
                </div>
                <div
                  className={`grid grid-cols-3 justify-center items-center gap-0 p-0`}
                >
                  {post.thumbnail?.map((element, index) => {
                    return (
                      <div
                        key={index}
                        onClick={(event) => handlePictureClick(event)}
                        className="m-1 cursor-pointer picture justify-center items-center flex"
                      >
                        <img
                          className="object-cover"
                          src={element}
                          alt={index}
                        />
                      </div>
                    );
                  })}
                </div>
                <p>{post.content}</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
