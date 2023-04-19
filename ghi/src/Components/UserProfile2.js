import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Hooked from "./assets/HookedLogo.png";
import UserBackground from "./assets/UserProfile.png";

function UserProfile() {
  const { token } = useToken();
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  const deleteUserPost = async (id) => {
    const url = `http://localhost:8000/api/posts/${id}`;
    const response = await fetch(url, {
      method: "delete",
      credentials: "include",
    });
    if (response.ok) {
      fetchUserPosts();
    }
  };

  const fetchUserPosts = async () => {
    const url = `http://localhost:8000/api/user/posts/${user.id}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  async function isImageURL(url) {
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;
    return urlRegex.test(url);
  }

  const fetchUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data.account);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  useEffect(() => {
    fetchUserPosts(user.id);
  }, [user]);

  return (
    <div className="bg-[#D4ECDD] flex flex-col mt-[-80px] pt-[80px] w-full bg-cover mx-auto my-auto">
      <div className="bg-black text-center text-white p-60 font-bold">
        Some cover picture
      </div>
      <div className="flex-1 flex flex-grow">
        <div className="w-1/4 bg-[#D4ECDD] border-r-4 border-black flex flex-col items-center">
          <div className="bg-[#22577E] p-6 font-bold w-full text-center">
            {user && (
              <h1 className="mx-auto text-white lg:text-3xl md:text-2xl sm:text-xl text-lg">
                Profile
              </h1>
            )}
          </div>
          <img
            className="h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40 rounded-full my-4 sm:my-5"
            src={Hooked}
            alt=""
          />
          <div className="lg:text-xl md:text-lg sm:text-md xs:text-md text-sm font-semibold text-gray-900 inline-flex py-2 px-1 sm:px-2 md:px-4">
            Name:&nbsp;
            {user && (
              <span key={user.id} value={user.id}>
                {user.name}
              </span>
            )}
          </div>
          <div className="lg:text-xl md:text-lg sm:text-md xs:text-md text-sm font-semibold text-gray-900 inline-flex py-2 px-1 sm:px-2 md:px-4">
            Email:&nbsp;
            {user && (
              <span key={user.id} value={user.id}>
                {user.email}
              </span>
            )}
          </div>
        </div>
        <div className="w-3/4 pb-5 bg-gray-100">
          <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg p-6 font-semibold text-center text-white bg-[#5584AC] mb-5">
            {user && <span>{user.name}'s Posts</span>}
          </h2>
          {!users ? (
            <div className="empty-div"></div>
          ) : (
            <div className="user-posts grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {users.map((post) => {
                return (
                  <div
                    className="bg-white rounded-xl shadow-lg m-5 p-3 sm:p-4 md:p-5 sm:w-80 md:w-96"
                    key={post.id}
                  >
                    <button
                      onClick={() => deleteUserPost(post.id)}
                      className="bg-slate-500 rounded-2xl p-2 mb-2 mx-1 font-semibold text-white"
                    >
                      Delete
                    </button>
                    <div className="text-center font-bold px-2 py-2 bg-[#22577E] bg-opacity-80 text-white text-lg sm:text-xl">
                      {post.fish}
                    </div>
                    <div className="h-48 sm:h-56 md:h-64 bg-[#C4DDFF] text-center font-bold items-center mx-auto my-auto">
                      {!post.picture_url ||
                      (!post.picture_url.match(/\.(jpeg|jpg|gif|png)$/) &&
                        !isImageURL(post.picture_url)) ? (
                        <div className="flex justify-center items-center h-full">
                          <span className="text-lg sm:text-xl p-2 font-bold text-gray-500">
                            No picture available
                          </span>
                        </div>
                      ) : (
                        <img
                          src={post.picture_url}
                          alt=""
                          className="w-full h-full object-cover p-2 sm:p-3"
                        />
                      )}
                    </div>
                    <div className="font-bold mt-2 text-sm sm:text-base">
                      Location: {post.location}
                    </div>
                    <div className="font-bold mt-2 text-sm sm:text-base">
                      Name: {post.fish}
                    </div>
                    <div className="font-bold mt-2 text-sm sm:text-base">
                      Description: {post.description}
                    </div>
                    <div className="font-bold mt-2 text-sm sm:text-base">
                      Posted on: {post.created_at}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
