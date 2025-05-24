import React, { useState, useEffect } from 'react';

const GFIformComponent = ({ formname, pid }) => {
    const generateId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let Id = '';
        for (let i = 0; i < 20; i++) {
            Id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return Id;
    };

    const [formData, setFormData] = useState({
        id: '',
        s_id: pid,
        subject: '',
        details: '',
        datePosted: null,
        dateClosed: null,
    });

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData({
            ...formData,
            id: generateId(),
            datePosted: today,
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://campuspilot.onrender.com/form/${formname}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    id: generateId(),
                    s_id: pid,
                    subject: '',
                    details: '',
                    datePosted: new Date().toISOString().split('T')[0],
                    dateClosed: null,
                });
                alert("Submitted successfully: ");
            } else {
                alert("Failed to submit: ");
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert("Sorry, there was an error in submission: " + error.message);
        }
    };


    return (
        <div className="w-1/3 mx-auto bg-cyan-100 mt-4 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Submit {formname}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
                        ID
                    </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="details" className="block text-gray-700 font-medium mb-2">
                        Details
                    </label>
                    <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GFIformComponent;