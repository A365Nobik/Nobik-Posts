export default function BasicForm({
  children,
  customStyleWrapp,
  customStyleMain,
}) {
  return (
    <>
      <div
        className={`${
          customStyleMain ? customStyleMain : "w-screen h-screen"
        } flex justify-center items-center`}
      >
        <div
          className={`bg-[var(--bg-secondary)] shadow-2xl flex flex-col justify-center items-center  rounded-md ${customStyleWrapp}`}
        >
          <form className="h-full flex flex-col justify-center items-center gap-1.5 font-semibold text-[var(--text-primary)]">
            {children}
          </form>
        </div>
      </div>
    </>
  );
}
