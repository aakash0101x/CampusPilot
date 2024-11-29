import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const generateCerId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let cerId = '';
  for (let i = 0; i < 20; i++) {
    cerId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return cerId;
};

function CertificationsComponent({ id }) {
  const [Certifications, setCertifications] = useState([]);
  const [Certificate_Enrolled, setCertificate_Enrolled] = useState([]);

  const fetchCertifications = async () => {
    try {
      const response = await fetch('http://localhost:3000/certifications');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCertifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCertificate_Enrolled = async () => {
    try {
      const response = await fetch('http://localhost:3000/certificate-enrolled');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCertificate_Enrolled(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (cer_code, cer_name) => {
    const cer_id = generateCerId(); 
    const enrollmentData = {
      cer_id,
      s_id: id,
      cer_code,
      cer_name,
      isCompleted: false
    };

    try {
      const response = await fetch('http://localhost:3000/certificate-enrolled/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(enrollmentData)
      });

      if (!response.ok) throw new Error('Failed to enroll in certification');

      const result = await response.json();
      alert('Enrolled successfully in certification ' + cer_code);

      fetchCertificate_Enrolled();
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('There was an error enrolling in the certification.');
    }
  };

  const distributed = Certificate_Enrolled.filter(i => i.isCompleted == true).length;
  const totalFees = Certificate_Enrolled.reduce((sum, enrollment) => {
    const certification = Certifications.find(cert => cert.cer_code === enrollment.cer_code);
    return sum + (certification ? parseFloat(certification.fees) : 0);
  }, 0);

  useEffect(() => {
    fetchCertificate_Enrolled();
    fetchCertifications();
  }, []);

  return (
    <div className="min-h-screen py-1">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Certifications</h1>

        <div className="grid grid-cols-2 gap-4 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center bg-blue-500 text-white p-4 rounded-md shadow-md">
            <div className="text-2xl font-semibold">Certificates Distributed</div>
            <CountUp className="text-3xl font-bold mt-2" end={distributed} duration={4} />
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md">
            <div className="text-2xl w-fit mx-auto font-semibold">Total Fees Collected</div>
            <div className="text-3xl w-fit mx-auto font-bold">
              <span>₹</span>
              <CountUp end={totalFees} duration={4} />
            </div>

          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-12 bg-gray-50 rounded-lg shadow-md">
          {
            Certifications.map((cert) => (
              <div
                key={cert.cer_code}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border hover:shadow-xl transition hover:border-green-500 transform hover:scale-105 duration-300"
              >
                <div className="flex flex-col mb-4">
                  <h3 className="text-2xl font-bold text-blue-600">{cert.cer_name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Code: {cert.cer_code}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-semibold text-green-600">Fees: ₹{cert.fees}</p>
                  {id && (
                    <button
                      onClick={() => handleEnroll(cert.cer_code, cert.cer_name)}
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default CertificationsComponent;