import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdminComponent, FacultiesComponent, GrievancesandFeedbackComponent, AdmissionDataComponent, StudentsData } from '../components';

const AdminPage = () => {
  const { slug } = useParams();
  const [admin, setAdmin] = useState({});
  const [activeComponent, setActiveComponent] = useState('Admin');
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const fetchAdmin = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const selectedAdmin = data.find((a) => a.id === slug);
      setAdmin(selectedAdmin);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [slug]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Admin':
        return <AdminComponent admininfo={admin} />;
      case 'StudentsData':
        return <StudentsData />;
      case 'Faculties':
        return <FacultiesComponent action={true} />;
      case 'Grievances':
        return <GrievancesandFeedbackComponent action={true} />;
      case 'Admission':
        return <AdmissionDataComponent />;
      default:
        return <AdminComponent admininfo={admin} />;
    }
  };

  return (
    admin ? (
      <div className="flex gap-1 mt-8">
        <button
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          className="z-10 p-2 bg-orange-600 text-white h-screen rounded-md hover:bg-blue-700"
        >
          {isNavbarOpen ? '╳' : '☰'}
        </button>

        {isNavbarOpen && (
          <div className="w-56 bg-blue-100 text-white h-screen flex flex-col items-center py-8 transition-transform rounded-xl px-2 duration-300">
            <button
              className={`py-2 px-4 mb-4 w-full text-left rounded-full ${activeComponent === 'Admin' ? 'bg-blue-500' : 'bg-gray-700'}`}
              onClick={() => setActiveComponent('Admin')}
            >
              Admin Info
            </button>
            <button
              className={`py-2 px-4 mb-4 w-full text-left rounded-full ${activeComponent === 'StudentsData' ? 'bg-blue-500' : 'bg-gray-700'}`}
              onClick={() => setActiveComponent('StudentsData')}
            >
              Students Data
            </button>
            <button
              className={`py-2 px-4 mb-4 w-full text-left rounded-full ${activeComponent === 'Faculties' ? 'bg-blue-500' : 'bg-gray-700'}`}
              onClick={() => setActiveComponent('Faculties')}
            >
              Faculties
            </button>
            <button
              className={`py-2 px-4 mb-4 w-full text-left rounded-full ${activeComponent === 'Grievances' ? 'bg-blue-500' : 'bg-gray-700'}`}
              onClick={() => setActiveComponent('Grievances')}
            >
              Grievances & Feedback
            </button>
            <button
              className={`py-2 px-4 mb-4 w-full text-left rounded-full ${activeComponent === 'Admission' ? 'bg-blue-500' : 'bg-gray-700'}`}
              onClick={() => setActiveComponent('Admission')}
            >
              Admission Data
            </button>
          </div>
        )}

        <div className={`${isNavbarOpen ? 'w-5/6' : 'w-full'} transition-width duration-300 h-screen overflow-scroll`}>
          {renderComponent()}
        </div>
      </div>
    ) : (
      <div className="text-5xl font-mono py-36 text-red-500 w-fit mx-auto">
        Action Not Allowed
      </div>
    )
  );
}

export default AdminPage;