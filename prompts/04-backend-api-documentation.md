# Prompt: Backend API Documentation with Swagger

## Objective
Set up Swagger/OpenAPI documentation for interactive API testing and documentation.

## Context
- **Tools**: swagger-jsdoc, swagger-ui-express (already installed)
- **Endpoints**: Candidate CRUD operations

## Requirements

### 1. Setup

**Install Type Definitions**:
```bash
npm install --save-dev @types/swagger-jsdoc @types/swagger-ui-express
```

### 2. Swagger Configuration

**File**: `backend/src/config/swagger.ts`

**Define**:
- OpenAPI 3.0.0 spec
- API info (title, version, description)
- Servers (dev: localhost:3010, prod: api.lti-ats.com)
- Tags for endpoints
- Schema definitions for Candidate model
- Error response schemas (ValidationError, DuplicateEmailError, ServerError, FileUploadError)

**Export**: `swaggerSpec` - generated from JSDoc comments

### 3. JSDoc Comments in Routes

Add JSDoc comments above each endpoint in `candidateRoutes.ts`:

**POST /api/candidates**:
- Request body with all fields (multipart/form-data)
- Response schemas for 201, 400, 409, 500

**GET /api/candidates**:
- Response schema for 200, 500

**GET /api/candidates/:id**:
- Path parameter (id)
- Response schemas for 200, 400, 404, 500

### 4. Integration with Express

**Update** `backend/src/index.ts`:
- Import swaggerUi and swaggerSpec
- Add `/api-docs` route with Swagger UI
- Add `/api-docs.json` route for raw spec
- Log documentation URL on server start

### 5. Schema Definitions

**Candidate Schema**:
- All fields with types, descriptions, examples
- Mark required fields
- Include constraints (maxLength, format)

**Error Schemas**:
- ValidationError (with details array)
- DuplicateEmailError
- ServerError
- FileUploadError

## Implementation Checklist

- [ ] Install type definitions
- [ ] Create swagger.ts config file
- [ ] Define OpenAPI metadata
- [ ] Define Candidate schema
- [ ] Define error schemas
- [ ] Add JSDoc to POST endpoint
- [ ] Add JSDoc to GET endpoints
- [ ] Integrate Swagger UI in index.ts
- [ ] Test documentation at /api-docs
- [ ] Test "Try it out" functionality
- [ ] Verify all endpoints documented

## Accessing Documentation

After implementation:
- **Interactive UI**: http://localhost:3010/api-docs
- **JSON Spec**: http://localhost:3010/api-docs.json

## Features

- Interactive testing ("Try it out" button)
- Request/response examples
- Schema definitions with descriptions
- File upload testing
- No authentication required (public MVP)

## Expected Outcome

- Interactive Swagger UI accessible
- All endpoints documented
- Request/response schemas defined
- Examples provided
- File upload testable in UI

---

**Next Steps**: Proceed to frontend form UI (prompt 05).
