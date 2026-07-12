# Stock Trading App 
## ER Diagram Documentation

### 1. Introduction

Stock Trading App is a MERN Stack paper trading platform that lets registered users simulate stock-market trading using virtual money. Users can browse, search, buy, and sell stocks, while tracking their portfolio, transaction history, and available virtual balance.

The database design uses four main entities: User, Stock, Portfolio, and Transaction.

### 2. Entities

- **User**: Stores registered user account and virtual balance details.
- **Stock**: Stores the available stock information and current market price.
- **Portfolio**: Stores each user’s currently owned stock holdings.
- **Transaction**: Stores the complete buy and sell history of users.

### 3. Attributes of Each Entity

#### User

**Attributes:**

- **_id** – Unique identifier for the user.
- **fullName** – Full name of the registered user.
- **email** – Email address used for login.
- **password** – Encrypted user password.
- **virtualBalance** – Available virtual money for paper trading.
- **createdAt** – Date and time when the account was created.

#### Stock

**Attributes:**

- **_id** – Unique identifier for the stock.
- **symbol** – Trading symbol (e.g., AAPL).
- **companyName** – Name of the company.
- **currentPrice** – Current market price.
- **exchange** – Stock exchange where the stock is listed.

#### Portfolio

**Attributes:**

- **_id** – Unique identifier.
- **userId** – References the user.
- **stockId** – References the stock.
- **quantity** – Number of shares owned.
- **averagePrice** – Average purchase price.

#### Transaction

**Attributes:**

- **_id** – Unique identifier for the transaction.
- **userId** – References the user performing the transaction.
- **stockId** – References the stock being traded.
- **transactionType** – BUY or SELL.
- **quantity** – Number of shares traded.
- **price** – Price per share.
- **transactionDate** – Date and time of the transaction.

### Relationships Between Entities

- **User → Portfolio** (One-to-Many)
  - One user can own multiple stocks in their portfolio.

- **Stock → Portfolio** (One-to-Many)
  - One stock can appear in multiple users' portfolios.

- **User → Transaction** (One-to-Many)
  - One user can perform multiple buy and sell transactions.

- **Stock → Transaction** (One-to-Many)
  - One stock can be involved in multiple transactions.

**Note:**
Portfolio acts as an associative entity between User and Stock because it stores the stocks owned by a particular user.

### 5. Primary Keys

| Entity      | Primary Key |
|-------------|-------------|
| User        | _id         |
| Stock       | _id         |
| Portfolio   | _id         |
| Transaction | _id         |

Each `_id` uniquely identifies a document in its respective collection.

### 6. Foreign Keys

| Entity      | Foreign Key | References |
|-------------|-------------|------------|
| Portfolio   | userId      | User._id   |
| Portfolio   | stockId     | Stock._id  |
| Transaction | userId      | User._id   |
| Transaction | stockId     | Stock._id  |

In MongoDB, these foreign keys are typically stored as ObjectId references to related documents.

### 7. ASCII ER Diagram

```text
+-------------------------+
|          USER           |
+-------------------------+
| PK  _id                 |
|     fullName            |
|     email               |
|     password            |
|     virtualBalance      |
|     createdAt           |
+-------------------------+
          | 1
          |
          | owns
          |
          | M
+-------------------------+
|       PORTFOLIO         |
+-------------------------+
| PK  _id                 |
| FK  userId              |
| FK  stockId             |
|     quantity            |
|     averagePrice        |
+-------------------------+
          | M
          |
          | represents
          |
          | 1
+-------------------------+
|         STOCK           |
+-------------------------+
| PK  _id                 |
|     symbol              |
|     companyName         |
|     currentPrice        |
|     exchange            |
+-------------------------+


+-------------------------+
|          USER           |
+-------------------------+
| PK  _id                 |
|     fullName            |
|     email               |
|     password            |
|     virtualBalance      |
|     createdAt           |
+-------------------------+
          | 1
          |
          | performs
          |
          | M
+-------------------------+
|      TRANSACTION        |
+-------------------------+
| PK  _id                 |
| FK  userId              |
| FK  stockId             |
|     transactionType     |
|     quantity            |
|     price               |
|     transactionDate     |
+-------------------------+
          | M
          |
          | involves
          |
          | 1
+-------------------------+
|         STOCK           |
+-------------------------+
| PK  _id                 |
|     symbol              |
|     companyName         |
|     currentPrice        |
|     exchange            |
+-------------------------+
```

### 8. Explanation of the ER Diagram

A User can have several Portfolio records because a user may own shares in multiple companies. Each Portfolio record belongs to one User and refers to one Stock. The Portfolio entity maintains the user’s current number of shares and average purchase price for that stock.

A User can also create many Transaction records. Every time the user buys or sells stock, a new Transaction is created. Each transaction is linked to one Stock and records whether it was a buy or sell operation, the quantity traded, price at the time of trade, and transaction date.

A Stock can appear in multiple Portfolio and Transaction records because many users may buy, sell, or hold the same stock.

### 9. Conclusion

This database design supports the main features of the Stock Trading App, including user registration, authentication, stock browsing, buying and selling, portfolio management, transaction history, and virtual balance tracking.

The design maintains clear relationships between users, stocks, holdings, and transactions. It is suitable for a MongoDB and Mongoose implementation, while remaining simple, scalable, and appropriate for a college-level MERN Stack project.