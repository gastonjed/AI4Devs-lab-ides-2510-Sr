# Prompt: Accessibility Compliance

## Objective
Ensure the candidate form meets WCAG 2.1 Level AA accessibility standards.

## Context
- **Standards**: WCAG 2.1 Level AA
- **Component**: CandidateForm
- **Testing**: Manual + automated tools

## Requirements

### 1. Semantic HTML

**Verify**:
- [ ] Proper heading hierarchy (h1, h2, etc.)
- [ ] Form uses `<form>` element
- [ ] Inputs use appropriate types (text, email, tel, file)
- [ ] Labels use `<label>` elements
- [ ] Buttons use `<button>` elements
- [ ] Fieldsets group related inputs
- [ ] Legends describe fieldset purpose

### 2. ARIA Attributes

**Required ARIA**:
- [ ] `aria-required="true"` on required fields
- [ ] `aria-invalid="true"` on fields with errors
- [ ] `aria-describedby` links errors to inputs
- [ ] `role="alert"` on error messages
- [ ] `aria-live="polite"` on success messages
- [ ] `aria-live="assertive"` on critical errors
- [ ] `aria-busy="true"` during form submission

### 3. Keyboard Navigation

**Test Scenarios**:
- [ ] Tab moves through all interactive elements in logical order
- [ ] Shift+Tab moves backwards
- [ ] Enter submits form
- [ ] Space activates buttons
- [ ] Escape clears errors (optional)
- [ ] No keyboard traps
- [ ] Focus visible at all times

### 4. Focus Management

- [ ] Focus indicator visible on all elements
- [ ] Focus indicator has sufficient contrast (3:1)
- [ ] Focus moves to first error on validation failure
- [ ] Focus returns to submit button after error correction

### 5. Color Contrast

**Verify**:
- [ ] Text color vs background ≥ 4.5:1 (normal text)
- [ ] Large text ≥ 3:1
- [ ] Error text ≥ 4.5:1
- [ ] Focus indicator ≥ 3:1
- [ ] Disabled text ≥ 3:1

**Tools**: Use WebAIM Contrast Checker or browser DevTools

### 6. Screen Reader Support

**Test with Screen Reader**:
- [ ] All labels are announced
- [ ] Field purpose is clear
- [ ] Required fields are announced as required
- [ ] Errors are announced when they appear
- [ ] Success message is announced
- [ ] Form instructions are announced
- [ ] File upload status is announced

**Screen Readers to Test**:
- NVDA (Windows, free)
- JAWS (Windows)
- VoiceOver (Mac)

### 7. Error Identification

- [ ] Errors identified in text (not color alone)
- [ ] Error messages are clear and specific
- [ ] Error location is obvious
- [ ] Errors suggest corrections

### 8. Form Labels and Instructions

- [ ] All inputs have visible labels
- [ ] Labels are programmatically associated (for attribute)
- [ ] Help text is available before users need it
- [ ] Required fields are clearly marked
- [ ] Format requirements stated (e.g., "PDF or DOCX")

### 9. Touch Targets (Mobile)

- [ ] All interactive elements ≥ 44x44px
- [ ] Adequate spacing between touch targets
- [ ] Works with screen magnification

### 10. Responsive Design

- [ ] Works at 200% zoom
- [ ] Works at 320px width
- [ ] No horizontal scrolling at standard zoom
- [ ] Content reflows properly

## Testing Tools

### Automated Testing

**Tools to Use**:
1. **axe DevTools** (Browser extension)
   - Scan entire form
   - Fix all violations

2. **WAVE** (Web Accessibility Evaluation Tool)
   - Check for errors and warnings

3. **Lighthouse** (Chrome DevTools)
   - Run accessibility audit
   - Aim for score ≥ 95

### Manual Testing

**Test Scenarios**:
1. Navigate entire form using only keyboard
2. Use screen reader to fill out form
3. Test with browser zoom at 200%
4. Test on mobile device
5. Test in high contrast mode
6. Test with reduced motion enabled

## Implementation Checklist

- [ ] Review all semantic HTML
- [ ] Add/verify all ARIA attributes
- [ ] Test keyboard navigation
- [ ] Test focus management
- [ ] Check color contrast ratios
- [ ] Test with screen reader
- [ ] Run axe DevTools scan
- [ ] Run WAVE scan
- [ ] Run Lighthouse audit
- [ ] Test at 200% zoom
- [ ] Test on mobile device
- [ ] Fix all identified issues
- [ ] Document accessibility features

## Common Issues to Fix

- Missing `for` attribute on labels
- Insufficient color contrast
- Missing ARIA labels
- Poor focus indicators
- Keyboard traps
- Unlabeled form controls
- Missing error announcements

## Documentation

Create: `ACCESSIBILITY.md`

**Document**:
- Accessibility features implemented
- WCAG 2.1 Level AA compliance
- Screen reader compatibility
- Keyboard shortcuts (if any)
- Known limitations
- Testing results

## Expected Outcome

- WCAG 2.1 Level AA compliant
- Lighthouse accessibility score ≥ 95
- Works with keyboard only
- Works with screen readers
- No axe DevTools violations
- Documented accessibility features

---

**Next Steps**: After completing this prompt, proceed to deployment setup (prompt 13).
