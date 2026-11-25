# DScribe – Patient Admission Management System

A full-stack Patient Admission Management System developed as part of the **DScribe Software Engineer Intern Round 1 assignment**.

The application helps hospital staff manage patient admissions, maintain patient records, track discharge status, and monitor admission statistics through a responsive dashboard.

## Live Application

- **Frontend:** https://dscribe-patient-admission-snowy.vercel.app
- **Backend API:** https://dscribe-patient-admission-v95l.onrender.com
- **API Options:** https://dscribe-patient-admission-v95l.onrender.com/api/patients/options

## Features

- Register new patients with validated details.
- View all patient records.
- Search patients by name.
- Filter patients by ward, department, and doctor.
- Edit existing patient information.
- Mark patients as discharged.
- Delete patient records with confirmation.
- Dashboard statistics for total, admitted, and discharged patients.
- Responsive interface for desktop, tablet, and mobile devices.
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
- Neon PostgreSQL (production database)

### Deployment
- Vercel – Frontend hosting
- Render – Backend hosting
- Neon – Cloud database

## Project Structure

```text
DScribe-Patient-Admission/
├── backend/
│   └── patient-admission/
│       ├── src/
│       ├── .mvn/
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── mvnw
│       ├── mvnw.cmd
│       └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application locally:

- Java 17 or later
- Node.js and npm
- PostgreSQL
- Git

The project includes Maven Wrapper scripts, so a separate Maven installation is not required.

## Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/srinivasareddykovvuri116-dot/DScribe-Patient-Admission.git

cd DScribe-Patient-Admission
```

### 2. Database Setup

Start PostgreSQL and create the database:

```sql
CREATE DATABASE dscribe_patient_db;
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend/patient-admission
```

Configure the database credentials using environment variables.

**Windows PowerShell:**

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/dscribe_patient_db"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "your_postgresql_password"
```

Start the Spring Boot application:

**Windows:**

```powershell
.\mvnw.cmd spring-boot:run
```

**Linux / macOS:**

```bash
./mvnw spring-boot:run
```

Backend URL:

http://localhost:8080

### 4. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory using `.env.example` as a reference.

Configure the API URL:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Start the React development server:

```bash
npm run dev
```

Frontend URL:

http://localhost:5173

**Note:** PostgreSQL and the Spring Boot backend must be running before using the frontend.

## API Endpoints

Base URL:

```text
/api/patients
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/patients` | Retrieve all patients |
| GET | `/api/patients/options` | Retrieve dropdown options |
| GET | `/api/patients/{id}` | Retrieve a patient by ID |
| POST | `/api/patients` | Register a new patient |
| PUT | `/api/patients/{id}` | Update patient information |
| PATCH | `/api/patients/{id}/discharge` | Mark a patient as discharged |
| DELETE | `/api/patients/{id}` | Delete a patient |

Patient listing supports search by name and filtering by ward, department, and doctor.

## Validation

Patient information is validated on both the frontend and backend.

- Patient name is required and must contain only letters and spaces.
- Age is required and must be between 0 and 120.
- Gender, ward, department, and doctor are required.
- Admission date is required and cannot be in the future.
- Invalid requests are rejected by the backend with appropriate validation error messages.

## Database Persistence

Patient records are stored in PostgreSQL using Spring Data JPA and Hibernate.

The production application uses Neon PostgreSQL, allowing patient records to persist independently of frontend or backend restarts.

## Deployment

- **Frontend:** Deployed on Vercel.
- **Backend:** Deployed on Render using Docker.
- **Database:** Hosted on Neon PostgreSQL.

The frontend communicates with the deployed Spring Boot backend through the configured API base URL.

## Author

Developed as part of the **DScribe Software Engineer Intern Round 1 assignment**.