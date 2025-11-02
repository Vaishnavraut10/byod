'use client';
import React, { useState } from 'react';
import { 
  ArrowLeft, Lock, Shield, Key, Smartphone, 
  Clock, Globe, AlertCircle, CheckCircle, 
  Eye, EyeOff, Save, X
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SecuritySettingsPage() {
  const router = useRouter();
  
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      location: 'New York, NY',
      ip: '192.168.1.1',
      lastActive: '5 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 14 Pro',
      location: 'New York, NY',
      ip: '192.168.1.2',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Windows',
      location: 'Remote VPN',
      ip: '10.0.0.50',
      lastActive: '1 day ago',
      current: false
    }
  ]);

  const [loginHistory] = useState([
    { date: 'Nov 2, 2024 09:30 AM', location: 'New York, NY', device: 'MacBook Pro', status: 'success' },
    { date: 'Nov 1, 2024 08:15 AM', location: 'New York, NY', device: 'iPhone 14 Pro', status: 'success' },
    { date: 'Oct 31, 2024 05:45 PM', location: 'Remote VPN', device: 'Chrome on Windows', status: 'success' },
    { date: 'Oct 31, 2024 02:20 PM', location: 'Unknown', device: 'Unknown', status: 'failed' }
  ]);

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.new.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setShowChangePassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleEndSession = (sessionId) => {
    if (confirm('Are you sure you want to end this session?')) {
      setActiveSessions(activeSessions.filter(s => s.id !== sessionId));
    }
  };

  const handleEndAllSessions = () => {
    if (confirm('This will log you out from all devices except the current one. Continue?')) {
      setActiveSessions(activeSessions.filter(s => s.current));
    }
  };

  const handleEnable2FA = () => {
    setShowTwoFactorModal(true);
  };

  const confirmEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShowTwoFactorModal(false);
    alert('Two-factor authentication enabled successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Settings
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Security Settings</h1>
          <p className="text-gray-600 text-lg">Manage your password, authentication, and active sessions</p>
        </div>

        <div className="space-y-6">
          {/* Password Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Password</h2>
              </div>
              <button
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showChangePassword ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {showChangePassword ? (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Password Requirements:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                    <li>At least 8 characters long</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Include at least one number</li>
                    <li>Include at least one special character</li>
                  </ul>
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Update Password
                </button>
              </div>
            ) : (
              <p className="text-gray-600">
                Last changed: <span className="font-medium">Oct 15, 2024</span>
              </p>
            )}
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Two-Factor Authentication</h2>
                  <p className="text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                  {twoFactorEnabled && (
                    <div className="mt-3 flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Enabled</span>
                    </div>
                  )}
                </div>
              </div>
              {!twoFactorEnabled ? (
                <button
                  onClick={handleEnable2FA}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Enable
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to disable two-factor authentication?')) {
                      setTwoFactorEnabled(false);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Disable
                </button>
              )}
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Active Sessions</h2>
              </div>
              <button
                onClick={handleEndAllSessions}
                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
              >
                End All Sessions
              </button>
            </div>

            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{session.device}</h3>
                          {session.current && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="mt-1 space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            {session.location} • {session.ip}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Last active: {session.lastActive}
                          </p>
                        </div>
                      </div>
                    </div>
                    {!session.current && (
                      <button
                        onClick={() => handleEndSession(session.id)}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                      >
                        End Session
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Login History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Login History</h2>
            </div>

            <div className="space-y-3">
              {loginHistory.map((log, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{log.date}</p>
                      <div className="mt-1 text-sm text-gray-600 space-y-0.5">
                        <p>{log.device} • {log.location}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {log.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Factor Modal */}
        {showTwoFactorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Enable Two-Factor Authentication</h2>
                <button
                  onClick={() => setShowTwoFactorModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Setup Instructions:</strong>
                  </p>
                  <ol className="text-sm text-blue-800 mt-2 space-y-1 list-decimal list-inside">
                    <li>Install an authenticator app (Google Authenticator, Authy)</li>
                    <li>Scan the QR code below</li>
                    <li>Enter the 6-digit code from your app</li>
                  </ol>
                </div>
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                  <Key className="w-16 h-16 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowTwoFactorModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEnable2FA}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}