import React, {useState, useEffect} from 'react';

function Santa_Monica_Pier_Details() {
  // const [automobile, setAutomobile] = useState('');
  const [fish, setFish] = useState([]);

  const fishList = async () => {
    const fishUrl = "http://localhost:8000/api/locations/3";
    const fishResponse = await fetch(fishUrl);
    if (fishResponse.ok) {
      const fishData = await fishResponse.json();
      setFish(fishData.fish)
    }
  }

  useEffect(() => {
    fishList();
  }, []);

  return (
    <>
      <div className=" py-4 text-center">
        <h1>Santa Monica Pier</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Fishing Technique</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {fish.map(fish => {
            return (
              <tr key={fish.id}>
                <td>{ fish.name }</td>
                <td>{ fish.size }</td>
                <td>{ fish.fishing_technique }</td>
                <td>{ fish.type }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default Santa_Monica_Pier_Details;
