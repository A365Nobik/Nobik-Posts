import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function PostPictureModal({ pictures, photoIndex, scale }) {
  const [index, setIndex] = useState(photoIndex);

  const nextPhoto = useCallback(() => {
    setIndex((prev) => {
      const nextIdex = prev + 1;
      return nextIdex > pictures.length - 1 ? 0 : nextIdex;
    });
  }, [pictures]);

  const prevPhoto = useCallback(() => {
    setIndex((prev) => {
      const prevIdex = prev - 1;
      return prevIdex < 0 ? pictures.length - 1 : prevIdex;
    });
  }, [pictures]);
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
        className={`inset-0 fixed flex justify-center items-center bg-black/80 transition-all ease-in-out duration-300 ${
          scale ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="picture-modal bg-[var(--bg-secondary)] w-320 h-200 rounded-2xl">
          <div className="flex justify-center items-center relative">
            <img
              className="object-contain w-320 h-200 rounded-tl-2xl rounded-bl-2xl -translate-x-1/4"
              src={pictures[index]}
              alt=""
            />
          <button
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <IoIosArrowBack className="text-2xl" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <IoIosArrowBack className="rotate-180 text-2xl" />
          </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
