import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { IoIosCopy } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { MdReport, MdEdit, MdDelete } from "react-icons/md";

export default function Options({ isAuthor, deletePost }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(0);
  const liClass =
    "flex justify-start items-center w-full px-1 py-0  rounded-md hover:bg-[var(--bg-secondary)]";

  const handleClick = () => {
    if (open) {
      setScale(0);
      setTimeout(() => {
        setOpen(false);
      }, 300);
    } else {
      setOpen(true);
      setTimeout(() => {
        setScale(100);
      }, 10);
    }
  };

  const handleOptionClose = (event) => {
    if (!event.target.closest(".options")) {
      setScale(0);
      setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  const handleOptionCloseKey = (event) => {
    if (event.key === "Escape") {
      setScale(0);
      setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.addEventListener("keydown", handleOptionCloseKey);
      document.body.addEventListener("click", handleOptionClose);
    }
    return () => {
      document.body.removeEventListener("keydown", handleOptionCloseKey);
      document.body.removeEventListener("click", handleOptionClose);
    };
  });

  return (
    <div className="options flex flex-col justify-center items-start ">
      <SlOptions
        onClick={handleClick}
        className="text-2xl p-1 rounded-full transition-colors hover:bg-[var(--bg-primary)]"
      />
      {open && (
        <ul
          className={`flex flex-col justify-start items-start bg-[var(--bg-primary)] p-1 border-2 rounded-md text-lg font-semibold gap-0.5  transition-all ease-in-out duration-300 ${
            scale ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <li className={liClass}>
            <IoIosCopy />
            <p>Copy link</p>
          </li>
          <li className={liClass}>
            <IoBookmarks />
            <p>Add to favorites</p>
          </li>
          {!isAuthor ? (
            <li className={liClass}>
              <MdReport />
              <p>Report</p>
            </li>
          ) : (
            <>
              <hr className="w-full" />
              <li className={liClass}>
                <MdEdit />
                <p>Edit</p>
              </li>
              <li onClick={deletePost} className={liClass}>
                <MdDelete />
                <p>Delete</p>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
