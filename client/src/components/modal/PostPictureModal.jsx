import { useState } from "react";
import { createPortal } from "react-dom";

export default function PostPictureModal({ info, photoIndex }) {
  return createPortal(
    <>
      <div className="inset-0 fixed flex justify-center items-center bg-black/80 duration-400">
        <div className="picture-modal bg-[var(--bg-secondary)] w-120 h-50">
          <img src="" alt="" />
        </div>
      </div>
    </>,
    document.body
  );
}
