import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsSearch } from "react-icons/bs";
import { MdAdd, MdDelete } from "react-icons/md";
import { GrEdit, GrFormEdit } from 'react-icons/gr';
import EditExpense from './EditExpense';

const ViewExpenses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    // const [loader, setLoader] = useState(false);
    // for edit

    const [isEditConfirmationOpen, setIsEditConfirmationOpen] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeModalForEdit = () => {
        setIsEditConfirmationOpen(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/hotels`)
            .then((response) => {
                console.log(response.data.data, "DATA is getitng >>>>");
                setExpenseData(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            
            <div className='border-2 p-3 border-t-0'>
                <table className="min-w-full border-2 border-gray-400">
                    <thead>
                        <tr className='border-2 border-gray-500 bg-gray-300'>
                            <th className="px-6 py-3 border-2 border-gray-500"> Title</th>
                            <th className="px-6 py-3 border-2 border-gray-500"> Date of Expense</th>
                            <th className="px-6 py-3 border-2 border-gray-500">Amount</th>
                            <th className="px-6 py-3 border-2 border-gray-500">Number of Bed</th>
                            <th className="px-6 py-3 border-2 border-gray-500">Image</th>
                            <th className="px-6 py-3 border-2 border-gray-500">Edit & Delete</th>
                        </tr>
                    </thead>
                    {false ? (
                        <tbody>
                            <tr className='border-2 border-gray-500'>
                                <td colSpan='7' className='text-center py-4'>
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {expenseData.map((expense, index) => (
                                <tr className='border-2 border-gray-500' key={index}>
                                    <td className="px-6 py-4">{expense.title}
                                    </td>
                                    <td className="px-6 py-4 border border-gray-500">{moment(expense.createdAt).calendar()}</td>
                                    <td className="px-6 py-4 border border-gray-500">$ {expense.price}</td>
                                    <td className="px-6 py-4 border border-gray-500 text-[14px]">{expense.numberOfBed}</td>
                                    <td className="px-6 py-4 border border-gray-500">
                                       <img src={expense.image} alt="" className='w-16' />
                                    </td>
                                    <td className='border border-gray-500'>
                                        <div className='flex justify-evenly items-center'>
                                            <button onClick={() => handleEdit(expense)}>
                                                <GrFormEdit className='text-green-600 text-4xl' />
                                            </button>



                                            {isEditConfirmationOpen && (
                                                <EditExpense
                                                    closeModal={closeModalForEdit}
                                                    confirmEdit={confirmEdit}
                                                    expenseToEdit={expenseToEdit}
                                                />
                                            )}

                                            <button onClick={() => handleDelete(expense)}>
                                                <MdDelete className='text-red-600 font-bold text-3xl' />
                                            </button>

                                            {isDeleteConfirmationOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                                                    <div className="modal-bg absolute inset-0 bg-black opacity-50"></div>
                                                    <div className="modal z-50 bg-white p-6 rounded-lg shadow-lg w-[400px]">
                                                        <div className="mb-5 text-center">
                                                            <h2 className="text-2xl font-bold">Confirm Delete</h2>
                                                            <p>Are you sure you want to delete this expense?</p>
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>
            </div>
        </>
    );
};

export default ViewExpenses;
