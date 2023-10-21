import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/hotels')
      .then((response) => {
        console.log(response, "response is getting or not..")
        setHotels(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotels</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {hotels.map((hotel, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-lg">
              <img src={hotel.image} className='w-full' alt="" />
              <h2 className="text-xl font-semibold mb-2">Name : {hotel.title}</h2>
              <p className="text-gray-600 font-bold">Room Type : {hotel.acOrNonAc ? 'AC ' : 'Non-AC '}</p>
              <p className="text-gray-600 font-bold">Number of Bed : {hotel.numberOfBed}</p>
              <p className="text-gray-600 font-bold">${hotel.price} per night</p>
              <p className="text-gray-600 ">Hotel added : {moment(hotel.createdAt).calendar()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
