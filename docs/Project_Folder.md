# Stock Trading App

## Project Folder Structure

### 1. Introduction

The Stock Trading App follows a well-organized folder structure based on the MERN Stack architecture. The project is divided into separate frontend, backend, and documentation modules, making the application easy to develop, maintain, and scale.

## 2. Project Structure

```text
Stock-Trading-App/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── AllOrders.jsx
│   │   │   ├── AllTransactions.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── AdminStockChart.jsx
│   │   │   └── Corresponding CSS Files
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── docs/
│   ├── architecture/
│   ├── design/
│   ├── frontend/
│   ├── ER_Diagram.md
│   ├── Features.md
│   ├── MVC_PATTERN.md
│   ├── Project_Folder.md
│   ├── Roles_Responsibilities.md
│   └── USER_FLOW.md
│
├── README.md
└── .gitignore
```


## 3. Frontend Module

The frontend is developed using **React.js** with **Vite** and follows a component-based architecture. It includes:

- Landing Page
- Login Page
- Register Page
- Dashboard
- Profile
- History
- Users
- All Orders
- All Transactions
- Admin Dashboard
- Stock Analytics

React Router DOM is used for seamless navigation between all application pages.

## 4. Backend Module

The backend is developed using **Node.js**, **Express.js**, and **MongoDB**. It manages:

- User Authentication
- Stock Management
- Portfolio Management
- Trading Operations
- Transaction Management
- REST API Services

## 5. Documentation Module

The `docs` folder contains all project documentation, including:

- ER Diagram
- Features
- MVC Pattern
- Project Folder Structure
- User Flow
- Roles and Responsibilities

These documents provide a complete overview of the project's architecture, implementation, and team contributions.

## 6. Summary

The Stock Trading App follows a modular MERN Stack folder structure that separates frontend, backend, and documentation components. This organization improves maintainability, supports collaborative development through GitHub, and enables efficient project scaling and future enhancements.