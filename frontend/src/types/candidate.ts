/**
 * Candidate form data interface
 * Represents all fields in the candidate registration form
 */
export interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  workExperience: string;
  recruiterName: string;
}

/**
 * Form field error interface
 * Maps field names to error messages
 */
export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: string;
  workExperience?: string;
  recruiterName?: string;
  cv?: string;
  general?: string;
}

/**
 * Candidate API response interface
 */
export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  education?: string;
  workExperience?: string;
  cvFileName?: string;
  recruiterName?: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * API success response for candidate creation
 */
export interface CandidateCreateResponse {
  message: string;
  candidate: Candidate;
}

/**
 * API error response interface
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}
