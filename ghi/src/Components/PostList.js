import Fisherman from "./assets/fishermanforum.jpg";
import { useState, useEffect } from "react";

export default function PostList() {
  // const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   const response = await fetch("http://localhost:8000/api/posts");
  //   if (response.ok) {
  //     const data = await response.json();
  //     setPosts(data);
  //   }
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <div
      className="forum-container bg-center bg-no-repeat bg-cover w-full mt-[-80px] pt-[80px] md:pt-40 lg:pt-60 pb-20 md:pb-40 lg:pb-60 px-4 sm:px-8 lg:px-40 text-center text-white mx-auto my-auto"
      style={{
        backgroundImage: `url(${Fisherman})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="forum-item bg-black bg-opacity-50 rounded-3xl justify-center items-center p-6 sm:p-10 mx-auto my-auto mt-10 mb-10"
        style={{ maxWidth: "750px", maxHeight: "300px" }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 lg:mb-8">
          THE POND IS QUIET...
        </h1>
        <div className="text-lg sm:text-xl pb-4">
          <p>Be the first Hooked member to share their adventure!</p>
        </div>
        <button className="bg-gray-500 text-sm sm:text-base rounded-xl p-3 sm:p-4 font-bold hover:bg-hooked m-4">
          <a href="/forum/new">Submit</a>
        </button>
      </div>
    </div>
  );
}
