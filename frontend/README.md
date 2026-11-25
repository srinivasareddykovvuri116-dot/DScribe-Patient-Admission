# DScribe – Patient Admission Management System

A full-stack Patient Admission Management System developed as part of the DScribe Software Engineer Intern Round 1 assignment.

## Features

- Register new patients with validated details.
- View all patient records.
- Search patients by name.
- Filter patients by ward, department, and doctor.
- Edit existing patient information.
- Mark patients as discharged.
- Delete patient records with confirmation.
- Dashboard statistics for total, admitted, and discharged patients.
- Responsive design for desktop, tablet, and mobile devices.
- Frontend and backend data validation.
- Persistent patient records using PostgreSQL.

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Lucide React

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- Bean Validation

### Database
- PostgreSQL

## Project Structure

```text
DScribe-Patient-Admission/
├── backend/
│   └── patient-admission/
│       ├── src/
│       └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- Java 17 or later
- Maven
- Node.js and npm
- PostgreSQL

## Run Locally

### 1. Database Setup

Start PostgreSQL and create the database:

```sql
CREATE DATABASE dscribe_patient_db;
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend/patient-admission
```

Configure the PostgreSQL password using the `DB_PASSWORD` environment variable.

For PowerShell:

```powershell
$env:DB_PASSWORD = "your_postgresql_password"
```

Start the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory using `.env.example` as a reference:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Start the React development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

**Note:** PostgreSQL and the Spring Boot backend must be running before using the frontend.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/patients` | Retrieve all patients |
| GET | `/api/patients/options` | Retrieve dropdown options |
| GET | `/api/patients/{id}` | Retrieve a patient by ID |
| POST | `/api/patients` | Register a new patient |
| PUT | `/api/patients/{id}` | Update patient information |
| PATCH | `/api/patients/{id}/discharge` | Mark a patient as discharged |
| DELETE | `/api/patients/{id}` | Delete a patient |

Patient listing supports search and filtering by ward, department, and doctor.

## Validation

Patient information is validated on both frontend and backend.

- Patient name is required and must contain only letters and spaces.
- Age is required and must be between 0 and 120.
- Gender, ward, department, and doctor are required.
- Admission date is required and cannot be in the future.
- Invalid requests are rejected by the backend with validation error messages.


## Live Demo

- **Frontend:** Coming soon
- **Backend API:** Coming soon

## Author

Developed as part of the DScribe Software Engineer Intern Round 1 assignment.
