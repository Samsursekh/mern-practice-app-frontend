import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GrClose } from "react-icons/gr";
import moment from "moment";

const CreateHotel = ({ openModal, closeModal, updateHotelsData }) => {
  const [error, setError] = useState(null);

  const initialFormData = {
    title: '',
    date: '',
    numberOfBed: '',
    image: '',
    price: '',
    acOrNonAc: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const { title, date, numberOfBed, image, price, acOrNonAc } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !numberOfBed || !image || !price || !acOrNonAc) {
      setError("Please fill in all the required fields.");
      setTimeout(() => {
        setError(null);
      }, 1000);
      return;
    }

    const hotelData = {
      title,
      date,
      numberOfBed: Number(numberOfBed),
      image,
      price: Number(price),
      acOrNonAc,
    };

    console.log(hotelData, "HotelData is there or not...")

    axios.post(`http://localhost:8080/hotels`, hotelData)
      .then((res) => {
        setFormData(initialFormData);
        updateHotelsData(hotelData);
        closeModal();
      })
      .catch((error) => {
        console.error('Error :', error);
      });
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="modal-bg absolute inset-0 bg-black opacity-50"></div>
        <div className="modal z-50 bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <div className='mb-4 flex justify-start'><h2 className="text-2xl font-bold">Create New Hotel</h2></div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="title"
                type="text"
                value={title}
                name='title'
                placeholder='Enter title'
                onChange={handleInputChange}
                maxLength={140}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                id="date"
                type="date"
                value={date}
                name='date'
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <select
                id="numberOfBed"
                value={numberOfBed}
                name='numberOfBed'
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Choose one item</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                id="image"
                type="text"
                value={image}
                name='image'
                placeholder='Enter Image Url'
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="radio"
                id="acOrNonAc"
                name="acOrNonAc"
                value="true"
                checked={acOrNonAc === "true"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="acOrNonAc" className="mr-2">AC</label>
              <input
                type="radio"
                id="acOrNonAc"
                name="acOrNonAc"
                value="false"
                checked={acOrNonAc === "false"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="acOrNonAc">Non-AC</label>
            </div>

            <div className="mb-4">
              <input
                id="price"
                type="number"
                value={price}
                name='price'
                onChange={handleInputChange}
                placeholder='Enter price'
                min="0"
                className="w-full p-2 border rounded"
              />
            </div>
            {error && <div className="text-red-500 mb-2">{error}</div>}

            <div className='flex justify-between items-center'>
              <div>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white p-2 w-full rounded px-6"
                >
                  {/* <GrClose /> */}
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-green-600 text-white p-2 w-full rounded px-4"
                >
                  Create Hotel
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default CreateHotel