# Daarut-Taahseen API

A comprehensive Learning Management System (LMS) API built with Node.js and Express, providing secure authentication and user management for educational institutions.

## 🚀 Overview

The Daarut-Taahseen API is a robust backend service designed to power modern learning management systems. It provides secure user authentication, role-based access control, and comprehensive user management capabilities for students, teachers, and administrators.

## ✨ Key Features

- **Multi-Role Authentication** - Support for Students, Teachers, and Administrators
- **Email Verification** - OTP-based email verification system
- **JWT Authentication** - Secure token-based authentication
- **Auto-Generated IDs** - Automatic matric numbers and teacher IDs
- **Role-Based Access Control** - Granular permissions system
- **User Management** - Complete CRUD operations for user accounts
- **Profile Management** - User profile updates and password changes
- **Admin Dashboard** - Administrative user management tools

## 🏗️ Architecture

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Integrated OTP email system
- **Security**: bcrypt password hashing, input validation

## 🔗 Base URL

```
https://dt-backend-qxza.onrender.com/api/v1
```

## 📚 API Documentation

Our API is organized into logical modules. Each module has its own detailed documentation:

### Authentication & User Management
- **[Authentication](/docs/auth.md)** - User registration, login, OTP verification, and profile management

### Coming Soon
- **Courses** - Course creation and management
- **Enrollments** - Student course enrollments
- **Assessments** - Quizzes and assignments
- **Content Management** - Educational content delivery

## 🎯 User Roles

### Student
- Auto-generated matric number format: `DT/2025/001`
- Access to enrolled courses and assessments
- Profile management capabilities

### Teacher  
- Auto-generated teacher ID format: `DT/25/001`
- Course creation and management
- Student assessment capabilities

### Admin
- Full system access and user management
- Analytics and reporting capabilities
- System configuration controls

## 🔒 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 24 hours and must be refreshed through re-authentication.

## 📊 Response Format

All API responses follow a consistent JSON structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## 🚦 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `410` - Gone (expired)
- `500` - Internal Server Error

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- MongoDB
- Valid email service configuration

### Quick Start
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
```env
PORT=9000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE_CONFIG=your_email_configuration
```

## 🔐 Security Features

- **Password Security** - bcrypt hashing with salt rounds
- **Token Security** - JWT with expiration and secure signing
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - API rate limiting protection
- **Email Verification** - Two-factor account verification
- **Role-Based Access** - Granular permission system

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

## 📞 Support

For API support and questions:
- **Documentation**: Check the `/docs` folder for detailed endpoint documentation
- **Issues**: Submit issues through the project repository
- **Email**: Contact our development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the Daarut-Taahseen Learning Community**