import { createPortal } from "react-dom";
import { FaUpload } from "react-icons/fa6";
import { useRef, useState,useEffect } from "react";
import { MyError, MyButton } from "../../custom/";
import { useUser } from "../context/UserContext";
export default function CreateModalPost({ scale }) {
  const {user}=useUser()
  const inputFileRef = useRef(null);
  const [content, setContent] = useState(null);
  const [contentError, setContentError] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const selectFiles = (event) => {
    event.preventDefault();
    inputFileRef.current.click();
    try {
      
    } catch (error) {
      
    }
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    setContent(value);
    if (value.length >= 1000) {
      setContentError("Max length of content");
    }
  };

const contentHandler=()=>{
  if(!content){
    setContentError('Content should be filled!')
    setFormValid(false)
  }
}

useEffect(()=>{
if(!content||content.length>1000){
  setFormValid(false)
}else{
  setFormValid(true)
  setContentError(null)
}
},[content])


  return createPortal(
    <div
      className={`inset-0 fixed flex justify-center items-center bg-black/80  transition-all ease-in-out duration-300 ${
        scale ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <form className="new-post-modal flex justify-center items-center flex-col bg-[var(--bg-primary)] w-195 h-165 rounded-xl p-5 font-semibold border-2 border-[var(--text-secondary)]">
        <input
          accept="image/*,.video/*"
          multiple
          ref={inputFileRef}
          type="file"
          name=""
          id=""
          hidden
        />
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
        <div className="flex flex-col justify-center items-center  gap-2.5">
          {contentError ? (
            <MyError anyError={contentError} setAnyError={setContentError} />
          ) : null}
          <span className="flex flex-col justify-center items-start m-1 text-xl font-semibold">
            <label htmlFor="content">The content of your post</label>
            <textarea
              required={true}
              id="content"
              onChange={handleContentChange}
              onBlur={contentHandler}
              className="outline-none resize-none w-120 h-45 p-1.5 border-2 rounded-lg border-[var(--border-color)] transition-all focus:border-blue-600"
              placeholder="Write something"
              maxLength={1000}
            ></textarea>
          </span>
          <MyButton formValid={formValid} width="w-1/1">Create a post</MyButton>
        </div>
      </form>
    </div>,
    document.body
  );
}