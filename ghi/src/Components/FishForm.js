import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { LoggedNav } from "./NavLog/LoggedNav";

function FishRequestForm() {
  const { token } = useToken();
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const handleLocationChange = (event) => setLocation(event.target.value);
  const [fish, setFish] = useState("");
  const handleFishChange = (event) => setFish(event.target.value);
  const [picture_url, setPhotoURL] = useState("");
  const handlePhotoURLChange = (event) => setPhotoURL(event.target.value);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.location = location;
    data.fish = fish;
    data.picture_url = picture_url;

    const fishRequestURL = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/fish_requests`;
    const fetchConfig = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(fishRequestURL, fetchConfig);
    if (response.ok) {
      setLocation("");
      setFish("");
      setPhotoURL("");
    }
  };

  const fetchLocation = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/locations`;
    const response = await fetch(
      url,
      {
        credentials: "include"
      }
    );
    if (response.ok) {
      const data = await response.json();
      setLocations(data);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [token]);

  return (
    <>
      <LoggedNav />
      <div></div>
      <div
        className="bg-cover min-h-screen flex justify-center items-center"
        style={{
          backgroundImage: "url(https://i.imgur.com/ocKWQ3L.jpg)",
          backgroundPosition: "center -350px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-center text-2xl font-bold mb-4">
            Report a newly found fish
          </h1>
          <form onSubmit={handleSubmit} id="new-fish-request">
            <div className="mb-6">
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
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="fish"
              >
                What new fish did you catch?
              </label>
              <input
                onChange={handleFishChange}
                value={fish}
                placeholder="Fish"
                required
                type="text"
                name="fish"
                id="fish"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="picture_url"
              >
                Submit a photo
              </label>
              <input
                onChange={handlePhotoURLChange}
                value={picture_url}
                placeholder="Picture URL"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default FishRequestForm;
