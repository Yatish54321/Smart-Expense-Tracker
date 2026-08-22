# Smart Expense Tracker API

A RESTful API built with Node.js and Express.js to manage personal expenses.
 
---

## Features

- Add a new expense
- View all expenses
- Filter expenses by category
- Calculate total expenses
- Calculate category-wise total expenses
- Delete an expense
- Monthly summary of expense

---

## Tech Stack

- Node.js
- Express.js
- Local JSON File Storage
- Express Validator
- UUID
- Nodemon
- Jest
- Supertest

---

## Project Structure

```text
smart-expense-tracker-api/
│
├── src/
│   │
│   ├── controllers/
│   │   └── expense.controller.js
│   │
│   ├── routes/
│   │   └── expense.routes.js
│   │
│   ├── services/
│   │   └── expense.services.js
│   │
│   ├── middlewares/
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/
│   │   └── file.utils.js
│   │
│   ├── data/
│   │   └── expenses.json
│   │
│   └── app.js
│
├── tests/
│   └── expense.test.js
│
├── .gitignore
├── .env.example
├── README.md
├── package.json
├── package-lock.json
└── server.js
```


---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/expenses | Add a new expense |
| GET | /api/expenses | Get all expenses |
| GET | /api/expenses/category/:category | Filter by category |
| GET | /api/expenses/total | Overall total expense |
| GET | /api/expenses/total/:category | Category-wise total expense |
| DELETE | /api/expenses/:id | Delete an expense |
| GET | /api/expenses/summary/monthly | Monthly summary of expense |

---

## Data Storage

All expense records are stored in a local JSON file.

Location:

```text
src/data/expenses.json
```

No external database is used for this project.

---

## Prerequisites

Make sure the following software is installed before running the project:

- Node.js (v18 or later recommended)
- npm

Verify installation:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Yatish54321/Smart-Expense-Tracker.git
cd Smart-Expense-Tracker

```

Install dependencies:

```bash
npm install
```

---

## Project Dependencies

### Runtime Dependencies

- express
- dotenv
- express-validator
- uuid

### Development Dependencies

- nodemon
- jest
- supertest

---

## Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

or create a `.env` file in project root with:

```env
PORT=3000
```

---

## Running the Server

### Development Mode

```bash
npm run dev
```

or

```bash
npx nodemon server.js
```

### Production Mode

```bash
npm start
```

or

```bash
node server.js
```

After the server starts successfully, the API will be available at:

```text
http://localhost:3000
```

You should see:

```text
Server is running on port 3000
```

---

## API Usage Examples

Base URL:

```text
http://localhost:3000
```

### Add Expense

```http
POST /api/expenses
```

Request Body:

```json
{
  "title": "Pizza",
  "amount": 399,
  "category": "Food",
  "date": "01-01-2026"
}
```

---

### Get All Expenses

```http
GET /api/expenses
```

---

### Get Expenses by Category

```http
GET /api/expenses/category/Food
```

---

### Get Overall Expense Total

```http
GET /api/expenses/total
```

---

### Get Category-wise Expense Total

```http
GET /api/expenses/total/Food
```

---

### Delete an Expense

Replace `<expense-id>` with the actual expense ID.

```http
DELETE /api/expenses/<expense-id>
```

---

### Monthly Summary

```http
GET /api/expenses/summary/monthly
```

---

## Running Tests(For Automated Testing)

This project includes automated API tests written using Jest and Supertest.

Run all tests:

```bash
npm test
```

---

# Available npm scripts

| Command | Description |
|----------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Run the development server using Nodemon |
| `npm start` | Run the production server |
| `npm test` | Execute the automated test suite |

---

# Sample API Request

### POST `/api/expenses`

Request Body

```json
{
  "title":"Pizza",
  "amount":399,
  "category":"Food",
  "date":"01-01-2026"
}
```

Successful Response

```json
{
  "success":true,
  "data": {
    "id":"generated-uuid",
    "title":"Pizza",
    "amount":399,
    "category":"Food",
    "date":"01-01-2026",
    "createdAt":"2026-08-01T10:20:30.123Z"
  }
}
```

---

# Validation Rules

The API validates every incoming request before processing.

Validation rules include:

- Title is required.
- Amount must be greater than 0.
- Category is required.
- Date must follow the `DD-MM-YYYY` format.

Invalid requests return **HTTP 400 Bad Request**.

---

# Error Handling

The application uses centralized error handling middleware.

Common HTTP status codes returned by the API:

| Status Code | Description |
|-------------|-------------|
| 200 | Request completed successfully |
| 201 | Expense created successfully |
| 400 | Validation failed |
| 404 | Expense or route not found |
| 500 | Internal server error |

---

# Automated Test Coverage

The project includes automated tests for:

- Creating an expense
- Fetching all expenses
- Deleting an expense
- Verifying deletion
- Filtering expenses by category
- Calculating overall expense total
- Calculating category-wise expense total
- Monthly summary endpoint
- Validation middleware

---

# Bonus Feature

Implemented the optional Monthly Summary endpoint.

Endpoint:

```text
GET /api/expenses/summary/monthly
```

The endpoint returns:

- Month
- Total expense amount
- Total number of expenses
- Average expense for the month

---

## Assumptions

- Expenses are stored in a local JSON file.
- Categories are user-defined.
- Dates are expected in `DD-MM-YYYY` format.
- No authentication is required for this application.
- The application is designed for a single-user environment.
