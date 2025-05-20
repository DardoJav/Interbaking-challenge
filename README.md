# Interbanking Challenge API

## Objective

This project is a backend API developed with Node.js, Express and MongoDB that manages company registrations and financial transfers. The system exposes RESTful endpoints to:
* Register new companies
* List recently registered companies
* Identify companies with recent transfers

## Overview

The application provides a secure API for financial operations with:
* JWT authentication for protected endpoints
* Data validation for all inputs
* Optimized queries with MongoDB indexing
* Automated database seeding for development

## Architecture
### Technology Stack

- **MongoDB**: Primary database for companies and transfers data
- **Express.js**: Web framework for API endpoints
- **JWT**: Authentication and authorization
- **Docker**: Containerization for easy deployment

### Application Layers

- **Controller**: Handles HTTP requests/responses and validation
- **Service**: Contains business logic and data processing
- **Repository**: Manages database operations with Mongoose
- **Middleware**: Authentication and error handling

## API Documentation
### Authentication
* **Login**: (POST /api/auth/login)
```
{
    "username": "admin",
    "password": "admin123"
}
```
***Returns JWT token for authenticated requests***

### Company Endpoints
1. Register a Company
    * **Endpoint:** POST /api/companies
    * **Request:**
    ```
    {
        "cuit": "30-12345678-9",
        "razonSocial": "Empresa Ejemplo SA"
    }
    ```
    * **Response:**
    ```
    {
        "_id": "65f1a9d8b4c9e87254e3fa41",
        "cuit": "30-12345678-9",
        "razonSocial": "Empresa Ejemplo SA",
        "fechaAdhesion": "2024-05-20T12:00:00Z"
    }
    ```

2. Get Recent Companies
    * **Endpoint:** GET /api/companies/last-month
    * **Response:**
    ```
    [
        {
            "_id": "65f1a9d8b4c9e87254e3fa41",
            "cuit": "30-12345678-9",
            "razonSocial": "Empresa Ejemplo SA",
            "fechaAdhesion": "2024-05-15T10:00:00Z"
        }
    ]
    ```

### Company Endpoints
3. Get Recent Companies
    * **Endpoint:** GET /api/transfers/companies-last-month
    * **Headers:** Authorization: Bearer <JWT_TOKEN>
    * **Response:**
    ```
    [
        {
            "_id": "65f1a9d8b4c9e87254e3fa41",
            "cuit": "30-12345678-9",
            "razonSocial": "Empresa Ejemplo SA",
            "fechaAdhesion": "2024-05-15T10:00:00Z"
        }
    ]
    ```

## Data Validation
### Company Registration
* **CUIT:** Must match format XX-XXXXXXXX-X
* **Business Name:** Only allows letters, numbers and basic punctuation
* **Duplicate CUIT:** Prevent duplicate registrations

### Transfer Records
* **Amount:** Must be positive number
* **Accounts:** Debit/Credit accounts must differ
* **Company Reference:** Must reference valid company

## Performance Features
* Indexed queries on frequently accessed fields:
    * cuit (unique)
    * fechaAdhesion
    * Transfer dates
* Database-side filtering for date ranges
* Optimized aggregation pipelines

## How to Run
### Prerequisites
* Docker and Docker Compose
* Node.js (v18+ recommended)

### Running with Docker
```
# 1. Clone repository
git clone https://github.com/dardojav/interbanking-challenge.git
cd interbanking-challenge

# 2. Start the application
docker-compose up --build

# API will be available at "http://localhost:3000"
```

### Environment Variables
- .env file created with this values:
```
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://mongo:27017/companies-transfers
JWT_SECRET=ClaveSecreta123!@XYZ987
JWT_EXPIRES_IN=1h
```

## Testing the API
### Postman Collection
The postman collection for testing is at root folder called "Interbanking-challenge.postman_collection.json"
- please import the collection in a tool for testing and developing REST APIs like postman, Insomnia, Thunder Client, etc

### Example Requests
1. **Register Company:**
```
curl -X POST http://localhost:3000/api/companies \
  -H "Content-Type: application/json" \
  -d '{"cuit":"30-87654321-9", "razonSocial":"Mi Empresa"}'
```

2. **Get Recent Companies:**
```
curl http://localhost:3000/api/companies/last-month
```

3. **Get Companies with Transfers:**
```
curl http://localhost:3000/api/transfers/companies-last-month \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Database Access
For development inspection, connect to MongoDB:
* **URI:** mongodb://localhost:27017/companies-transfers
* **Compass** Connection: Use the above URI in MongoDB Compass

## Project Structure
```
src/
├── config/       # Environment and DB configuration
├── controllers/  # Route controllers
├── interfaces/   # TypeScript interfaces
├── middleware/   # Auth and error handlers
├── models/       # MongoDB models
├── repositories/ # Database operations
├── routes/       # API endpoints
├── services/     # Business logic
├── utils/        # Logger and constants
└── tests/        # Test suites
```

## NOTES
Due to lack of time, I couldn't:
- Finish the testing section
- Add a set of tools for documentation and testing like swagger
