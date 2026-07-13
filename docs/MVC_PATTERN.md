# MVC Pattern

## What is MVC?

MVC stands for Model-View-Controller. It is a software architecture pattern that separates an application into three parts:

- Model
- View
- Controller

This separation makes the project easier to develop, test, and maintain.

---

## Model

The Model is responsible for handling data and interacting with the database.

In our project:

```
server/models/
```

Example:

```
User.js
```

The User model defines the schema for storing user information in MongoDB.

---

## View

The View is the user interface.

In our project, the View is the React frontend located inside:

```
client/
```

It includes pages like:

- Login
- Register
- Dashboard
- Portfolio
- Transactions
- Profile

---

## Controller

The Controller contains the business logic.

It receives requests from the client, processes them, interacts with the Model, and sends responses.

Controllers are located in:

```
server/controllers/
```

---

## Routes

Routes connect API endpoints to controllers.

Routes are located in:

```
server/routes/
```

Example:

```
POST /api/auth/login
        ↓
authController.login()
```

---

## Project Structure

```
stock-trading-app
│
├── client
│   └── React Frontend
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── utils
│
└── docs
```

---

## MVC Workflow

```
User
   │
   ▼
React UI (View)
   │
   ▼
Express Route
   │
   ▼
Controller
   │
   ▼
Model
   │
   ▼
MongoDB
   │
   ▼
Response
   │
   ▼
React UI
```

## Conclusion

Our Stock Trading App follows the MVC architecture by separating the frontend (View), backend logic (Controller), and database models (Model). This improves code organization, scalability, and maintainability.