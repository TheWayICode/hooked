import { useState, useEffect } from "react";

function UserProfile() {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    const response = await fetch("http://localhost:8000/api/users/");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-black bg-opacity-70 flex items-center justify-center py-20 px-20">
      <div className="mx-auto my-20 p-15">
        <div className="bg-white rounded-lg">
          <div className="px-4 py-2">
            <div className="flex justify-end my-5">
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1.5 px-4 rounded">
                Edit
              </button>
            </div>
            <h2 className="text-2xl p-5 font-bold text-gray-800 text-center">User Profile</h2>
          </div>
          <div className="bg-gray-100 px-5 py-5 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 items-center">
                <img className="h-16 w-16 md:h-32 md:w-32 rounded-full" src="https://via.placeholder.com/150" alt=""/>
              </div>
              <div className="ml-4">
                <div className="text-xl font-semibold text-gray-800">
                  User Name
                </div>
                <div className="text-gray-500">user@email.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
