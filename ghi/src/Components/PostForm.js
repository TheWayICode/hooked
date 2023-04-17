import { useState, useEffect } from "react";

function PostForm() {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const handleLocationChange = (event) => setLocation(event.target.value);

  const [fish, setFish] = useState("");
  const handleFishChange = (event) => setFish(event.target.value);

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const [PhotoURL, setPhotoURL] = useState([]);
  const handlePhotoURLChange = (event) => setPhotoURL(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = location;
    data.fish = fish;
    data.description = description;
    data.PhotoURL = PhotoURL;

    const postFormURL = "http://localhost:8000/api/posts/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
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

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">
          Submit your last adventure
        </h1>
        <form onSubmit={handleSubmit} id="new-post">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="location"
            >
              Donde?
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFishChange}
              placeholder="select a fish"
              required
              type="text"
              name="email"
              value={fish}
            />
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
              name="photoURL"
              value={PhotoURL}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              What went down
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
