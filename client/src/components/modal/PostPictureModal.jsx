import { createPortal } from "react-dom";

export default function PostPictureModal({ info }, pictureInfo) {
  return createPortal(
    <>
      <div className="inset-0 fixed flex justify-center items-center bg-black/80 duration-400">
        <div className="picture-modal bg-[var(--)]">
          <img src={pictureInfo} alt="" />
        </div>
      </div>
    </>,
    document.body
  );
}
