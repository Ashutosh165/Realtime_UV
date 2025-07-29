
import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [uvData, setUvData] = useState(null);

  async function handleClick(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/get-UV", {
        lat,
        lng,
      });
      setUvData(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching UV data:", error);
    }
  }

  function formatDate(isoString){
    let date=new Date(isoString);

    let day=String(date.getDate()).padStart(2,"0");
    let month=String(date.getMonth()+1).padStart(2,"0");
    let year=date.getFullYear();
    let hours=date.getHours();
    let minutes=String(date.getMinutes()).padStart(2,"0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function logo(ozoneLvl){
    if(ozoneLvl<230) 
        return <div className="w-4 h-4 rounded-full bg-red-500 inline-block"></div>;
    else if(ozoneLvl>=230 && ozoneLvl<=300)
        return <div className="w-4 h-4 rounded-full bg-yellow-400 inline-block"></div>;
    else if(ozoneLvl>300)
        return <div className="w-4 h-4 rounded-full bg-green-500 inline-block"></div>;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <form className="shadow-2xl p-3 flex flex-col ">
        <label className="block p-2">Latitude</label>
        <input
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          type="number"
          name="lat"
          placeholder="latitude"
          className="border p-2 rounded-md mb-2"
        />

        <label className="block p-2">Longitude</label>
        <input
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          type="number"
          name="lng"
          placeholder="longitude"
          className="border p-2 rounded-md mb-2"
        />

        <button
          onClick={handleClick}
          name="getUV"
          className="border bg-amber-300 block rounded-md m-4 p-3"
        >
          Get UV
        </button>

        {uvData && (
          <div className="p-4 bg-white border rounded-md shadow mt-4">
            <p>
              <strong>UV Index:</strong> {uvData.uv}
            </p>
            <p>
              <strong>Max UV Today:</strong> {uvData.uv_max}
            </p>
            <p>
              <strong>Ozone Level:</strong> {uvData.ozone} DU {logo(uvData.ozone)}
            </p>
            <p>
              <strong>UV Registered Time:</strong> {formatDate(uvData.uv_time)}<> IST</>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Home;
