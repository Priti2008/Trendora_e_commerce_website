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

## 📅 14-Day Development Timeline

### Day 1 – Project Setup

* Analyzed the requirements of the Trendora e-commerce website.
* Set up the project structure and development environment.
* Planned the main modules and features.

### Day 2 – Frontend Setup

* Set up the React and Vite frontend.
* Created the basic folder structure and components.
* Added navigation and routing.

### Day 3 – Home Page

* Developed the Trendora home page.
* Added navigation bar and basic UI components.
* Improved the overall page layout.

### Day 4 – Product Module

* Added product listing functionality.
* Created product cards and product details.
* Organized products into categories.

### Day 5 – Search and Categories

* Implemented product search functionality.
* Added category-based product browsing.
* Improved product display and navigation.

### Day 6 – Wishlist

* Implemented wishlist functionality.
* Added options to add and remove products from the wishlist.
* Improved the product interaction experience.

### Day 7 – User Authentication

* Implemented user registration and login.
* Added authentication functionality.
* Worked on secure password handling.

### Day 8 – Backend Development

* Set up the Node.js and Express.js backend.
* Created backend APIs.
* Connected frontend functionality with backend services.

### Day 9 – Database Integration

* Worked on PostgreSQL database integration.
* Organized user, product, cart, and order-related data.
* Tested database connectivity.

### Day 10 – Cart Module

* Implemented shopping cart functionality.
* Added product quantity and cart management.
* Integrated cart operations with the backend.

### Day 11 – Checkout and Orders

* Developed the checkout functionality.
* Implemented order creation and order management.
* Tested the complete shopping flow.

### Day 12 – Integration and Testing

* Integrated the major frontend and backend modules.
* Tested authentication, products, wishlist, cart, and orders.
* Fixed errors found during testing.

### Day 13 – UI Improvements

* Improved the overall user interface
* Worked on responsive design and page layout.
* Fixed minor UI and functionality issues.

### Day 14 – Documentation and Final Review

* Updated the project documentation.
* Added project screenshots and architecture details.
* Reviewed the complete application and prepared it for demonstration.

## ✅ Current Status

The major modules of the Trendora e-commerce website have been developed and integrated. The project is currently being tested and improved for the final demonstration
⭐ If you like this project, consider giving it a star on GitHub!
