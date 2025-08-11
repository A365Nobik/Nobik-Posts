import { useState, useEffect, useCallback } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
export default function FileCarousel({ filesTaken, setTakenFiles }) {
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState(() => [...filesTaken]);

  const nextPhoto = useCallback(() => {
    setIndex((prev) => {
      const nextIdex = prev + 1;
      return nextIdex > files.length - 1 ? 0 : nextIdex;
    });
  }, [files]);
  const prevPhoto = useCallback(() => {
    setIndex((prev) => {
      const prevIdex = prev - 1;
      return prevIdex < 0 ? files.length - 1 : prevIdex;
    });
  }, [files]);

  const deletePhoto = useCallback(
    (idx) => {
      const newFiles = files.filter((_, index) => index != idx);
      setFiles(newFiles);
      setTakenFiles(newFiles);
      if (files.length === 0) {
        setIndex(0);
      } else {
        setIndex((prevIndex) => Math.min(prevIndex, newFiles.length - 1));
      }
    },
    [files, setTakenFiles]
  );

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
  return (
    <div className="relative flex justify-center items-center w-75 h-60">
      {files?.[index]?.type?.includes("image/") ? (
        <img
          width={300}
          height={240}
          className="w-full h-full object-contain rounded"
          src={URL.createObjectURL(files?.[index])}
          alt={`file-${index}`}
        />
      ) : null}
      {files[index]?.type?.includes("video/") ? (
        <video
          controls
          src={URL.createObjectURL(files[index])}
          className="w-full h-full object-contain rounded"
        />
      ) : null}
      <button
        onClick={() => deletePhoto(index)}
        className="absolute right-2 top-1/4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors close-btn"
      >
        <IoClose className="text-2xl" />
      </button>
      {files.length > 1 && (
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
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 p-1 rounded-xl">
            {files.map((_, idx) => (
              <span
                onClick={() => setIndex(idx)}
                key={idx}
                className={`w-2 h-2 rounded-full transition-transform hover:scale-110 select-none ${
                  idx === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
