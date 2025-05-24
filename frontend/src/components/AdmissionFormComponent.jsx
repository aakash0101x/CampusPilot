import React, { useState } from 'react';

const generateAppId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let appId = '';
    for (let i = 0; i < 30; i++) {
        appId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return appId;
};

const AdmissionFormComponent = () => {
    const [formData, setFormData] = useState({
        App_id: generateAppId(),
        branch: '',
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        address: '',
        date: new Date().toISOString().split("T")[0], 
        isApproved: false,
        Document: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await fetch('https://campuspilot.onrender.com/admission-form/submit', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Something went wrong while submitting the form');
            }

            const result = await response.json();
            alert('Admission form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    };

    return (
        <div className='bg-orange-200 p-6'>
            <div className="bg-white px-10 py-6 w-3/4 mx-auto rounded-md text-xl text-gray-700 font-serif ring-green-400 hover:ring-2 text-center">
                Welcome to <strong>Indian Institute Of Information of Technology, Nagpur</strong>, where knowledge meets innovation!
                We invite ambitious students to join our prestigious college and take the first step toward an exciting career.
                At IIITN, we offer a wide range of courses, excellent faculty, and a vibrant campus environment
                to nurture your dreams. Fill out the form below to start your admission process and be part of a community
                that values education, creativity, and excellence.
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
                <h2 className="text-3xl font-serif text-center text-indigo-600 mb-6">Admission Form</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">App ID</label>
                        <input
                            type="text"
                            name="App_id"
                            value={formData.App_id}
                            readOnly
                            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label>
                        <input
                            type="text"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Biodata : It should be less than 16MB</label>
                        <input
                            type="file"
                            name="Document"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdmissionFormComponent;
