# 🤖 AI Model Inventory Manager

A full-stack web application for managing, browsing, and purchasing AI models. Users can add, update, search, filter, and track AI models with secure authentication and a modern responsive UI.  

## 🚀 Key Features

### 🔐 Authentication & Authorization

- Email/Password & Google Sign-In using Firebase  
- Protected routes for adding, updating, and purchasing models  
- Persistent login on page reload  

### 📦 AI Model Management (CRUD)

- Add, edit, delete, and view AI models  
- Each model includes framework, use case, dataset, description, and image  
- Only the creator can modify or delete their models  

### 🔎 Search & Filter

- Search AI models by name (case-insensitive)
- Filter models by framework (TensorFlow, PyTorch, etc.)
- Instant UI updates without page reload

### 🛒 Model Purchase Tracking

- Purchase models and track purchase count in real time
- Separate “My Models” and “Purchased Models” pages

### 🌗 User Experience

- Dark / Light theme toggle
- Loading spinners during data fetch & form submission
- Custom 404 error page
- Fully responsive design (mobile, tablet, desktop)\

## 🛠️ Tech Stack

**Frontend:** React, React Router, Tailwind CSS, DaisyUI  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** Firebase 
