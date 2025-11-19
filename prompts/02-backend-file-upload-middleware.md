# Prompt: Backend File Upload Middleware

## Objective
Implement secure file upload functionality using Multer for CV uploads (PDF/DOCX, max 5MB).

## Context
- **Backend**: Express with TypeScript
- **Library**: Multer
- **Supported Formats**: PDF (.pdf), DOCX (.docx)
- **Max File Size**: 5MB
- **Storage**: `backend/uploads/candidates/`

## Requirements

### 1. Setup

**Install Dependencies**:
```bash
npm install multer
npm install --save-dev @types/multer
```

**Create Upload Directory**:
```bash
mkdir -p backend/uploads/candidates
touch backend/uploads/candidates/.gitkeep
```

**Update .gitignore**:
```
uploads/
```

### 2. Multer Configuration

**File**: `backend/src/middleware/uploadMiddleware.ts`

**Key Features**:
- Disk storage configuration
- Unique filename generation (timestamp-random-sanitized)
- File type validation (PDF/DOCX only)
- File size limit (5MB)
- MIME type and extension checking

**Exports**:
- `uploadCV` - Multer middleware for single file upload (field name: 'cv')
- `handleUploadError` - Error handler for Multer errors

### 3. File Validation

**Type Validation**:
- Allowed MIME types: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Allowed extensions: `.pdf`, `.docx`
- Validate both MIME type AND extension

**Size Validation**:
- Max size: 5MB (5 * 1024 * 1024 bytes)
- Enforced by Multer limits

### 4. Filename Strategy

**Pattern**: `{timestamp}-{random}-{sanitized-original-name}`

**Sanitization**:
- Remove special characters
- Keep only alphanumeric, dots, hyphens
- Convert to lowercase

### 5. Error Handling

**Error Types**:
- `LIMIT_FILE_SIZE` → 400: "File size exceeds 5MB limit"
- `LIMIT_UNEXPECTED_FILE` → 400: "Unexpected file field"
- File type validation → 400: "Invalid file type. Only PDF and DOCX allowed"

**Error Response Format**:
```json
{
  "error": "Error type",
  "message": "User-friendly message"
}
```

### 6. Integration with Express

**Update** `backend/src/index.ts`:
- Add CORS middleware (allow `http://localhost:3000`)
- Add `express.json()` and `express.urlencoded()`
- Import and use upload middleware in routes

### 7. Security Measures

- **No execute permissions** on upload directory
- **Outside public web root** - uploads not served as static files
- **Sanitized filenames** - prevent path traversal
- **MIME type validation** - prevent file type spoofing
- **Size limits** - prevent DoS attacks

## Implementation Checklist

- [ ] Install multer and types
- [ ] Create uploads directory structure
- [ ] Add uploads to .gitignore
- [ ] Create uploadMiddleware.ts file
- [ ] Implement storage configuration
- [ ] Implement file filter (type validation)
- [ ] Set file size limit (5MB)
- [ ] Implement error handler
- [ ] Create TypeScript type definitions
- [ ] Update index.ts with CORS and body parsers
- [ ] Test file upload (PDF, DOCX)
- [ ] Test invalid file type rejection
- [ ] Test file size limit

## Testing Scenarios

1. **Valid PDF** → File saved with unique name
2. **Valid DOCX** → File saved with unique name
3. **Invalid type (.txt)** → 400 error
4. **File >5MB** → 400 error "File too large"
5. **No file** → Should work (file optional)
6. **Duplicate filename** → Unique name generated
7. **Special chars in filename** → Sanitized

## Expected Outcome

- Multer middleware configured and working
- Files saved to `uploads/candidates/` with unique names
- Only PDF/DOCX files under 5MB accepted
- User-friendly error messages
- Secure file storage

---

**Next Steps**: Proceed to candidate API endpoints (prompt 03).
