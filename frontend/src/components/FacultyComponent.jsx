import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentsData from './StudentsData';

const FacultyComponent = () => {
    const { slug } = useParams();
    const [faculty, setFaculty] = useState(null);

    const fetchFaculty = async () => {
        try {
            const response = await fetch('http://localhost:3000/faculty');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            const selectedFaculty = data.find((f) => f.F_id === slug);
            setFaculty(selectedFaculty);
            console.log(selectedFaculty);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchFaculty();
    }, [slug]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {faculty ? (
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome, {faculty.fname} {faculty.lname}!
                    </h2>
                    <p className="text-gray-600 mb-2">
                        Department: {faculty.dep_id === 'CSE' ? 'Computer Science' : 'Electronics and Communication'}
                    </p>
                    <p className={` ${faculty.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        Status: {faculty.isActive ? 'Active Faculty Member' : 'Inactive'}
                    </p>
                    <p className="text-gray-500 mt-4">
                        We're glad to have you here. You can see student data and access your resources below.
                    </p>
                </div>
            ) : (
                <p className="text-red-500 pt-44 font-extralight text-4xl text-center">You are not authorized to access this page</p>
            )}

            {faculty && <StudentsData />}
        </div>
    );
};

export default FacultyComponent;