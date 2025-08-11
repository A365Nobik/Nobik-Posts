import { createPortal } from "react-dom";
import { IoIosCopy } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { MdReport, MdEdit, MdDelete } from "react-icons/md";
import { useUser } from "../../../context/UserContext";
import axios from "axios";

export default function PostOptionsModal({ post, scale,index }) {
  const { user } = useUser();
  const isAuthor = user.id === post.author_id;
  const apiUrl = import.meta.env.VITE_API_URL;
  const liClass =
    "flex justify-start items-center w-full px-1 py-0  rounded-md hover:bg-[var(--bg-secondary)]";

  const deletePost = async () => {
    try {
      const request = await axios.delete(
        `${apiUrl}/delete-post/${post.id}/${user.id}`
      );
      console.log(request);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
    <ul
      className={`absolute -right-1/6 ${!isAuthor?"top-1/3 -translate-y-1/1":"top-1/4 -translate-y-1/2"} flex flex-col justify-start items-start bg-[var(--bg-primary)] p-1 border-2 rounded-md text-lg font-semibold gap-0.5 transition-all ease-in-out duration-300 ${
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
    </ul>,
    document.querySelector(`.post-card${index}`)
  );
}
