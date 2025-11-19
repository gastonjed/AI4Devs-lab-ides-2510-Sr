# Prompt: Backend Candidate API Endpoints

## Objective
Implement REST API endpoints for candidate CRUD operations with validation and error handling.

## Context
- **Backend**: Express with TypeScript
- **ORM**: Prisma Client
- **Validation**: express-validator
- **File Upload**: Multer middleware (from prompt 02)

## Requirements

### 1. Setup

**Install**:
```bash
npm install express-validator
```

**File**: `backend/src/routes/candidateRoutes.ts`

### 2. API Endpoints

#### POST /api/candidates

**Purpose**: Create new candidate with optional CV upload

**Request**:
- Content-Type: `multipart/form-data`
- Required: firstName, lastName, email, phone
- Optional: address, education, workExperience, recruiterName, cv (file)

**Middleware Chain**:
1. `uploadCV` (Multer - handles file)
2. `handleUploadError` (Multer errors)
3. `candidateValidationRules` (express-validator)
4. Controller logic

**Validation Rules**:
- firstName: trim, required, 1-100 chars
- lastName: trim, required, 1-100 chars
- email: trim, required, valid email, normalize, max 255 chars
- phone: trim, required, pattern `/^[0-9+\s\-()]+$/`, 7-50 chars
- address: optional, trim, max 500 chars
- education: optional, trim, max 2000 chars
- workExperience: optional, trim, max 2000 chars
- recruiterName: optional, trim, max 100 chars

**Success Response (201)**:
```json
{
  "message": "Candidate added successfully",
  "candidate": { ...candidate object }
}
```

**Error Responses**:
- 400: Validation errors (details array)
- 409: Duplicate email (Prisma P2002)
- 500: Server error

#### GET /api/candidates

**Purpose**: List all candidates

**Response (200)**:
```json
{
  "count": 10,
  "candidates": [ ...array ]
}
```

**Notes**:
- Order by createdAt DESC (newest first)
- Don't expose cvFilePath in response (security)

#### GET /api/candidates/:id

**Purpose**: Get single candidate by ID

**Response (200)**: Candidate object
**Error (404)**: Candidate not found
**Error (400)**: Invalid ID format

### 3. Error Handling

**Prisma Errors**:
- P2002 (unique constraint) → 409 Conflict

**Validation Errors**:
- Return 400 with field-specific messages
- Format: `{ error, message, details: [{field, message}] }`

**General Errors**:
- Log to console
- Return 500 with generic message (don't expose internals)

### 4. Integration

**Update** `backend/src/index.ts`:
- Import candidateRoutes
- Use: `app.use('/api/candidates', candidateRoutes)`
- Add global error handler
- Add graceful Prisma shutdown

### 5. Security

- No cvFilePath in API responses
- Input sanitization (trim)
- Prisma parameterized queries (auto SQL injection prevention)
- Email normalization

## Implementation Checklist

- [ ] Install express-validator
- [ ] Create candidateRoutes.ts
- [ ] Define validation rules
- [ ] Implement POST endpoint with validation
- [ ] Handle Prisma duplicate email error (409)
- [ ] Implement GET all candidates
- [ ] Implement GET single candidate
- [ ] Update index.ts with routes
- [ ] Add global error handler
- [ ] Test all endpoints
- [ ] Test validation errors
- [ ] Test duplicate email
- [ ] Test file upload integration

## Testing Scenarios

1. **Valid submission** → 201 with candidate object
2. **Missing required field** → 400 with error details
3. **Invalid email** → 400 "Invalid email format"
4. **Invalid phone** → 400 "Phone can only contain..."
5. **Duplicate email** → 409 "Email already exists"
6. **With CV file** → 201, file saved
7. **Get all** → 200 with array
8. **Get single** → 200 with object
9. **Get non-existent** → 404

## Expected Outcome

- Three working endpoints (POST, GET all, GET single)
- Comprehensive validation with clear error messages
- Proper HTTP status codes
- File upload integrated
- Duplicate email prevention
- TypeScript type safety

---

**Next Steps**: Proceed to API documentation (prompt 04).
