import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

import ThemeModal from "../../modal/ThemeModal";
export default function NavBar() {
  const [userLogin, setUserLogin] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scale, setScale] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && typeof user === "object") setUserLogin(true);
  }, [user]);

  const handleModalKeydown = useCallback((event) => {
    if (event.type === "keydown" && event.key === "Escape") {
      setScale(0);
      setTimeout(() => {
        setModalOpen(false);
      }, 400);
    }
  }, []);

  const handleModalClose = useCallback((event) => {
    if (
      !event.target.closest(".theme-button") &&
      !event.target.closest(".theme-modal")
    ) {
      setScale(0);
      setTimeout(() => {
        setModalOpen(false);
      }, 300);
    }
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.addEventListener("keydown", handleModalKeydown);
      document.body.addEventListener("click", handleModalClose);
    }
    return () => {
      document.body.removeEventListener("keydown", handleModalKeydown);
      document.body.removeEventListener("click", handleModalClose);
    };
  }, [modalOpen, handleModalKeydown, handleModalClose]);

  const handleModalClick = () => {
    if (modalOpen) {
      setScale(0);
      setTimeout(() => {
        setModalOpen(false);
      }, 400);
    } else {
      setModalOpen(true);
      setTimeout(() => {
        setScale(100);
      }, 10);
    }
  };

  return (
    <>
      <header className="w-full flex justify-around items-center p-2 border-b-2 bg-[var(--bg-secondary)] font-semibold text-[var(--text-)]">
        <GiHamburgerMenu className="hidden text-3xl max-md:visible" />
        <div
          className={`flex justify-center items-center bg-[var(--bg-primary)] p-1 rounded-md text-lg transition-colors border-2 border-[var(--border-color)]  ${
            inputActive ? "border-blue-500" : "border"
          } max-2xl:ml-65 max-xl:ml-35 max-lg:ml-20 max-md:ml-0`}
        >
          <input
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            type="text"
            className="outline-0 w-75 max-md:w-auto placeholder:text-[var(--text-primary)]"
            placeholder="Find post by title"
          />
          <FaSearch className="transition-transform active:scale-80 m-1" />
        </div>
        <ul className="flex justify-center items-center gap-2.5 max-md:hidden">
          <li>
            <a
              className="text-xl transition-colors hover:text-blue-500"
              href="/"
            >
              Home
            </a>
          </li>
          {!userLogin ? (
            <>
              <li>
                <p>|</p>
              </li>
              <li>
                <a
                  className="text-xl transition-colors hover:text-blue-500"
                  href="/sign-up"
                >
                  Register
                </a>
              </li>
              <li>
                <p>|</p>
              </li>
              <li>
                <a
                  className="text-xl transition-colors hover:text-blue-500"
                  href="/sign-in"
                >
                  Login
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <p>|</p>
              </li>
              <li className="text-xl transition-colors hover:text-blue-400">
                <a>Profile</a>
              </li>
              <li>
                <p>|</p>
              </li>
              <li className="text-xl transition-colors hover:text-blue-400">
                <a>Friends</a>
              </li>
            </>
          )}
        </ul>

        <button
          type="button"
          onClick={handleModalClick}
          className="theme-button flex justify-center items-center 
          text-xl border-2 focus:border-blue-600 p-1 rounded-md hover:bg-[var(--bg-primary)]"
        >
          <CgDarkMode />
          Theme
        </button>
        {modalOpen ? <ThemeModal scale={scale} /> : ""}
      </header>
    </>
  );
}
