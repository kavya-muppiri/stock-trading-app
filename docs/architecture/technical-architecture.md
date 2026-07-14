# Stock Trading App – Technical Architecture Documentation

**Project:** SB Stocks – MERN Stack Paper Trading Application
**Document Type:** System & Software Architecture Specification
**Stack:** MongoDB, Express.js, React.js, Node.js (MERN)

---

## 1. Project Overview

SB Stocks is a full-stack Paper Trading web application that allows users to practice stock market investing using virtual currency, without financial risk. The platform simulates a real trading environment where users can register an account, receive a starting virtual balance, browse and search live stock listings, execute buy and sell orders, and track the performance of their simulated portfolio over time.

Paper trading is a widely used method for learning market mechanics — users make investment decisions based on real or near-real stock price data, and the outcomes of those decisions (profit or loss) are tracked against a virtual balance instead of real money. This removes financial risk while preserving the decision-making and analytical experience of actual trading.

SB Stocks is built on the **MERN stack** (MongoDB, Express.js, React.js, Node.js), a JavaScript-based technology stack that enables a unified language across the entire application — from the database layer to the client-facing UI. This architecture was chosen for its scalability, strong community support, JSON-native data flow, and suitability for building fast, API-driven single-page applications.

---

## 2. System Architecture

The application follows a classic three-tier client-server architecture, with an additional external integration layer for live stock market data.

```
                    ┌─────────────────────────┐
                    │      React Frontend      │
                    │   (Client / Browser SPA)  │
                    └────────────┬─────────────┘
                                 │
                                 │  HTTPS / REST API Calls (Axios)
                                 ▼
                    ┌─────────────────────────┐
                    │     Express.js Backend    │
                    │  (Node.js Runtime Server)  │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┼────────────────┐
                 │                                 │
                 ▼                                 ▼
      ┌─────────────────────┐          ┌──────────────────────┐
      │   MongoDB Database   │          │  External Stock Market │
      │  (Mongoose ODM Layer) │          │         API             │
      └─────────────────────┘          └──────────────────────┘
```

**Flow summary:**

- The React frontend renders the UI and sends REST API requests to the Express backend.
- The Express backend processes requests, applies business logic, and communicates with MongoDB for persistent data (users, transactions, watchlist).
- For live or near-live stock price data, the backend communicates with an external Stock Market API and relays formatted data back to the frontend.
- MongoDB never communicates directly with the frontend or the external API — all data flows through the Express backend, preserving separation of concerns.

---

## 3. Architecture Layers

### 3.1 Presentation Layer
Implemented in React.js. Responsible for rendering UI components, handling user interaction, client-side routing, and displaying data received from the backend. Contains no direct database or business logic.

### 3.2 Business Logic Layer
Implemented in Express.js controllers. Responsible for validating requests, applying trading rules (e.g., sufficient balance check before a buy order, sufficient holdings check before a sell order), calculating profit/loss, and orchestrating data operations.

### 3.3 Data Access Layer
Implemented using Mongoose models and schemas. Responsible for defining data structure, enforcing schema-level validation, and providing an abstraction between the business logic and the raw MongoDB queries.

### 3.4 Database Layer
MongoDB, a NoSQL document database, stores all persistent application data — user accounts, transaction records, and watchlist entries — in a flexible, JSON-like document format (BSON).

### 3.5 External API Layer
A dedicated service module in the backend is responsible for fetching live or simulated stock price data from a third-party Stock Market API, normalizing the response, and exposing it through internal REST endpoints. This isolates external dependencies from the rest of the application.

---

## 4. Frontend Architecture

The frontend is a single-page application (SPA) built with React.js.

**Folder responsibilities:**

- `pages/` — top-level route views (Dashboard, Stocks, Portfolio, Transactions, Watchlist, Leaderboard, Profile, Login, Register)
- `components/` — reusable, presentation-focused UI building blocks (StockCard, StatCard, TransactionTable, Sidebar, Navbar, Charts, Modals)
- `layouts/` — page shell wrappers (AuthLayout, DashboardLayout) that define consistent structure across grouped pages
- `services/` — Axios instances and API-calling functions, one module per resource (authService, stockService, transactionService)
- `hooks/` — custom React hooks (useAuth, useTheme, usePortfolio) to encapsulate reusable logic
- `context/` — React Context providers for global state (AuthContext, ThemeContext)
- `assets/` — static assets such as icons and images
- `styles/` — global styles, theme variables, and shared CSS

**State Management:** Global state (authenticated user, JWT token, active theme) is managed via React Context API combined with hooks. Local/page-level state (form inputs, filters, table pagination) is managed with `useState` and `useReducer` where appropriate. This avoids the overhead of a heavier state library while remaining scalable for the application's size.

**Routing:** React Router handles all client-side navigation. Protected routes (Dashboard, Portfolio, Transactions, Watchlist, Profile) are wrapped in a `ProtectedRoute` component that verifies the presence and validity of a JWT before rendering.

**Theme System:** A `ThemeContext` toggles between dark and light mode by switching a root-level CSS class/data attribute, with theme preference persisted in local storage.

**Charts:** Implemented using Recharts, rendering portfolio value trends (line/area charts), asset allocation (donut charts), and monthly performance (bar charts), all fed by data computed on the backend or derived client-side from transaction history.

**Responsive Design:** Built using a mobile-first CSS approach with breakpoints for mobile, tablet, and desktop. The sidebar collapses into a bottom navigation bar on smaller viewports, and data tables reflow into stacked cards below the tablet breakpoint.

---

## 5. Backend Architecture

The backend is a RESTful API server built with Node.js and Express.js.

**Express Server:** The entry point (`server.js` / `app.js`) initializes middleware, connects to MongoDB, mounts route modules, and starts the HTTP listener.

**Middleware:**
- Body parsing (`express.json()`)
- CORS configuration
- Authentication middleware (JWT verification)
- Centralized error-handling middleware
- Request logging (development environment)

**Controllers:** Contain the business logic for each resource (authController, stockController, transactionController, portfolioController, watchlistController, leaderboardController, userController). Controllers receive validated requests from routes, perform operations, and return standardized JSON responses.

**Routes:** Express Router modules map HTTP endpoints to controller functions, grouped by resource (`/api/auth`, `/api/stocks`, `/api/transactions`, `/api/portfolio`, `/api/watchlist`, `/api/leaderboard`, `/api/users`).

**Models:** Mongoose schemas define the shape and validation rules for each MongoDB collection (User, Transaction, Watchlist).

**Authentication:** JWT-based stateless authentication. On successful login, the server issues a signed JWT containing the user's ID, which the client attaches to the `Authorization` header on subsequent requests. Middleware verifies this token before allowing access to protected routes.

**Error Handling:** A centralized error-handling middleware catches errors thrown anywhere in the request lifecycle and returns consistent, structured JSON error responses with appropriate HTTP status codes.

**REST APIs:** All endpoints follow REST conventions, using appropriate HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`) and returning JSON payloads.

---

## 6. Database Design

MongoDB is used as the primary data store, accessed through Mongoose. The schema is intentionally minimal — only the collections required to support the application's core functionality are created.

### 6.1 Users Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique user identifier |
| `name` | String | Full name |
| `email` | String | Unique login email |
| `password` | String | Hashed password (bcrypt) |
| `virtualBalance` | Number | Current virtual cash balance |
| `createdAt` | Date | Account creation timestamp |
| `updatedAt` | Date | Last modification timestamp |

### 6.2 Transactions Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique transaction identifier |
| `userId` | ObjectId (ref: User) | Owner of the transaction |
| `stockSymbol` | String | Ticker symbol |
| `stockName` | String | Company name |
| `type` | String (enum: BUY, SELL) | Transaction type |
| `quantity` | Number | Number of shares |
| `pricePerShare` | Number | Price at time of transaction |
| `totalAmount` | Number | quantity × pricePerShare |
| `createdAt` | Date | Transaction timestamp |

### 6.3 Watchlist Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique watchlist entry identifier |
| `userId` | ObjectId (ref: User) | Owner of the entry |
| `stockSymbol` | String | Ticker symbol |
| `addedAt` | Date | Timestamp added to watchlist |

### 6.4 Portfolio Calculations (Derived, Not Stored)

Current holdings and profit/loss are **computed dynamically** from the Transactions collection rather than stored as a separate collection. For each user, holdings per stock are derived by aggregating BUY and SELL quantities, and unrealized profit/loss is calculated against the current market price fetched from the external Stock Market API. This avoids data duplication and keeps the source of truth in a single collection.

### 6.5 Relationships

- One `User` has many `Transactions` (one-to-many, via `userId`)
- One `User` has many `Watchlist` entries (one-to-many, via `userId`)
- Portfolio and leaderboard data are derived at query time from `Transactions`, not stored redundantly

---

## 7. API Flow

A typical request follows this path through the system:

```
User Action (e.g., clicks "Buy")
        │
        ▼
React Component
        │
        ▼
Axios Service Call (services/stockService.js)
        │
        ▼
Express Route (/api/transactions/buy)
        │
        ▼
Auth Middleware (JWT verification)
        │
        ▼
Controller (transactionController.buyStock)
        │
        ▼
Mongoose Model (Transaction, User)
        │
        ▼
MongoDB (read/write operation)
        │
        ▼
Controller formats JSON response
        │
        ▼
Express sends HTTP response
        │
        ▼
Axios resolves response in React
        │
        ▼
UI updates (state update, toast notification)
```

---

## 8. Authentication Flow

**Registration:**
1. User submits name, email, and password via the Register form.
2. Backend validates input and checks for existing email.
3. Password is hashed using bcrypt before storage.
4. A new User document is created with a default virtual balance.
5. A JWT is issued and returned to the client.

**Password Hashing:** bcrypt generates a salted hash of the user's password before it is persisted. Plaintext passwords are never stored or logged.

**Login:**
1. User submits email and password.
2. Backend retrieves the user record by email.
3. bcrypt compares the submitted password against the stored hash.
4. On success, a JWT is signed and returned.

**JWT Generation:** The JWT payload contains the user's ID and an expiration claim. It is signed with a server-side secret key and returned to the client, which stores it (e.g., in local storage or memory) for use in subsequent requests.

**Protected Routes:** Middleware intercepts requests to protected endpoints, extracts the JWT from the `Authorization` header, verifies its signature and expiration, and attaches the decoded user ID to the request object before allowing the controller to execute.

**Logout:** Since JWTs are stateless, logout is handled client-side by discarding the stored token and clearing authenticated state, redirecting the user to the login page.

---

## 9. Feature Architecture

**Authentication** — React forms submit credentials to `/api/auth/register` and `/api/auth/login`; JWT returned on success is stored client-side and attached to all future requests.

**Dashboard** — Aggregates data from multiple endpoints (balance, portfolio value, recent transactions, trending stocks) into a single view, computed server-side and rendered as stat cards and charts.

**Stock Listing** — Backend fetches and caches data from the external Stock Market API; frontend renders it as a paginated/grid stock card list.

**Search** — Client-side filtering on the loaded stock list for near-instant results, with debounced input handling.

**Watchlist** — Add/remove operations hit `/api/watchlist` endpoints; frontend optimistically updates the star icon state.

**Buy** — Frontend submits symbol, quantity, and price; backend validates sufficient virtual balance, deducts balance, creates a BUY transaction record.

**Sell** — Backend validates sufficient held quantity (derived from transaction history), credits balance, creates a SELL transaction record.

**Portfolio** — Backend aggregates all transactions per user to compute current holdings, average buy price, and unrealized profit/loss against live prices.

**Transactions** — Paginated, filterable list fetched from `/api/transactions`, with query parameters for date range, type, and symbol.

**Analytics** — Chart data (portfolio value over time, allocation by stock) computed from transaction history and rendered with Recharts.

**Leaderboard** — Backend aggregates portfolio value across all users and returns a ranked list.

**CSV Export** — Frontend converts the currently loaded transaction data into CSV format and triggers a browser download, requiring no additional backend endpoint.

**Theme Toggle** — Purely client-side; toggles a CSS class and persists the preference in local storage.

**Account Reset** — A dedicated endpoint resets the user's virtual balance to its default value and clears associated transaction/holding state, gated behind a confirmation step in the UI.

---

## 10. Folder Structure

```
sb-stocks/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── charts/
│       │   ├── stocks/
│       │   └── layout/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       │   ├── Dashboard/
│       │   ├── Stocks/
│       │   ├── Portfolio/
│       │   ├── Transactions/
│       │   ├── Watchlist/
│       │   ├── Leaderboard/
│       │   ├── Profile/
│       │   └── Auth/
│       ├── services/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── stockController.js
│   │   ├── transactionController.js
│   │   ├── portfolioController.js
│   │   ├── watchlistController.js
│   │   └── leaderboardController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   └── Watchlist.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── stockRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── portfolioRoutes.js
│   │   ├── watchlistRoutes.js
│   │   └── leaderboardRoutes.js
│   ├── utils/
│   └── server.js
│
├── docs/
│   └── architecture/
│       └── technical-architecture.md
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 11. Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend UI library for building the single-page application |
| React Router | Client-side routing and navigation |
| Axios | HTTP client for communicating with the REST API |
| Recharts / Chart.js | Rendering portfolio and analytics charts |
| React Icons | Icon library for UI elements |
| Node.js | JavaScript runtime for the backend server |
| Express.js | Web framework for building REST APIs |
| MongoDB | NoSQL document database for persistent storage |
| Mongoose | Object Data Modeling (ODM) library for MongoDB |
| JSON Web Token (JWT) | Stateless authentication mechanism |
| bcrypt | Secure password hashing |
| Postman | API testing and documentation during development |
| Git & GitHub | Version control and source code hosting |
| VS Code | Primary development environment |
| npm | Package management |

---

## 12. Security Architecture

**JWT:** All protected endpoints require a valid, signed JWT. Tokens carry a limited expiration time to reduce the impact of token leakage.

**bcrypt:** Passwords are never stored in plaintext. bcrypt's salted hashing algorithm protects against rainbow-table attacks even if the database is compromised.

**Input Validation:** All incoming request payloads are validated at the controller/middleware level to reject malformed or malicious data before it reaches the database layer.

**Protected APIs:** Sensitive endpoints (transactions, portfolio, watchlist, profile, account reset) are wrapped in authentication middleware and are inaccessible without a valid token.

**Secure Password Storage:** Only bcrypt hashes are persisted; the original password is discarded immediately after hashing.

**Error Handling:** Errors are caught centrally and returned as generic, safe messages to the client, avoiding leakage of stack traces or internal implementation details in production.

---

## 13. Scalability

The current architecture is intentionally modular, allowing the following future extensions without a structural rewrite:

- **Real Trading APIs** — The external API layer is already isolated behind a service module, allowing the simulated/live price feed to be swapped for a brokerage-grade market data API with minimal controller changes.
- **Notifications** — A notification service can be added as a new backend module, triggered by existing transaction and price-check events.
- **AI Stock Suggestions** — A recommendation microservice could consume existing transaction and portfolio data through the same REST layer without altering core schemas.
- **Admin Panel** — Role-based access control can be layered onto the existing JWT/User schema by adding a `role` field, with new admin-only routes reusing existing middleware patterns.
- **WebSockets** — Real-time price streaming can be introduced alongside the existing REST layer using Socket.IO, without replacing the current request/response endpoints.

---

## 14. Advantages

1. Unified JavaScript codebase across frontend and backend, reducing context-switching during development.
2. Risk-free environment for learning real market dynamics using virtual currency.
3. Clean separation of concerns across presentation, business logic, and data layers.
4. RESTful API design that is easy to test, document, and extend.
5. Derived (non-redundant) portfolio calculations reduce data inconsistency risk.
6. Stateless JWT authentication simplifies horizontal scaling of the backend.
7. Component-based frontend architecture improves reusability and maintainability.
8. Minimal, purpose-built database schema avoids unnecessary complexity.
9. Fully responsive design supports desktop, tablet, and mobile usage.
10. Modular folder structure supports easy onboarding for new contributors.
11. Dark/light theme system improves accessibility and user comfort.
12. CSV export and analytics charts add practical, resume-relevant functionality beyond basic CRUD.

---

## 15. Future Enhancements

1. Integration with a live, production-grade stock market data provider.
2. Real-time price updates using WebSockets (Socket.IO).
3. AI-driven stock recommendation engine based on user trading patterns.
4. Admin panel for platform monitoring and user management.
5. Push and email notifications for price alerts and portfolio milestones.
6. Multi-factor authentication for enhanced account security.
7. Advanced analytics, including sector-wise and risk-adjusted performance metrics.
8. Social features, such as following other traders and sharing strategies.
9. Mobile application built with React Native, reusing the existing REST API.
10. Support for multiple virtual portfolios per user for strategy comparison.

---

## 16. Conclusion

SB Stocks demonstrates a complete, production-style implementation of a full-stack MERN application, covering authentication, RESTful API design, database modeling, external API integration, and a responsive, modern frontend. Its layered architecture separates concerns cleanly across presentation, business logic, data access, and external integrations, making the codebase maintainable, testable, and extensible. Beyond fulfilling the core requirements of a paper trading platform, the project's derived-data approach to portfolio calculations, disciplined security practices, and modular structure reflect engineering decisions consistent with real-world production systems — making it a strong demonstration of full-stack development capability for both academic evaluation and professional portfolio review.
