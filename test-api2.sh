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
        "name": "Jane Doe",
        "email": "jane.doe@example.com"
    }')
echo "$USER_RESPONSE" | json_pp
USER_ID=$(echo "$USER_RESPONSE" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "User ID: $USER_ID"
echo ""

# Create a loan for the user
echo "3. Creating a loan for the user"
echo "POST /api/loans"
LOAN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/loans" \
    -H "Content-Type: application/json" \
    -d '{
        "amount": 1000,
        "user": "'"$USER_ID"'"
    }')
echo "$LOAN_RESPONSE" | json_pp
LOAN_ID=$(echo "$LOAN_RESPONSE" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "Loan ID: $LOAN_ID"
echo ""