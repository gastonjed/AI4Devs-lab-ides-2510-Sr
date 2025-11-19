import { Router, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { uploadCV, handleUploadError } from '../middleware/uploadMiddleware';

const router = Router();
const prisma = new PrismaClient();

/**
 * Validation rules for candidate creation
 */
const candidateValidationRules = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 1, max: 100 }).withMessage('First name must be between 1 and 100 characters'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 1, max: 100 }).withMessage('Last name must be between 1 and 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email must not exceed 255 characters'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9+\s\-()]+$/).withMessage('Phone number can only contain numbers, +, -, spaces, and parentheses')
    .isLength({ min: 7, max: 50 }).withMessage('Phone number must be between 7 and 50 characters'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Address must not exceed 500 characters'),

  body('education')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Education must not exceed 2000 characters'),

  body('workExperience')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Work experience must not exceed 2000 characters'),

  body('recruiterName')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Recruiter name must not exceed 100 characters')
];

/**
 * POST /api/candidates
 * Create a new candidate with optional CV file upload
 */
router.post(
  '/',
  uploadCV,
  handleUploadError,
  candidateValidationRules,
  async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'Please check the form fields and try again',
          details: errors.array().map(err => ({
            field: err.type === 'field' ? (err as any).path : 'unknown',
            message: err.msg
          }))
        });
      }

      // Extract form data from request body
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        workExperience,
        recruiterName
      } = req.body;

      // Extract file information (if uploaded)
      const cvFilePath = req.file ? req.file.path : null;
      const cvFileName = req.file ? req.file.originalname : null;

      // Create candidate in database
      const candidate = await prisma.candidate.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          address: address || null,
          education: education || null,
          workExperience: workExperience || null,
          cvFilePath,
          cvFileName,
          recruiterName: recruiterName || null
        }
      });

      // Return success response with created candidate
      return res.status(201).json({
        message: 'Candidate added successfully',
        candidate: {
          id: candidate.id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          phone: candidate.phone,
          address: candidate.address,
          education: candidate.education,
          workExperience: candidate.workExperience,
          cvFileName: candidate.cvFileName,
          recruiterName: candidate.recruiterName,
          createdAt: candidate.createdAt
        }
      });

    } catch (error) {
      // Handle Prisma unique constraint violation (duplicate email)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(409).json({
            error: 'Duplicate email',
            message: 'A candidate with this email address already exists in the system'
          });
        }
      }

      // Log error for debugging
      console.error('Error creating candidate:', error);

      // Generic server error response
      return res.status(500).json({
        error: 'Server error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    }
  }
);

/**
 * GET /api/candidates
 * Retrieve all candidates
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Fetch all candidates from database, ordered by newest first
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        education: true,
        workExperience: true,
        cvFileName: true,
        recruiterName: true,
        createdAt: true,
        updatedAt: true
        // Exclude cvFilePath for security
      }
    });

    return res.status(200).json({
      count: candidates.length,
      candidates
    });

  } catch (error) {
    console.error('Error fetching candidates:', error);
    return res.status(500).json({
      error: 'Server error',
      message: 'Failed to retrieve candidates'
    });
  }
});

/**
 * GET /api/candidates/:id
 * Retrieve a single candidate by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const candidateId = parseInt(req.params.id);

    // Validate ID is a number
    if (isNaN(candidateId)) {
      return res.status(400).json({
        error: 'Invalid ID',
        message: 'Candidate ID must be a number'
      });
    }

    // Find candidate by ID
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        education: true,
        workExperience: true,
        cvFileName: true,
        recruiterName: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Check if candidate exists
    if (!candidate) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Candidate not found'
      });
    }

    return res.status(200).json({ candidate });

  } catch (error) {
    console.error('Error fetching candidate:', error);
    return res.status(500).json({
      error: 'Server error',
      message: 'Failed to retrieve candidate'
    });
  }
});

/**
 * PUT /api/candidates/:id
 * Update an existing candidate with optional CV file upload
 */
router.put(
  '/:id',
  uploadCV,
  handleUploadError,
  candidateValidationRules,
  async (req: Request, res: Response) => {
    try {
      const candidateId = parseInt(req.params.id);

      // Validate ID is a number
      if (isNaN(candidateId)) {
        return res.status(400).json({
          error: 'Invalid ID',
          message: 'Candidate ID must be a number'
        });
      }

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'Please check the form fields and try again',
          details: errors.array().map(err => ({
            field: err.type === 'field' ? (err as any).path : 'unknown',
            message: err.msg
          }))
        });
      }

      // Check if candidate exists
      const existingCandidate = await prisma.candidate.findUnique({
        where: { id: candidateId }
      });

      if (!existingCandidate) {
        return res.status(404).json({
          error: 'Not found',
          message: 'Candidate not found'
        });
      }

      // Extract form data from request body
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        workExperience,
        recruiterName
      } = req.body;

      // Extract file information (if uploaded)
      const cvFilePath = req.file ? req.file.path : existingCandidate.cvFilePath;
      const cvFileName = req.file ? req.file.originalname : existingCandidate.cvFileName;

      // Update candidate in database
      const candidate = await prisma.candidate.update({
        where: { id: candidateId },
        data: {
          firstName,
          lastName,
          email,
          phone,
          address: address || null,
          education: education || null,
          workExperience: workExperience || null,
          cvFilePath,
          cvFileName,
          recruiterName: recruiterName || null
        }
      });

      // Return success response with updated candidate
      return res.status(200).json({
        message: 'Candidate updated successfully',
        candidate: {
          id: candidate.id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          phone: candidate.phone,
          address: candidate.address,
          education: candidate.education,
          workExperience: candidate.workExperience,
          cvFileName: candidate.cvFileName,
          recruiterName: candidate.recruiterName,
          createdAt: candidate.createdAt,
          updatedAt: candidate.updatedAt
        }
      });

    } catch (error) {
      // Handle Prisma unique constraint violation (duplicate email)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(409).json({
            error: 'Duplicate email',
            message: 'A candidate with this email address already exists in the system'
          });
        }
      }

      // Log error for debugging
      console.error('Error updating candidate:', error);

      // Generic server error response
      return res.status(500).json({
        error: 'Server error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    }
  }
);

export default router;
