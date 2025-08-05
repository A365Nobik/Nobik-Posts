import { IoMdAdd } from "react-icons/io";

export default function CreatePost() {
  return (
    <div className="w-full flex justify-center items-center bg-[var(--bg-secondary)] p-1  mt-2 rounded-md">
      <span className="flex justify-center items-center font-semibold p-1.5 rounded-lg transition-all hover:bg-[var(--bg-primary)] hover:text-blue-400 active:scale-90">
        <IoMdAdd className="text-2xl" />
        <button className="text-xl">Create a post</button>
      </span>
    </div>
  );
}
