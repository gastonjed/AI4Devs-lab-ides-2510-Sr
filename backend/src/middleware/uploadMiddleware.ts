import multer from 'multer';
import path from 'path';
import { Request } from 'express';

/**
 * Multer storage configuration for CV file uploads
 * Files are stored in uploads/candidates/ with unique timestamped filenames
 */
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/candidates/');
  },

  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Generate unique identifier: timestamp-random
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    // Sanitize original filename (remove special characters, keep alphanumeric and hyphens)
    const sanitizedOriginalName = file.originalname
      .replace(/[^a-zA-Z0-9.-]/g, '-')
      .toLowerCase();

    // Construct filename: timestamp-random-originalname
    const filename = uniqueSuffix + '-' + sanitizedOriginalName;

    cb(null, filename);
  }
});

/**
 * File filter to validate file types
 * Only allows PDF and DOCX files
 */
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allowed MIME types
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  // Allowed file extensions
  const allowedExtensions = ['.pdf', '.docx'];

  // Get file extension
  const fileExtension = path.extname(file.originalname).toLowerCase();

  // Validate both MIME type and file extension
  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
    cb(null, true); // Accept file
  } else {
    // Reject file with error
    cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'));
  }
};

/**
 * Multer upload middleware configuration
 * - Single file upload with field name 'cv'
 * - Max file size: 5MB (5 * 1024 * 1024 bytes)
 * - File type validation: PDF and DOCX only
 */
export const uploadCV = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB in bytes
  }
}).single('cv');

/**
 * Error handler middleware for Multer errors
 * Converts Multer-specific errors to user-friendly messages
 */
export const handleUploadError = (err: any, req: Request, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'File size exceeds the 5MB limit. Please upload a smaller file.'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: 'Unexpected field',
        message: 'Unexpected file field. Please use the field name "cv".'
      });
    }
    // Other Multer errors
    return res.status(400).json({
      error: 'File upload error',
      message: err.message
    });
  } else if (err) {
    // Custom file filter errors (e.g., invalid file type)
    return res.status(400).json({
      error: 'Invalid file',
      message: err.message
    });
  }

  // No error, continue to next middleware
  next();
};
