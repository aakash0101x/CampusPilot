import React, { useState, useEffect } from 'react';

const AdminComponent = ({ admininfo }) => {
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    fname: '',
    lname: '',
    email: '',
    phone_no: '',
    dep_id: '',
    password: '',
    isActive: true,
    title: '',
    author: '',
    qty: 0
  });

  const handleAddData = async () => {
    let endpoint;

    switch (showForm) {
      case 'student':
        endpoint = 'https://campuspilot.onrender.com/student/add';
        break;
      case 'faculty':
        endpoint = 'https://campuspilot.onrender.com/faculty/add';
        break;
      case 'book':
        endpoint = 'https://campuspilot.onrender.com/book/add';
        break;
      default:
        console.error('Invalid form type');
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
      alert(`${showForm.charAt(0).toUpperCase() + showForm.slice(1)} added successfully!`);
      setFormData({
        id: '',
        fname: '',
        lname: '',
        email: '',
        phone_no: '',
        dep_id: '',
        password: '',
        isActive: true,
        title: '',
        author: '',
        qty: 0

      });
      setShowForm(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="w-full h-5/6 flex justify-center items-center bg-gray-100">

      <div className="max-w-3xl mx-auto bg-white p-16 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome, {admininfo.fname} {admininfo.lname}!
        </h2>
        <p className="text-gray-600 text-lg font-mono mb-2">
          Department: {admininfo.dep_id === 'CSE' ? 'Computer Science' : 'Electronics and Communication'}
        </p>
        <p className="text-gray-500 mt-4 text-lg">
          We're glad to have you here. You can manage student data and access your resources with ease.
        </p>

        <div className="mt-6 space-x-7">
          <button onClick={() => setShowForm('student')} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded">Add Student</button>
          <button onClick={() => setShowForm('faculty')} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-lg rounded">Add Faculty</button>
          <button onClick={() => setShowForm('book')} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-lg rounded">Add Book</button>
        </div>

        {showForm && (
          <div className="mt-8 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-2xl font-semibold mb-4">Add {showForm === 'student' ? 'Student' : showForm === 'faculty' ? 'Faculty' : 'Book'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddData(); }}>
              {(showForm === 'student' || showForm === 'faculty') && (
                <>
                  <div className="mb-4">
                    <input
                      placeholder='Enter ID'
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter First Name'
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter Last Name'
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter email'
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter Phone no'
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Department ID'
                      type="text"
                      name="dep_id"
                      value={formData.dep_id}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter Password'
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </>
              )}

              {showForm === 'book' && (
                <>
                  <div className="mb-4">
                    <input
                      placeholder='Enter Book ID'
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter Title'
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter Author'
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder='Enter Quantity'
                      type="number"
                      name="qty"
                      min={0}
                      value={formData.qty}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </>
              )}

              {showForm === 'faculty' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Is Active:</label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                  />
                </div>
              )}
              <button type="submit" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded">
                Add {showForm === 'student' ? 'Student' : showForm === 'faculty' ? 'Faculty' : 'Book'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComponent;