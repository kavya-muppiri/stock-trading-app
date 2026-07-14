# Stock Trading App

## User Flow

### 1. Introduction

The User Flow describes how users interact with the Stock Trading App from accessing the application to managing their portfolio and exploring different modules. The application follows a simple and intuitive navigation flow, allowing users to securely authenticate, access their dashboard, and perform paper trading activities.


### 2. User Flow Diagram


                    START
                      │
                      ▼
               Landing Page
                      │
              Click "Get Started"
                      │
                      ▼
                 Login Page
                 /          \
                /            \
        Register           Login
           │                 │
           ▼                 ▼
    Registration      Authentication
      Successful             │
           │                 ▼
           └────────────► Dashboard
                              │
     ┌─────────────┬──────────────┬──────────────┐
     ▼             ▼              ▼              ▼
  Profile       History        Users         Admin
                                                 │
                          ┌──────────────────────┴─────────────────────┐
                          ▼                                            ▼
                   All Orders                               All Transactions
                                                                     │
                                                                     ▼
                                                            Stock Analytics
                                                                     │
                                                                     ▼
                                                                   Logout
                                                                     │
                                                                     ▼
                                                               Landing Page




### 3. User Navigation Process

1. The user opens the application and lands on the **Landing Page**.
2. Clicking **Get Started** redirects the user to the **Login Page**.
3. New users can create an account using the **Register Page**.
4. After successful login, the user is redirected to the **Dashboard**.
5. From the Dashboard, users can navigate to:
   - Profile
   - History
   - Users
   - Admin Dashboard
   - All Orders
   - All Transactions
   - Stock Analytics
6. Users can return to the Dashboard using the provided navigation links.
7. Selecting **Logout** ends the session and redirects the user back to the Landing Page.

### 4. Navigation Highlights

- Landing Page serves as the application's entry point.
- Secure authentication through Login and Registration.
- Dashboard acts as the central navigation hub.
- All major modules are accessible from the Dashboard.
- Each module provides navigation back to the Dashboard.
- Logout safely returns the user to the Landing Page.

### 5. Summary

The Stock Trading App follows a structured and user-friendly navigation flow. Users can easily register, log in, access the dashboard, navigate across different modules, and log out securely. This design ensures a smooth and intuitive experience while supporting all major features of the application.