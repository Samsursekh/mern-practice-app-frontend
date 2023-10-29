import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { MdAdd, MdDelete } from "react-icons/md";
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { BiSolidPencil } from "react-icons/bi";
import DatePicker from "react-datepicker";
import CreateHotel from './CreateHotel';

const ViewHotels = () => {
    const [hotelsData, setHotelsData] = useState([]);
    const [isOpenCustomisedBtn, setIsOpenCustomisedBtn] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [hotelToDelete, setHotelToDelete] = useState(null);
    const [isEditConfirmationOpen, setIsEditConfirmationOpen] = useState(false);
    const [hotelToEdit, setHotelToEdit] = useState(null);

    // console.log(hotelsData, "Hotels data is there or not")

    useEffect(() => {
        axios.get(`http://localhost:8080/hotels`)
            .then((response) => {
                console.log(response.data.data, "DATA is getitng >>>>");
                setHotelsData(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const toggleCustomised = (hotel) => {
        const hotelId = hotel._id;
        setIsOpenCustomisedBtn(prevState => ({
            ...prevState,
            [hotelId]: !prevState[hotelId]
        }));
    }

    const handleDateChange = () => {

    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const updateHotelsData = (newHotelsToUpdate) => {
        setHotelsData([...hotelsData, newHotelsToUpdate])
    }

    const handleDelete = (hotel) => {
        setHotelToDelete(hotel);
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        const hotelID = hotelToDelete._id;

        axios.delete(`http://localhost:8080/hotels/${hotelID}`)
            .then(() => {
                const updatedHotels = hotelsData.filter(hotel => hotel._id !== hotelID);
                setHotelsData(updatedHotels);
            })
            .catch((error) => {
                console.error('Error deleting expense:', error);
            });
        setIsDeleteConfirmationOpen(false);
    };

    const handleEditModal = (hotel) => {
        console.log(hotel._id, "Id is there to edit");
        setHotelToEdit(hotel);
        setIsEditConfirmationOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmEdit(e, hotelToEdit);
    };


    const confirmEdit = (e, hotelToEdit) => {
        e.preventDefault();
        const hotelID = hotelToEdit._id;

        const updatedHotelData = {
            title: hotelToEdit.title,
            date: hotelToEdit.date,
            numberOfBed: hotelToEdit.numberOfBed,
            image: hotelToEdit.image,
            acOrNonAc: hotelToEdit.acOrNonAc,
            price: hotelToEdit.price,
        };

        console.log(updateHotelsData, "updateHotelsData printing????")

        axios.put(`http://localhost:8080/hotels/${hotelID}`, updatedHotelData)
            .then((response) => {
                console.log('Expense updated:', response.data);
                setIsEditConfirmationOpen();
                const updatedHotels = hotelsData.map(hotel => {
                    if (hotel._id === hotelID) {
                        return response.data;
                    }
                    return hotel;
                });
                setHotelsData(updatedHotels);
                setHotelsData(hotelsData)
            })
            .catch((error) => {
                console.error('Error updating expense:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHotelToEdit({ ...hotelToEdit, [name]: value });
    };

    return (
        <>
            {/* Navigation area */}
            <div className='p-3 border-2 border-b-0 w-[80%]'>
                <div className='flex justify-between'>
                    <div className='mt-2 text-xl font-bold'>
                        <h3 className='text-blue-600 font-bold shadow-sm'>HOTEL ADMIN PANEL</h3>
                    </div>
                    <div className='flex justify-end'>
                        <DatePicker
                            className='outline-none placeholder:text-green-600 border-2 mx-3 border-green-600 px-4 py-3 font-bold text-green-600 rounded-md'
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText='Filter by Date of Booking'
                        />
                        <div className='border-2 mr-3 border-green-600 px-4 font-bold text-green-600 rounded-md flex items-center'>
                            <input
                                className='outline-none placeholder:text-green-600'
                                type="text"
                                placeholder='Search Hotel by Name'
                                // value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <BsSearch />
                        </div>

                        <button
                            className="border-2 border-green-600 px-4 font-bold bg-green-600 text-white rounded-md"
                            onClick={openModal}
                        >
                            <span className='flex justify-evenly items-center'>
                                <MdAdd className='font-bold text-3xl' />
                                New Hotel
                            </span>
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <CreateHotel
                        openModal={openModal}
                        closeModal={closeModal}
                        updateHotelsData={updateHotelsData}
                    />
                )}
            </div>
            {/* Navigation area ends */}
            <div className='border-t-0 border-2 p-3 w-[80%] flex justify-between'>
                <div className='border-2 w-[230px]'>Side Bar</div>
                <div className='border-2 min-w-[80%] text-center'>
                    <table className="min-w-full ">
                        <thead>
                            <tr className='border-2 text-slate-600 font-bold bg-amber-100'>
                                <th className=" py-2 border-2 border-gray-500"> Title</th>
                                <th className=" py-2 border-2 border-gray-500">Booking Date</th>
                                <th className=" py-2 border-2 border-gray-500">Amount</th>
                                <th className=" py-2 border-2 border-gray-500">Number of Beds</th>
                                <th className=" py-2 border-2 border-gray-500">Rooms</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelsData.map((hotel, index) => (
                                <tr className=' shadow-lg border-2 m-auto' key={index}>
                                    <td className="px-6 py-4" >{hotel.title}
                                    </td>
                                    <td className="px-6 py-4">{moment(hotel.createdAt).calendar()}</td>
                                    <td className="px-6 py-4">₹ {hotel.price}</td>
                                    <td className="px-6 py-4 text-[14px]">{hotel.numberOfBed}</td>
                                    <td className="px-6 py-4 flex relative">
                                        <img src={hotel.image} alt="" className='w-16 m-auto' />
                                        <div className='cursor-pointer pl-4' onClick={() => toggleCustomised(hotel)}>
                                            <BsThreeDotsVertical className='text-2xl mt-1' />
                                        </div>
                                        {
                                            isOpenCustomisedBtn[hotel._id] ? (
                                                <div className='flex absolute top-1 justify-evenly items-center bg-blue-600 w-[100px] h-[60px] m-auto'>
                                                    <button onClick={() => handleEditModal(hotel)}>
                                                        <BiSolidPencil className='text-3xl text-white' />
                                                    </button>
                                                    {
                                                        isEditConfirmationOpen ? (
                                                            <div className="fixed inset-0 flex items-center justify-center z-50 ">
                                                                <div className="modal-bg absolute inset-0 bg-black opacity-50"></div>
                                                                <div className="modal z-50 bg-white p-6 rounded-lg shadow-lg w-[400px]">
                                                                    <div className='mb-4 flex justify-start'><h2 className="text-2xl font-bold">Edit Expense</h2></div>

                                                                    <form onSubmit={handleSubmit}>
                                                                        <div className="mb-4">
                                                                            <input
                                                                                id="title"
                                                                                type="text"
                                                                                name='title'
                                                                                value={hotelToEdit.title}
                                                                                placeholder='Enter title'
                                                                                maxLength={140}
                                                                                className="w-full p-2 border rounded"
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <input
                                                                                value={hotelToEdit.date}
                                                                                id="date"
                                                                                type="date"
                                                                                name='date'
                                                                                className="w-full p-2 border rounded"
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <select
                                                                                id="numberOfBed"
                                                                                value={hotelToEdit.numberOfBed}
                                                                                name='numberOfBed'
                                                                                className="w-full p-2 border rounded"
                                                                                onChange={handleInputChange}
                                                                            >
                                                                                <option value="">Choose one item</option>
                                                                                <option value="1">1</option>
                                                                                <option value="2">2</option>
                                                                                <option value="3">3</option>

                                                                            </select>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <input
                                                                                type="radio"
                                                                                id="acOrNonAc"
                                                                                name="acOrNonAc"
                                                                                value={hotelToEdit.acOrNonAc}
                                                                                // checked={acOrNonAc === "true"}
                                                                                onChange={handleInputChange}
                                                                                className="mr-2"
                                                                            />
                                                                            <label htmlFor="acOrNonAc" className="mr-2">AC</label>
                                                                            <input
                                                                                type="radio"
                                                                                id="acOrNonAc"
                                                                                name="acOrNonAc"
                                                                                value={hotelToEdit.acOrNonAc}
                                                                                // checked={acOrNonAc === "false"}
                                                                                onChange={handleInputChange}
                                                                                className="mr-2"
                                                                            />
                                                                            <label htmlFor="acOrNonAc">Non-AC</label>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <input
                                                                                value={hotelToEdit.price}
                                                                                id='price'
                                                                                type="price"
                                                                                name='price'
                                                                                placeholder='Enter price'
                                                                                min="0"
                                                                                className="w-full p-2 border rounded"
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4">
                                                                            <input
                                                                                value={hotelToEdit.image}
                                                                                id='image'
                                                                                type="image"
                                                                                name='image'
                                                                                placeholder='Enter image'
                                                                                className="w-full p-2 border rounded"
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>

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
                                                                                    Edit Expense
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                    </form>

                                                                </div>
                                                            </div>
                                                        ) : (
                                                            null
                                                        )
                                                    }
                                                    <button onClick={() => handleDelete(hotel)}>
                                                        <MdDelete className='text-white font-bold text-3xl' />
                                                    </button>

                                                    {isDeleteConfirmationOpen && (
                                                        <div className="fixed inset-0 flex items-center justify-center z-50 ">
                                                            <div className="modal-bg absolute inset-0 bg-black opacity-50"></div>
                                                            <div className="modal z-50 bg-white p-6 rounded-lg shadow-lg w-[400px]">
                                                                <div className="mb-5 text-left">
                                                                    <h2 className="text-2xl font-bold mb-2">Confirm Delete</h2>
                                                                    <p>Are you sure you want to delete this hotel?</p>
                                                                </div>
                                                                <div className="flex justify-end">
                                                                    <button
                                                                        onClick={() => setIsDeleteConfirmationOpen(false)}
                                                                        className="bg-red-500 text-white py-1 px-3 mx-1 rounded"
                                                                    >
                                                                        No
                                                                    </button>
                                                                    <button
                                                                        onClick={confirmDelete}
                                                                        className="bg-green-600 text-white py-1 px-3 mx-1 rounded"
                                                                    >
                                                                        Yes, Delete!
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                null
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ViewHotels;
