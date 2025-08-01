import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MyButton({ formValid, handleClick, doing, children }) {
  return (
    <button
    type="submit"
      disabled={!formValid}
      onClick={handleClick}
      className={`w-[347px] h-10 text-2xl p-1 mt-1 rounded-xl text-center flex justify-center items-center gap-2 text-[var(--text-primary)] ${
        !formValid
          ? "bg-green-300 cursor-not-allowed text-[var(--text-secondary)]"
          : "bg-green-600"
      }`}
    >
      {children}
      {doing ? <AiOutlineLoading3Quarters className="animate-spin" /> : ""}
    </button>
  );
}
