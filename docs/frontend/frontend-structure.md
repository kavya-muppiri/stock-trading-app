# SB Stocks – Frontend Structure Documentation

**Project:** SB Stocks – Paper Trading Platform
**Document Type:** Frontend Architecture Specification
**Scope:** React Client Application Only

---

## 1. Frontend Overview

The SB Stocks frontend is a single-page application (SPA) built with React.js, responsible for all user-facing interaction, data presentation, and client-side navigation. It communicates exclusively with the Express backend through a REST API layer, and holds no direct connection to the database or external stock data providers.

The frontend is organized around a clear separation of concerns: **pages** represent routable views, **components** are reusable presentational building blocks, **services** encapsulate all API communication, **context** manages global application state, and **hooks** encapsulate reusable stateful logic. This structure keeps individual files small, testable, and easy to navigate, while avoiding tight coupling between UI rendering and data-fetching logic.

The application supports authenticated and public routes, a persistent dark/light theme, fully responsive layouts across desktop, tablet, and mobile, and dynamic data visualization through charts. State management relies on React's built-in Context API and hooks rather than an external state library, which is appropriate given the application's scale and keeps the dependency footprint minimal.

---

## 2. Frontend Folder Structure

```
client/
└── src/
    ├── assets/
    │   ├── icons/
    │   └── images/
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button/
    │   │   ├── Input/
    │   │   ├── Card/
    │   │   ├── Badge/
    │   │   ├── Modal/
    │   │   ├── Toast/
    │   │   ├── EmptyState/
    │   │   └── Skeleton/
    │   ├── layout/
    │   │   ├── Navbar/
    │   │   ├── Sidebar/
    │   │   └── BottomNav/
    │   ├── dashboard/
    │   │   ├── StatCard/
    │   │   └── TrendingStocks/
    │   ├── stocks/
    │   │   ├── StockCard/
    │   │   ├── StockList/
    │   │   ├── StockSearch/
    │   │   └── BuySellForm/
    │   ├── portfolio/
    │   │   ├── HoldingsTable/
    │   │   └── AllocationBreakdown/
    │   ├── transactions/
    │   │   ├── TransactionTable/
    │   │   ├── TransactionFilters/
    │   │   └── ExportButton/
    │   ├── watchlist/
    │   │   └── WatchlistGrid/
    │   ├── leaderboard/
    │   │   └── LeaderboardTable/
    │   ├── profile/
    │   │   ├── ProfileHeader/
    │   │   ├── AccountSettings/
    │   │   └── DangerZone/
    │   └── charts/
    │       ├── PortfolioLineChart/
    │       ├── AllocationDonutChart/
    │       └── PerformanceBarChart/
    │
    ├── pages/
    │   ├── Auth/
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── Dashboard/
    │   │   └── Dashboard.jsx
    │   ├── Stocks/
    │   │   └── Stocks.jsx
    │   ├── Watchlist/
    │   │   └── Watchlist.jsx
    │   ├── Portfolio/
    │   │   └── Portfolio.jsx
    │   ├── Transactions/
    │   │   └── Transactions.jsx
    │   ├── Leaderboard/
    │   │   └── Leaderboard.jsx
    │   └── Profile/
    │       └── Profile.jsx
    │
    ├── layouts/
    │   ├── AuthLayout.jsx
    │   └── DashboardLayout.jsx
    │
    ├── services/
    │   ├── apiClient.js
    │   ├── authService.js
    │   ├── stockService.js
    │   ├── portfolioService.js
    │   ├── transactionService.js
    │   ├── watchlistService.js
    │   └── leaderboardService.js
    │
    ├── hooks/
    │   ├── useAuth.js
    │   ├── useTheme.js
    │   ├── usePortfolio.js
    │   ├── useTransactions.js
    │   └── useDebounce.js
    │
    ├── context/
    │   ├── AuthContext.jsx
    │   └── ThemeContext.jsx
    │
    ├── styles/
    │   ├── variables.css
    │   ├── globals.css
    │   └── themes/
    │       ├── dark.css
    │       └── light.css
    │
    ├── utils/
    │   ├── formatCurrency.js
    │   ├── formatDate.js
    │   ├── csvExport.js
    │   └── validators.js
    │
    ├── routes/
    │   ├── AppRoutes.jsx
    │   └── ProtectedRoute.jsx
    │
    ├── App.jsx
    └── main.jsx
```

---

## 3. Pages

### Login
- **Purpose:** Authenticate an existing user and issue a session token.
- **Main Components:** Common `Input`, `Button`, form-level validation feedback, link to Register.
- **API Services Used:** `authService.login`

### Register
- **Purpose:** Create a new user account with a default virtual balance.
- **Main Components:** Common `Input`, `Button`, terms acknowledgment, link to Login.
- **API Services Used:** `authService.register`

### Dashboard
- **Purpose:** Provide a summary view of the user's account — virtual balance, total portfolio value, profit/loss, portfolio value trend, trending stocks, and recent transactions.
- **Main Components:** `StatCard`, `PortfolioLineChart`, `AllocationDonutChart`, `TrendingStocks`, `TransactionTable` (compact view).
- **API Services Used:** `portfolioService.getSummary`, `stockService.getTrending`, `transactionService.getRecent`

### Stocks
- **Purpose:** Browse and search available stocks, and initiate buy orders.
- **Main Components:** `StockSearch`, `StockList`, `StockCard`, `BuySellForm` (modal).
- **API Services Used:** `stockService.getAll`, `stockService.search`, `transactionService.buyStock`

### Watchlist
- **Purpose:** View and manage the user's saved stocks for quick monitoring.
- **Main Components:** `WatchlistGrid`, `StockCard`, `EmptyState`.
- **API Services Used:** `watchlistService.getAll`, `watchlistService.add`, `watchlistService.remove`

### Portfolio
- **Purpose:** Display current holdings, average buy price, current value, and profit/loss per stock, along with allocation breakdown.
- **Main Components:** `HoldingsTable`, `AllocationDonutChart`, `AllocationBreakdown`, `BuySellForm` (sell mode).
- **API Services Used:** `portfolioService.getHoldings`, `transactionService.sellStock`

### Transactions
- **Purpose:** View, filter, and export the complete history of buy and sell transactions.
- **Main Components:** `TransactionFilters`, `TransactionTable`, `ExportButton`.
- **API Services Used:** `transactionService.getAll`

### Leaderboard
- **Purpose:** Display a ranked list of users by portfolio value or overall profit/loss.
- **Main Components:** `LeaderboardTable`.
- **API Services Used:** `leaderboardService.getRankings`

### Profile
- **Purpose:** View and edit account details, manage preferences, and reset the virtual account.
- **Main Components:** `ProfileHeader`, `AccountSettings`, `DangerZone` (Account Reset with confirmation modal).
- **API Services Used:** `authService.getProfile`, `authService.updateProfile`, `authService.resetAccount`

---

## 4. Layouts

### Authentication Layout
Wraps the Login and Register pages. Responsible for rendering a centered, minimal single-column layout without a sidebar or navbar, keeping focus entirely on the authentication form. Applies the theme system but excludes any authenticated-only UI elements.

### Dashboard Layout
Wraps all authenticated pages (Dashboard, Stocks, Watchlist, Portfolio, Transactions, Leaderboard, Profile). Responsible for rendering the persistent Sidebar (or bottom navigation on mobile), the top Navbar, and a content outlet where the active page is rendered. Also hosts global elements such as the toast notification container and theme toggle.

---

## 5. Routing Structure

| Route | Access | Description |
|---|---|---|
| `/` | Public | Redirects to `/dashboard` if authenticated, otherwise to `/login` |
| `/login` | Public | Login page |
| `/register` | Public | Registration page |
| `/dashboard` | Protected | Dashboard summary view |
| `/stocks` | Protected | Stock listing and search |
| `/watchlist` | Protected | User's watchlist |
| `/portfolio` | Protected | Current holdings and allocation |
| `/transactions` | Protected | Transaction history |
| `/leaderboard` | Protected | User rankings |
| `/profile` | Protected | Account settings and reset |
| `*` | Public | Not Found / fallback route |

Protected routes are wrapped by a `ProtectedRoute` component that checks authentication state via `AuthContext` before rendering the requested page, redirecting to `/login` if no valid session exists.

---

## 6. Component Hierarchy

```
App
 │
 ├── AuthLayout
 │     ├── Login
 │     └── Register
 │
 └── DashboardLayout
       │
       ├── Navbar
       ├── Sidebar / BottomNav
       │
       └── Page Outlet
             │
             ├── Dashboard
             │     ├── StatCard (x4)
             │     ├── PortfolioLineChart
             │     ├── AllocationDonutChart
             │     ├── TrendingStocks
             │     └── TransactionTable (compact)
             │
             ├── Stocks
             │     ├── StockSearch
             │     ├── StockList
             │     │     └── StockCard (xN)
             │     └── BuySellForm (Modal)
             │
             ├── Watchlist
             │     └── WatchlistGrid
             │           └── StockCard (xN)
             │
             ├── Portfolio
             │     ├── HoldingsTable
             │     ├── AllocationDonutChart
             │     └── AllocationBreakdown
             │
             ├── Transactions
             │     ├── TransactionFilters
             │     ├── TransactionTable
             │     └── ExportButton
             │
             ├── Leaderboard
             │     └── LeaderboardTable
             │
             └── Profile
                   ├── ProfileHeader
                   ├── AccountSettings
                   └── DangerZone
```

---

## 7. Reusable Components

| Component | Purpose | Reusable |
|---|---|---|
| Button | Standardized primary/secondary/danger action button | Yes |
| Input | Standardized text/number/password input field with label and error state | Yes |
| Card | Generic bordered surface container used across dashboard, portfolio, and profile | Yes |
| Badge | Colored pill used for status, transaction type, and rank indicators | Yes |
| Modal | Generic overlay dialog used for Buy/Sell forms and confirmation prompts | Yes |
| Toast | Notification popup for success, error, and info messages | Yes |
| EmptyState | Placeholder view shown when a list/table has no data | Yes |
| Skeleton | Shimmer placeholder shown while data is loading | Yes |
| StatCard | Displays a single metric with icon, value, and trend indicator | Yes |
| StockCard | Displays ticker, price, change percentage, and sparkline | Yes |
| HoldingsTable | Displays current portfolio holdings with P&L | No (page-specific) |
| TransactionTable | Displays transaction rows with filtering support | Yes (used in Dashboard and Transactions) |
| LeaderboardTable | Displays ranked user list | No (page-specific) |
| PortfolioLineChart | Renders portfolio value trend over time | Yes |
| AllocationDonutChart | Renders asset allocation breakdown | Yes |
| PerformanceBarChart | Renders periodic performance comparison | Yes |

---

## 8. Context API

### Auth Context
Holds the current authenticated user object, JWT token, and authentication status (`isAuthenticated`, `isLoading`). Exposes `login`, `register`, `logout`, and `refreshUser` functions. Consumed by `ProtectedRoute`, `Navbar`, `Sidebar`, and the Profile page. On initialization, it checks for a persisted token and validates the session before rendering protected content.

### Theme Context
Holds the current active theme (`dark` or `light`) and exposes a `toggleTheme` function. Persists the selected theme to local storage and applies it at the root of the application via a CSS class or data attribute. Consumed by the Navbar theme toggle control and any theme-aware chart components that need to adjust color values.

---

## 9. Custom Hooks

**useAuth**
Wraps `AuthContext` to provide simplified access to the current user, authentication status, and auth actions (`login`, `logout`, `register`) within any component without importing the context directly.

**useTheme**
Wraps `ThemeContext` to provide the current theme value and a toggle function, used primarily by the Navbar and any component requiring theme-conditional rendering.

**usePortfolio**
Encapsulates fetching and caching of portfolio holdings and summary data, exposing loading, error, and data states to the Dashboard and Portfolio pages.

**useTransactions**
Encapsulates fetching, filtering, and paginating transaction data, exposing loading, error, and data states along with filter-update functions to the Transactions page.

**useDebounce**
A generic utility hook that debounces a rapidly changing value (such as search input), used by `StockSearch` to limit the frequency of filtering operations.

---

## 10. API Services

**authService**
Handles `register`, `login`, `logout`, `getProfile`, `updateProfile`, and `resetAccount` requests to the authentication and user endpoints.

**stockService**
Handles `getAll`, `search`, and `getTrending` requests to retrieve stock listing and price data from the backend.

**portfolioService**
Handles `getSummary` and `getHoldings` requests to retrieve computed portfolio value, allocation, and profit/loss data.

**transactionService**
Handles `buyStock`, `sellStock`, `getAll`, and `getRecent` requests for creating and retrieving transaction records.

**watchlistService**
Handles `getAll`, `add`, and `remove` requests for managing the user's watchlist entries.

**leaderboardService**
Handles `getRankings` requests to retrieve the ranked list of users by portfolio performance.

All services share a single configured `apiClient` (Axios instance) that attaches the JWT token to outgoing requests and centralizes base URL and error-response handling.

---

## 11. Charts

**Portfolio Line Chart**
Displays total portfolio value over a selectable time range (1D/1W/1M/1Y/All), rendered as a gradient-filled area/line chart. Used on the Dashboard and Portfolio pages.

**Portfolio Allocation**
A donut chart displaying the proportional allocation of portfolio value across held stocks, paired with a legend/breakdown list. Used on the Dashboard and Portfolio pages.

**Performance Bar Chart**
Displays periodic (e.g., monthly) profit/loss or trading volume as a flat-colored bar chart, used for summarized performance review, primarily on the Dashboard.

All charts are built as reusable components accepting formatted data as props, keeping data-fetching logic in hooks/services and rendering logic isolated to the chart components themselves.

---

## 12. Responsive Design Strategy

**Desktop (≥ 1024px)**
Full layout with a fixed, expanded sidebar, multi-column dashboard grid, and full-width data tables.

**Tablet (768px – 1023px)**
Sidebar collapses to an icon-only rail to conserve horizontal space; dashboard grid reduces to two columns; tables remain in tabular form with horizontal scroll where necessary.

**Mobile (< 768px)**
Sidebar is replaced by a floating pill bottom navigation bar; dashboard stat cards become a horizontally scrollable carousel; tables collapse into stacked card rows; modals expand to near full-screen for improved usability on small viewports.

---

## 13. Performance Optimization

**Lazy Loading**
Route-level components are lazy-loaded using dynamic imports, so page bundles are only fetched when a user navigates to that route, reducing initial load time.

**Memoization**
Expensive computations (such as derived portfolio metrics) and pure presentational components are wrapped with `useMemo` and `React.memo` where re-renders would otherwise be costly, particularly within chart and table components.

**Reusable Components**
A consistent library of shared components (Button, Card, Input, Modal, Skeleton) reduces duplicate rendering logic and keeps the bundle size and maintenance overhead low.

**Code Splitting**
Combined with lazy loading, the build is split into per-route chunks so that heavier dependencies, such as charting libraries, are only loaded on pages that require them.

---

## 14. Advantages

1. Clear separation between presentational components, page-level containers, and data-fetching services.
2. Centralized API communication through a single Axios client simplifies token handling and error management.
3. Context-based state management avoids unnecessary dependency overhead for an application of this scale.
4. Consistent, reusable component library reduces duplication and visual inconsistency.
5. Route-level protection ensures authenticated-only pages are never rendered without a valid session.
6. Custom hooks isolate reusable logic, keeping page components focused on composition rather than implementation detail.
7. Lazy loading and code splitting keep initial bundle size and load time low.
8. Fully responsive design ensures a consistent experience across desktop, tablet, and mobile.
9. Theme system is decoupled from component logic, allowing dark/light mode to be extended easily.
10. Chart components are data-agnostic and reusable across multiple pages.

---

## 15. Future Improvements

1. Introduce a dedicated state management library (e.g., Zustand or Redux Toolkit) if global state complexity grows.
2. Add automated component testing using React Testing Library and Jest.
3. Introduce end-to-end testing with Cypress or Playwright for critical user flows.
4. Add a design token/theming layer for easier multi-brand or white-label support.
5. Implement virtualized lists for large transaction or stock datasets to improve rendering performance.
6. Add offline support and caching using a service worker.
7. Introduce internationalization (i18n) support for multi-language availability.
8. Add accessibility (a11y) auditing and ARIA improvements across interactive components.
9. Integrate real-time price updates via WebSockets, reflected directly in chart and stock card components.
10. Migrate to TypeScript for stronger type safety across components, hooks, and services.

---

## 16. Conclusion

The SB Stocks frontend is structured around clear boundaries between presentation, state, and data access, enabling a maintainable and scalable React codebase suitable for both continued feature development and technical review. Its use of reusable components, isolated custom hooks, and a centralized service layer reflects patterns consistent with production-grade frontend engineering, while lazy loading, code splitting, and a disciplined responsive strategy ensure the application remains performant across devices. This architecture provides a solid foundation for the application's current feature set while remaining straightforward to extend as new requirements emerge.
