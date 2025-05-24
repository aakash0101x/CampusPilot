import React from "react";
import { useState, useEffect } from "react";
import CountUp from "react-countup";

function GrievancesandFeedbackComponent({ action }) {
  const [grievences, setgrievences] = useState([])
  const [feedbacks, setfeedbacks] = useState([])
  const [inquiries, setinquiries] = useState([])
  const fetchGrievences = async () => {
    try {
      const response = await fetch('https://campuspilot.onrender.com/grievences');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setgrievences(data);
      console.log("from grievences")
      console.log(grievences)
    } catch (err) {
      console.error(err);
    }
  };
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('https://campuspilot.onrender.com/feedback');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("from feedback")
      setfeedbacks(data);
      console.log(feedbacks)
    } catch (err) {
      console.error(err);
    }
  };
  const fetchInquiry = async () => {
    try {
      const response = await fetch('https://campuspilot.onrender.com/inquiry');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("from inquiry")
      setinquiries(data);
      console.log(feedbacks)
    } catch (err) {
      console.error(err);
    }
  };
  const formatDate = (dateString) => {
    if (dateString == null) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleClickClosed = async (slug, id) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const response = await fetch(`https://campuspilot.onrender.com/${slug}/mark-closed/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formattedDate }),
      });

      if (response.ok) {
        alert("updated successfully. It may take some time to reflect changes in database");
      } else {
        alert("Failed to submit: ");
      }
    } catch (error) {
      console.error('Failed to update', error);
      alert("Sorry, there was an error: " + error.message);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };

    try {
      const response = await fetch("https://campuspilot.onrender.com/contact-us/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your form has been submitted successfully!");
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form: ", error);
      alert("An error occurred. Please try again later.");
    }
  };
  useEffect(() => {
    fetchGrievences()
    fetchFeedbacks()
    fetchInquiry()
  }, []);

  const grievencesPosted = grievences.length;
  const grievencesOpen = grievences.filter(g => g.dateClosed === null).length;
  const grievencesClosed = grievencesPosted - grievencesOpen

  const feedbacksPosted = feedbacks.length
  const feedbacksOpen = feedbacks.filter(f => f.dateClosed === null).length;
  const feedbacksClosed = feedbacksPosted - feedbacksOpen

  const inquiriesPosted = inquiries.length
  const inquiriesOpen = inquiries.filter(i => i.dateClosed === null).length;
  const inquiriesClosed = inquiriesPosted - inquiriesOpen;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Grievances and Feedback Management System</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Grievances Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Grievances Posted</h3>
            <CountUp className="text-3xl font-bold" end={grievencesPosted} duration={4} />
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Grievances Open</h3>
            <CountUp className="text-3xl font-bold" end={grievencesOpen} duration={4} />          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Grievances Closed</h3>
            <CountUp className="text-3xl font-bold" end={grievencesClosed} duration={4} />          </div>
        </div>
      </div>


      <div className="bg-gray-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Grievances</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Grievance ID</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Details</th>
              <th className="py-2 px-4 border">Date Posted</th>
              <th className="py-2 px-4 border">Date Closed</th>
              {action && <th className="py-2 px-4 border">Action</th>}
            </tr>
          </thead>
          <tbody>
            {grievences.map((g) => (
              <tr key={g.id}>
                <td className="py-2 px-4 border">{g.id}</td>
                <td className="py-2 px-4 border">{g.subject}</td>
                <td className="py-2 px-4 border">{g.details}</td>
                <td className="py-2 px-4 border">{formatDate(g.datePosted)}</td>
                <td className="py-2 px-4 border">{formatDate(g.dateClosed) || "Open"}</td>
                {action && <td className="py-2 px-4 border">{g.dateClosed ? <div className="bg-green-500 w-fit mx-auto text-white px-3 py-1 rounded">Closed</div> : <button className="bg-yellow-500 hover:bg-yellow-600 w-fit text-white px-3 py-1 rounded mx-auto cursor-pointer" onClick={() => handleClickClosed("Grievences", g.id)}>Mark as Closed</button>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Feedbacks Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Feedbacks Posted</h3>
            <CountUp className="text-3xl font-bold" end={feedbacksPosted} duration={4} />
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Feedbacks Open</h3>
            <CountUp className="text-3xl font-bold" end={feedbacksOpen} duration={4} />
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Feedbacks Closed</h3>
            <CountUp className="text-3xl font-bold" end={feedbacksClosed} duration={4} />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Feedback Received</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Feedback ID</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Details</th>
              <th className="py-2 px-4 border">Date Posted</th>
              <th className="py-2 px-4 border">Date Closed</th>
              {action && <th className="py-2 px-4 border">Action</th>}

            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id}>
                <td className="py-2 px-4 border">{f.id}</td>
                <td className="py-2 px-4 border">{f.subject}</td>
                <td className="py-2 px-4 border">{f.details}</td>
                <td className="py-2 px-4 border">{formatDate(f.datePosted)}</td>
                <td className="py-2 px-4 border">{formatDate(f.dateClosed) || "Open"}</td>
                {action && <td className="py-2 px-4 border">{f.dateClosed ? <div className="bg-green-500 w-fit text-white px-3 py-1 rounded mx-auto">Closed</div> : <button className="bg-yellow-500 hover:bg-yellow-600 w-fit text-white px-3 py-1 rounded mx-auto cursor-pointer" onClick={() => handleClickClosed("Feedback", f.id)}>Mark as Closed</button>}</td>}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Grievances Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Grievances Posted</h3>
            <CountUp className="text-3xl font-bold" end={inquiriesPosted} duration={4} />
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Grievances Open</h3>
            <CountUp className="text-3xl font-bold" end={inquiriesOpen} duration={4} />
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Grievances Closed</h3>
            <CountUp className="text-3xl font-bold" end={inquiriesClosed} duration={4} />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Inquiry Received</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Inquiry ID</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Details</th>
              <th className="py-2 px-4 border">Date Posted</th>
              <th className="py-2 px-4 border">Date Closed</th>
              {action && <th className="py-2 px-4 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {inquiries.map((i) => (
              <tr key={i.id}>
                <td className="py-2 px-4 border">{i.id}</td>
                <td className="py-2 px-4 border">{i.subject}</td>
                <td className="py-2 px-4 border">{i.details}</td>
                <td className="py-2 px-4 border">{formatDate(i.datePosted)}</td>
                <td className="py-2 px-4 border">{formatDate(i.dateClosed) || "Open"}</td>
                {action && <td className="py-2 px-4 border">{i.dateClosed ? <div className="bg-green-500 w-fit text-white px-3 py-1 rounded mx-auto">Closed</div> : <button className="bg-yellow-500 hover:bg-yellow-600 w-fit text-white px-3 py-1 rounded mx-auto cursor-pointer" onClick={() => handleClickClosed("Inquiry", i.id)}>Mark as Closed</button>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!action && <div className="flex">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg shadow-lg mb-8 text-xl w-2/4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            We'd Love to Hear From You!
          </h2>
          <p className="text-gray-700 mb-4">
            Have questions, feedback, or inquiries? Fill out our <span className="font-medium text-blue-600">Contact Us</span> form, and we’ll get back to you promptly.
          </p>
          <p className="text-gray-700">
            Your input helps us serve you better. Please provide accurate details so we can respond effectively.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow mb-8 w-1/3 mx-auto font-mono">
          <h2 className="text-2xl font-mono mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
            <input name="name" type="text" placeholder="Name" className="p-2 border rounded" />
            <input name="email" type="email" placeholder="Email" className="p-2 border rounded" />
            <input name="phone" type="tel" placeholder="Phone" className="p-2 border rounded" />
            <button type="submit" className="bg-blue-500 w-fit mx-auto text-white py-2 px-5 hover:bg-blue-600 rounded">Submit</button>
          </form>
        </div>
      </div>
      }
    </div>
  );
}

export default GrievancesandFeedbackComponent;