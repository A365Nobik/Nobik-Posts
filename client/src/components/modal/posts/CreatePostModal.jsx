import { createPortal } from "react-dom";
import { FaUpload } from "react-icons/fa6";
import { useRef, useState, useEffect } from "react";
import { MyError, MyButton } from "../../custom/";
import { useUser } from "../../../context/UserContext";
import { FileCarousel } from "../../custom/";
import axios from "axios";

export default function CreateModalPost({ scale }) {
  const { user } = useUser();
  const inputFileRef = useRef(null);
  const [content, setContent] = useState(null);
  const [files, setFiles] = useState([]);
  const [contentError, setContentError] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      setContentError("Can't find a user!");
      setFormValid(false);
    }
  }, [user]);

  const selectFiles = (event) => {
    event.preventDefault();
    inputFileRef.current.click();
  };

  const handleFilesChange = (event) => {
    if (event.target.files) {
      const allFiles = Array.from(event.target.files).filter(
        (file) =>
          file.type.includes("image") ||
          file.type.includes("video") ||
          file.type.includes("audio")
      );
      const validFilesSize = allFiles.filter((file) => file.size > 5242880);
      if (validFilesSize.length > 0) {
        setContentError("Files too large! Maximum size is 5 MB");
        setFiles([]);
        event.target.value = "";
        return;
      } else {
        setFiles(allFiles);
      }
    }
  };
  const createPost = async (event) => {
    event.preventDefault();
    setCreatingPost(true);
    setFormValid(false);
    try {
      const formData = new FormData();
      formData.append("author_id", user.id);
      formData.append("content", content);
      files.forEach((file) => formData.append("files", file));
      const request = await axios.post(`${apiUrl}/create-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      location.reload();
      console.log(request);
    } catch (error) {
      setCreatingPost(false);
      setFormValid(true);
      const errorData = error?.response?.data;
      console.log(error);
      if (!errorData) {
        setContentError("Sudden error! Please try again in a few minutes.");
      } else {
        setContentError(error.response.data);
      }
    }
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  useEffect(() => {
    if (!content && files?.length === 0) {
      setFormValid(false);
    } else if (content?.length > 1000) {
      setCreatingPost(false);
      setFormValid(false);
    } else {
      setFormValid(true);
      setContentError(null);
    }
  }, [content, files]);

  return createPortal(
    <div
      className={`inset-0 fixed flex justify-center items-center bg-black/80  transition-all ease-in-out duration-300 ${
        scale ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div className="new-post-modal flex justify-center items-center flex-col bg-[var(--bg-primary)] w-195 h-165 rounded-xl p-5 font-semibold border-2 border-[var(--text-secondary)]">
        <input
          onChange={(event) => handleFilesChange(event)}
          accept="image/*,video/*,audio/*"
          multiple
          ref={inputFileRef}
          type="file"
          hidden
        />
        {files?.length === 0 && (
          <div
            onClick={(event) => selectFiles(event)}
            className="flex flex-col justify-center items-center transition-colors border-2 border- hover:bg-[var(--bg-secondary)] rounded-2xl m-2.5 p-2.5"
          >
            <FaUpload className="text-9xl" />
            <p className="text-2xl m-2.5">Please add a photo or video</p>
            <button className="text-2xl p-1 rounded-lg transition-all border-2 hover:bg-[var(--bg-primary)] active:scale-90">
              Upload from device
            </button>
          </div>
        )}

        {files?.length > 0 && (
          <div className="flex flex-col justify-center items-center m-1.5 gap-1">
            <FileCarousel filesTaken={files} setTakenFiles={setFiles} />
            <button
              onClick={(event) => selectFiles(event)}
              className="text-2xl p-1 rounded-lg transition-all border-2 hover:bg-[var(--bg-primary)] active:scale-90"
            >
              Select another
            </button>
          </div>
        )}
        <form className="flex flex-col justify-center items-center  gap-2.5">
          {contentError ? (
            <MyError anyError={contentError} setAnyError={setContentError} />
          ) : null}
          <span className="flex flex-col justify-center items-start m-1 text-xl font-semibold">
            <label htmlFor="content">The content of your post</label>
            <textarea
              spellCheck
              id="content"
              onChange={handleContentChange}
              className="outline-none resize-none w-120 h-45 p-1.5 border-2 rounded-lg border-[var(--border-color)] transition-all focus:border-blue-600"
              placeholder="Write something"
            ></textarea>
            <div
              id="length"
              className={`w-full flex justify-end items-end text-xl font-semibold ${
                content?.length > 1000 ? "text-red-600 animate-pulse" : ""
              }`}
            >
              {`${content?.length ? content?.length : "0"}/1000`}
            </div>
          </span>
          <MyButton
            handleClick={(event) => createPost(event)}
            formValid={formValid}
            doing={creatingPost}
            width="w-1/1"
          >
            {!creatingPost ? "Create" : null}
          </MyButton>
        </form>
      </div>
    </div>,
    document.body
  );
}
