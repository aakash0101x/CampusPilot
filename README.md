# CampusPilot - A College Management System

This project is a comprehensive College Management System designed using **React**, **Tailwind CSS**, **Express.js**, and **MySQL**. It facilitates efficient management of college data and provides features for students, faculty, and administrators.

---

## Features

### **Home Page**
- **Notices and News**: Displayed in a ticker format for dynamic updates.
- **Image Slider**: Showcasing college images in an interactive slider.
- **Quick Links**: Links to important resources such as college location, Facebook, X (Twitter), LinkedIn, and YouTube.

### **Admission Page**
- Students from around the world can apply for admission by submitting an online form.

### **Certifications Page**
- Provides information about all certifications offered by the college.

### **Departments and Courses**
- Lists all departments and courses available at the college.

### **Role-Based Features**
#### **Student**
- View personal details:
  - Roll Number
  - Books Borrowed
  - Enrolled Certificates
  - Enrolled Courses
  - Department
- Submit:
  - Grievances
  - Feedback
  - Inquiries

#### **Faculty**
- View total students across all branches.
- Manage student details:
  - Add, Update, Delete, and View.

#### **Admin**
- Manage faculty and student details:
  - View, Update, and Delete.
- Handle grievances, feedback, and inquiries:
  - Mark them as closed.
- Approve or reject student admission requests.

---

## Tech Stack

### **Frontend**
- Framework: **React**
- CSS Framework: **Tailwind CSS**
- Routing: **React Router**
- Build Tool: **Vite**

### **Backend**
- Framework: **Express.js**
- Database: **MySQL**
- File Handling: **Multer**
- CORS enabled for secure cross-origin requests.

---

## Installation and Setup

### **Prerequisites**
- Node.js installed on your system.
- MySQL server running.

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
### **Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm server.js
   ```
   ## License

This project is licensed under the MIT License. See the full license text below:

---

MIT License

Copyright (c) 2024 Aakash

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
