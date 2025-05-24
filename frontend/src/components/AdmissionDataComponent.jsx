import React, { useEffect, useState } from 'react';

const AdmissionDataComponent = () => {
    const [admissions, setAdmissions] = useState([]);
    const [approvedCount, setApprovedCount] = useState(0);

    const fetchAdmissions = async () => {
        try {
            const response = await fetch('https://campuspilot.onrender.com/admissions');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAdmissions(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAdmissions()
        const approved = admissions.filter(admission => admission.isApproved);
        setApprovedCount(approved.length);
    }, []);


    const approveAdmissions = async (appId) => {
        try {
            const response = await fetch(`https://campuspilot.onrender.com/admission/approve/${appId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                return;
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    const handleApprove = (appId) => {
        approveAdmissions(appId)
        setAdmissions((prevAdmissions) =>
            prevAdmissions.map((admission) =>
                admission.App_id === appId ? { ...admission, isApproved: true } : admission
            )
        );
    };

    useEffect(() => {
        const approved = admissions.filter(admission => admission.isApproved);
        setApprovedCount(approved.length);
    }, [admissions]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Admission Applications</h1>

                <div className="flex justify-between items-center mb-6">
                    <p className="text-lg font-semibold">Total Applications: {admissions.length}</p>
                    <p className="text-lg font-semibold text-green-600">Approved Applications: {approvedCount}</p>
                </div>

                <div className="space-y-4">
                    {admissions.map((admission) => (
                        <div key={admission.App_id} className="p-4 bg-gray-50 rounded-lg shadow">
                            <p className="text-xl font-semibold">
                                {admission.fname} {admission.lname} - {admission.branch}
                            </p>
                            <p>Email: {admission.email}</p>
                            <p>Mobile: {admission.mobile}</p>
                            <p>Address: {admission.address}</p>
                            <p>Date Applied: {new Date(admission.date).toLocaleDateString()}</p>
                            <p>Status: {admission.isApproved ? <p className='py-2 px-4 rounded-full bg-green-500 w-fit text-white'>'Approved'</p> : <p className='py-2 px-4 rounded-full bg-red-500 w-fit '> 'Pending'</p>}</p>
                            <p className="mt-2">
                                <span className="font-semibold">Document:</span> {admission.Document}
                            </p>

                            {!admission.isApproved && (
                                <button
                                    onClick={() => handleApprove(admission.App_id)}
                                    className="mt-4 px-4 py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700"
                                >
                                    Approve ☐
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdmissionDataComponent;