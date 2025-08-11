import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function PostPictureModal({
  pictures,
  photoIndex,
  scale,
  postInfo,
}) {
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
          <div className="picture-modal flex justify-between w-320 h-240">
            <div className="flex justify-center items-center relative select-none">
              {pictures[index].includes("image") ||
              pictures[index].includes("gif") ? (
                <img
                  className="w-full h-full aspect-auto rounded-tl-2xl rounded-bl-2xl"
                  src={pictures[index]}
                  alt={`Post picture`}
                  loading="lazy"
                />
              ) : (
                <video
                  controls
                  className="w-full h-full aspect-video rounded-tl-xl rounded-tb-xl"
                  src={pictures[index]}
                  alt={`Post picture`}
                  loading="lazy"
                />
              )}
              {pictures.lenght > 1 && (
                <>
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
                </>
              )}
            </div>
            <div className="w-max h-full flex flex-col bg-[var(--bg-primary)] rounded-tr-2xl  rounded-br-2xl">
              <div className="flex justify-start items-center gap-1.5">
                <div className="rounded-full w-12.5 h-12.5 animate-pulse bg-[var(--bg-secondary)]"></div>
              </div>
            </div>
          </div>
        </div>
    </>,
    document.body
  );
}
