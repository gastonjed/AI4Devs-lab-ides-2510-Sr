# Prompt: Database Schema - Candidate Model

## Objective
Create a Prisma schema for the Candidate model to support candidate registration in the ATS system.

## Context
- **ORM**: Prisma 5.13.0
- **Database**: PostgreSQL (Docker container)
- **Schema Location**: `backend/prisma/schema.prisma`
- **Current State**: Only basic User model exists

## Requirements

### Candidate Model Fields

**Required Fields**:
- `id`: Integer, primary key, auto-increment
- `firstName`: String (max 100 chars)
- `lastName`: String (max 100 chars)
- `email`: String (max 255 chars), **unique** constraint
- `phone`: String (max 50 chars)

**Optional Fields**:
- `address`: String (max 500 chars)
- `education`: Text (max 2000 chars) - free-text field
- `workExperience`: Text (max 2000 chars) - free-text field
- `cvFilePath`: String (max 500 chars) - server file path
- `cvFileName`: String (max 255 chars) - original filename
- `recruiterName`: String (max 100 chars) - tracks who added candidate

**Audit Fields**:
- `createdAt`: DateTime, default now()
- `updatedAt`: DateTime, auto-updated

### Constraints & Indexes

- **Unique constraint** on `email` field (prevents duplicate candidates)
- **Index** on `email` field for faster lookups

## Migration Steps

1. Update `backend/prisma/schema.prisma` with Candidate model
2. Generate migration: `npx prisma migrate dev --name add_candidate_model`
3. Verify migration: `npx prisma migrate status`
4. Generate Prisma Client: `npx prisma generate`
5. Verify in Prisma Studio: `npx prisma studio`

## Implementation Checklist

- [ ] Add Candidate model to schema.prisma
- [ ] Add unique constraint on email
- [ ] Add index on email field
- [ ] Run migration command
- [ ] Verify migration success
- [ ] Generate Prisma Client
- [ ] Test in Prisma Studio
- [ ] Verify TypeScript types available

## Expected Outcome

- New `Candidate` table in PostgreSQL
- TypeScript types available for CRUD operations
- Email uniqueness enforced at database level
- Migration file generated

## Error Handling Note

When duplicate email is attempted, Prisma will throw error code `P2002`. This should be caught in the API layer and returned as 409 Conflict.

## Documentation

- Add comments above Candidate model explaining purpose
- Document email uniqueness constraint
- Note maximum character lengths

---

**Next Steps**: Proceed to file upload middleware (prompt 02).
