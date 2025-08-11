import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { cloneElement } from "react";

export default function Options({ children }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(false);

  const handleClick = () => {
    if (open) {
      setScale(false);
      setTimeout(() => {
        setOpen(false);
      }, 300);
    } else {
      setOpen(true);
      setTimeout(() => {
        setScale(true);
      }, 10);
    }
  };

  const handleOptionClose = (event) => {
    if (!event.target.closest(".options")) {
      setScale(false);
      setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  const handleOptionCloseKey = (event) => {
    if (event.key === "Escape") {
      setScale(false);
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
    <div className="options flex flex-col justify-center items-start">
      <SlOptions
        onClick={handleClick}
        className="text-3xl p-1 rounded-full transition-colors hover:bg-[var(--bg-primary)]"
      />
      {open && (
        <div
          className={``}
        >
          {cloneElement(children,{
            scale:scale
          })}
        </div>
      )}
    </div>
  );
}
