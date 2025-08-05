import { MdLightMode, MdDarkMode } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ThemeModal({ scale }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const chosedTheme = useRef([]);
  const liClasses =
    "flex justify-start items-center w-full px-1 py-0  border-2 rounded-md hover:bg-[var(--bg-secondary)]";
  const bgColorChange = (clickedIndex) => {
    chosedTheme.current.forEach((element, index) => {
      if (element) {
        if (index === clickedIndex) {
          element.classList.add("bg-[var(--bg-secondary)]");
        } else {
          element.classList.remove("bg-[var(--bg-secondary)]");
        }
      }
    });
  };

  useEffect(() => {
    switch (theme) {
      case "system":
        bgColorChange(1);
        break;

      case "dark":
        bgColorChange(2);
        break;
      case "light":
        bgColorChange(3);
        break;
    }
  }, [theme]);

  const handleSystemTheme = () => {
    bgColorChange(1);
    setTheme("system");
  };
  const handleDarkTheme = () => {
    setTheme("dark");
    bgColorChange(2);
  };
  const handleLightTheme = () => {
    setTheme("light");
    bgColorChange(3);
  };
  return createPortal(
    <>
      <ul
        className={`theme-modal fixed top-12.5 right-53.5 min-2xl:right-21 flex flex-col justify-center items-start bg-[var(--bg-primary)] w-35 p-1 border-2 rounded-md text-xl font-semibold gap-0.5 transition-all ease-in-out duration-300 ${scale?"scale-100 opacity-100":"scale-95 opacity-0"}`}
      >
        <li
          ref={(event) => (chosedTheme.current[1] = event)}
          className={liClasses}
          onClick={handleSystemTheme}
        >
          <CgDarkMode />
          <p>System</p>
        </li>
        <li
          ref={(event) => (chosedTheme.current[2] = event)}
          className={liClasses}
          onClick={handleDarkTheme}
        >
          <MdDarkMode />
          <p>Dark</p>
        </li>
        <li
          ref={(event) => (chosedTheme.current[3] = event)}
          className={liClasses}
          onClick={handleLightTheme}
        >
          <MdLightMode />
          <p>Light</p>
        </li>
      </ul>
    </>,
    document.body
  );
}
