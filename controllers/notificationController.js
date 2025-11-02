// ==============================================
// Notification Controller
// File: /controllers/notificationController.js
// ==============================================

const { Notification, ActivityLog } = require('../models');

// Get all notifications for user
exports.getNotifications = async (req, res) => {
  try {
    const { type, priority, isRead } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (type) filter.type = type;
    if (priority) filter.priority = priority;
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('deviceId', 'name type')
      .populate('resourceId', 'name type');

    // Get statistics
    const stats = {
      total: await Notification.countDocuments({ userId: req.user._id }),
      unread: await Notification.countDocuments({ userId: req.user._id, isRead: false }),
      critical: await Notification.countDocuments({ userId: req.user._id, priority: 'critical', isRead: false }),
      byType: {
        security: await Notification.countDocuments({ userId: req.user._id, type: 'security', isRead: false }),
        device: await Notification.countDocuments({ userId: req.user._id, type: 'device', isRead: false }),
        system: await Notification.countDocuments({ userId: req.user._id, type: 'system', isRead: false }),
        general: await Notification.countDocuments({ userId: req.user._id, type: 'general', isRead: false })
      }
    };

    res.json({
      success: true,
      data: notifications,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: error.message
    });
  }
};

// Mark all as read
exports.markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    // Emit socket event
    const io = req.app.get('io');
    io.to(`user:${req.user._id}`).emit('notifications-marked-read');

    res.json({
      success: true,
      message: 'All notifications marked as read',
      updated: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark all as read',
      error: error.message
    });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await Notification.deleteOne({ _id: notification._id });

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message
    });
  }
};

// Clear all read notifications
exports.clearRead = async (req, res) => {
  try {
    const result = await Notification.deleteMany({
      userId: req.user._id,
      isRead: true
    });

    res.json({
      success: true,
      message: 'Read notifications cleared',
      deleted: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear notifications',
      error: error.message
    });
  }
};

// Create notification (internal use / admin)
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      userId: req.body.userId || req.user._id,
      ...req.body
    });

    // Emit real-time notification
    const io = req.app.get('io');
    io.to(`user:${notification.userId}`).emit('new-notification', notification);

    res.status(201).json({
      success: true,
      message: 'Notification created',
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: error.message
    });
  }
};


