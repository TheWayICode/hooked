import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { getToken } from "@galvanize-inc/jwtdown-for-react";

function PostForm() {
  const { token } = useToken();
  const [locations, setLocations] = useState([]);
  const [fishes, setFishs] = useState([]);
  const [user, setUser] = useState("");
  const [location, setLocation] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleCreatedChange = (event) => setCreatedAt(event.target.value);
  const handleUserChange = (event) => setUser(event.target.value);

  const [fish, setFish] = useState("");
  const handleFishChange = (event) => setFish(event.target.value);
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const [picture_url, setPhotoURL] = useState("");
  const handlePhotoURLChange = (event) => setPhotoURL(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = user;
    data.name = location;
    data.fish = fish;
    data.description = description;
    data.picture_url = picture_url;

    const postFormURL = "http://localhost:8000/api/posts/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postFormURL, fetchConfig);
    if (response.ok) {
      setLocation("");
      setFish("");
      setDescription("");
      setPhotoURL("");
    }
  };

  const fetchLocation = async () => {
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data);
    }
  };

  const fetchFish = async () => {
    const url = "http://localhost:8000/api/fish/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setFishs(data);
    }
  };

  const fetchUser = async () => {
    const url = `http://localhost:8000/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setUser(data.account);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchFish();
    if (token) {
      fetchUser();
    };
    console.log(token)
  }, [token]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">
          Submit your last adventure
        </h1>
        <form onSubmit={handleSubmit} id="new-post">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Select your name
            </label>
            <select
              className="form-select file:shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleUserChange}
              id="user"
              required
              name="user"
              value={user}
            >
              <option value="">Select name</option>
              {user && (
                    <option key={user.id} value={user.email}>
                      {user.name}
                    </option>
                  )
              }
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <select
              className="form-select file:shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleLocationChange}
              id="location"
              required
              name="location"
              value={location}
            >
              <option value="">Select a location</option>
              {locations &&
                locations.map((location) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Any Fishers?
            </label>
            <select
              className="form-select file:shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFishChange}
              id="fish"
              required
              name="fish"
              value={fish}
            >
              <option value="">Select a fish</option>
              {fishes &&
                fishes.map((fish) => {
                  return (
                    <option key={fish.id} value={fish.id}>
                      {fish.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Pics or it didn't happen
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handlePhotoURLChange}
              placeholder="Share a photo"
              required
              type="text"
              name="picture_url"
              value={picture_url}
              id="picture_url"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
          </div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleDescriptionChange}
            placeholder="Tell us about it"
            required
            type="text"
            name="description"
            value={description}
          />
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Created at
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleCreatedChange}
                placeholder="created_at"
                required
                type="date"
                name="created_at"
                value={created_at}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default PostForm;
