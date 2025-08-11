import {MyButton} from "../components/custom/";

export default function Greeting() {
  return (
    <div className="h-screen flex justify-center items-center w-screen">
      <div className="h-120 max-md:w-150 flex flex-col justify-center items-center shadow-2xl rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold ">
        <h1 className="text-3xl font-bold">Welcome to Nobik-Posts!</h1>
        <h3 className="text-xl w-2/3 text-center">
          We're introdusing the app in which You can make a posts and publish
          them
        </h3>
        <MyButton formValid={true}>
          <a href="/sign-up">Let's get started</a>
        </MyButton>
      </div>
    </div>
  );
}
