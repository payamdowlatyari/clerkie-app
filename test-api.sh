#!/bin/bash

# API Testing Script for Clerkie App
# This script demonstrates the REST API endpoints

echo "Clerkie App API Testing Script"
echo "================================"
echo ""
echo "Prerequisites: Server must be running on http://localhost:3000"
echo "              MongoDB must be running"
echo ""

BASE_URL="http://localhost:3000"

# Test root endpoint
echo "1. Testing Root Endpoint"
echo "GET /"
curl -s -X GET "$BASE_URL/" | json_pp
echo ""
echo ""

# Create a user
echo "2. Creating a new user"
echo "POST /api/users"
USER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30
  }')
echo "$USER_RESPONSE" | json_pp
USER_ID=$(echo "$USER_RESPONSE" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "User ID: $USER_ID"
echo ""

# Get all users
echo "3. Getting all users"
echo "GET /api/users"
curl -s -X GET "$BASE_URL/api/users" | json_pp
echo ""
echo ""

# Get user by ID
echo "4. Getting user by ID"
echo "GET /api/users/$USER_ID"
curl -s -X GET "$BASE_URL/api/users/$USER_ID" | json_pp
echo ""
echo ""

# Create a loan for the user
echo "5. Creating a loan for the user"
echo "POST /api/loans"
LOAN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/loans" \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"$USER_ID\",
    \"amount\": 10000,
    \"term\": 12,
    \"interestRate\": 5.5,
    \"status\": \"pending\"
  }")
echo "$LOAN_RESPONSE" | json_pp
LOAN_ID=$(echo "$LOAN_RESPONSE" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "Loan ID: $LOAN_ID"
echo ""

# Get all loans
echo "6. Getting all loans"
echo "GET /api/loans"
curl -s -X GET "$BASE_URL/api/loans" | json_pp
echo ""
echo ""

# Get loans by user ID
echo "7. Getting loans for specific user"
echo "GET /api/loans/user/$USER_ID"
curl -s -X GET "$BASE_URL/api/loans/user/$USER_ID" | json_pp
echo ""
echo ""

# Update loan
echo "8. Updating loan status to approved"
echo "PUT /api/loans/$LOAN_ID"
curl -s -X PUT "$BASE_URL/api/loans/$LOAN_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved"
  }' | json_pp
echo ""
echo ""

# Update user
echo "9. Updating user information"
echo "PUT /api/users/$USER_ID"
curl -s -X PUT "$BASE_URL/api/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated Doe",
    "age": 31
  }' | json_pp
echo ""
echo ""

# Delete loan
echo "10. Deleting loan"
echo "DELETE /api/loans/$LOAN_ID"
curl -s -X DELETE "$BASE_URL/api/loans/$LOAN_ID" | json_pp
echo ""
echo ""

# Delete user
echo "11. Deleting user"
echo "DELETE /api/users/$USER_ID"
curl -s -X DELETE "$BASE_URL/api/users/$USER_ID" | json_pp
echo ""
echo ""

echo "Testing complete!"
