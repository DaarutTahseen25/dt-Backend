# Tests API Documentation

The Tests API provides functionality for retrieving test questions, submitting answers, and managing test results based on user skill levels.

## Base URL
```
https://dt-backend-qxza.onrender.com/api/v1/tests
```

## Available Endpoints

### 1. Get Test Questions
Retrieve test questions based on the user's registered level.

**Endpoint:** `GET /questions`  
**Authentication:** Required (Bearer Token)  

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Test questions retrieved for intermediate level",
  "data": {
    "level": "intermediate",
    "total_questions": 30,
    "questions": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef1",
        "question_text": "What is the chemical symbol for water?",
        "options": [
          { "text": "H2O", "_id": "64a1b2c3d4e5f6789abcdef2" },
          { "text": "CO2", "_id": "64a1b2c3d4e5f6789abcdef3" },
          { "text": "NaCl", "_id": "64a1b2c3d4e5f6789abcdef4" },
          { "text": "O2", "_id": "64a1b2c3d4e5f6789abcdef5" }
        ],
        "subject": "Chemistry",
        "level": "intermediate"
      }
    ]
  }
}
```

**Error Responses:**
- `400` - User not registered for any level or has already taken the test
- `404` - No questions available for the user's level
- `401` - Unauthorized (invalid or missing token)

### 2. Submit Test
Submit test answers and receive results.

**Endpoint:** `POST /submit`  
**Authentication:** Required (Bearer Token)  

**Request Body:**
```json
{
  "answers": [
    {
      "question_id": "64a1b2c3d4e5f6789abcdef1",
      "selected_option": "H2O"
    },
    {
      "question_id": "64a1b2c3d4e5f6789abcdef6", 
      "selected_option": "Paris"
    }
  ]
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "Test submitted successfully",
  "data": {
    "submission_id": "64a1b2c3d4e5f6789abcdef7",
    "level": "intermediate",
    "score": 85,
    "percentage": 85.0,
    "correct_answers": 17,
    "total_questions": 20,
    "passed": true,
    "pass_mark": 60,
    "submitted_at": "2025-01-15T10:35:00.000Z"
  }
}
```

**Request Body Fields:**
- `answers`: Array of answer objects
  - `question_id`: MongoDB ObjectId of the question
  - `selected_option`: Text of the selected option

**Error Responses:**
- `400` - Invalid answers format, question validation errors, or user has already taken test
- `401` - Unauthorized (invalid or missing token)

### 3. Get Test History
Retrieve the user's test submission history.

**Endpoint:** `GET /history`  
**Authentication:** Required (Bearer Token)  

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Test history retrieved successfully",
  "data": {
    "submissions": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef7",
        "level": "intermediate",
        "score": 85,
        "percentage": 85.0,
        "correct_answers": 17,
        "total_questions": 20,
        "passed": true,
        "pass_mark": 60,
        "submitted_at": "2025-01-15T10:35:00.000Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 3,
      "total_submissions": 25,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### 4. Get Test Details
Retrieve detailed information about a specific test submission.

**Endpoint:** `GET /submission/:submissionId`  
**Authentication:** Required (Bearer Token)  

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Test details retrieved successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef7",
    "user_id": "64a1b2c3d4e5f6789abcdef0",
    "level": "intermediate",
    "answers": [
      {
        "question_id": {
          "_id": "64a1b2c3d4e5f6789abcdef1",
          "question_text": "What is the chemical symbol for water?",
          "options": [
            { "text": "H2O", "is_correct": true },
            { "text": "CO2", "is_correct": false }
          ],
          "subject": "Chemistry"
        },
        "selected_option": "H2O",
        "is_correct": true
      }
    ],
    "score": 85,
    "percentage": 85.0,
    "correct_answers": 17,
    "total_questions": 20,
    "passed": true,
    "submitted_at": "2025-01-15T10:35:00.000Z"
  }
}
```

**Error Responses:**
- `404` - Test submission not found or doesn't belong to user
- `401` - Unauthorized (invalid or missing token)

### 5. Get Level Statistics
Get statistics for a specific level (public endpoint).

**Endpoint:** `GET /stats/:level`  
**Authentication:** Not required  

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Statistics for intermediate level retrieved successfully",
  "data": {
    "level": "intermediate",
    "stats": {
      "totalAttempts": 150,
      "averageScore": 72.5,
      "passRate": 0.68
    }
  }
}
```

**Statistics Fields:**
- `totalAttempts`: Total number of test attempts for this level
- `averageScore`: Average percentage score across all attempts
- `passRate`: Percentage of attempts that passed (0-1 range)

### 6. Seed Test Questions (Admin Only)
Initialize the database with test questions for all levels.

**Endpoint:** `POST /seed-questions`  
**Authentication:** Required (Admin Bearer Token)  

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Test questions seeded successfully",
  "data": {
    "success": true,
    "message": "Questions seeded successfully"
  }
}
```

**Error Responses:**
- `403` - Forbidden (user is not an admin)
- `401` - Unauthorized (invalid or missing token)

## Test Structure

### Question Distribution
- **Total Questions:** 90 (30 per level)
- **Beginner:** Basic general knowledge, simple math, elementary concepts
- **Intermediate:** Moderate complexity across various subjects
- **Advanced:** Complex questions requiring deep understanding

### Test Configuration
- **Questions per Test:** 30
- **Pass Mark:** 60%
- **Question Types:** Multiple choice (4 options each)
- **Test Limit:** One attempt per level

### Scoring System
- **Score:** Raw points based on correct answers
- **Percentage:** (Correct answers / Total questions) × 100
- **Pass Status:** True if percentage ≥ pass mark

## Usage Flow

1. **Register Level** - Use Levels API to register for a skill level
2. **Get Questions** - Retrieve test questions for your level (one-time only)
3. **Take Test** - Answer all 30 multiple choice questions
4. **Submit Test** - Submit answers and receive instant results
5. **View History** - Check past test performances
6. **Review Details** - Examine specific test submissions

## Notes

- Users must be registered for a level before accessing questions
- Each user can only take the test **once per level**
- Questions are randomly selected from the level's question pool
- Correct answers are not revealed in the questions endpoint
- Test submissions are permanent and cannot be modified
- All timestamps are in ISO 8601 format (UTC)
- No time tracking - simple MCQ format for Arabic institution