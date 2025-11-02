// ==============================================
// Device Routes
// File: /routes/devices.js
// ==============================================

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { validateDevice } = require('../middleware/validation');
const deviceController = require('../controllers/deviceController');

// All routes require authentication
router.use(requireAuth);

/**
 * @route   GET /api/devices
 * @desc    Get all devices for current user
 * @access  Private
 */
router.get('/', deviceController.getDevices);

/**
 * @route   GET /api/devices/stats
 * @desc    Get device statistics
 * @access  Private
 */
router.get('/stats', deviceController.getDeviceStats);

/**
 * @route   GET /api/devices/:id
 * @desc    Get single device by ID
 * @access  Private
 */
router.get('/:id', deviceController.getDevice);

/**
 * @route   POST /api/devices
 * @desc    Enroll new device
 * @access  Private
 */
router.post('/', validateDevice, deviceController.enrollDevice);

/**
 * @route   PUT /api/devices/:id
 * @desc    Update device
 * @access  Private
 */
router.put('/:id', deviceController.updateDevice);

/**
 * @route   POST /api/devices/:id/sync
 * @desc    Sync device and run compliance check
 * @access  Private
 */
router.post('/:id/sync', deviceController.syncDevice);

/**
 * @route   DELETE /api/devices/:id
 * @desc    Remove device (soft delete)
 * @access  Private
 */
router.delete('/:id', deviceController.removeDevice);

module.exports = router;