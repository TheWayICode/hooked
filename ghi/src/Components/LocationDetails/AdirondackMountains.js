import React, { useState, useEffect } from "react";
import image from "../assets/fish.png";
import mapboxgl from "mapbox-gl";
import { LoggedNav } from "../NavLog/LoggedNav";
import { Link } from 'react-router-dom';

function Adirondack_Mountains_Details() {
  const [fish, setFish] = useState([]);
  const [description, setDescription] = useState("");

  const fishList = async () => {
    const fishUrl = "http://localhost:8000/api/locations/3";
    const fishResponse = await fetch(fishUrl);
    if (fishResponse.ok) {
      const fishData = await fishResponse.json();
      setFish(fishData.fish);
      setDescription(fishData.description);

      mapboxgl.accessToken =
        "pk.eyJ1IjoiYnVycml0b2JveWNobzMiLCJhIjoiY2xnZW00dDdsMm1neDNtbzgzdHA5ZTA2aiJ9.x_k3x1B_c9Htw7jgUzCn0A";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-73.86663077768854, 44.13089086909482],
        zoom: 12,
      });

      map.addControl(new mapboxgl.NavigationControl());

      const marker = new mapboxgl.Marker()
        .setLngLat([-73.86663077768854, 44.13089086909482])
        .addTo(map);
    }
  };

  useEffect(() => {
    fishList();
  }, []);

  return (
    <>
      <LoggedNav />
      <div className="w-full bg-cover bg-white bg-no-repeat py-10 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-">
          <img
            className="w-full mx-auto my-4 mb-8 rounded-2xl"
            src="https://cdn.pixabay.com/photo/2023/03/12/18/44/river-7847591_960_720.jpg"
            alt="SMP"
            style={{ width: "100%" }}
          />
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 mb-24">
            <div className="flex flex-col justify-center">
              <p className="text-[#000000] md:text-4xl font-bold mb-8">
                Adirondack Mountains
              </p>
              <hr className="mb-8 border-t-2 border-gray-400"></hr>
              <p className="text-[#000000] md:text-xl mb-24">{description}</p>
            </div>
            <div
              key={fish.id}
              className="bg-cover rounded-2xl shadow-2xl p-6 border border-gray-500 mx-auto"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/3854025/pexels-photo-3854025.jpeg)",
              }}
            >
              <h1 className="md:text-4xl text-center text-white font-bold mb-10">Fish found in this area</h1>
              <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 mb-8">
                <div>
                  {fish.map(fish => (
                    <div key={fish.id} className="flex items-center my-2">
                      <img src={image} className="w-8 h-8 mr-2 filter invert" alt="Fish Icon" />
                      <span className="md:text-2xl text-white">{fish.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center bg-white rounded-md border border-gray-500 p-4 inline-block">
                <div className="underline mb-4">Caught a fish not on the list? Be the first to report it!</div>
                <Link to="/fish_report">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
                    New Fish
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <hr className="mb-8 border-t-2 border-gray-400"></hr>
          <div className="md:text-2xl font-bold mb-4">Location</div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${44.13089086909482},${-73.86663077768854}`}
              className="mb-4"
            >
              Get directions
            </a>
          </button>
          <div id="map" style={{ width: "100%", height: "400px" }}></div>
        </div>
      </div>
    </>
  );
}

export default Adirondack_Mountains_Details;
