import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function PostForm() {
  const { token } = useToken();
  const [user_id, setUser] = useState("");
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [fishes, setFishs] = useState([]);
  const [fish, setFish] = useState("");
  const [picture_url, setPhotoURL] = useState("");
  const [description, setDescription] = useState("");
  const [created_at, setCreatedAt] = useState(new Date().toLocaleDateString());

  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleFishChange = (event) => setFish(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePhotoURLChange = (event) => setPhotoURL(event.target.value);
  const handleCreatedChange = (event) => setCreatedAt(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.user_id = user_id.id;
    data.location = location;
    data.fish = fish;
    data.picture_url = picture_url;
    data.description = description;
    data.created_at = created_at;

    const postFormURL = "http://localhost:8000/api/posts/";
    const fetchConfig = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postFormURL, fetchConfig);
    if (response.ok) {
      setLocation("");
      setFish("");
      setPhotoURL("");
      setDescription("");
      setCreatedAt("");
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
    fetchLocation();
    fetchFish();
    fetchUser();
  }, [token]);

  return (
    <div className="bg-black bg-opacity-80 min-h-screen flex justify-center items-center p-10 mx-auto my-[-80px] pt-[80px]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-3xl font-bold my-4">
          Create a post, {user_id.name}
        </h1>
        <form
          onSubmit={handleSubmit}
          id="new-post"
          className="mx-auto my-auto p-2"
        >
          <div className="my-4">
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
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="my-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Fish
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
                    <option key={fish.id} value={fish.name}>
                      {fish.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="my-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Picture
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
          <div className="my-6">
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
          <div className="my-6">
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
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white my-6 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
