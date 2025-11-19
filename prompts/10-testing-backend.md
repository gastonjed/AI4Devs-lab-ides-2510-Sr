# Prompt: Backend Testing

## Objective
Write comprehensive unit and integration tests for the candidate API endpoints using Jest and Supertest.

## Context
- **Testing Framework**: Jest (already installed)
- **HTTP Testing**: Supertest (already installed)
- **Test File**: `backend/src/tests/candidateRoutes.test.ts`
- **Endpoints to Test**: POST, GET (all), GET (single)

## Requirements

### 1. Test Setup

**File**: `backend/src/tests/candidateRoutes.test.ts`

**Setup Requirements**:
- Import Express app
- Import Supertest
- Setup test database (or use mock Prisma)
- Clean database before each test
- Close connections after tests

### 2. Test Cases for POST /api/candidates

**Happy Path**:
- [ ] Create candidate with all fields → 201
- [ ] Create candidate with required fields only → 201
- [ ] Create candidate with CV file → 201 (file saved)

**Validation Errors (400)**:
- [ ] Missing firstName → 400 with error message
- [ ] Missing lastName → 400 with error message
- [ ] Missing email → 400 with error message
- [ ] Invalid email format → 400 with error message
- [ ] Missing phone → 400 with error message
- [ ] Invalid phone format (letters) → 400 with error message
- [ ] Field exceeds max length → 400 with error message

**File Upload Errors (400)**:
- [ ] Invalid file type (.txt) → 400
- [ ] File too large (>5MB) → 400

**Business Logic Errors**:
- [ ] Duplicate email → 409 with error message

### 3. Test Cases for GET /api/candidates

- [ ] Get all candidates (empty) → 200 with empty array
- [ ] Get all candidates (multiple) → 200 with array
- [ ] Verify candidates ordered by newest first

### 4. Test Cases for GET /api/candidates/:id

- [ ] Get existing candidate → 200 with candidate object
- [ ] Get non-existent candidate → 404
- [ ] Get with invalid ID (string) → 400

### 5. Test Database

**Options**:
- **Option A**: Use separate test database (recommended)
  - Connection string: `DATABASE_URL_TEST`
  - Clean before each test
- **Option B**: Mock Prisma Client
  - Use jest.mock for Prisma

### 6. Test File Structure

```
describe('Candidate API', () => {
  describe('POST /api/candidates', () => {
    // All POST tests
  });

  describe('GET /api/candidates', () => {
    // All GET tests
  });

  describe('GET /api/candidates/:id', () => {
    // All GET single tests
  });
});
```

## Implementation Checklist

- [ ] Create test file `candidateRoutes.test.ts`
- [ ] Setup test database or Prisma mocks
- [ ] Write POST endpoint tests (happy path)
- [ ] Write POST endpoint tests (validation errors)
- [ ] Write POST endpoint tests (file upload)
- [ ] Write POST endpoint tests (duplicate email)
- [ ] Write GET all endpoint tests
- [ ] Write GET single endpoint tests
- [ ] Add setup and teardown functions
- [ ] Run tests: `npm test`
- [ ] Verify all tests pass
- [ ] Check code coverage (aim for 80%+)

## Running Tests

```bash
cd backend
npm test
```

**For watch mode**:
```bash
npm test -- --watch
```

**For coverage**:
```bash
npm test -- --coverage
```

## Expected Outcome

- All tests pass
- Code coverage > 80%
- Clear test descriptions
- Fast execution (< 10 seconds)

---

**Next Steps**: After completing this prompt, proceed to frontend testing (prompt 11).
