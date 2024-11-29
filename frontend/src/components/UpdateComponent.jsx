import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateComponent = () => {
    const { slug1, slug2 } = useParams()

    const [Errormessage, setErrormessage] = useState('')
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Depid, setDepid] = useState('');
    const [Password, setPassword] = useState('')

    const makePutRequest = async (field, value) => {
        try {
            const response = await fetch(`http://localhost:3000/${slug1}/update/${slug2}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field, value }),
            });
            if (!response.ok) throw new Error('Failed to update field');
            alert("Updated " + field + " successfully")
        } catch (error) {
            console.error(error);
            setErrormessage(`Error updating ${field}: ${error.message}`);
        }
    };

    const handleUpdateFname = () => {
        if (Fname === '') {
            setErrormessage('Please enter a value for First Name');
        } else {
            makePutRequest('Fname', Fname);
        }
    };

    const handleUpdateLname = () => {
        if (Lname === '') {
            setErrormessage('Please enter a value for Last Name');
        } else {
            makePutRequest('Lname', Lname);
        }
    };

    const handleUpdateEmail = () => {
        if (Email === '') {
            setErrormessage('Please enter a value for Email');
        } else {
            makePutRequest('Email', Email);
        }
    };

    const handleUpdatePhone = () => {
        if (Phone === '') {
            setErrormessage('Please enter a value for phone_no');
        } else {
            makePutRequest('phone_no', Phone);
        }
    };

    const handleUpdateDepid = () => {
        if (Depid === '') {
            setErrormessage('Please enter a value for Department ID');
        } else {
            makePutRequest('dep_id', Depid);
        }
    };

    const handleUpdatePassword = () => {
        if (Password === '') {
            setErrormessage('Please enter a value for Password');
        } else {
            makePutRequest('password', Password);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10 mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">You are Updating details of {slug1} {slug2}</h2>
            {Errormessage && (
                <div className='text-center text-red-500 font-semibold'>
                    {Errormessage}
                </div>
            )}
            <div className="mb-4 flex justify-center items-center gap-1">
                <label className="block w-72 text-gray-700 font-medium">First Name</label>
                <input
                    type="text"
                    value={Fname}
                    onChange={(e) => {
                        setFname(e.target.value), setErrormessage('')
                    }
                    }
                    placeholder='Enter Updated First Name'
                    className="w-full px-3 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                    onClick={handleUpdateFname}
                    className=" w-96 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Update First Name
                </button>
            </div>

            <div className="mb-4 flex justify-center items-center gap-1">
                <label className="block  w-72 text-gray-700 font-medium">Last Name</label>
                <input
                    type="text"
                    placeholder='Enter Updated Last Name'
                    value={Lname}
                    onChange={(e) => { setLname(e.target.value), setErrormessage('') }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                    onClick={handleUpdateLname}
                    className="w-96 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    Update Lastname
                </button>
            </div>

            <div className="mb-4 flex justify-center items-center gap-1">
                <label className="block w-72 text-gray-700 font-medium">Email</label>
                <input
                    placeholder='Enter Updated Email'
                    type="text"
                    value={Email}
                    onChange={(e) => { setEmail(e.target.value), setErrormessage('') }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button
                    onClick={handleUpdateEmail}
                    className=" w-96 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                >
                    Update Email
                </button>
            </div>

            <div className="mb-4 flex justify-center items-center gap-1">
                <label className="block  w-72 text-gray-700 font-medium">Phone No.</label>
                <input
                    type="text"
                    placeholder='Enter updated phone number'
                    value={Phone}
                    onChange={(e) => { setPhone(e.target.value), setErrormessage('') }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
                <button
                    onClick={handleUpdatePhone}
                    className="w-96 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                >
                    Update Phoneno
                </button>
            </div>

            <div className="mb-4 flex justify-center items-center gap-1">
                <label className="block w-72 text-gray-700 font-medium">Department ID</label>
                <input
                    type="text"
                    placeholder='Enter Updated Department ID'
                    value={Depid}
                    onChange={(e) => { setDepid(e.target.value), setErrormessage('') }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                    onClick={handleUpdateDepid}
                    className="w-96 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
                >
                    Update Department ID
                </button>
            </div>

            <div className="mb-4 flex justify-center items-center gap-1">
                <label className="block w-72 text-gray-700 font-medium">Password</label>
                <input
                    type="text"
                    placeholder='Enter Updated Password'
                    value={Password}
                    onChange={(e) => { setPassword(e.target.value), setErrormessage('') }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                    onClick={handleUpdatePassword}
                    className="w-96 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default UpdateComponent;