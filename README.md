# 📚 Online Learning Platform

A full-stack web-based Learning Management System built using **Node.js**, **Express**, **MongoDB**, **EJS**, and **JWT Authentication**. Users can register, log in, view courses, and admins can manage content through a role-based dashboard.

---

## 🚀 Features

- ✅ User registration and JWT-based login
- 🧑‍🎓 Role-based access (Admin & Student)
- 📋 Admin dashboard for course management
- 📚 Students can view and access courses
- 🔐 Secure password hashing (bcryptjs)
- 🌐 Dynamic views with EJS
- 🧩 Modular route and middleware setup

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, EJS
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs
- **Environment Management:** dotenv

---

## 📁 Folder Structure

online-learning-platform/
│ ├── models/ # Database models (Mongoose) 
  ├── routes/ # Auth, dashboard, and course routes 
  ├── views/ # EJS templates 
  ├── public/ # CSS, JS, and images
  ├── middleware/ # Auth and role middleware 
  ├── .env # Environment variables 
  ├── app.js # Main server file 
  └── package.json

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Learn-Craft/OnlineLearningPlatform
cd online-learning-platform

```
### 2. Install Dependencies

```bash
npm install

```

### 3.  Create a .env file

```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the application

```bash
npm start
```
