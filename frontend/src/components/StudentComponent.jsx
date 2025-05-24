import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CertificationsComponent } from './'
import { GFIformComponent } from './'

const StudentComponent = () => {
  const { slug } = useParams();

  const [student, setStudent] = useState(null);
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [enrolledCertification, setEnrolledCertification] = useState([]);
  const [libraryMembers, setLibraryMembers] = useState([])

  const [mountGrievences, setmountGrievences] = useState(false)
  const [mountFeedback, setmountFeedback] = useState(false)
  const [mountInquiry, setmountInquiry] = useState(false)
  const [mountCertificationsComponent, setmountCertificationsComponent] = useState(false)

  const fetchStudent = async () => {
    try {
      const response = await fetch('https://campuspilot.onrender.com/students');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const s = data.find((i) => i.s_id === slug);
      setStudent(s);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnrolledCourse = async () => {
    try {
      const response = await fetch(`https://campuspilot.onrender.com/enrolled_course/${slug}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEnrolledCourse(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnrolledCertification = async () => {
    try {
      const response = await fetch("https://campuspilot.onrender.com/certificate-enrolled");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredData = data.filter((i) => i.s_id === slug);
      setEnrolledCertification(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLibraryMember = async () => {
    try {
      const response = await fetch("https://campuspilot.onrender.com/library-members");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredData = data.filter((i) => i.s_id === slug);
      setLibraryMembers(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickEnroll = () => {
    setmountCertificationsComponent((prev) => !prev)
  }
  const handleClickGrievences = () => {
    setmountGrievences((prev) => !prev)
  }
  const handleClickFeedback = () => {
    setmountFeedback((prev) => !prev)
  }
  const handleClickInquiry = () => {
    setmountInquiry((prev) => !prev)
  }


  useEffect(() => {
    fetchStudent();
    fetchEnrolledCourse();
    fetchEnrolledCertification();
    fetchLibraryMember();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      {student ? (
        <div className="bg-white m-4 text-cn shadow-lg rounded-lg p-6 w-5/6">
          <h2 className="text-4xl font-semibold mb-4 text-green-700">
            Welcome, {student.fname} {student.lname}!
          </h2>
          <p className="text-gray-700 text-lg">
            <strong>Student ID:</strong> {student.s_id}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Email:</strong> {student.email}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Phone:</strong> {student.phone_no}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Department:</strong> {student.dep_id}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Total Courses Enrolled:</strong> {enrolledCourse.length}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Total Certifications Enrolled:</strong> {enrolledCertification.length}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Total Books Borrowed:</strong> {libraryMembers.length}
          </p>
          <div>
            <button className='bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 mt-3 text-white text-lg mr-3' onClick={handleClickEnroll}>Enroll in certifications</button>
            <button className='bg-red-500 hover:bg-red-600 rounded-md px-2 py-1 mt-3 text-white text-lg mr-3' onClick={handleClickGrievences}>Submit Grievences</button>
            <button className='bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 mt-3 text-white text-lg mr-3' onClick={handleClickFeedback}>Submit Feedback
            </button>
            <button className='bg-violet-500 hover:bg-violet-600 rounded-md px-2 py-1 mt-3 text-white text-lg mr-3' onClick={handleClickInquiry}>Submit Inquiry</button>
            <div className='flex justify-center gap-2'>
              {mountFeedback && <GFIformComponent formname="Feedback" pid={slug} />}
              {mountGrievences && <GFIformComponent formname="Grievences" pid={slug} />}
              {mountInquiry && <GFIformComponent formname="Inquiry" pid={slug} />}
            </div>
            {mountCertificationsComponent && <CertificationsComponent id={slug} />}
          </div>
          {enrolledCourse.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2 text-green-700">Enrolled Courses</h3>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Course ID
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Course Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourse.map((course) => (
                    <tr key={course.c_id}>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{course.c_id}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{course.c_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {enrolledCertification.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2 text-green-700">Enrolled Certifications</h3>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Certification ID
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Certification Code
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Certification Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Completion Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCertification.map((certification) => (
                    <tr key={certification.cer_id}>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{certification.cer_id}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{certification.cer_code}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{certification.cer_name}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                        {certification.isCompleted ? 'Completed' : 'Not Completed'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {libraryMembers.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2 text-green-700">Books borrowed</h3>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Book ID
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Issue Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Return Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-200 text-left text-gray-700 font-semibold">
                      Fine
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {libraryMembers.map((member) => (
                    <tr key={member.B_id}>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{member.B_id}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{new Date(member.issueDate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{new Date(member.returnDate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{member.fine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-10">Action Not Allowed</p>
      )}
    </div>
  );
};

export default StudentComponent;