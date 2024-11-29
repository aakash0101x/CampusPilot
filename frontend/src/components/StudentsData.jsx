import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const StudentsData = () => {
    const [students, setStudents] = useState([]);
    const [studentCounts, setStudentCounts] = useState({ CSE: 0, ECE: 0 });

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/students');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudents(data);

            const cseCount = data.filter(student => student.dep_id === 'CSE').length;
            const eceCount = data.filter(student => student.dep_id === 'ECE').length;
            setStudentCounts({ CSE: cseCount, ECE: eceCount });

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/student/delete/${id}`, { method: 'DELETE' });
            fetchStudents();
        } catch (err) {
            console.error("Error deleting student:", err);
        }
    };

    const handleUpdate = (id) => {
        window.location.href = `http://localhost:5173/student/update/${id}`;
    };

    const handleViewInfo = (id) => {
        window.location.href = `http://localhost:5173/student/${id}`;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-xl font-semibold text-yellow-700">Total Students</p>
                        <CountUp className="text-4xl font-bold mt-2" end={students.length} duration={4} />

                    </div>
                    <div className="flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-xl font-semibold text-blue-700">CSE Students</p>
                        <CountUp className="text-4xl font-bold mt-2" end={studentCounts.CSE} duration={4} />
                    </div>
                    <div className="flex flex-col items-center bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-xl font-semibold text-green-700">ECE Students</p>
                        <CountUp className="text-4xl font-bold mt-2" end={studentCounts.ECE} duration={4} />
                    </div>
                </div>
            </div>


            <div className="grid md:grid-cols-2 gap-6 ">
                <div className="bg-blue-100 p-4 h-fit rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-3">CSE Students</h3>
                    {students.filter(student => student.dep_id === 'CSE').map(student => (
                        <div key={student.s_id} className="p-2 mb-2 bg-white rounded shadow">
                            <p>ID: {student.s_id}</p>
                            <p>Name: {student.fname} {student.lname}</p>
                            <p>Email: {student.email}</p>
                            <p>Phone: {student.phone_no}</p>
                            <button
                                onClick={() => handleUpdate(student.s_id)}
                                className="bg-yellow-500 hover:bg-yellow-600 py-1 px-3 text-white p-1 rounded mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleViewInfo(student.s_id)}
                                className="bg-green-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2"
                            >
                                View Info
                            </button>
                            <button
                                onClick={() => handleDelete(student.s_id)}
                                className="bg-red-500 hover:bg-red-600 py-1 px-3 text-white p-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-green-100 p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-3">ECE Students</h3>
                    {students.filter(student => student.dep_id === 'ECE').map(student => (
                        <div key={student.s_id} className="p-2 mb-2 bg-white rounded shadow">
                            <p>ID: {student.s_id}</p>
                            <p>Name: {student.fname} {student.lname}</p>
                            <p>Email: {student.email}</p>
                            <p>Phone: {student.phone_no}</p>
                            <button
                                onClick={() => handleUpdate(student.s_id)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => handleViewInfo(student.s_id)}
                                className="bg-green-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2"
                            >
                                View Info
                            </button>

                            <button
                                onClick={() => handleDelete(student.s_id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentsData;
