'use client';
import React, { useState } from 'react';
import { 
  Bell, Shield, Smartphone, AlertCircle, CheckCircle, 
  Info, Trash2, Check, X, Settings, Filter,
  Clock, Eye, EyeOff, Archive
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const router = useRouter();
  
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Security',
      priority: 'critical',
      title: 'Security Update Required',
      message: 'Your iPhone 14 Pro needs a critical security update. Please update to iOS 17.3 immediately.',
      timestamp: '5 minutes ago',
      read: false,
      icon: Shield,
      device: 'iPhone 14 Pro'
    },
    {
      id: 2,
      type: 'Device',
      priority: 'warning',
      title: 'Device Non-Compliant',
      message: 'Personal Android device is not meeting compliance requirements. Screen lock must be enabled.',
      timestamp: '1 hour ago',
      read: false,
      icon: Smartphone,
      device: 'Personal Android'
    },
    {
      id: 3,
      type: 'System',
      priority: 'info',
      title: 'New Resource Available',
      message: 'Employee Handbook 2024 has been uploaded to the resources section.',
      timestamp: '2 hours ago',
      read: true,
      icon: Info
    },
    {
      id: 4,
      type: 'Device',
      priority: 'info',
      title: 'Device Synced Successfully',
      message: 'Your MacBook Pro has been synced and is fully compliant.',
      timestamp: '3 hours ago',
      read: true,
      icon: CheckCircle,
      device: 'MacBook Pro'
    },
    {
      id: 5,
      type: 'Security',
      priority: 'warning',
      title: 'Password Expiration Warning',
      message: 'Your password will expire in 7 days. Please update your password to maintain access.',
      timestamp: '5 hours ago',
      read: false,
      icon: Shield
    },
    {
      id: 6,
      type: 'General',
      priority: 'info',
      title: 'System Maintenance Scheduled',
      message: 'The BYOD portal will be under maintenance on Sunday, Nov 10 from 2 AM to 6 AM EST.',
      timestamp: '1 day ago',
      read: true,
      icon: Info
    },
    {
      id: 7,
      type: 'Device',
      priority: 'critical',
      title: 'Device Enrollment Pending',
      message: 'Your recently enrolled tablet requires administrator approval before accessing company resources.',
      timestamp: '1 day ago',
      read: false,
      icon: Smartphone,
      device: 'iPad Pro'
    },
    {
      id: 8,
      type: 'Security',
      priority: 'info',
      title: 'Security Training Reminder',
      message: 'Complete your annual security awareness training by Nov 15, 2024.',
      timestamp: '2 days ago',
      read: true,
      icon: Shield
    },
    {
      id: 9,
      type: 'System',
      priority: 'info',
      title: 'New Feature: Multi-Factor Authentication',
      message: 'MFA is now available for enhanced security. Enable it in your account settings.',
      timestamp: '3 days ago',
      read: true,
      icon: Info
    },
    {
      id: 10,
      type: 'Device',
      priority: 'warning',
      title: 'Storage Space Low',
      message: 'Your iPhone 14 Pro is running low on storage (5 GB remaining). Consider freeing up space.',
      timestamp: '4 days ago',
      read: true,
      icon: AlertCircle,
      device: 'iPhone 14 Pro'
    }
  ]);

  const filters = ['All', 'Security', 'Device', 'System', 'General'];

  const priorityConfig = {
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-700',
      icon: 'text-red-600'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-700',
      icon: 'text-yellow-600'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
      icon: 'text-blue-600'
    }
  };

  const filteredNotifications = notifications.filter(notif => 
    selectedFilter === 'All' || notif.type === selectedFilter
  );

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAsUnread = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: false } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAllRead = () => {
    setNotifications(notifications.filter(n => !n.read));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-1">Stay updated on security alerts and system notifications</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Mark All Read
          </button>
          <button
            onClick={() => router.push('/settings')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
            <Bell className="w-10 h-10 text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Unread</p>
              <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <Eye className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Critical</p>
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Read</p>
              <p className="text-2xl font-bold text-green-600">
                {notifications.filter(n => n.read).length}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalCount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-1">
                {criticalCount} Critical Alert{criticalCount > 1 ? 's' : ''} Require Immediate Attention
              </h3>
              <p className="text-red-800">
                Please review and address critical notifications to maintain security and compliance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500" />
          {filters.map(filter => {
            const count = filter === 'All' 
              ? notifications.length 
              : notifications.filter(n => n.type === filter).length;
            
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">Try adjusting your filter to see more notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            const config = priorityConfig[notification.priority];
            
            return (
              <div
                key={notification.id}
                className={`${config.bg} border ${config.border} rounded-lg p-4 transition hover:shadow-md ${
                  !notification.read ? 'border-l-4' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 bg-white rounded-lg ${config.icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold text-lg ${config.text}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-700">{notification.message}</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read ? (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-600 hover:bg-white rounded-lg transition"
                            title="Mark as read"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => markAsUnread(notification.id)}
                            className="p-2 text-gray-600 hover:bg-white rounded-lg transition"
                            title="Mark as unread"
                          >
                            <EyeOff className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-red-600 hover:bg-white rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className={`px-3 py-1 rounded-full font-medium ${config.badge}`}>
                        {notification.type}
                      </span>
                      {notification.device && (
                        <span className="text-gray-600 flex items-center gap-1">
                          <Smartphone className="w-4 h-4" />
                          {notification.device}
                        </span>
                      )}
                      <span className="text-gray-500 flex items-center gap-1 ml-auto">
                        <Clock className="w-4 h-4" />
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bulk Actions */}
      {notifications.filter(n => n.read).length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {notifications.filter(n => n.read).length} read notification(s)
            </p>
            <button
              onClick={clearAllRead}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
            >
              <Archive className="w-4 h-4" />
              Clear All Read
            </button>
          </div>
        </div>
      )}
    </div>
  );
}