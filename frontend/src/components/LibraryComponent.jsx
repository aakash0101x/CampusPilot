import React, { useState } from 'react';
import { useEffect } from 'react';
import CountUp from 'react-countup';

const LibraryComponent = () => {
  const [Inventory, setInventory] = useState([])
  const [Members, setMembers] = useState([])

  const fetchBook = async () => {
    try {
      const response = await fetch('https://campuspilot.onrender.com/book');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInventory(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchMembers = async () => {
    try {
      const response = await fetch('https://campuspilot.onrender.com/library-members');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBook()
    fetchMembers()
  }, []);

  const Total_Books = Inventory.reduce((sum, book) => sum + book.total_quantity, 0);
  const Total_Fine = Members.reduce((sum, m) => sum + m.fine, 0.00)
  const Total_Books_issued = Members.length

  return (
    <div className="max-w-7xl mx-auto p-8 mb-10 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">College Library Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md duration-300 hover:scale-110">
          <h3 className="text-lg font-medium">Total Books</h3>
          <CountUp className="text-3xl font-bold mt-2" end={Total_Books} duration={4} />

        </div>
        <div className="bg-green-500 text-white rounded-lg p-6 shadow-md duration-300 hover:scale-110">
          <h3 className="text-lg font-medium">Fine Collected</h3>
          <span className="text-3xl font-bold">₹</span>
          <CountUp className="text-3xl font-bold mt-2" end={Total_Fine} duration={4} />

        </div>

        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md duration-300 hover:scale-110">
          <h3 className="text-lg font-medium">Books Issued</h3>
          <CountUp className="text-3xl font-bold mt-2" end={Total_Books_issued} duration={4} />
          
        </div>
      </div>

      <div className="mt-8 mb-8">
        <h2 className="text-4xl font-mono mb-4">Inventory</h2>
        <table className="w-full bg-white rounded-md shadow-sm overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Copies Available</th>
            </tr>
          </thead>
          <tbody>
            {Inventory.map((book) => (
              <tr key={book.id} className="border-b">
                <td className="py-2 px-4">{book.B_id}</td>
                <td className="py-2 px-4">{book.B_name}</td>
                <td className="py-2 px-4">{book.B_author}</td>
                <td className="py-2 px-4">{book.total_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default LibraryComponent;