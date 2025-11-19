# Prompt: Frontend Form Validation

## Objective
Implement client-side validation for the candidate form with real-time feedback.

## Context
- **Form Component**: CandidateForm (from prompt 05)
- **Validation**: Client-side before API submission
- **Rules**: Match backend validation from prompt 03

## Requirements

### 1. Validation Utility Functions

**File**: `frontend/src/utils/validation.ts`

**Functions to Implement**:
- `validateRequired(value, fieldName)` - Check not empty
- `validateLength(value, fieldName, min, max)` - Check length
- `validateEmail(email)` - Check email format (contains @, valid pattern)
- `validatePhone(phone)` - Check phone format (pattern: `/^[0-9+\s\-()]+$/`)
- `validateOptionalText(value, fieldName, maxLength)` - Check max length if provided
- `validateFile(file)` - Check file type (PDF/DOCX) and size (5MB)
- `validateCandidateForm(formData, file)` - Validate all fields, return errors object
- `isFormValid(errors)` - Check if errors object is empty

**Return Types**:
- Individual validators: `string | null` (error message or null)
- validateCandidateForm: `ValidationErrors` object
- isFormValid: `boolean`

### 2. Validation Rules Summary

| Field | Rules |
|-------|-------|
| firstName | Required, 1-100 chars |
| lastName | Required, 1-100 chars |
| email | Required, valid email (contains @), max 255 chars |
| phone | Required, pattern `/^[0-9+\s\-()]+$/`, 7-50 chars |
| address | Optional, max 500 chars |
| education | Optional, max 2000 chars |
| workExperience | Optional, max 2000 chars |
| recruiterName | Optional, max 100 chars |
| cv | Optional, PDF/DOCX only, max 5MB |

### 3. Update CandidateForm Component

**Import**:
```typescript
import { validateCandidateForm, isFormValid } from '../../utils/validation';
```

**Update handleSubmit**:
1. Clear previous messages
2. Call `validateCandidateForm(formData, selectedFile)`
3. If errors exist (!isFormValid):
   - Set errors state
   - Focus first error field
   - Show general error message
   - Return (don't submit)
4. Clear errors
5. Set isSubmitting = true
6. Call API (placeholder for prompt 07)
7. Handle success/error
8. Set isSubmitting = false

**Focus Management**:
- Focus first field with error (accessibility)
- Use `document.getElementById(fieldName).focus()`

**Scroll to Top**:
- On success: `window.scrollTo({ top: 0, behavior: 'smooth' })`

### 4. Real-Time Validation (Optional Enhancement)

**Add onBlur Handlers**:
- Validate single field when user leaves it
- Clear error if field becomes valid
- Show error immediately without submitting

**Implementation**:
- Create `validateField(fieldName)` function
- Create `handleBlur` event handler
- Add `onBlur={handleBlur}` to all inputs

### 5. Character Counters (Optional)

**For Long Text Fields** (education, workExperience):
- Display: "X / 2000" characters
- Update on input change
- Styled in muted color

## Implementation Checklist

- [ ] Create utils/validation.ts
- [ ] Implement all validation functions
- [ ] Export validateCandidateForm and isFormValid
- [ ] Update CandidateForm to import validators
- [ ] Update handleSubmit with validation logic
- [ ] Add focus management for errors
- [ ] Test all validation rules
- [ ] Test error messages display
- [ ] Test form submission is blocked when invalid
- [ ] (Optional) Add onBlur real-time validation
- [ ] (Optional) Add character counters

## Testing Scenarios

1. **Empty required field** → Error shown, submission blocked
2. **Invalid email** (no @) → Error "Please enter a valid email"
3. **Invalid phone** (letters) → Error "Phone can only contain..."
4. **Exceeds max length** → Error "Must not exceed X characters"
5. **Invalid file type** (.txt) → Error "Only PDF and DOCX allowed"
6. **File too large** (>5MB) → Error "Exceeds 5MB limit"
7. **Valid form** → No errors, submits
8. **Multiple errors** → All shown, focus on first
9. **Error clears on fix** → Error disappears when user corrects

## Expected Outcome

- All form fields validated before submission
- Clear, specific error messages
- Errors display below fields
- Invalid forms cannot be submitted
- Focus moves to first error
- File validation immediate on selection
- Errors clear as user corrects them

---

**Next Steps**: Proceed to API integration (prompt 07).
