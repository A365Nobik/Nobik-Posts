import { useState } from "react";
import { createPortal } from "react-dom";

export default function PostPictureModal({ postInfo, photoIndex ,scale}) {
  console.log(postInfo)
  console.log(photoIndex)
  return createPortal(
    <>
      <div className={`inset-0 fixed flex justify-center items-center bg-black/80  transition-all ease-in-out duration-300 ${scale?"scale-100 opacity-100":"scale-95 opacity-0"}`}>
        <div className="picture-modal bg-[var(--bg-secondary)] w-120 h-50">
          <img src="" alt="" />
        </div>
      </div>
    </>,
    document.body
  );
}
