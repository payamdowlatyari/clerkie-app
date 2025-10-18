# Clerkie App

A REST API boilerplate for managing users and their loans, built with Node.js, Express, and Mongoose.

## Features

- User management (Create, Read, Update, Delete)
- Loan management (Create, Read, Update, Delete)
- MongoDB integration with Mongoose ODM
- RESTful API design
- Error handling

## Installation

1. Clone the repository:
```bash
git clone https://github.com/payamdowlatyari/clerkie-app.git
cd clerkie-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/clerkie-app
```

5. Make sure MongoDB is running on your system.

## Usage

Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Users

#### Create a new user
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

#### Get all users
```http
GET /api/users
```

#### Get a single user by ID
```http
GET /api/users/:id
```

#### Update a user
```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "age": 31
}
```

#### Delete a user
```http
DELETE /api/users/:id
```

### Loans

#### Create a new loan
```http
POST /api/loans
Content-Type: application/json

{
  "userId": "60a7f1c2b5c3e8a4e8b4567a",
  "amount": 10000,
  "term": 12,
  "interestRate": 5.5,
  "status": "pending"
}
```

#### Get all loans
```http
GET /api/loans
```

#### Get a single loan by ID
```http
GET /api/loans/:id
```

#### Get all loans for a specific user
```http
GET /api/loans/user/:userId
```

#### Update a loan
```http
PUT /api/loans/:id
Content-Type: application/json

{
  "amount": 15000,
  "status": "approved"
}
```

#### Delete a loan
```http
DELETE /api/loans/:id
```

## Data Models

### User Model
- `name` (String, required): User's full name
- `email` (String, required, unique): User's email address
- `age` (Number, optional): User's age
- `createdAt` (Date): Timestamp of user creation

### Loan Model
- `userId` (ObjectId, required): Reference to the User
- `amount` (Number, required): Loan amount
- `term` (Number, required): Loan term in months
- `interestRate` (Number, required): Interest rate percentage
- `status` (String): Loan status (pending, approved, rejected, paid)
- `createdAt` (Date): Timestamp of loan creation

## Project Structure

```
clerkie-app/
├── config/
│   └── database.js       # MongoDB connection configuration
├── controllers/
│   ├── userController.js # User CRUD operations
│   └── loanController.js # Loan CRUD operations
├── models/
│   ├── User.js          # User mongoose schema
│   └── Loan.js          # Loan mongoose schema
├── routes/
│   ├── users.js         # User routes
│   └── loans.js         # Loan routes
├── .env.example         # Environment variables template
├── .gitignore
├── index.js             # Main application entry point
├── package.json
└── README.md
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web framework
- **Mongoose**: MongoDB ODM
- **dotenv**: Environment variable management

## License

ISC
