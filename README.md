# 🛒 Trendora - Microservices E-Commerce Application

Trendora is a full-stack e-commerce application built using **React, Node.js, Express, PostgreSQL, and Microservices Architecture**.  
The project demonstrates product management, user authentication, cart functionality, order processing, and API gateway integration.

---

## ✨ Features

### Frontend (React + Vite)
- 🏠 Home page
- 📦 Product listing
- 🔍 Product search
- 🛒 Add to cart
- 💾 Persistent cart using Local Storage
- 🔐 User registration
- 🔑 User login
- 📄 Order history page

### Backend (Microservices)
- 📦 Product Service
- 👤 User Service
- 📋 Order Service
- 🌐 API Gateway

### Database
- 🐘 PostgreSQL integration for product management

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
