# Stock Trading App

## Steps for Project Execution

### 1. Introduction

This guide explains how to set up and run the Stock Trading App on a local system. The project uses React for the frontend and Node.js with Express.js for the backend. MongoDB is used to store application data, while Git supports version control and collaboration. Following these steps helps ensure that the application runs correctly in a development environment.

### 2. Prerequisites

Install the following software before starting the project:

- **Node.js**: Provides the runtime environment required to run the frontend and backend application.
- **npm**: Comes with Node.js and is used to install project dependencies and run scripts.
- **Git**: Used to clone the project repository and manage version control.
- **VS Code**: Recommended code editor for viewing, editing, and running the project files.
- **MongoDB Community Server**: Required to run the local MongoDB database service.
- **MongoDB Compass (Optional)**: Provides a graphical interface for viewing and managing MongoDB collections and documents.

### 3. Clone the Repository

Clone the Stock Trading App repository from GitHub using the following command:

```text
git clone <repository-url>
```

Replace `<repository-url>` with the GitHub repository URL provided for the project.

### 4. Navigate to the Project Folder

After cloning the repository, move into the main project directory:

```text
cd Stock-Trading-App
```

This folder contains the client, server, documentation, and configuration files.

### 5. Install Dependencies

Install frontend and backend dependencies separately.

**Frontend**

```text
cd client
npm install
```

This installs React, Vite, and other frontend packages required by the client application.

**Backend**

```text
cd server
npm install
```

This installs Express.js, Mongoose, authentication libraries, and other backend dependencies.

### 6. Configure Environment Variables

Create a `.env` file in the backend folder before starting the server. This file stores private configuration values that should not be committed to GitHub.

Common environment variables include:

- `PORT`: Defines the port used by the backend server.
- `MONGO_URI`: Stores the MongoDB database connection string.
- `JWT_SECRET`: Stores the secret key used for authentication tokens.

Do not include actual secret values in project documentation or public repositories.

### 7. Start MongoDB

Start the MongoDB service before running the backend server. The backend requires an active MongoDB connection to store user accounts, stocks, portfolios, and transactions.

MongoDB Compass may be used optionally to confirm that the database and collections are available.

### 8. Run the Backend Server

Open a terminal in the `server` folder and start the backend server using one of the configured commands:

```text
npm run dev
```

or

```text
npm start
```

The correct command depends on the scripts defined in the backend `package.json` file. The backend server should start only after the MongoDB connection is successful.

### 9. Run the Frontend

Open another terminal in the `client` folder and start the React frontend:

```text
npm run dev
```

The project uses Vite for development, which starts a local development server and provides a browser URL.

### 10. Open the Application

After both frontend and backend services are running, open the browser and access the frontend through the localhost address displayed by Vite.

The application communicates with the backend API through the configured local server address.

### 11. Verify the Application

Verify that the following features are working correctly:

- User registration
- User login
- Dashboard display
- Stock listing
- Buy stocks
- Sell stocks
- Portfolio view
- Transaction history

### 12. Common Troubleshooting

- **npm install errors**: Check the Node.js and npm versions, then delete dependency folders if necessary and reinstall packages.
- **MongoDB connection issues**: Confirm that the MongoDB service is running and that the `MONGO_URI` value is correct.
- **Missing environment variables**: Ensure that the `.env` file exists in the correct backend folder and includes all required variables.
- **Port already in use**: Stop the process using the required port or update the port configuration.
- **Dependency installation problems**: Verify internet connectivity, clear the npm cache if needed, and run 'npm INSTALL' again.

### 13. Conclusion

These steps provide a structured process for executing the Stock Trading App locally. Installing the required software, configuring the environment, and running the frontend and backend separately ensures a stable development setup. Once the application is running, its main trading and portfolio features can be tested successfully.