# ⭐ Rating App

This is a full-stack rating application built as part of a **test challenge**.  
Users can sign up, log in, browse stores, leave ratings, and manage stores depending on their role (User, Owner, Admin).

## 🚀 Live Demo
- **Frontend:** [https://your-frontend-url.onrender.com](https://rating-app-full-stack.onrender.com/)
- **Backend API:** [https://rating-app-2.onrender.com/api](https://rating-app-3.onrender.com//api)

---

## 📌 Features
- **Authentication** (Signup, Login, JWT-based)
- **Role-based Access**:
  - User: Browse and rate stores ( If you want to test user- email- nil@example.com, password- Test@123)
  - Owner: Create and manage their own stores ( If you want to test owner- email- bts@example.com, password- Test@12345678)
  - Admin: Manage all users and stores ( If you want to test admin(one and only admin can create owner and assign them email and password)- email- admin@example.com, password- Test@1234)
- **Secure Password Storage** with bcrypt
- **MongoDB Database**
- **RESTful API** with Express

---

## 🛠 Tech Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Deployment:** Render (Frontend & Backend)

---

## ⚙️ Environment Variables
**Backend `.env`**

- **PORT**=5000
- **MONGO_URI**=your_mongo_connection_string
- **JWT_SECRET**=your_jwt_secret
