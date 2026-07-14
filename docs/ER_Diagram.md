# Stock Trading App

## Entity Relationship (ER) Diagram

### 1. Introduction

The Entity Relationship (ER) Diagram illustrates the logical structure of the Stock Trading App database. It represents the entities, their attributes, and the relationships between them. The database is designed to efficiently manage users, stocks, portfolios, and trading transactions while maintaining data consistency and integrity.

## 2. Main Entities

### User

**Attributes:**
- User ID (Primary Key)
- Full Name
- Email
- Password
- Virtual Balance
- Created Date

### Stock

**Attributes:**
- Stock ID (Primary Key)
- Stock Symbol
- Company Name
- Current Price
- Market Status

### Portfolio

**Attributes:**
- Portfolio ID (Primary Key)
- User ID (Foreign Key)
- Stock ID (Foreign Key)
- Quantity
- Average Purchase Price
- Total Investment

### Transaction

**Attributes:**
- Transaction ID (Primary Key)
- User ID (Foreign Key)
- Stock ID (Foreign Key)
- Transaction Type (Buy/Sell)
- Quantity
- Price
- Transaction Date
- Status

## 3. Relationships

- One **User** can have multiple **Portfolio** records.
- One **User** can perform multiple **Transactions**.
- One **Stock** can belong to multiple **Portfolio** records.
- One **Stock** can appear in multiple **Transactions**.
- Each **Portfolio** record belongs to one User and one Stock.
- Each **Transaction** is associated with one User and one Stock.

## 4. ER Diagram

```text
                    +------------------+
                    |      USER        |
                    +------------------+
                    | User ID (PK)     |
                    | Name             |
                    | Email            |
                    | Password         |
                    | Balance          |
                    +------------------+
                           | 1
                           |
                           | M
          +----------------+----------------+
          |                                 |
          ▼                                 ▼

+--------------------+             +----------------------+
|     PORTFOLIO      |             |    TRANSACTION       |
+--------------------+             +----------------------+
| Portfolio ID (PK)  |             | Transaction ID (PK)  |
| User ID (FK)       |             | User ID (FK)         |
| Stock ID (FK)      |             | Stock ID (FK)        |
| Quantity           |             | Buy / Sell           |
| Avg Price          |             | Quantity             |
+--------------------+             | Price                |
          |                        | Date                 |
          |                        | Status               |
          |                        +----------------------+
          |
          ▼
+----------------------+
|        STOCK         |
+----------------------+
| Stock ID (PK)        |
| Symbol               |
| Company Name         |
| Current Price        |
| Market Status        |
+----------------------+
```

## 5. Summary

The ER Diagram provides a structured representation of the application's database. It defines the relationships between Users, Stocks, Portfolios, and Transactions, ensuring efficient data storage, retrieval, and management. This design supports secure authentication, portfolio tracking, paper trading, and transaction history within the Stock Trading App.