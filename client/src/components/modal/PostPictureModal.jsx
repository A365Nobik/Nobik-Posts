import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowBack } from "react-icons/io";
export default function PostPictureModal({ postInfo, photoIndex, scale }) {
  const [index, setIndex] = useState(photoIndex);

  const nextPhoto = useCallback(() => {
    setIndex((prev) => {
      const nextIdex = prev + 1;
      return nextIdex > postInfo.thumbnail.length - 1 ? 0 : nextIdex;
    });
  }, [postInfo]);

  const prevPhoto = useCallback(() => {
    setIndex((prev) => {
      const prevIdex = prev - 1;
      return prevIdex < 0 ? postInfo.thumbnail.length - 1 : prevIdex;
    });
  }, [postInfo]);
  const handlePictureSwitch = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        nextPhoto();
      } else if (event.key === "ArrowLeft") {
        prevPhoto();
      }
    },
    [prevPhoto, nextPhoto]
  );
  useEffect(() => {
    document.addEventListener("keydown", handlePictureSwitch);
    return () => document.removeEventListener("keydown", handlePictureSwitch);
  }, [handlePictureSwitch]);

  return createPortal(
    <>
      <div
        className={`inset-0 fixed flex justify-center items-center bg-black/80  transition-all ease-in-out duration-300 ${
          scale ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="picture-modal  bg-[var(--bg-secondary)] w-320 h-200 rounded-2xl">
          <div className="flex justify-center items-center">
            <div className="relative">
              <img
                className="object-contain  h-200 left-0 rounded-tl-2xl rounded-bl-2xl"
                src={postInfo?.thumbnail[index]}
                alt=""
              />
              <button onClick={() => prevPhoto(index)}>
                <IoIosArrowBack className="text-5xl font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] absolute left-0 translate-y-100" />
              </button>
              <button onClick={() => nextPhoto(index)}>
                <IoIosArrowBack className="rotate-180 text-5xl font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] absolute right-0 translate-y-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
