// ==============================================
// Device Controller
// File: /controllers/deviceController.js
// ==============================================

const { Device, ComplianceCheck, Notification, ActivityLog } = require('../models');

// Get all devices for current user
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find({ 
      userId: req.user._id,
      isActive: true 
    }).sort({ createdAt: -1 });

    // Get statistics
    const stats = {
      total: devices.length,
      compliant: devices.filter(d => d.isCompliant).length,
      nonCompliant: devices.filter(d => !d.isCompliant).length,
      byType: {
        Mobile: devices.filter(d => d.type === 'Mobile').length,
        Tablet: devices.filter(d => d.type === 'Tablet').length,
        Laptop: devices.filter(d => d.type === 'Laptop').length,
        Desktop: devices.filter(d => d.type === 'Desktop').length
      }
    };

    res.json({
      success: true,
      data: devices,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch devices',
      error: error.message
    });
  }
};

// Get single device
exports.getDevice = async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Get compliance history
    const complianceHistory = await ComplianceCheck.find({
      deviceId: device._id
    }).sort({ checkedAt: -1 }).limit(10);

    res.json({
      success: true,
      data: {
        ...device.toObject(),
        complianceHistory
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch device',
      error: error.message
    });
  }
};

// Enroll new device
exports.enrollDevice = async (req, res) => {
  try {
    const deviceData = {
      userId: req.user._id,
      ...req.body,
      enrolledDate: new Date()
    };

    // Check for duplicate serial number or IMEI
    if (deviceData.serialNumber) {
      const existing = await Device.findOne({ 
        serialNumber: deviceData.serialNumber,
        isActive: true
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Device with this serial number already exists'
        });
      }
    }

    // Create device
    const device = await Device.create(deviceData);

    // Run initial compliance check
    const complianceResult = await runComplianceCheck(device);

    // Create notification
    await Notification.create({
      userId: req.user._id,
      type: 'device',
      priority: 'info',
      title: 'Device Enrolled Successfully',
      message: `Your ${device.name} has been enrolled in the BYOD system`,
      deviceId: device._id
    });

    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: 'device_enrolled',
      entityType: 'device',
      entityId: device._id,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      metadata: {
        deviceName: device.name,
        deviceType: device.type
      }
    });

    // Emit socket event
    const io = req.app.get('io');
    io.to(`user:${req.user._id}`).emit('device-enrolled', {
      device: device,
      compliance: complianceResult
    });

    res.status(201).json({
      success: true,
      message: 'Device enrolled successfully',
      data: device
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to enroll device',
      error: error.message
    });
  }
};

// Update device
exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        device[key] = req.body[key];
      }
    });

    await device.save();

    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: 'device_updated',
      entityType: 'device',
      entityId: device._id,
      ipAddress: req.ip
    });

    res.json({
      success: true,
      message: 'Device updated successfully',
      data: device
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update device',
      error: error.message
    });
  }
};

// Sync device
exports.syncDevice = async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Update last sync time
    device.lastSync = new Date();
    await device.save();

    // Run compliance check
    const complianceResult = await runComplianceCheck(device);

    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: 'device_synced',
      entityType: 'device',
      entityId: device._id
    });

    // Emit socket event
    const io = req.app.get('io');
    io.to(`user:${req.user._id}`).emit('device-synced', {
      deviceId: device._id,
      timestamp: device.lastSync,
      compliance: complianceResult
    });

    res.json({
      success: true,
      message: 'Device synced successfully',
      data: {
        device,
        compliance: complianceResult
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to sync device',
      error: error.message
    });
  }
};

// Remove device
exports.removeDevice = async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Soft delete
    device.isActive = false;
    await device.save();

    // Create notification
    await Notification.create({
      userId: req.user._id,
      type: 'device',
      priority: 'warning',
      title: 'Device Removed',
      message: `${device.name} has been removed from your account`,
      deviceId: device._id
    });

    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: 'device_removed',
      entityType: 'device',
      entityId: device._id,
      metadata: {
        deviceName: device.name
      }
    });

    // Emit socket event
    const io = req.app.get('io');
    io.to(`user:${req.user._id}`).emit('device-removed', {
      deviceId: device._id
    });

    res.json({
      success: true,
      message: 'Device removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove device',
      error: error.message
    });
  }
};

// Run compliance check (helper function)
async function runComplianceCheck(device) {
  const issues = [];

  // Check OS version (simplified logic)
  if (device.osVersion) {
    const version = parseFloat(device.osVersion);
    
    if (device.os.includes('iOS') && version < 16) {
      issues.push({
        type: 'outdated_os',
        description: 'iOS version is outdated. Please update to iOS 16 or later',
        severity: 'warning'
      });
    } else if (device.os.includes('Android') && version < 12) {
      issues.push({
        type: 'outdated_os',
        description: 'Android version is outdated. Please update to Android 12 or later',
        severity: 'warning'
      });
    }
  }

  // Simulate other checks
  const isCompliant = issues.filter(i => i.severity === 'critical').length === 0;

  // Update device compliance
  device.isCompliant = isCompliant;
  device.complianceIssues = issues;
  await device.save();

  // Create compliance check record
  const complianceCheck = await ComplianceCheck.create({
    deviceId: device._id,
    userId: device.userId,
    status: isCompliant ? 'compliant' : 'non-compliant',
    issues: issues,
    checkedAt: new Date()
  });

  // Create notification if non-compliant
  if (!isCompliant) {
    await Notification.create({
      userId: device.userId,
      type: 'compliance',
      priority: 'warning',
      title: 'Device Compliance Issue',
      message: `${device.name} has ${issues.length} compliance issue(s)`,
      deviceId: device._id
    });
  }

  return complianceCheck;
}

// Get device statistics
exports.getDeviceStats = async (req, res) => {
  try {
    const devices = await Device.find({ 
      userId: req.user._id,
      isActive: true 
    });

    const stats = {
      total: devices.length,
      compliant: devices.filter(d => d.isCompliant).length,
      nonCompliant: devices.filter(d => !d.isCompliant).length,
      byType: {
        Mobile: devices.filter(d => d.type === 'Mobile').length,
        Tablet: devices.filter(d => d.type === 'Tablet').length,
        Laptop: devices.filter(d => d.type === 'Laptop').length,
        Desktop: devices.filter(d => d.type === 'Desktop').length
      },
      recentlyAdded: devices.filter(d => {
        const daysSinceEnrolled = (Date.now() - d.enrolledDate) / (1000 * 60 * 60 * 24);
        return daysSinceEnrolled <= 7;
      }).length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get device statistics',
      error: error.message
    });
  }
};