import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLoginComponent() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { id: id, password };
        try {
            const response = await fetch("https://campuspilot.onrender.com/login/admin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();

            if (data.valid) {
                setMessage("Login successful!");
                setIsValid(true);
                navigate(`/admin/${id}`)
            } else {
                setMessage("Invalid Admin ID or password.");
                setIsValid(false);
            }

        } catch (error) {
            console.error('Error:', error.message);
            setMessage("An error occurred. Please try again.");
            setIsValid(false);
        }
    };

    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-full max-w-md m-10 p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-blue-600">Login as Admin</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                            Admin ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your Admin ID"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                {message && (
                    <div className="mt-4 text-center">
                        <p className={`text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    </div>
                )}
                <div className="text-center">
                    <p className="text-sm text-gray-600">© 2024 IIITN. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminLoginComponent;
