# Daarut-Taahseen  API Documentation

## Base URL
```
https://dt-backend-qxza.onrender.com/api/v1/auth
```

## Authentication Overview
This API provides authentication services for a Learning Management System (LMS) with three user roles: **Student**, **Teacher**, and **Admin**.

### User Registration Flow
1. User registers → Account created (unverified)
2. OTP sent to email
3. User verifies OTP → Account verified & JWT token issued
4. User can now login

### Auto-Generated IDs
- **Students**: `DT/2025/001` (matric number format)
- **Teachers**: `DT/25/001` (teacher ID format)
- **Admins**: No auto-generated ID

---

## 🔐 Authentication Endpoints

### 1. Register User
Creates a new user account and sends OTP for verification.

**Endpoint:** `POST /register`

**Request Body:**
```json
{
  "NIN": "12345678901",
  "full_name": "John Doe",
  "email": "john@example.com",
  "gender": "male",
  "phone_number": "+2348123456789",
  "password": "Password123!",
  "confirm_password": "Password123!",
  "role": "student",
  "image": "https://example.com/profile.jpg"
}
```

**Required Fields:**
- `NIN` (string, 11 digits)
- `full_name` (string)
- `email` (valid email)
- `gender` (male/female)
- `phone_number` (string)
- `password` (string, min 6 chars)
- `confirm_password` (must match password)

**Optional Fields:**
- `role` (student/teacher/admin, defaults to "student")
- `image` (URL string, auto-generated if not provided)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email for OTP verification.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Passwords don't match / Email or NIN already exists
- `500` - Server error

---

### 2. Verify OTP
Verifies the OTP sent to user's email and completes registration.

**Endpoint:** `POST /verify-otp`

**Request Body:**
```json
{
  "email": "john@example.com",
  "code": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "NIN": "12345678901",
      "full_name": "John Doe",
      "email": "john@example.com",
      "gender": "male",
      "phone_number": "+2348123456789",
      "role": "student",
      "matric_number": "DT/2025/001",
      "image": "https://example.com/profile.jpg",
      "is_active": true,
      "is_verified": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

**Error Responses:**
- `404` - OTP not found
- `401` - Wrong OTP code
- `410` - OTP expired
- `404` - User not found

---

### 3. Resend OTP
Resends OTP to user's email if previous one expired or was lost.

**Endpoint:** `POST /resend-otp`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP resent successfully"
}
```

**Error Responses:**
- `404` - User not found
- `400` - User already verified

---

### 4. Login
Authenticates user and returns JWT token.

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "NIN": "12345678901",
      "full_name": "John Doe",
      "email": "john@example.com",
      "gender": "male",
      "phone_number": "+2348123456789",
      "role": "student",
      "matric_number": "DT/2025/001",
      "image": "https://example.com/profile.jpg",
      "is_active": true,
      "is_verified": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `401` - Please verify your email before logging in
- `401` - Account is deactivated

---

## 👤 Profile Endpoints
*Requires Authentication: Include `Authorization: Bearer <token>` header*

### 5. Get Profile
Retrieves current user's profile information.

**Endpoint:** `GET /profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "NIN": "12345678901",
      "full_name": "John Doe",
      "email": "john@example.com",
      "gender": "male",
      "phone_number": "+2348123456789",
      "role": "student",
      "matric_number": "DT/2025/001",
      "image": "https://example.com/profile.jpg",
      "is_active": true,
      "is_verified": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

---

### 6. Update Profile
Updates user's profile information.

**Endpoint:** `PUT /profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "full_name": "John Smith",
  "phone_number": "+2348987654321",
  "gender": "male",
  "image": "https://newimage.com/profile.jpg"
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      // Updated user object
    }
  }
}
```

---

### 7. Change Password
Changes user's password.

**Endpoint:** `PUT /change-password`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword456!",
  "confirm_password": "NewPassword456!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
- `400` - New passwords do not match
- `400` - Current password is incorrect

---

## 👨‍💼 Admin Endpoints
*Requires Authentication + Admin Role*

### 8. Get All Users
Retrieves paginated list of all users with filtering options.

**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10, max: 100)
- `role` (string: admin/teacher/student)
- `search` (string: searches name, email, matric_number, teacher_id)

**Example:** `GET /users?page=1&limit=5&role=student&search=john`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "full_name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "matric_number": "DT/2025/001",
        "is_active": true,
        "is_verified": true,
        "createdAt": "2025-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 45,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

### 9. Get User by ID
Retrieves specific user by their ID.

**Endpoint:** `GET /users/:id`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      // User object without password
    }
  }
}
```

**Error Response:**
- `404` - User not found

---

### 10. Update User Status
Activates or deactivates a user account.

**Endpoint:** `PUT /users/:id/status`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "is_active": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User activated successfully",
  "data": {
    "user": {
      // Updated user object
    }
  }
}
```

---

### 11. Delete User
Permanently deletes a user account.

**Endpoint:** `DELETE /users/:id`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Response:**
- `404` - User not found

---

## 🔒 Authentication

### JWT Token
All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Expiration
Tokens expire after 1 day. After expiration, users need to login again.

---

## 📝 Error Handling

### Standard Error Response Format:
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `410` - Gone (expired)
- `500` - Internal Server Error

---

## 🚀 Example Usage

### Complete Registration Flow:

1. **Register:**
```bash
curl -X POST http://localhost:9000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "NIN": "12345678901",
    "full_name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "phone_number": "+2348123456789",
    "password": "Password123!",
    "confirm_password": "Password123!",
    "role": "student"
  }'
```

2. **Verify OTP:**
```bash
curl -X POST http://localhost:9000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "code": "123456"
  }'
```

3. **Login:**
```bash
curl -X POST http://localhost:9000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

4. **Access Protected Route:**
```bash
curl -X GET http://localhost:9000/api/v1/auth/profile \
  -H "Authorization: Bearer your_jwt_token_here"
```

---

## 📧 Email Configuration

The system sends OTP emails during registration. For development, OTPs are logged to the console:

```
🔐 === OTP EMAIL ===
📧 To: john@example.com
🔑 OTP Code: 123456
⏰ Valid for: 10 minutes
===================
```

---

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- OTP email verification
- Role-based access control
- Input validation and sanitization
- Auto-generated unique user IDs
- Account activation/deactivation

---

## 📋 Notes

- OTPs expire after 10 minutes
- Passwords must be at least 6 characters
- NIN must be exactly 11 digits
- Gender accepts only "male" or "female"
- Default profile images are auto-generated if not provided
- Matric numbers and teacher IDs are auto-incremented by year