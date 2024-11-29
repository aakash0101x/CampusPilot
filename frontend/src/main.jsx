import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import CertificationsPage from './pages/CertificationsPage.jsx';
import GrievancesandFeedbackPage from './pages/GrievancesandFeedbackPage.jsx';
import FacultiesPage from './pages/FacultiesPage.jsx';
import CampusTourPage from './pages/CampusTourPage.jsx';
import Department_and_coursesPage from './pages/Department_and_coursesPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import StudentLoginPage from './pages/StudentLoginPage.jsx';
import FacultyLoginPage from './pages/FacultyLoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import FacultyPage from './pages/FacultyPage.jsx';
import StudentPage from './pages/StudentPage.jsx';
import UpdatePage from './pages/UpdatePage.jsx';
import AdmissionFormPage from './pages/AdmissionFormPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "library-page",
        element: <LibraryPage />
      },
      {
        path: "certifications-page",
        element: <CertificationsPage />
      },
      {
        path: "grievances-feedback",
        element: <GrievancesandFeedbackPage />
      },
      {
        path: "faculty",
        element: <FacultiesPage />
      },
      {
        path: "campus-tour",
        element: <CampusTourPage />
      },
      {
        path: "department-and-courses",
        element: <Department_and_coursesPage />
      },
      {
        path: "student-login",
        element: <StudentLoginPage />
      },
      {
        path: "admin-login",
        element: <AdminLoginPage />
      },
      {
        path: "faculty-login",
        element: <FacultyLoginPage />
      },
      {
        path: "admin/:slug",
        element: <AdminPage />
      },
      {
        path: "faculty/:slug",
        element: <FacultyPage />
      },
      {
        path: "student/:slug",
        element: <StudentPage />
      },
      {
        path: "/:slug1/update/:slug2",
        element: <UpdatePage />
      },
      {
        path: "/admission-form",
        element: <AdmissionFormPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
