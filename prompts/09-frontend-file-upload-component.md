# Prompt: Enhanced File Upload Component

## Objective
Enhance the file upload experience with drag-and-drop, file preview, and better visual feedback.

## Context
- **Current State**: Basic file input in CandidateForm
- **Enhancements**: Drag-and-drop, visual preview, remove file option
- **Accepted Formats**: PDF, DOCX
- **Max Size**: 5MB

## Requirements

### 1. Create FileUpload Component

**File**: `frontend/src/components/FileUpload/FileUpload.tsx`

**Features**:
- Drag-and-drop zone
- Click to browse
- File type and size validation
- Visual file preview (name, size, icon)
- Remove file button
- Visual feedback for drag over
- Error messages

**Props**:
- `onFileSelect: (file: File | null) => void`
- `error?: string`
- `disabled?: boolean`
- `accept: string` (default: ".pdf,.docx")
- `maxSize: number` (default: 5MB)

### 2. Component Features

**Drag-and-Drop**:
- Highlight zone on dragover
- Accept file on drop
- Validate on drop

**File Display**:
- Show file name
- Show file size (formatted: "2.5 MB")
- Show file type icon (PDF/DOCX)
- "Remove" button to clear selection

**States**:
- Empty (shows upload prompt)
- Drag over (highlighted)
- File selected (shows file info)
- Error (shows error message)
- Disabled (grayed out)

### 3. Validation

On file selection (click or drop):
1. Check file type (PDF or DOCX)
2. Check file size (max 5MB)
3. Call `onFileSelect` if valid
4. Show error if invalid

### 4. Accessibility

- `role="button"` on drop zone
- `tabindex="0"` for keyboard access
- Enter/Space to open file browser
- ARIA labels for screen readers
- Keyboard support for remove button

### 5. Styling

**CSS Module**: `FileUpload.module.css`

**Visual Design**:
- Dashed border for drop zone
- Blue border on hover/focus
- Green border when file selected
- Red border on error
- File type icons (📄 for PDF, 📝 for DOCX)
- Smooth transitions

## Integration with CandidateForm

Replace the basic file input in `CandidateForm.tsx`:

```typescript
<FileUpload
  onFileSelect={setSelectedFile}
  error={errors.cv}
  disabled={isSubmitting}
/>
```

## Implementation Checklist

- [ ] Create `FileUpload.tsx` component
- [ ] Implement drag-and-drop handlers
- [ ] Implement file validation
- [ ] Create file preview UI
- [ ] Add remove file functionality
- [ ] Create `FileUpload.module.css`
- [ ] Add ARIA labels and keyboard support
- [ ] Integrate with CandidateForm
- [ ] Test drag-and-drop
- [ ] Test click to upload
- [ ] Test file validation
- [ ] Test remove file
- [ ] Test keyboard navigation
- [ ] Test disabled state

## Testing

1. **Drag-and-Drop**: Drag PDF file → Should accept and display
2. **Click Upload**: Click zone → File browser opens
3. **Invalid Type**: Drop .txt file → Should show error
4. **Large File**: Drop 6MB file → Should show error
5. **Remove File**: Click remove → Should clear file
6. **Keyboard**: Tab to zone, press Enter → File browser opens
7. **Disabled**: When submitting → Should be grayed out

---

**Next Steps**: After completing this prompt, proceed to backend testing (prompt 10).
