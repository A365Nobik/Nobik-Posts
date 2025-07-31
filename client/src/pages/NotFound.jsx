import Button from "../components/MyButton";

export default function NotFound() {
  return (
    <>
      <div className="h-screen flex justify-center items-center font-poppins font-semibold">
        <div className="flex flex-col justify-center items-center bg-[var(--bg-secondary)] shadow-2xl py-4 px-2 rounded-2xl">
          <h1 className="text-4xl text-[var(--text-primary)]">404</h1>
          <p className="text-4xl text-[var(--text-primary)] font-bold">
            Page Not Found!{" "}
          </p>
          <Button formValid={true}>
            <a href="/">Home Page</a>
          </Button>
        </div>
      </div>
    </>
  );
}
