# 🛍️ Trendora – Full Stack Fashion E-Commerce Web Application

Trendora is a premium full-stack fashion e-commerce web application built using **React (Vite)** for the frontend and **Express.js** for the backend. It includes user authentication, product search, wishlist, shopping cart, checkout flow, order history, and a responsive dark user interface.

---

## ✨ Features

### 👤 Authentication
- User registration
- User login
- Password hashing with bcrypt
- JWT token generation
- Profile display after login
- Logout functionality

### 🛒 Shopping
- Product search
- Category filtering
- Wishlist
- Shopping cart
- Product quick-view popup
- Checkout page
- Order success page
- Order history page
- Persistent cart using Local Storage

### 🎨 UI/UX
- Premium dark theme
- Responsive design
- Sticky navbar
- Professional product cards
- Smooth user flow

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router

### Backend
- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- cors

### Database
- PostgreSQL-ready backend structure

---

## 🏗️ Architecture

```text
Frontend (React)
        |
        v
API Gateway (5000)
   /        |        \
  v         v         v
Users     Products   Orders
5001       5002       5003
```

---

## 📂 Project Structure

```text
trendora-fashion-store/
├── frontend/
├── backend/
├── gateway/
├── services/
└── project-screenshots/
```

---

## 🚀 Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🚀 Run Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

## 📸 Screenshots

- Home
- Search
- Product Popup
- Login
- Register
- Cart
- Checkout
- Orders

---

## 🎯 Learning Outcomes

This project helped me learn:

- Full-stack development
- REST API integration
- Authentication implementation
- Git & GitHub workflow
- Responsive UI design
- Component-based architecture

---

## 📌 Future Improvements

- Real PostgreSQL persistence
- Payment gateway integration
- Admin dashboard
- Product management
- Real order storage
- Email verification
- Cloud deployment

---

## 👥 Team

- **Sanjana Dhali** — Team Leader & Frontend
- **Priti Yadav** — Backend 

---

⭐ If you like this project, consider giving it a star on GitHub!
