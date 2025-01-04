# Healthcare API

The Healthcare API provides a comprehensive suite of endpoints for managing user profiles, doctors' information, and appointments. It facilitates seamless user registration, data aggregation, and analytics while ensuring robust authentication and secure data handling. Below is a detailed guide for each key feature, including required fields and expected outputs.

---

## **User Management**
### **1. User Registration**
- **Endpoint**: `POST /api/users/register`
- **Description**: Registers a new user by collecting personal and account details.
- **Required Fields**:
  - `username` (string): Unique username.
  - `email` (string): User's email address.
  - `password` (string): Secure password.
  - `role` (string): Role of the user (e.g., "user" or "doctor").
- **Sample Request**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePass123",
    "role": "user"
  }
  ```
- **Sample Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "64a2b1c9ef4510d" 
  }
  ```

### **2. User Login**
- **Endpoint**: `POST /api/users/login`
- **Description**: Authenticates users with their credentials.
- **Required Fields**:
  - `email` (string): Registered email.
  - `password` (string): Password.
- **Sample Request**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePass123"
  }
  ```
- **Sample Response**:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJI..."
  }
  ```

---

## **Doctor Management**
### **1. Register a Doctor**
- **Endpoint**: `POST /api/doctors/register`
- **Description**: Adds a doctor to the system.
- **Required Fields**:
  - `name` (string): Doctor's name.
  - `specialization` (string): Field of expertise.
  - `experience` (number): Years of experience.
  - `clinicLocation` (string): Address of the clinic.
  - `consultationFee` (number): Fee charged for consultation.
- **Sample Request**:
  ```json
  {
    "name": "Dr. Smith",
    "specialization": "Cardiology",
    "experience": 10,
    "clinicLocation": "Downtown Clinic, NY",
    "consultationFee": 100
  }
  ```
- **Sample Response**:
  ```json
  {
    "message": "Doctor registered successfully",
    "doctorId": "64a2b1d0aa12345"
  }
  ```

### **2. Search Doctors**
- **Endpoint**: `GET /api/doctors/search`
- **Description**: Searches for doctors based on location and specialization.
- **Query Parameters**:
  - `location` (string): Clinic's city or address.
  - `specialization` (string): Doctor's area of expertise.
- **Sample Request**:
  ```http
  GET /api/doctors/search?location=NY&specialization=Cardiology
  ```
- **Sample Response**:
  ```json
  [
    {
      "name": "Dr. Smith",
      "specialization": "Cardiology",
      "clinicLocation": "Downtown Clinic, NY",
      "consultationFee": 100
    }
  ]
  ```

---

## **Appointment Management**
### **1. Book an Appointment**
- **Endpoint**: `POST /api/appointments/book`
- **Description**: Books an appointment with a doctor.
- **Required Fields**:
  - `doctorId` (string): ID of the doctor.
  - `userId` (string): ID of the user.
  - `date` (string): Appointment date.
  - `time` (string): Appointment time.
- **Sample Request**:
  ```json
  {
    "doctorId": "64a2b1d0aa12345",
    "userId": "64a2b1c9ef4510d",
    "date": "2024-01-15",
    "time": "10:00 AM"
  }
  ```
- **Sample Response**:
  ```json
  {
    "message": "Appointment booked successfully",
    "appointmentId": "64a3c1d5a7410e"
  }
  ```

---

## **Data Analytics**
### **1. User Statistics**
- **Endpoint**: `GET /api/users/stats`
- **Description**: Provides aggregated statistics like BMI and age for a user.
- **Query Parameters**:
  - `username` (string): Username of the user.
- **Sample Request**:
  ```http
  GET /api/users/stats?username=john_doe
  ```
- **Sample Response**:
  ```json
  {
    "username": "john_doe",
    "age": 30,
    "bmi": 23.5
  }
  ```

---

## **Error Handling**
The API provides descriptive error messages for invalid requests. For example:
- **Sample Error Response** (Invalid data):
  ```json
  {
    "message": "Required fields are missing"
  }
```