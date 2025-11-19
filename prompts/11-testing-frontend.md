# Prompt: Frontend Testing

## Objective
Write unit and integration tests for the CandidateForm component using React Testing Library and Jest.

## Context
- **Testing Framework**: Jest + React Testing Library (already installed)
- **Test File**: `frontend/src/components/CandidateForm/CandidateForm.test.tsx`
- **Component**: CandidateForm with validation and API integration

## Requirements

### 1. Test Setup

**File**: `frontend/src/components/CandidateForm/CandidateForm.test.tsx`

**Setup Requirements**:
- Import component and testing utilities
- Mock API service (`api.ts`)
- Render component for each test
- Clean up after each test

### 2. Rendering Tests

- [ ] Component renders without crashing
- [ ] All form fields are present
- [ ] All labels are present
- [ ] Submit button is present
- [ ] Required field indicators (*) are shown

### 3. User Interaction Tests

- [ ] User can type in text fields
- [ ] User can select a file
- [ ] User can clear form with reset button
- [ ] Form fields update state correctly

### 4. Validation Tests

**Client-Side Validation**:
- [ ] Empty firstName shows error on submit
- [ ] Empty lastName shows error on submit
- [ ] Empty email shows error on submit
- [ ] Invalid email format shows error
- [ ] Empty phone shows error on submit
- [ ] Invalid phone format shows error
- [ ] Invalid file type shows error immediately
- [ ] Large file (>5MB) shows error immediately

**Error Display**:
- [ ] Errors appear below respective fields
- [ ] Errors have proper ARIA attributes
- [ ] Errors clear when user corrects input

### 5. Form Submission Tests

**Successful Submission**:
- [ ] Valid form submits successfully
- [ ] Success message appears
- [ ] API is called with correct data
- [ ] Form can be reset after success

**Failed Submission**:
- [ ] Server validation errors (400) are displayed
- [ ] Duplicate email error (409) is shown
- [ ] Network error shows appropriate message
- [ ] Form remains enabled after error

### 6. Loading State Tests

- [ ] Submit button shows loading text while submitting
- [ ] Form fields are disabled while submitting
- [ ] Submit button is disabled while submitting

### 7. Accessibility Tests

- [ ] All inputs have associated labels
- [ ] Error messages have role="alert"
- [ ] Required fields have aria-required="true"
- [ ] Invalid fields have aria-invalid="true"
- [ ] Focus moves to first error on validation failure

### 8. File Upload Tests

- [ ] File input accepts PDF files
- [ ] File input accepts DOCX files
- [ ] File info displays after selection
- [ ] File can be removed

## Test Structure

```
describe('CandidateForm', () => {
  describe('Rendering', () => { ... });
  describe('User Interactions', () => { ... });
  describe('Validation', () => { ... });
  describe('Form Submission', () => { ... });
  describe('Loading States', () => { ... });
  describe('Accessibility', () => { ... });
});
```

## Mocking API

Mock the `createCandidate` function from `api.ts`:

```typescript
jest.mock('../../services/api', () => ({
  createCandidate: jest.fn()
}));
```

## Implementation Checklist

- [ ] Create test file `CandidateForm.test.tsx`
- [ ] Mock API service
- [ ] Write rendering tests
- [ ] Write user interaction tests
- [ ] Write validation tests
- [ ] Write form submission tests (success)
- [ ] Write form submission tests (errors)
- [ ] Write loading state tests
- [ ] Write accessibility tests
- [ ] Write file upload tests
- [ ] Run tests: `npm test`
- [ ] Verify all tests pass
- [ ] Check code coverage (aim for 80%+)

## Running Tests

```bash
cd frontend
npm test
```

**For coverage**:
```bash
npm test -- --coverage
```

## Expected Outcome

- All tests pass
- Code coverage > 80%
- Tests run fast (< 5 seconds)
- Clear, descriptive test names

---

**Next Steps**: After completing this prompt, proceed to accessibility compliance (prompt 12).
