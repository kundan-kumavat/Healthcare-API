# Healthcare API

The Healthcare API provides a comprehensive suite of endpoints for managing user profiles, doctors' information, user medical data and appointments. It facilitates seamless user registration, data aggregation, appointment handling and analytics while ensuring robust authentication and secure data handling. Below is a detailed guide for each key feature, including required fields and expected outputs.

---

### BASE URL : http://localhost:3000/api/v1/

## **User Management**
### **1. User Registration**
- **Endpoint**: `POST users/register`
- **Description**: Registers a new user into the system.
- **Required Fields**:
  - `username` (string): Unique username.
  - `email` (string): User's email address.
  - `password` (string): Secure password.

### **2. User Login**
- **Endpoint**: `POST users/login`
- **Description**: Authenticates users with their credentials.
- **Required Fields**:
  - `email` (string): Registered email.
  - `password` (string): Password.
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

### **5. Refresh Access Token**
- **Endpoint**: `POST users/refresh-token`
- **Description**: Once the access token expires, use this end point to generate new access token.
- **Required Fields**:
  - `refreshToken` (string): Pass the refresh token of the user.

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
- **Optional Fields**:
  - `avatar` (string): Profile or avatar image of the user.
  - `height` (Number): Height of the user in centimeter.
  - `weight` (Number): weight of the user in KG.
  - `address_2` (string): Address Line 2.
  - `city` (string): city of the user.
  - `working_hours` (Number): Working hours of the user per day.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |

### **7. Update user details**
- **Endpoint**: `PUT users/user-details`
- **Description**: Use to update the details of the user.
- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |

### **8. Update user avatar image**
- **Endpoint**: `POST users/update-avatar`
- **Description**: Update the user profile or avatar image.
- **Required Fields**:
  - `avatar` (string): User new profile or avatar image.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |

### **8. Fetch/Get user details**
- **Endpoint**: `GET users/current-user`
- **Description**: Get the user details stored on db.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |


### **9. Get user stats**
- **Endpoint**: `GET users/stats/:username` or `GET users/stats?username=john_doe`
- **Description**: Delete user from the system.
- **Required Fields**:
  - `username` (string): requires username in params to get user staticstics.

- **Header section**:

| key | value |
| --- | ----- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM |


### **10. Delete user**
- **Endpoint**: `DELETE users/`
- **Description**: Delete user from the system.

- **Header section**:

| key | value | description |
| --- | ----- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9._8Oaq83KIKhierDM | accessToken |

- **cookies**: cookies will be cleared or deleted.

---

## **Doctor Management**
### **1. Register a Doctor**
- **Endpoint**: `POST doctors/`
- **Description**: Adds a doctor to the system.
- **Required Fields**:
  - `name` (string): Doctor's name.
  - `specialization` (string): Field of expertise.
  - `experienceInYears` (number): Years of experience.
  - `location` (string): Address of the clinic.
  - `fees` (number): Fee charged for consultation.
  - `worksInHospitals` (Array): List of hosptials where doctor works.


### **2. Search Doctors**
- **Endpoint**: `GET doctors/` 
- **Description**: Searches for doctors based on location and specialization.
- **Query Parameters**:
  - `location` (string): Clinic's city or address.
  - `specialization` (string): Doctor's area of expertise.
- **Sample Request**:
  ```http
  GET doctors?location=NY&specialization=Cardiology
  ```

### **3. Update Docotor Details**
- **Endpoint**: `PUT doctors/:id` or `POST doctors?id=doctorId`
- **Description**: Updates doctor details to the system.
- **Query Parameters**: .Docotor Id to be updated.
- **Fields to update**:
  - `name` (string): Doctor's name.
  - `specialization` (string): Field of expertise.
  - `experienceInYears` (number): Years of experience.
  - `location` (string): Address of the clinic.
  - `fees` (number): Fee charged for consultation.
  - `worksInHospitals` (Array): List of hosptials where doctor works.
- **Sample Request**:
  ```http
  PUT doctors?id=doctorId
  ```

### **4. Delete Doctor**
- **Endpoint**: `POST doctors/:id` or `POST doctors?id=doctorId`
- **Description**: Delete doctor from the system.
- **Query Parameters**: Docotor Id to be deleted.
- **Sample Request**:
  ```http
  DELETE doctors?id=doctorId
  ```


## **Appointment Management**
### **1. Book an Appointment**
- **Endpoint**: `POST appointments/`
- **Description**: Books an appointment with a doctor.
- **Required Fields**:
  - `doctorId` (string): ID of the doctor.
  - `userId` (string): ID of the user.
  - `date` (string): Appointment date.
  - `timeSlot` (string): Appointment time.

### **2. Get User Appointments**
- **Endpoint**: `GET appointments/`
- **Description**: Get all appointments of a user.

### **3. Update an Appointment**
- **Endpoint**: `PUT appointments/:id`
- **Description**: update an appointment detils.
- **Query Parameter**: Books an appointment with a doctor.
- **Fields to update**:
  - `doctorId` (string): ID of the doctor.
  - `userId` (string): ID of the user.
  - `date` (string): Appointment date.
  - `timeSlot` (string): Appointment time.
- **Sample Request**:
  ```http
  PUT appointments?id=appointmentId
  ```

### **1. Book an Appointment**
- **Endpoint**: `POST appointments/`
- **Description**: Books an appointment with a doctor.
- **Required Fields**:
  - `doctorId` (string): ID of the doctor.
  - `userId` (string): ID of the user.
  - `date` (string): Appointment date.
  - `timeSlot` (string): Appointment time.
- **Sample Request**:
  ```http
  DELETE appointments?id=appointmentId
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