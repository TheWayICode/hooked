import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LocationListNav } from "./NavLog/LocationListNav";
import image from "./assets/fishingboat.svg";
import useToken from "@galvanize-inc/jwtdown-for-react";

const LocationList = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { data } = useParams();
  const [stateData, setStateData] = useState([]);

  if (!token) {
    navigate("/login");
  }

  const fetchLocations = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/locations`;
    const response = await fetch(
      url,
      {
        credentials: "include"
      }
    );
    const data = await response.json();

    if (response.ok) {
      setStateData(data);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredData = stateData.filter(
    (state) => state.state.toLowerCase() === data.toLowerCase()
  );

  return (
    <>
      <LocationListNav />
      <div className="w-full min-h-screen bg-[#effdff] mt-[-80px] pt-[80px]">
        <h1 className="text-7xl font-bold text-center mt-10 mb-5">
          Search Results
        </h1>
        {filteredData.length > 0 ? (
          <div className="max-w-[840px] flex text-center p-5 mx-auto grid md:grid-cols-3 gap-16">
            {filteredData.map((state) => {
              return (
                <div
                  key={state.id}
                  className="p-3 bg-[#effdff] max-w-[250px] max-h-[250px] text-left"
                >
                  <img
                    src={state.picture_url}
                    alt={state.name}
                    className="w-full h-[200px] object-cover rounded-md shadow-xl"
                  />
                  <h2 className="text-2xl font-bold py-1">{state.city}</h2>
                  <h4 className="text-base font-medium">{state.name}</h4>
                  <Link
                    to={`/locations/${state.name.split(" ").join("")}`}
                    className="text-sm text-[#00df9a] hover:text-black"
                  >
                    Go to Page
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="mt-10 text-2xl font-semibold text-center">
              Uh oh! No locations, I think you're lost...
            </h1>
          </div>
        )}
        <div className="flex justify-end">
          <img
            src={image}
            alt="map"
            className="max-w-[500px] h-full mb-3 mr-3"
          />
        </div>
      </div>
    </>
  );
};

export default LocationList;
