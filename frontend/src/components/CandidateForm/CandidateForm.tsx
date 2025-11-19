import React, { useState, useEffect } from 'react';
import { CandidateFormData, FormErrors } from '../../types/candidate';
import styles from './CandidateForm.module.css';

interface CandidateFormProps {
  candidateId?: number | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ candidateId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<CandidateFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    workExperience: '',
    recruiterName: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [existingCvFileName, setExistingCvFileName] = useState<string | null>(null);

  const isEditMode = candidateId !== null && candidateId !== undefined;

  // Fetch candidate data when editing
  useEffect(() => {
    if (isEditMode && candidateId) {
      setLoading(true);
      fetch(`http://localhost:3010/api/candidates/${candidateId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch candidate');
          }
          return response.json();
        })
        .then(data => {
          const candidate = data.candidate;
          setFormData({
            firstName: candidate.firstName || '',
            lastName: candidate.lastName || '',
            email: candidate.email || '',
            phone: candidate.phone || '',
            address: candidate.address || '',
            education: candidate.education || '',
            workExperience: candidate.workExperience || '',
            recruiterName: candidate.recruiterName || ''
          });
          setExistingCvFileName(candidate.cvFileName || null);
          setLoading(false);
        })
        .catch(err => {
          setSubmitError('Failed to load candidate data. Please try again.');
          setLoading(false);
        });
    }
  }, [candidateId, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, cv: 'Invalid file type. Only PDF and DOCX files are allowed.' }));
      setSelectedFile(null);
      e.target.value = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, cv: 'File size exceeds 5MB limit. Please upload a smaller file.' }));
      setSelectedFile(null);
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    setErrors(prev => ({ ...prev, cv: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number can only contain numbers, +, -, spaces, and parentheses';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError('');

    if (!validateForm()) {
      setSubmitError('Please fix the errors in the form before submitting.');
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });
      if (selectedFile) formDataToSend.append('cv', selectedFile);

      const url = isEditMode
        ? `http://localhost:3010/api/candidates/${candidateId}`
        : 'http://localhost:3010/api/candidates';

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ email: 'A candidate with this email already exists' });
          setSubmitError(data.message);
        } else if (response.status === 400 && data.details) {
          const fieldErrors: FormErrors = {};
          data.details.forEach((error: any) => {
            fieldErrors[error.field as keyof FormErrors] = error.message;
          });
          setErrors(fieldErrors);
          setSubmitError(data.message);
        } else {
          setSubmitError(data.message || 'An error occurred. Please try again.');
        }
        return;
      }

      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Call onSuccess callback after a short delay to show the success message
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      education: '',
      workExperience: '',
      recruiterName: ''
    });
    setSelectedFile(null);
    setErrors({});
    setSubmitSuccess(false);
    setSubmitError('');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} role="status" aria-live="polite">
            <span className={styles.srOnly}>Loading candidate data...</span>
          </div>
          <p>Loading candidate data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={styles.backButton}
            aria-label="Back to dashboard"
          >
            ← Back to Dashboard
          </button>
        )}
        <h1 className={styles.title}>
          {isEditMode ? 'Edit Candidate' : 'Add New Candidate'}
        </h1>
        <p className={styles.subtitle}>
          {isEditMode
            ? 'Update the candidate information below. Fields marked with * are required.'
            : 'Fill in the candidate information below. Fields marked with * are required.'}
        </p>

        {submitSuccess && (
          <div className={styles.successMessage} role="alert" aria-live="polite">
            <strong>Success!</strong> Candidate {isEditMode ? 'updated' : 'added'} successfully.
            {!isEditMode && (
              <button type="button" onClick={handleReset} className={styles.addAnotherButton}>
                Add Another Candidate
              </button>
            )}
          </div>
        )}

        {submitError && (
          <div className={styles.errorMessage} role="alert" aria-live="assertive">
            <strong>Error:</strong> {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Personal Information</legend>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  maxLength={100}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <span id="firstName-error" className={styles.errorText} role="alert">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  maxLength={100}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <span id="lastName-error" className={styles.errorText} role="alert">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  maxLength={255}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isSubmitting}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <span id="email-error" className={styles.errorText} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  maxLength={50}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  disabled={isSubmitting}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <span id="phone-error" className={styles.errorText} role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={styles.textarea}
                maxLength={500}
                rows={2}
                disabled={isSubmitting}
                placeholder="123 Main St, New York, NY 10001"
              />
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Professional Background</legend>

            <div className={styles.formGroup}>
              <label htmlFor="education" className={styles.label}>Education</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className={styles.textarea}
                maxLength={2000}
                rows={3}
                disabled={isSubmitting}
                placeholder="e.g., Bachelor of Computer Science, MIT, 2015-2019"
              />
              <small className={styles.helperText}>
                List your education history including degree, institution, and years
              </small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="workExperience" className={styles.label}>Work Experience</label>
              <textarea
                id="workExperience"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleInputChange}
                className={styles.textarea}
                maxLength={2000}
                rows={3}
                disabled={isSubmitting}
                placeholder="e.g., Software Engineer at Google, 2019-2023"
              />
              <small className={styles.helperText}>
                List your work experience including position, company, and years
              </small>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>CV Upload</legend>

            <div className={styles.formGroup}>
              <label htmlFor="cv" className={styles.label}>
                {isEditMode ? 'Update CV (optional)' : 'Upload CV'}
              </label>
              {isEditMode && existingCvFileName && !selectedFile && (
                <div className={styles.existingFile}>
                  <span className={styles.existingFileLabel}>Current CV:</span>
                  <span className={styles.fileName}>{existingCvFileName}</span>
                </div>
              )}
              <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleFileChange}
                className={`${styles.fileInput} ${errors.cv ? styles.inputError : ''}`}
                accept=".pdf,.docx"
                aria-invalid={!!errors.cv}
                aria-describedby={errors.cv ? 'cv-error' : 'cv-help'}
                disabled={isSubmitting}
              />
              <small id="cv-help" className={styles.helperText}>
                {isEditMode
                  ? 'Upload a new file to replace the existing CV. Accepted formats: PDF, DOCX (max 5MB)'
                  : 'Accepted formats: PDF, DOCX (max 5MB)'}
              </small>
              {selectedFile && (
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{selectedFile.name}</span>
                  <span className={styles.fileSize}>
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
              {errors.cv && (
                <span id="cv-error" className={styles.errorText} role="alert">
                  {errors.cv}
                </span>
              )}
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Recruiter Information</legend>

            <div className={styles.formGroup}>
              <label htmlFor="recruiterName" className={styles.label}>Your Name</label>
              <input
                type="text"
                id="recruiterName"
                name="recruiterName"
                value={formData.recruiterName}
                onChange={handleInputChange}
                className={styles.input}
                maxLength={100}
                disabled={isSubmitting}
                placeholder="Jane Smith"
              />
              <small className={styles.helperText}>
                Optional: Your name for tracking purposes
              </small>
            </div>
          </fieldset>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting
                ? isEditMode ? 'Updating Candidate...' : 'Adding Candidate...'
                : isEditMode ? 'Update Candidate' : 'Add Candidate'}
            </button>
            {!isEditMode && (
              <button
                type="button"
                onClick={handleReset}
                className={styles.resetButton}
                disabled={isSubmitting}
              >
                Clear Form
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
