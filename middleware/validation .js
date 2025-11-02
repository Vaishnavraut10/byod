// ==============================================
// Validation Middleware
// File: /middleware/validation.js
// ==============================================

const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Device validation rules
const validateDevice = [
  body('name').trim().notEmpty().withMessage('Device name is required'),
  body('type').isIn(['Mobile', 'Tablet', 'Laptop', 'Desktop']).withMessage('Invalid device type'),
  body('os').trim().notEmpty().withMessage('Operating system is required'),
  body('model').trim().notEmpty().withMessage('Device model is required'),
  handleValidationErrors
];

// Resource validation rules
const validateResource = [
  body('name').trim().notEmpty().withMessage('Resource name is required'),
  body('type').isIn(['application', 'document', 'link']).withMessage('Invalid resource type'),
  body('description').optional().trim(),
  body('category').optional().trim(),
  handleValidationErrors
];

// Notification validation rules
const validateNotification = [
  body('type').isIn(['security', 'device', 'system', 'general', 'compliance', 'resource']).withMessage('Invalid notification type'),
  body('priority').isIn(['critical', 'warning', 'info']).withMessage('Invalid priority'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  handleValidationErrors
];

// Settings validation rules
const validateSettings = [
  body('notifications').optional().isObject(),
  body('privacy').optional().isObject(),
  body('appearance').optional().isObject(),
  body('security').optional().isObject(),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateDevice,
  validateResource,
  validateNotification,
  validateSettings
};