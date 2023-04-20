import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Hooked from "./assets/HookedLogo.png";
import UserBackground from "./assets/UserProfile.png";
import { LoggedNav } from "./NavLog/LoggedNav";

function UserProfile() {
  const { token } = useToken();
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

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
        className="bg-center bg-no-repeat bg-cover w-full mt-[-80px] pt-[80px] md:pt-40 lg:pt-60 pb-20 md:pb-40 lg:pb-60 lg:px-40 mx-auto my-auto"
        style={{
          backgroundImage: `url(${UserBackground})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "70% 30%",
        }}
      >
        <div className="border-4 border-white mt-8 mx-8">
          <h1 className="bg-[#22577E] text-center text-white p-20 lg:text-6xl md:text-6xl sm:text-5xl text-4xl font-bold mx-auto">
            {user && (
              <option
                className="font-bold text-white text-center"
                key={user.id}
                value={user.id}
              >
                {user.name}'s Profile
              </option>
            )}
          </h1>
          <div className="flex bg-[#D4ECDD] bg-opacity-90 mx-auto p-15 text-center justify-center items-center">
            <img
              className="h-20 w-20 md:h-40 md:w-40 rounded-full"
              src={Hooked}
              alt=""
            />
            <div className="pr-20">
              <div className="text-xl font-semibold text-gray-900 inline-flex p-2">
                Name:&nbsp;
                {user && (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                )}
              </div>
              <div className="">
                <div className="text-xl font-semibold text-gray-900 inline-flex p-2">
                  Email:&nbsp;
                  {user && (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  )}
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl p-6 mx-auto bg-[#5584AC]">
            {user && (
              <option
                className="font-bold text-white text-center"
                key={user.id}
                value={user.id}
              >
                {user.name}'s Posts
              </option>
            )}
          </h2>
          {!users ? (
            <div className="empty-div"></div>
          ) : (
            <div className="user-posts flex flex-wrap justify-center lg:p-20 md:p-10 sm:p-5 p-5 items-center gap-5 bg-[#D4ECDD] bg-opacity-90">
              {users.map((post) => {
                return (
                  <div
                    className="bg-white rounded-xl shadow-lg m-5 p-5 w-96"
                    key={post.id}
                  >
                    <div className="text-center font-bold px-2 py-2 bg-[#22577E] bg-opacity-80 text-white text-xl">
                      {post.fish}
                    </div>
                    <div className="relative h-64 bg-[#C4DDFF] text-center font-bold items-center mx-auto my-auto">
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
                          className="w-full h-full object-cover p-5"
                        />
                      )}
                    </div>
                    <div className="font-bold mt-2">
                      Location: {post.location}
                    </div>
                    <div className="font-bold mt-2">Name: {post.fish}</div>
                    <div className="font-bold mt-2">
                      Description: {post.description}
                    </div>
                    <div className="font-bold mt-2">
                      Posted on: {post.created_at}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
