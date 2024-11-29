import React from 'react'
import { useState, useEffect } from 'react'

function Department_and_Courses_Component() {
    const [Departments, setDepartments] = useState([])
    const [Courses, setCourses] = useState([])

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:3000/departments');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDepartments(data);
            console.log(Departments);
        } catch (err) {
            console.error(err);
        }
    };
    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:3000/courses');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCourses(data);
            console.log(Courses)
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchDepartments();
        fetchCourses();
    }, []);

    return (
        <div className='bg-gray-100'>
            <div className="bg-gray-100 p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl text-center font-semibold mb-4">IIITN Departments</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Department ID</th>
                            <th className="py-2 px-4 border">Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Departments.map((d) => (
                            <tr key={d.dep_id}>
                                <td className="py-2 px-4 border">{d.dep_id}</td>
                                <td className="py-2 px-4 border">{d.dep_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl text-center font-semibold mb-4">IIITN Courses</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Course ID</th>
                            <th className="py-2 px-4 border">Course Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Courses.map((c) => (
                            <tr key={c.c_id}>
                                <td className="py-2 px-4 border">{c.c_id}</td>
                                <td className="py-2 px-4 border">{c.c_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Department_and_Courses_Component