# Healthcare API

The Healthcare API provides a comprehensive suite of endpoints for managing user profiles, doctors' information, user medical data and appointments. It facilitates seamless user registration, data aggregation, appointment handling and analytics while ensuring robust authentication and secure data handling. Below is a detailed guide for each key feature, including required fields and expected outputs.

---

### BASE URL : http://localhost:3000/api/v1

## **User Management**
### **1. User Registration**
- **Endpoint**: `POST users/register`
- **Description**: Registers a new user into the system.
- **Required Fields**:
  - `username` (string): Unique username.
  - `email` (string): User's email address.
  - `password` (string): Secure password.
- **Sample Request**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePass123"
  }
  ```
- **Sample Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### **2. User Login**
- **Endpoint**: `POST users/login`
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
    "user": {
        "_id": "1",
        "username": "john_doe",
        "email": "john@example.com",
        "createdAt": "2025-01-06T04:43:53.217Z",
        "updatedAt": "2025-01-06T04:43:53.217Z",
        "__v": 0,
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.0FG06Dje5Y8"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdiNWY4_mQh5N3VE_Ctih2JOT6dQunhc"
  }
  ```
- **Cookies**: Additional 2 cookies along with response : refreshToken, accessToken


### **3. User Logout**
- **Endpoint**: `POST users/logout`
- **Description**: Log out the user and ends the session.
- **Required Fields**:
  - `header ` (string): Passes the authorization token in the header of the request.
- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdiNWY4_mQh5N3VE_Ctih2JOT6dQunhc | accessToken |


- **Sample Response**:
  ```json
  {
    "message": "User logged successfully"
  }
  ```
- **Cookies**: cookies will be cleared

### **4. Change Password**
- **Endpoint**: `POST users/change-password`
- **Description**: Changes the password of the user.
- **Required Fields**:
  - `header ` (string): Passes the authorization token in the header of the request.
  - `oldPassword` (string): Old password of the user
  - `newPassword` (string): New password that to be set
- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdiNWY4_mQh5N3VE_Ctih2JOT6dQunhc | accessToken |

- **Sample Request**:
  ```json
  {
    "oldPassword": "securePass123",
    "newPassword": "securePass456"
  }
  ```

- **Sample Response**:
  ```json
  {
    "message": "Password changed successfully"
  }
  ```

### **5. Refresh Access Token**
- **Endpoint**: `POST users/refresh-token`
- **Description**: Once the access token expires, use this end point to generate new access token.
- **Required Fields**:
  - `refreshToken` (string): Pass the refresh token of the user.

- **Sample Request**:
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.0FG06Dje5Y8"
  }
  ```

- **Sample Response**:
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xidbFWOHmFRJhZvqJjmM"
  }
  ```

### **6. Add user personal details**
- **Endpoint**: `POST users/user-details`
- **Description**: Add user personal data like first name, dob, gender, weight height etc.
- **Required Fields**:
  - `firstName` (string): First name of the user.
  - `lastName` (string): Last Name of the user.
  - `dob` (string or Date): Date of birth.
  - `phone_no` (string): Phone number of the user.
  - `gender` (string): Gender of the user.
  - `address` (string): Address of the user.
  - `state` (string): State of the user.
  - `pincode` (string): pincode of the area where user stays.
  - `avatar` (string): Profile or avatar image of the user.
  - `height` (string): Height of the user in centimeter.
  - `weight` (string): weight of the user in KG.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |

- **Form Data**:

| key | value | description |
| --- | ----- | ----------- |
| firstName  | John |  |
| lastName  | Deo |  |
| dob  | 2004-12-24 |  |
| phone_no  | 498434165 |  |
| gender  | Male |  |
| working_hours  | 6 |  |
| height  | 175 | (cm) |
| weight  | 45 | (kg) |
| address  | ad ioauoe aoisdnoai  asujsdfoaij  |  |
| address_2  | aartast atata artast  | address line 2 |
| city  | Mumbai  |  |
| state  | Maharastra  |  |
| pincode  | 455 655 |  |
| avatar  | user_profile.jpg | (jpeg, jpg, png) |


- **Sample Response**:
  ```json
  {
    "message": "User details saved successfully"
  }
  ```

### **7. Update user details**
- **Endpoint**: `PUT users/user-details`
- **Description**: Use to update the details of the user.
- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |

- **Sample Request**:
  ```json
  {
    "dob": "2004-12-12",
    "phone_no": "242423432",
    "weight": 50,
    "height": 180
  }
  ```

- **Sample Response**:
  ```json
  {
    "message": "Account details not updated"
  }
  ```

### **8. Update user avatar image**
- **Endpoint**: `POST users/update-avatar`
- **Description**: Update the user profile or avatar image.
- **Required Fields**:
  - `avatar` (string): User new profile or avatar image.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |

- **Form Data**:

| key | value | description |
| --- | ----- | ----------- |
| avatar  | new_user_profile.jpg | (jpeg, jpg, png) |


- **Sample Response**:
  ```json
  { 
    "message": "User profile updated successfully" 
  }
  ```

### **8. Fetch/Get user details**
- **Endpoint**: `GET users/current-user`
- **Description**: Get the user details stored on db.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |


- **Sample Response**:
  ```json
  {
    "data": {
        "_id": "1",
        "firstName": "John",
        "lastName": "Deo",
        "dob": "2004-12-12",
        "phone_no": "242423432",
        "gender": "Male",
        "working_hours": 6,
        "height": 180,
        "weight": 50,
        "address": "ad ioauoe aoisdnoai  asujsdfoaij ",
        "address_2": "aartast atata artast",
        "city": "Mumbai",
        "state": "Maharastra",
        "pincode": "455 655",
        "avatar": "http://res.cloudinary.com/new_profile_image.jpg",
        "user": "677b5f896ab0345a5d0fbee0",
        "createdAt": "2025-01-06T05:43:45.283Z",
        "updatedAt": "2025-01-06T05:43:45.283Z",
        "__v": 0
    }
  }
  ```

### **9. Get user stats**
- **Endpoint**: `GET users/stats/:username` or `GET users/stats?username=john_doe`
- **Description**: Delete user from the system.
- **Required Fields**:
  - `username` (string): requires username in params to get user staticstics.

- **Header section**:

| key | value |
| --- | ----- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM |


- **Sample Response**:
  ```json
  {
    "message": "Fetched Successfully",
    "data": {
        "_id": "1",
        "username": "john_doe",
        "email": "john@example.com",
        "password": "$2Xa6d.6PziOICPrwVwLlAPIMpOdVnxkM7zCDoKN9v6",
        "createdAt": "2025-01-06T04:43:53.217Z",
        "updatedAt": "2025-01-06T05:13:22.081Z",
        "__v": 0,
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xidbFWOHmFRJhZvqJjmM",
        "personalInfo": [
            {
                "_id": "677b48",
                "gender": "Male",
                "height": 175,
                "weight": 45,
                "age": 20.082936820712835,
                "bmi": 14.693877551020408
            }
        ]
    }
  }
  ```


### **10. Delete user**
- **Endpoint**: `DELETE users/`
- **Description**: Delete user from the system.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |


- **Sample Response**:
  ```json
  {
    "message": "user deleted succesfully"
  }
  ```
- **cookies**: cookies will be cleared or deleted.

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