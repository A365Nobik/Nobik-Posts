import { IoMdAdd } from "react-icons/io";
import { CreateModalPost } from "../modal/posts";
import { useState, useEffect } from "react";

export default function CreatePost() {
  const [scale, setScale] = useState(0);
  const [modal, setModal] = useState(false);

  const handleModalClick = () => {
    setModal(true);
    setTimeout(() => {
      setScale(100);
    }, 300);
  };

  const handleModalClose = (event) => {
    if (
      !event.target.closest(".new-post-modal") &&
      !event.target.closest(".create-button") &&
      !event.target.closest(".error")&&
      !event.target.closest(".close-btn")
    ) {
      setScale(0);
      setTimeout(() => {
        setModal(false);
      }, 300);
    }
  };

  const handleModalCloseKey = (event) => {
    if (event.key === "Escape") {
      setScale(0);
      setTimeout(() => {
        setModal(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.addEventListener("click", handleModalClose);
      document.body.addEventListener("keydown", handleModalCloseKey);
    }
    return () => {
      document.body.removeEventListener("click", handleModalClose);
      document.body.removeEventListener("keydown", handleModalCloseKey);
    };
  }, [modal]);
  return (
    <>
      {modal ? <CreateModalPost scale={scale} /> : null}
      <div className="w-full flex justify-center items-center bg-[var(--bg-secondary)] p-1 mt-2 rounded-md">
        <button
          onClick={handleModalClick}
          className="text-xl flex justify-center items-center font-semibold p-1.5 rounded-lg transition-all hover:bg-[var(--bg-primary)] hover:text-blue-400 active:scale-90 create-button"
        >
          <IoMdAdd className="text-2xl" />
          Create a post
        </button>
      </div>
    </>
  );
}
