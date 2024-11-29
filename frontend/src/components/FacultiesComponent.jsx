import React from 'react';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const FacultiesComponent = ({ action }) => {
    const [FacultyData, setFacultyData] = useState([])
    const fetchFaculties = async () => {
        try {
            const response = await fetch('http://localhost:3000/faculty');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFacultyData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchFaculties();
    }, []);
    const activeCount = FacultyData.filter(faculty => faculty.isActive).length;
    const inactiveCount = FacultyData.filter(faculty => !faculty.isActive).length;

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/faculty/delete/${id}`, { method: 'DELETE' });
            fetchFaculties();
        } catch (err) {
            console.error("Error deleting faculty:", err);
        }
    };

    const handleUpdate = async (id) => {
        window.location.href = `http://localhost:5173/faculty/update/${id}`
    }


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Faculty List</h1>
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
                <div className="bg-blue-100 border border-blue-200 rounded-lg shadow-lg py-6">
                    <h3 className="text-xl font-bold text-blue-700 mb-2">Total Faculty</h3>
                    <CountUp className="text-3xl font-extrabold text-gray-800" end={activeCount + inactiveCount} duration={4} />

                </div>

                <div className="bg-green-100 border border-green-200 rounded-lg shadow-lg py-6">
                    <h3 className="text-xl font-bold text-green-700 mb-2">Active Faculty</h3>
                    <CountUp className="text-3xl font-extrabold text-gray-800" end={activeCount} duration={4} />
                </div>

                <div className="bg-red-100 border border-red-200 rounded-lg shadow-lg py-6">
                    <h3 className="text-xl font-bold text-red-700 mb-2">Inactive Faculty</h3>
                    <CountUp className="text-3xl font-extrabold text-gray-800" end={inactiveCount} duration={4} />
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Faculty ID</th>
                        <th className="py-3 px-6 text-left">First Name</th>
                        <th className="py-3 px-6 text-left">Last Name</th>
                        <th className="py-3 px-6 text-left">Department</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        {action && <th className="py-3 px-6 text-left">Phone</th>}
                        <th className="py-3 px-6 text-left">Status</th>
                        {action && <th className="py-3 px-6 text-left">Actions</th>}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-semibold">
                    {FacultyData.map(faculty => (
                        <tr key={faculty.F_id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{faculty.F_id}</td>
                            <td className="py-3 px-6">{faculty.fname}</td>
                            <td className="py-3 px-6">{faculty.lname}</td>
                            <td className="py-3 px-6">{faculty.dep_id}</td>
                            <td className="py-3 px-6">{faculty.email}</td>
                            {action && <td className="py-3 px-6">{faculty.phone_no}</td>}
                            <td className="py-3 px-6">
                                <span className={`inline-block px-2 py-1 rounded-full text-white ${faculty.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {faculty.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>{action && <button
                                onClick={() => handleUpdate(faculty.F_id)}
                                className="bg-yellow-500 hover:bg-yellow-600 mr-4 text-white py-1 px-3 rounded"
                            >
                                Update
                            </button>
                            }

                                {action && <button
                                    onClick={() => handleDelete(faculty.F_id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                >
                                    Delete
                                </button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultiesComponent;