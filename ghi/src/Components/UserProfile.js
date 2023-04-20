import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Hooked from "./assets/HookedLogo.png";
import UserBackground from "./assets/UserProfile.png";
import { LoggedNav } from "./NavLog/LoggedNav";

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
    <>
      <LoggedNav />
      <div
        className="bg-center bg-no-repeat bg-cover w-full mt-[-80px] pt-[80px]"
        style={{
          backgroundImage: `url(${UserBackground})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "70% 30%",
        }}
      >
        <div className="flex flex-col w-full bg-cover mx-auto my-auto">
          <div className="bg-[#C4DDFF] bg-opacity-90 justify-center flex p-10 font-bold">
            <img className="h-100 w-100" src={Hooked} alt="" />
          </div>
          <div className="flex-1 flex flex-grow">
            <div className="w-2/5 bg-black bg-opacity-90 border-t-4 border-r-8 border-b-4 border-white flex flex-col items-center">
              <div className="bg-[#22577E] p-6 font-bold w-full text-center">
                {user && (
                  <h1 className="mx-auto text-white lg:text-3xl md:text-2xl sm:text-xl text-lg">
                    Member Profile
                  </h1>
                )}
              </div>
              <img
                className="h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40 rounded-full my-4 sm:my-5"
                src={Hooked}
                alt=""
              />
              <div className="text-center lg:text-xl md:text-lg sm:text-md xs:text-xss font-semibold text-white inline-flex flex-wrap py-2 px-1 sm:px-2 md:px-4 mx-auto">
                <p className="">Name:&nbsp;</p>
                <p
                  className="flex-1 overflow-wrap"
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </p>
              </div>
              <div className="text-center lg:text-xl md:text-lg sm:text-md xs:text-xss font-semibold text-white inline-flex flex-wrap py-2 px-1 sm:px-2 md:px-4 mx-auto">
                <p className="">Email:&nbsp;</p>
                <p
                  className="flex-1 overflow-wrap"
                  key={user.id}
                  value={user.id}
                >
                  {user.email}
                </p>
              </div>
            </div>
            <div className="border-t-4 border-b-4 border-white w-3/5 pb-5 bg-black bg-opacity-90">
              <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg p-6 font-semibold text-center text-white bg-[#22577E] mb-5">
                {user && <span>{user.name}'s Posts</span>}
              </h2>
              {!users ? (
                <div className="empty-div"></div>
              ) : (
                <div className="user-posts flex flex-wrap justify-center gap-5">
                  {users.map((post) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-lg m-5 p-3 sm:p-4 md:p-5 sm:w-80 md:w-96"
                        key={post.id}
                      >
                        <button
                          onClick={() => deleteUserPost(post.id)}
                          className="border rounded-full bg-red-400 text-white font-semibold mb-2 w-8 h-8 flex items-center justify-center"
                        >
                          X
                        </button>

                        <div className="text-center font-bold px-2 py-2 bg-[#22577E] bg-opacity-80 text-white text-lg sm:text-xl">
                          {post.fish}
                        </div>
                        <div className="h-48 sm:h-48 md:h-56 lg:h-56 bg-[#C4DDFF] text-center font-bold items-center mx-auto my-auto">
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
                              className="w-full h-full object-cover p-2"
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
      </div>
    </>
  );
}

export default UserProfile;
