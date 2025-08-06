import { useEffect, useCallback, useState } from "react";
import PostPictureModal from "../modal/PostPictureModal";

export default function PostPicture({ pictures }) {
  const [photoIndex, setPhotoIndex] = useState(null);
  const [pictureModal, setPictureModal] = useState(false);
  const [scale, setScale] = useState(100);

  const picturesHandler = useCallback((pictures) => {
    const length = pictures.length;
    switch (length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-2";
    }
  }, []);

  const handlePictureClick = (event, index) => {
    setPhotoIndex(index);
    setPictureModal(true);
    setTimeout(() => {
      setScale(100);
    }, 10);
  };

  const handlePictureModalClose = useCallback((event) => {
    if (
      !event.target.closest(".picture-modal") &&
      !event.target.closest(".picture")
    ) {
      setScale(0);
      setTimeout(() => {
        setPictureModal(false);
      }, 300);
    }
  }, []);
  const handlePictureModalCloseKey = (event) => {
    if (event.key === "Escape") {
      setScale(0);
      setTimeout(() => {
        setPictureModal(false);
      }, 300);
    }
  };
  useEffect(() => {
    if (pictureModal) {
      document.addEventListener("keydown", handlePictureModalCloseKey);
    }
    return () =>
      document.addEventListener("keydown", handlePictureModalCloseKey);
  }, [pictureModal, handlePictureModalClose]);

  //   useEffect(() => {
  //     if (pictures) {
  //       picturesHandler(pictures);
  //     }
  //   }, []);
  return (
    <>
      {pictureModal ? (
        <PostPictureModal
          pictures={pictures}
          photoIndex={photoIndex}
          scale={scale}
        />
      ) : null}
      <div
        className={`grid ${picturesHandler(
          pictures
        )} justify-center items-center gap-0 p-0`}
      >
        {pictures.map((picture, index) => {
          const photoIndex = index;
          return (
            <div
              key={index}
              onClick={(event) => handlePictureClick(event, photoIndex)}
              className="m-1 cursor-pointer picture justify-center items-center flex"
            >
              <img className="object-cover   w-100 h-80" src={picture} alt={`Post picture`} loading='lazy' />
            </div>
          );
        })}
      </div>
    </>
  );
}
