# Levels API Documentation

The Levels API allows users to register for different skill levels (beginner, intermediate, advanced) and manage their level preferences.

## Base URL
```
https://dt-backend-qxza.onrender.com/api/v1/levels
```

## Available Endpoints

### 1. Get Available Levels
Get all available skill levels with their descriptions.

**Endpoint:** `GET /available`  
**Authentication:** Not required  

**Response:**
```json
{
  "success": true,
  "message": "Available levels retrieved successfully",
  "data": [
    {
      "name": "beginner",
      "description": "Basic questions suitable for beginners",
      "difficulty": 1
    },
    {
      "name": "intermediate", 
      "description": "Moderate questions for intermediate learners",
      "difficulty": 2
    },
    {
      "name": "advanced",
      "description": "Challenging questions for advanced learners", 
      "difficulty": 3
    }
  ]
}
```

### 2. Register for a Level
Register the authenticated user for a specific skill level.

**Endpoint:** `POST /register`  
**Authentication:** Required (Bearer Token)  

**Request Body:**
```json
{
  "level": "beginner" // "beginner", "intermediate", or "advanced"
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "Successfully registered for beginner level",
  "data": {
    "user_id": "64a1b2c3d4e5f6789abcdef0",
    "level": "beginner",
    "registered_at": "2025-01-15T10:30:00.000Z",
    "is_active": true
  }
}
```

**Error Responses:**
- `400` - Invalid level or user already registered for this level
- `401` - Unauthorized (invalid or missing token)

### 3. Get User's Current Level
Retrieve the current level registration for the authenticated user.

**Endpoint:** `GET /my-level`  
**Authentication:** Required (Bearer Token)  

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "User level retrieved successfully",
  "data": {
    "user_id": "64a1b2c3d4e5f6789abcdef0",
    "level": "intermediate",
    "registered_at": "2025-01-15T10:30:00.000Z",
    "is_active": true
  }
}
```

**Error Responses:**
- `404` - No level registered for this user
- `401` - Unauthorized (invalid or missing token)

### 4. Update User Level
Update the authenticated user's skill level registration.

**Endpoint:** `PUT /update`  
**Authentication:** Required (Bearer Token)  

**Request Body:**
```json
{
  "level": "advanced" // New level to update to
}
```

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Level updated successfully to advanced",
  "data": {
    "user_id": "64a1b2c3d4e5f6789abcdef0",
    "level": "advanced",
    "registered_at": "2025-01-15T14:25:00.000Z",
    "is_active": true
  }
}
```

**Error Responses:**
- `400` - Invalid level or same level as current registration
- `404` - No existing level registration found
- `401` - Unauthorized (invalid or missing token)

## Level Types

### Beginner
- **Difficulty:** 1/3
- **Question Count:** 30 questions
- **Topics:** Basic general knowledge, simple mathematics, elementary science
- **Target:** Users new to the subject matter

### Intermediate  
- **Difficulty:** 2/3
- **Question Count:** 30 questions
- **Topics:** Moderate complexity questions across various subjects
- **Target:** Users with some experience and foundational knowledge

### Advanced
- **Difficulty:** 3/3
- **Question Count:** 30 questions  
- **Topics:** Complex questions requiring deep understanding
- **Target:** Experienced users seeking challenging content

## Usage Flow

1. **Get Available Levels** - Check what levels are available
2. **Register for Level** - Choose and register for a skill level
3. **Take Tests** - Use the Tests API to get questions for your level
4. **Update Level** - Change to a different level as skills improve

## Notes

- Users can only be registered for one level at a time
- Updating a level overwrites the previous registration
- Level registration is required before taking tests
- All timestamps are in ISO 8601 format (UTC)