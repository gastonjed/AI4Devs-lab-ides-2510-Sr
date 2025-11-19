# Prompt: Dashboard and Edit Candidate Functionality

## Objective
Create a recruiter dashboard with candidate list view and implement edit functionality for existing candidates.

## Context
- **Frontend**: React 18.3.1 with TypeScript
- **Backend**: Express with TypeScript, Prisma ORM
- **Features**: View all candidates, click-to-edit, update candidate data
- **Navigation**: Dashboard ↔ Add/Edit Form

## Requirements

### 1. Backend - Update Endpoint

**File**: `backend/src/routes/candidateRoutes.ts`

#### PUT /api/candidates/:id

**Purpose**: Update existing candidate with optional CV upload

**Request**:
- Content-Type: `multipart/form-data`
- Path parameter: `id` (candidate ID)
- Body: Same as POST (all candidate fields)

**Middleware Chain**:
1. `uploadCV` (Multer - handles file)
2. `handleUploadError` (Multer errors)
3. `candidateValidationRules` (express-validator)
4. Controller logic

**Logic**:
1. Parse and validate candidate ID
2. Run validation rules
3. Check if candidate exists (404 if not)
4. If new CV uploaded → use new file, else keep existing
5. Update candidate in database
6. Return updated candidate

**Success Response (200)**:
```json
{
  "message": "Candidate updated successfully",
  "candidate": { ...updated candidate with updatedAt }
}
```

**Error Responses**:
- 400: Invalid ID or validation errors
- 404: Candidate not found
- 409: Duplicate email (different candidate)
- 500: Server error

### 2. Frontend - Dashboard Component

**Files**:
- `frontend/src/components/Dashboard/Dashboard.tsx`
- `frontend/src/components/Dashboard/Dashboard.module.css`

#### Dashboard.tsx

**Props**:
- `onAddCandidate: () => void` - Navigate to add form
- `onEditCandidate: (id: number) => void` - Navigate to edit form

**State**:
- `candidates` - Candidate[] array
- `loading` - boolean
- `error` - string

**Features**:

1. **Header Section**:
   - Title: "Recruiter Dashboard"
   - Subtitle: "Manage your candidates and recruitment process"
   - "Add New Candidate" button (primary, with + icon)

2. **Stats Bar**:
   - Display total candidate count

3. **Candidate Table**:
   - Columns: Name, Email, Phone, Recruiter, Added Date, CV
   - Rows are clickable (cursor pointer, hover effect)
   - Email/phone are links (click stops propagation)
   - CV shows filename badge or "No CV"

4. **Empty State**:
   - Icon, title, description
   - "Add Your First Candidate" button

5. **Loading State**:
   - Spinner with "Loading candidates..." text

6. **Error State**:
   - Red error banner

**Accessibility**:
- Clickable rows: `role="button"`, `tabIndex={0}`
- Keyboard support: Enter/Space to activate
- `aria-label` for each row
- Links stop click propagation

#### Dashboard.module.css

**Key Styles**:
- `.clickableRow` - cursor pointer
- `.clickableRow:hover` - blue background (#ebf8ff)
- `.clickableRow:focus` - outline for keyboard navigation
- Responsive table (overflow-x on small screens)
- Print styles (hide buttons)

### 3. Frontend - Enhanced CandidateForm

**File**: `frontend/src/components/CandidateForm/CandidateForm.tsx`

**New Props**:
- `candidateId?: number | null` - If provided, edit mode enabled

**New State**:
- `loading` - boolean (fetching candidate data)
- `existingCvFileName` - string | null
- `isEditMode` - derived from candidateId

**Edit Mode Logic**:

1. **On Mount** (useEffect):
   - If `candidateId` provided → fetch candidate data
   - GET /api/candidates/:id
   - Pre-fill form with existing data
   - Store existing CV filename

2. **Loading State**:
   - Show spinner while fetching
   - "Loading candidate data..." message

3. **Form Differences**:
   - Title: "Edit Candidate" vs "Add New Candidate"
   - Subtitle: "Update the candidate..." vs "Fill in..."
   - Submit button: "Update Candidate" vs "Add Candidate"
   - CV label: "Update CV (optional)" vs "Upload CV"
   - Show existing CV filename if present
   - Hide "Clear Form" button in edit mode

4. **Submit Handler**:
   - Use PUT for edit mode, POST for create mode
   - URL: `/api/candidates/${id}` vs `/api/candidates`
   - Success message: "updated" vs "added"

**New CSS**:
- `.loadingContainer` - centered spinner container
- `.spinner` - animated loading spinner
- `.srOnly` - screen reader only text
- `.existingFile` - display current CV info (blue background)
- `.existingFileLabel` - "Current CV:" label

### 4. Frontend - App Navigation

**File**: `frontend/src/App.tsx`

**State**:
- `currentView` - 'dashboard' | 'form'
- `refreshKey` - number (force dashboard refresh)
- `editingCandidateId` - number | null

**Handlers**:
- `handleAddCandidate()` - Set candidateId=null, show form
- `handleEditCandidate(id)` - Set candidateId, show form
- `handleBackToDashboard()` - Show dashboard, clear candidateId, refresh

**Navigation Flow**:
```
Dashboard → Click "Add New Candidate" → Form (create mode)
Dashboard → Click candidate row → Form (edit mode, pre-filled)
Form → Click "← Back to Dashboard" → Dashboard (refreshed)
Form → Submit success → Auto-redirect to Dashboard (2s delay)
```

## Implementation Checklist

### Backend
- [ ] Add PUT /api/candidates/:id endpoint
- [ ] Validate candidate ID
- [ ] Check candidate exists (404 if not)
- [ ] Preserve existing CV if no new upload
- [ ] Test update with/without new CV
- [ ] Test duplicate email on update
- [ ] Test 404 for non-existent candidate

### Frontend - Dashboard
- [ ] Create Dashboard component
- [ ] Implement candidate list fetch
- [ ] Make table rows clickable
- [ ] Add keyboard navigation support
- [ ] Implement loading/error/empty states
- [ ] Style with blue hover effect
- [ ] Test responsive design
- [ ] Test accessibility (keyboard, screen reader)

### Frontend - Form Enhancement
- [ ] Add candidateId prop
- [ ] Implement fetch candidate on mount
- [ ] Add loading state
- [ ] Pre-fill form fields
- [ ] Show existing CV info
- [ ] Update UI text for edit mode
- [ ] Switch POST/PUT based on mode
- [ ] Test edit flow end-to-end

### Frontend - Navigation
- [ ] Update App.tsx state
- [ ] Implement navigation handlers
- [ ] Test dashboard → add → back
- [ ] Test dashboard → edit → back
- [ ] Test auto-redirect after success

## Testing Scenarios

### Backend
1. **Update all fields** → 200 with updated data
2. **Update without CV** → 200, keeps existing CV
3. **Update with new CV** → 200, replaces CV
4. **Update non-existent** → 404
5. **Update with duplicate email** → 409
6. **Invalid candidate ID** → 400

### Frontend
1. **Dashboard loads** → Shows candidate list
2. **Click row** → Navigates to edit form
3. **Form pre-fills** → All fields populated
4. **Update candidate** → Success, returns to dashboard
5. **Click email/phone** → Opens link, doesn't navigate
6. **Keyboard navigation** → Tab, Enter/Space work
7. **Empty dashboard** → Shows empty state

## Expected Outcome

### Backend
- PUT endpoint working with full validation
- Existing CV preserved when not uploading new one
- Proper error handling for all scenarios

### Frontend
- Dashboard showing all candidates in table
- Clickable rows with visual feedback
- Edit form pre-populated with data
- Smooth navigation between views
- Loading and error states handled
- Accessible keyboard navigation
- Responsive design working

### User Flow
1. User sees dashboard with candidates
2. Clicks candidate row
3. Form opens with data pre-filled
4. User edits fields, optionally uploads new CV
5. Clicks "Update Candidate"
6. Success message shows
7. Auto-redirects to dashboard
8. Dashboard shows updated data

---

**Status**: ✅ Completed
**Last Updated**: 2025-11-19
