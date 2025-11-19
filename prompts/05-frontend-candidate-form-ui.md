# Prompt: Frontend Candidate Form UI

## Objective
Create an accessible, responsive React candidate registration form with all required fields.

## Context
- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: CSS Modules
- **Form Type**: Single-page, all fields visible
- **Required**: firstName, lastName, email, phone
- **Optional**: address, education, workExperience, recruiterName, cv file

## Requirements

### 1. TypeScript Interfaces

**File**: `frontend/src/types/candidate.ts`

**Interfaces**:
- `CandidateFormData` - All form fields
- `FormErrors` - Error messages mapped to fields
- `Candidate` - API response type
- `CandidateCreateResponse` - Success response
- `ApiErrorResponse` - Error response with details array

### 2. Form Component

**File**: `frontend/src/components/CandidateForm/CandidateForm.tsx`

**State Management**:
- `formData` - CandidateFormData object
- `selectedFile` - File | null
- `errors` - FormErrors object
- `isSubmitting` - boolean
- `submitSuccess` - boolean
- `submitError` - string

**Handlers**:
- `handleInputChange` - Update field value, clear error
- `handleFileChange` - Validate file type/size, set file
- `handleSubmit` - Validate and submit (placeholder for now)
- `handleReset` - Clear all fields and state

**Form Structure**:

1. **Personal Information Fieldset**:
   - firstName (text, required, max 100)
   - lastName (text, required, max 100)
   - email (email, required, max 255)
   - phone (tel, required, max 50)
   - address (textarea, optional, max 500)

2. **Professional Background Fieldset**:
   - education (textarea, optional, max 2000, rows 3)
   - workExperience (textarea, optional, max 2000, rows 3)

3. **CV Upload Fieldset**:
   - cv (file, optional, accept=".pdf,.docx")

4. **Recruiter Information Fieldset**:
   - recruiterName (text, optional, max 100)

**Form Actions**:
- Submit button (disabled while submitting)
- Clear form button

**Messages**:
- Success banner (green) with "Add Another" button
- Error banner (red) for general errors
- Field-level errors (red text below inputs)

### 3. CSS Module

**File**: `frontend/src/components/CandidateForm/CandidateForm.module.css`

**Styling**:
- Container: centered, max-width 800px, white background, shadow
- Responsive: mobile-first, 2-column on tablet+
- Form fields: consistent padding, border, focus styles
- Fieldsets: bordered sections with legends
- Buttons: primary (blue), secondary (white/bordered)
- Messages: color-coded (green success, red error)
- Touch-friendly: min 44x44px buttons
- Accessibility: sufficient contrast, focus indicators

**Responsive Breakpoints**:
- Mobile: < 768px (single column)
- Tablet: ≥ 768px (two columns for name/email/phone)
- Desktop: ≥ 1024px (larger text)

**Additional Styles**:
- Print styles (hide buttons)
- High contrast mode support
- Reduced motion support

### 4. ARIA Attributes

**Required on All Inputs**:
- `aria-required="true"` (required fields)
- `aria-invalid` (true when error present)
- `aria-describedby` (link to error message ID)

**Messages**:
- `role="alert"` on error messages
- `aria-live="polite"` on success messages
- `aria-live="assertive"` on critical errors

**Form**:
- `aria-busy` on form during submission

### 5. File Upload Validation

**Client-Side Checks** (in handleFileChange):
- File type: PDF or DOCX only
- File size: Max 5MB
- Show error immediately if invalid
- Display file name and size if valid

### 6. App Integration

**Update** `frontend/src/App.tsx`:
- Import CandidateForm
- Render CandidateForm component

## Implementation Checklist

- [ ] Create types/candidate.ts with interfaces
- [ ] Create CandidateForm directory
- [ ] Create CandidateForm.tsx component
- [ ] Implement all form fields with proper attributes
- [ ] Add file upload with validation
- [ ] Create CandidateForm.module.css
- [ ] Implement responsive styles
- [ ] Add ARIA attributes
- [ ] Update App.tsx to use component
- [ ] Test in browser (rendering)
- [ ] Test responsive design
- [ ] Test keyboard navigation
- [ ] Test file upload (valid/invalid)

## Form Fields Summary

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| firstName | text | Yes | 100 | - |
| lastName | text | Yes | 100 | - |
| email | email | Yes | 255 | placeholder: john.doe@example.com |
| phone | tel | Yes | 50 | placeholder: +1 (555) 123-4567 |
| address | textarea | No | 500 | rows: 2 |
| education | textarea | No | 2000 | rows: 3, with helper text |
| workExperience | textarea | No | 2000 | rows: 3, with helper text |
| recruiterName | text | No | 100 | placeholder: Jane Smith |
| cv | file | No | 5MB | accept: .pdf, .docx |

## Expected Outcome

- Complete form UI rendered
- All fields functional with state management
- Responsive design (mobile/tablet/desktop)
- Accessible (ARIA attributes, keyboard navigation)
- File validation working
- Form can be cleared
- Ready for validation integration (prompt 06)
- Ready for API integration (prompt 07)

---

**Next Steps**: Proceed to form validation (prompt 06).
