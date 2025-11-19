# Prompt: Frontend API Integration

## Objective
Connect the candidate form to the backend API for form submission and error handling.

## Context
- **API Endpoint**: `POST http://localhost:3010/api/candidates`
- **Request Type**: `multipart/form-data` (for file upload)
- **Form Component**: `CandidateForm.tsx` (from prompt 05)
- **Validation**: Client-side validation complete (from prompt 06)

## Requirements

### 1. Create API Service

**File**: `frontend/src/services/api.ts`

**Purpose**: Centralized API communication layer

**Key Functions**:
- `createCandidate(formData, file)` - Submit candidate data to backend
- Error handling for different HTTP status codes
- Proper FormData construction for file upload

### 2. Update CandidateForm Component

**Update `handleSubmit` function** to:
1. Create FormData object with all fields
2. Append file if selected
3. Call `createCandidate` API function
4. Handle success response (show message, reset form)
5. Handle error responses with appropriate messages:
   - 400: Display validation errors from backend
   - 409: "Email already exists"
   - 500: "Server error, try again later"
   - Network error: "Connection failed, check network"

### 3. Error Handling Strategy

**Server Validation Errors (400)**:
- Parse `details` array from response
- Map errors to form fields
- Display field-specific error messages

**Duplicate Email (409)**:
- Show error on email field
- Message: "A candidate with this email already exists"

**General Errors**:
- Display in general error banner
- User-friendly messages (don't expose technical details)

### 4. Success Flow

After successful submission:
1. Show success message banner
2. Scroll to top of page
3. Keep form data populated initially
4. "Add Another Candidate" button resets form

### 5. Loading State

While submitting:
- Disable all form fields
- Disable submit button
- Show loading text: "Adding Candidate..."
- Prevent multiple submissions

## API Request Format

**Method**: POST
**URL**: `http://localhost:3010/api/candidates`
**Content-Type**: `multipart/form-data`

**Body Fields**:
- firstName (required)
- lastName (required)
- email (required)
- phone (required)
- address (optional)
- education (optional)
- workExperience (optional)
- recruiterName (optional)
- cv (file, optional)

## API Response Formats

**Success (201)**:
```json
{
  "message": "Candidate added successfully",
  "candidate": { ...candidate object }
}
```

**Validation Error (400)**:
```json
{
  "error": "Validation failed",
  "message": "...",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

**Duplicate Email (409)**:
```json
{
  "error": "Duplicate email",
  "message": "A candidate with this email address already exists"
}
```

## Implementation Checklist

- [ ] Create `frontend/src/services/api.ts`
- [ ] Implement `createCandidate` function
- [ ] Add error handling for all status codes
- [ ] Update `CandidateForm.tsx` handleSubmit
- [ ] Test with backend running
- [ ] Test success flow
- [ ] Test validation errors (400)
- [ ] Test duplicate email (409)
- [ ] Test network failure
- [ ] Verify loading states
- [ ] Verify error messages display correctly

## Testing

1. **Valid Submission**: Fill form correctly → Should succeed
2. **Invalid Data**: Send invalid data → Should show validation errors
3. **Duplicate Email**: Submit same email twice → Should show "email exists" error
4. **Backend Down**: Stop backend → Should show connection error
5. **Large File**: Upload 6MB file → Should be caught by client validation first
6. **Loading State**: Verify button disables during submission

---

**Next Steps**: After completing this prompt, proceed to dashboard and edit functionality (prompt 08).
