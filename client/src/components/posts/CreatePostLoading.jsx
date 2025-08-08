export default function CreatePostLoading() {
  return (
    <div className="w-full flex justify-center items-center bg-[var(--bg-secondary)] p-1  mt-2 rounded-md">
      <div className="flex justify-center items-center gap-1.5 p-1.5 rounded-lg w-42.5">
        <div className="w-7.5 h-7.5 bg-[var(--bg-primary)] animate-pulse rounded-md"></div>
        <div className="w-full h-7.5 bg-[var(--bg-primary)] animate-pulse rounded-md"></div>
      </div>
    </div>
  );
}
