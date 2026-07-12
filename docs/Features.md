# Stock Trading App – Features Documentation
Stock Trading App is a MERN Stack application that enables users to practice stock trading using virtual money. It provides a realistic trading experience without financial risk.

## 1. Authentication

### User Registration

New users can create an account by providing their name, email address, and password. Registration creates a secure profile with an initial virtual balance for paper trading.

### User Login

Registered users can log in using their email address and password. Authentication ensures that users can securely access their personal dashboard, portfolio, and transaction history.

### Secure Logout

Users can securely log out of their account when they finish using the platform. This helps protect account data, especially when accessing the application from shared devices.

## 2. Dashboard

### Virtual Balance

The dashboard displays the user's available virtual balance. This balance is used to buy stocks and is updated automatically after each buy or sell transaction.

### Portfolio Value

Users can view the current total value of all stocks held in their portfolio. The value is calculated using the latest available prices of owned stocks.

### Profit/Loss

The platform shows the overall profit or loss generated from the user's investments. This helps users understand how their trading decisions are performing over time.

### Total Stocks Owned

This feature displays the total number of stock units or holdings owned by the user. It provides a quick summary of the user's investment activity.

### Recent Transactions

The dashboard lists the most recent buy and sell transactions. Users can quickly review their latest trading activity without navigating to the complete transaction history.

### Market Status

Market status informs users whether the stock market is currently open or closed. This creates a more realistic trading environment and improves user awareness.

### Quick Actions

Quick action buttons provide direct access to common tasks such as buying stocks, selling stocks, viewing the portfolio, and checking transaction history.

## 3. Stock Market

### View Available Stocks

Users can browse the stocks available for paper trading. Each stock displays important details such as symbol, company name, current price, and exchange.

### Search Stocks

The search feature helps users find stocks quickly by entering a company name or stock symbol. This improves usability when the application contains many listed stocks.

### Filter Stocks

Users can filter stocks based on relevant categories, exchanges, or price ranges. Filters help users focus on stocks that match their trading preferences.

### Sort Stocks

Stocks can be sorted by fields such as company name, current price, or stock symbol. This makes it easier to compare available investment options.

### Watchlist

Users can add selected stocks to a personal watchlist. The watchlist allows users to monitor preferred stocks before deciding whether to buy them.

## 4. Trading

### Buy Stocks

Users can buy stocks using their available virtual balance. The system validates the stock quantity and required amount before completing the transaction.

### Sell Stocks

Users can sell stocks that they currently own in their portfolio. The system verifies available holdings and updates the virtual balance after a successful sale.

### Live Price Validation

Before a trade is completed, the application validates the latest available stock price. This helps ensure that buying and selling calculations use current market data.

## 5. Portfolio

### Holdings

The portfolio displays all stocks currently owned by the user. Each holding includes stock information, quantity, current value, and overall performance.

### Average Buying Price

The platform calculates and displays the average price paid for each owned stock. This allows users to compare their purchase cost with the current market price.

### Portfolio Allocation

Portfolio allocation shows how the user's investments are distributed across different stocks. It helps users understand diversification and concentration in their holdings.

### Net Worth

Net worth combines the available virtual balance with the current value of all portfolio holdings. It provides an overall measure of the user’s paper trading performance.

## 6. Transactions

### Transaction History

Users can view a complete record of all buy and sell activities. Each transaction includes stock details, transaction type, quantity, price, and date.

### Filters

Transaction filters allow users to narrow records by transaction type, stock, or date range. This makes it easier to review specific trading activity.

### CSV Export

Users can export their transaction history as a CSV file. This supports offline analysis, record keeping, and reporting of paper trading performance.

## 7. Leaderboard

### Top Traders

The leaderboard displays the highest-performing users based on portfolio value, net worth, or profit. It encourages friendly competition and motivates users to improve their trading strategies.

## 8. User Profile

### User Details

Users can view and manage their basic profile information, such as full name and email address. This provides a centralized location for account-related details.

### Reset Paper Trading Account

Users can reset their paper trading account to start again with the default virtual balance. This feature is useful for practicing new strategies without creating a new account.

## 9. UI Features

### Responsive Design

The application is designed to work smoothly on desktops, tablets, and mobile devices. Responsive layouts ensure that key trading features remain accessible across screen sizes.

### Dark Mode

Dark mode provides a low-light interface that can reduce eye strain during extended use. It offers a modern visual style preferred by many users.

### Light Mode

Light mode provides a clean, bright interface for users who prefer traditional application styling. Users can choose the theme that is most comfortable for them.

### Toast Notifications

Toast notifications provide immediate feedback for actions such as successful login, stock purchase, stock sale, or validation errors. They improve clarity and overall user experience.

### Loading Indicators

Loading indicators inform users when data is being fetched or a trading request is being processed. This makes the application feel responsive and prevents repeated actions.