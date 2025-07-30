# Authentication API Documentation

Complete documentation for the Daarut-Taahseen Authentication API endpoints.

## Base URL
```
https://dt-backend-qxza.onrender.com/api/v1/auth
```

## Overview

The Authentication API provides comprehensive user management for the Daarut-Taahseen Learning Management System. It supports three user roles (Student, Teacher, Admin) with secure registration, email verification, and JWT-based authentication.

### Authentication Flow
1. **Registration** → User creates account (unverified status)
2. **OTP Verification** → Email verification completes registration
3. **Login** → JWT token issued for authenticated access
4. **Protected Access** → Token required for authenticated endpoints

### Auto-Generated User IDs
- **Students**: `DT/2025/001` (matric number format)
- **Teachers**: `DT/25/001` (teacher ID format)  
- **Admins**: No auto-generated ID required

---

## 🔐 Public Endpoints

### Register User
Creates a new user account and initiates email verification process.

**`POST /register`**

#### Request Body
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

#### Field Requirements
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `NIN` | string | ✅ | Exactly 11 digits |
| `full_name` | string | ✅ | Non-empty string |
| `email` | string | ✅ | Valid email format |
| `gender` | string | ✅ | "male" or "female" |
| `phone_number` | string | ✅ | Valid phone format |
| `password` | string | ✅ | Minimum 6 characters |
| `confirm_password` | string | ✅ | Must match password |
| `role` | string | ❌ | "student", "teacher", "admin" (default: "student") |
| `image` | string | ❌ | Valid URL (auto-generated if omitted) |

#### Success Response `201`
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

#### Error Responses
- **`400`** - Validation errors, duplicate email/NIN, password mismatch
- **`500`** - Server error during registration

---

### Verify OTP
Completes user registration by verifying the email OTP code.

**`POST /verify-otp`**

#### Request Body
```json
{
  "email": "john@example.com",
  "code": "123456"
}
```

#### Success Response `200`
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

#### Error Responses
- **`404`** - OTP not found or user not found
- **`401`** - Invalid OTP code
- **`410`** - OTP expired (10 minutes)

---

### Resend OTP
Generates and sends a new OTP to the user's email address.

**`POST /resend-otp`**

#### Request Body
```json
{
  "email": "john@example.com"
}
```

#### Success Response `200`
```json
{
  "success": true,
  "message": "OTP resent successfully"
}
```

#### Error Responses
- **`404`** - User not found
- **`400`** - User already verified

---

### Login
Authenticates user credentials and returns JWT access token.

**`POST /login`**

#### Request Body
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Success Response `200`
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

#### Error Responses
- **`401`** - Invalid email/password combination
- **`401`** - Email not verified (must verify OTP first)
- **`401`** - Account deactivated by administrator

---

## 👤 Protected Endpoints
*All endpoints require `Authorization: Bearer <token>` header*

### Get Profile
Retrieves the authenticated user's complete profile information.

**`GET /profile`**

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Success Response `200`
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

### Update Profile
Updates the authenticated user's profile information.

**`PUT /profile`**

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Request Body
```json
{
  "full_name": "John Smith",
  "phone_number": "+2348987654321",
  "gender": "male",
  "image": "https://newimage.com/profile.jpg"
}
```

#### Updatable Fields
- `full_name` - User's full name
- `phone_number` - Contact phone number
- `gender` - "male" or "female"
- `image` - Profile image URL

**Note:** All fields are optional. Include only the fields you want to update.

#### Success Response `200`
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      // Updated user object with new values
    }
  }
}
```

---

### Change Password
Updates the authenticated user's password with proper verification.

**`PUT /change-password`**

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Request Body
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword456!",
  "confirm_password": "NewPassword456!"
}
```

#### Success Response `200`
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

#### Error Responses
- **`400`** - New password and confirmation don't match
- **`400`** - Current password is incorrect

---

## 👨‍💼 Admin-Only Endpoints
*Requires authentication + admin role*

### Get All Users
Retrieves paginated list of all system users with filtering and search capabilities.

**`GET /users`**

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Query Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 10 | Results per page (max: 100) |
| `role` | string | - | Filter by role: "admin", "teacher", "student" |
| `search` | string | - | Search in name, email, matric_number, teacher_id |

#### Example Request
```http
GET /users?page=1&limit=5&role=student&search=john
```

#### Success Response `200`
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

### Get User by ID
Retrieves detailed information for a specific user.

**`GET /users/:id`**

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Path Parameters
- `id` - MongoDB ObjectId of the target user

#### Success Response `200`
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      // Complete user object (password excluded)
    }
  }
}
```

#### Error Response
- **`404`** - User not found

---

### Update User Status
Activates or deactivates a user account (admin control).

**`PUT /users/:id/status`**

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Request Body
```json
{
  "is_active": true
}
```

#### Success Response `200`
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

### Delete User
Permanently removes a user account from the system.

**`DELETE /users/:id`**

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Success Response `200`
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

#### Error Response
- **`404`** - User not found

---

## 🔒 Security & Authentication

### JWT Token Management
- **Expiration**: 24 hours
- **Algorithm**: HS256
- **Header Format**: `Authorization: Bearer <token>`
- **Refresh**: Re-authentication required after expiration

### OTP System
- **Validity**: 10 minutes
- **Format**: 6-digit numeric code
- **Delivery**: Email
- **Development**: Logged to console for testing

### Password Security
- **Hashing**: bcrypt with salt rounds
- **Minimum Length**: 6 characters
- **Validation**: Must match confirmation during registration/change

---

## 📧 Email Configuration

### Development Mode
OTPs are logged to the server console:
```
🔐 === OTP EMAIL ===
📧 To: john@example.com
🔑 OTP Code: 123456
⏰ Valid for: 10 minutes
===================
```

### Production Mode
OTPs are sent via configured email service to user's registered email address.

---

## 🔧 Example Usage

### Complete Registration & Login Flow

#### 1. Register New User
```bash
curl -X POST https://dt-backend-qxza.onrender.com/api/v1/auth/register \
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

#### 2. Verify Email with OTP
```bash
curl -X POST https://dt-backend-qxza.onrender.com/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "code": "123456"
  }'
```

#### 3. Login to Get Token
```bash
curl -X POST https://dt-backend-qxza.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

#### 4. Access Protected Endpoint
```bash
curl -X GET https://dt-backend-qxza.onrender.com/api/v1/auth/profile \
  -H "Authorization: Bearer your_jwt_token_here"
```

### Admin Operations

#### Get All Students
```bash
curl -X GET "https://dt-backend-qxza.onrender.com/api/v1/auth/users?role=student&page=1&limit=10" \
  -H "Authorization: Bearer admin_jwt_token"
```

#### Deactivate User Account
```bash
curl -X PUT https://dt-backend-qxza.onrender.com/api/v1/auth/users/507f1f77bcf86cd799439011/status \
  -H "Authorization: Bearer admin_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{"is_active": false}'
```

---

## ⚠️ Common Issues

### Registration Problems
- **"Email already exists"** - Use a unique email address
- **"NIN already exists"** - Each NIN can only be used once
- **"Passwords don't match"** - Ensure password and confirm_password are identical

### OTP Issues
- **"OTP expired"** - Request new OTP using `/resend-otp`
- **"Wrong OTP code"** - Check email for correct 6-digit code
- **"OTP not found"** - Ensure email address matches registration

### Authentication Problems
- **"Please verify your email"** - Complete OTP verification first
- **"Invalid credentials"** - Check email/password combination
- **"Account is deactivated"** - Contact administrator

### Token Issues
- **"Authorization header missing"** - Include `Authorization` header
- **"Invalid token"** - Token may be expired or malformed
- **"Access denied"** - Insufficient permissions for requested resource

---

## 📝 Error Response Examples

### Validation Error
```json
{
  "success": false,
  "message": "Passwords do not match",
  "statusCode": 400
}
```

### Authentication Error
```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401
}
```

### Authorization Error
```json
{
  "success": false,
  "message": "Access denied. Admin role required.",
  "statusCode": 403
}
```

### Not Found Error
```json
{
  "success": false,
  "message": "User not found",
  "statusCode": 404
}
```