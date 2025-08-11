export default function LoadingPosts() {
  return (
    <div className="bg-[var(--bg-secondary)] border-2 flex flex-col justify-center rounded-md p-1 w-full">
      <div className="flex justify-start items-center gap-1 m-1 w-max h-max">
        <div className="rounded-full w-12.5 h-12.5 animate-pulse bg-[var(--bg-primary)]"></div>
        <div className="flex flex-col justify-center items-start gap-1 w-25">
          <div className="w-full h-5 animate-pulse bg-[var(--bg-primary)] rounded-md"></div>
          <span className="flex justify-center items-center gap-1 w-full h-5">
            <div className="w-5 h-full p-2.5 animate-pulse bg-[var(--bg-primary)] rounded-md"></div>
            <div className="w-full h-full animate-pulse bg-[var(--bg-primary)] rounded-md"></div>
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-250 h-80 animate-pulse bg-[var(--bg-primary)] rounded-md"></div>
      </div>
      <div className="flex flex-col justify-center items-start gap-1 my-1">
        <div className="w-145 h-5 animate-pulse bg-[var(--bg-primary)] rounded-md"></div>
        <div className="w-100 h-5 animate-pulse bg-[var(--bg-primary)]  rounded-md"></div>
        <div className="w-55 h-5 animate-pulse bg-[var(--bg-primary)]  rounded-md"></div>
      </div>
    </div>
  );
}
