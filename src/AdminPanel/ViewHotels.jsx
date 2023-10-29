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

    console.log(hotelsData, "Hotels data is there or not")
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

    const updateHotelsData = () => {

    }

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
                                                    <button>
                                                        <BiSolidPencil className='text-3xl text-white' />
                                                    </button>
                                                    <button>
                                                        <MdDelete className='text-white font-bold text-3xl' />
                                                    </button>
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
