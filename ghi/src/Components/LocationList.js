import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const LocationList = () => {
  const { data } = useParams();
  const [stateData, setStateData] = useState([]);

  const fetchLocations = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/locations`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setStateData(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredData = stateData.filter(
    (state) => state.state.toLowerCase() === data.toLowerCase()
  );

  return (
    <div className="w-full min-h-screen bg-black mt-[-80px] pt-[80px]">
      <div className="max-w-[1240px] flex flex-wrap text-center mx-auto p-5">
        {filteredData.map((state) => {
          return (
            <div
              key={state.id}
              className="border-2 border-red-950 rounded-medium m-5 p-3 bg-white"
            >
              <h1 className="text-4xl font-bold">{state.state}</h1>
              <h2 className="text-2xl">{state.city}</h2>
              <h4 className="text-l font-bold">{state.name}</h4>
              <Link to={`/locations/${state.name.split(" ").join("_")}`}>
                Go to Page
              </Link>
            </div>
          );
        })}
        {/* <button className="text-white" onClick={fetchLocations}>
          Click me
        </button> */}
      </div>
    </div>
  );
};

export default LocationList;
