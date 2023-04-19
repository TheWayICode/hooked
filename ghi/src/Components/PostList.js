import Fisherman from "./assets/fishermanforum.jpg";
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";

export default function PostList() {
  async function isImageURL(url) {
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;
    return urlRegex.test(url);
  }

  const [posts, setPosts] = useState([]);
  const { token } = useToken();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8000/api/posts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    }
    fetchPosts();
  }, [token]);

  if (posts.lengths === 0) {
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
  } else {
    return (
      <div
        className="forum-container bg-center bg-no-repeat bg-cover w-full mt-[-80px] pt-[80px] md:pt-40 lg:pt-60 pb-20 md:pb-40 lg:pb-60 px-4 sm:px-8 lg:px-40 mx-auto my-auto"
        style={{
          backgroundImage: `url(${Fisherman})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="forum-item bg-black bg-opacity-50 rounded-3xl justify-center items-center p-6 sm:p-10 mx-auto my-auto mt-10 mb-40"
          style={{ maxWidth: "850px", maxHeight: "450px" }}
        >
          <h1 className="text-white text-center text-3xl sm:text-3xl lg:text-4xl font-bold mb-5 lg:mb-8">
            Explore the newest <br />
            adventures from the <br />
            Hooked community!
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {posts.map((post) => {
            return (
              <div
                className="bg-hooked rounded-xl shadow-lg m-5 p-5 w-96"
                key={post.id}
              >
                <div className="relative h-64 bg-gray-200 text-center font-bold items-center mx-auto my-auto">
                  {!post.picture_url ||
                  (!post.picture_url.match(/\.(jpeg|jpg|gif|png)$/) &&
                    !isImageURL(post.picture_url)) ? (
                    <div className="flex justify-center items-center h-full">
                      <span className="text-3xl p-2 font-bold text-gray-500">
                        No picture available
                      </span>
                    </div>
                  ) : (
                    <img
                      src={post.picture_url}
                      alt=""
                      className="w-full h-full object-cover p-8"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-blue-400 bg-opacity-75 text-white text-lg">
                    {post.fish}
                  </div>
                </div>
                <div className="font-bold mt-2 text-white">
                  Location: {post.location}
                </div>
                <div className="font-bold mt-2 text-white">
                  Name: {post.fish}
                </div>
                <div className="font-bold mt-2 text-white">
                  Description: {post.description}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="fixed bottom-0 right-0 m-12 p-2 bg-blue-400 text-white font-bold rounded-full shadow-lg hover:bg-hooked"
        >
          {isExpanded ? (
            <Link to="/forum/new">
              <span className="block w-6 h-6 border-2 border-white rounded-full transform"></span>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 text-white bg-blue-400 rounded-lg text-md pointer-events-none transition-opacity duration-400">
                Have a new catch? Add to community forum!
              </span>
            </Link>
          ) : (
            <span className="block w-6 h-6 border-2 border-white rounded-full "></span>
          )}
        </button>
      </div>
    );
  }
}
