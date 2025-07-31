import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import ThemeModal from "../modal/ThemeModal";

export default function NavBar() {
  const [userLogin, setUserLogin] = useState(false);
  const [inputACtive, setInputActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (user && typeof user === "object") setUserLogin(true);
  }, [user]);

  const handleModal = (event) => {
    if (event.type === "keydown" && event.key === "Escape") {
      setModalOpen(false);
    } else if (event.type === "click") {
      setModalOpen(!modalOpen);
    }
  };

  return (
    <>
      <header className="w-full flex justify-around items-center p-2 border-b-2 bg-[var(--bg-secondary)] font-semibold text-[var(--text-)]">
        <div
          className={`flex justify-center items-center bg-[var(--bg-primary)] p-1 rounded-md text-lg transition-colors border-2 border-[var(--border-color)] ml-100 ${
            inputACtive ? "border-blue-500" : "border"
          }`}
        >
          <input
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            type="text"
            className="outline-0 w-75 placeholder:text-[var(--text-primary)]"
            placeholder="Find post by name"
          />
          <FaSearch className="transition-transform active:scale-80 m-1" />
        </div>
        <ul className="flex justify-center items-center gap-2.5">
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

        <input ref={checkboxRef} hidden name="checkbox" type="checkbox" />
        <button
          onClick={(event) => handleModal(event)}
          className="flex justify-center items-center 
          text-xl border-2 focus:border-blue-600 p-1  rounded-md hover:bg-[var(--bg-primary)]"
        >
          <CgDarkMode />
          Theme
        </button>
        {modalOpen ? <ThemeModal /> : ""}
      </header>
    </>
  );
}
