import React from "react";
import { stateData } from "../stateData";
import { useParams } from "react-router-dom";

const LocationList = () => {
  const { data } = useParams();
  console.log(data);
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
