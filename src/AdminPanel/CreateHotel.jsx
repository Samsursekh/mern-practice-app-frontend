import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GrClose } from "react-icons/gr";
import moment from "moment";

const CreateHotel = ({ openModal, closeModal, updateExpenseData }) => {
  const [error, setError] = useState(null);

  const initialFormData = {
    title: '',
    date: '',
    numberOfBed: '',
    description: '',
    amount: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const { title, date, numberOfBed, description, amount } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !numberOfBed || !description || !amount) {
      setError("Please fill in all the required fields.");
      setTimeout(() => {
        setError(null);
      }, 1000);
      return;
    }

    const expenseData = {
      title,
      date,
      numberOfBed,
      description,
      amount: Number(amount),
      currentTime: moment().format(),
    };

    axios.post(`http://localhost:8080/hotels`, expenseData)
      .then((res) => {
        setFormData(initialFormData);
        updateExpenseData(expenseData);
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
                <option value="Health">Health</option>
                <option value="Electronics">Electronics</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Books">Books</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="mb-4">
              <textarea
                id="description"
                value={description}
                name='description'
                onChange={handleInputChange}
                placeholder='Enter description'
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                id="amount"
                type="number"
                value={amount}
                name='amount'
                onChange={handleInputChange}
                placeholder='Enter amount'
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