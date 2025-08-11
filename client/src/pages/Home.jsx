import Greeting from "../components/Greeting";
import { useUser } from "../context/UserContext";
import { PostsComponent } from "../components/posts";
export default function Home() {
  const { user } = useUser();
  return (
    <>
    <title>Home</title>
      {!user ? (
        <Greeting />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <PostsComponent />
        </div>
      )}
    </>
  );
}
