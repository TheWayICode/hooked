import React from "react";
import { stateData } from "../stateData";

const LocationList = (prop) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <div>
        {stateData.filter((state) => {
          return (
            <div key={state.id}>
              <h1>{state.state}</h1>
              <h2>{state.city}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
