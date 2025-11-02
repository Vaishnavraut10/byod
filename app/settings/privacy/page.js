'use client';
import React, { useState } from 'react';
import { 
  ArrowLeft, Eye, Shield, Download, Trash2, 
  AlertCircle, CheckCircle, Save
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacySettingsPage() {
  const router = useRouter();
  
  const [settings, setSettings] = useState({
    profileVisibility: 'organization',
    showEmail: true,
    showPhone: false,
    showLocation: true,
    activityTracking: true,
    analyticsData: true,
    marketingEmails: false,
    productUpdates: true,
    securityAlerts: true,
    dataSharing: false,
    thirdPartyApps: true
  });

  const [saveStatus, setSaveStatus] = useState('');

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleVisibilityChange = (value) => {
    setSettings(prev => ({ ...prev, profileVisibility: value }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleDownloadData = () => {
    alert('Your data export will be emailed to you within 24 hours.');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you absolutely sure? This action cannot be undone.')) {
      if (confirm('Type DELETE to confirm account deletion:')) {
        alert('Account deletion request submitted. You will receive an email confirmation.');
      }
    }
  };

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
          <p className="text-gray-600 text-lg">Control your data and privacy preferences</p>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveStatus === 'saved' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-5 h-5 ${saveStatus === 'saved' ? 'text-green-600' : 'text-blue-600'}`} />
              <span className={`font-medium ${saveStatus === 'saved' ? 'text-green-900' : 'text-blue-900'}`}>
                {saveStatus === 'saved' ? 'Privacy settings saved successfully!' : 'Saving changes...'}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Visibility */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Profile Visibility</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Who can view your profile?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="visibility"
                      value="everyone"
                      checked={settings.profileVisibility === 'everyone'}
                      onChange={(e) => handleVisibilityChange(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Everyone</p>
                      <p className="text-sm text-gray-600">Anyone can view your profile</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="visibility"
                      value="organization"
                      checked={settings.profileVisibility === 'organization'}
                      onChange={(e) => handleVisibilityChange(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Organization Only</p>
                      <p className="text-sm text-gray-600">Only people in your organization</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={settings.profileVisibility === 'private'}
                      onChange={(e) => handleVisibilityChange(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Private</p>
                      <p className="text-sm text-gray-600">Only you can view your profile</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-3">
                <p className="font-medium text-gray-900">Profile Information Visibility</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Show Email Address</span>
                    <ToggleSwitch
                      enabled={settings.showEmail}
                      onChange={() => handleToggle('showEmail')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Show Phone Number</span>
                    <ToggleSwitch
                      enabled={settings.showPhone}
                      onChange={() => handleToggle('showPhone')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Show Location</span>
                    <ToggleSwitch
                      enabled={settings.showLocation}
                      onChange={() => handleToggle('showLocation')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Collection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Data Collection</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Activity Tracking</p>
                  <p className="text-sm text-gray-600">Track your usage patterns to improve your experience</p>
                </div>
                <ToggleSwitch
                  enabled={settings.activityTracking}
                  onChange={() => handleToggle('activityTracking')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Analytics Data</p>
                  <p className="text-sm text-gray-600">Help us improve by sharing anonymous usage data</p>
                </div>
                <ToggleSwitch
                  enabled={settings.analyticsData}
                  onChange={() => handleToggle('analyticsData')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Data Sharing</p>
                  <p className="text-sm text-gray-600">Share data with trusted partners for improved services</p>
                </div>
                <ToggleSwitch
                  enabled={settings.dataSharing}
                  onChange={() => handleToggle('dataSharing')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Third-Party Apps Access</p>
                  <p className="text-sm text-gray-600">Allow connected apps to access your data</p>
                </div>
                <ToggleSwitch
                  enabled={settings.thirdPartyApps}
                  onChange={() => handleToggle('thirdPartyApps')}
                />
              </div>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Communication Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Marketing Emails</p>
                  <p className="text-sm text-gray-600">Receive promotional offers and news</p>
                </div>
                <ToggleSwitch
                  enabled={settings.marketingEmails}
                  onChange={() => handleToggle('marketingEmails')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Product Updates</p>
                  <p className="text-sm text-gray-600">Get notified about new features and improvements</p>
                </div>
                <ToggleSwitch
                  enabled={settings.productUpdates}
                  onChange={() => handleToggle('productUpdates')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Security Alerts</p>
                  <p className="text-sm text-gray-600">Important security notifications (Cannot be disabled)</p>
                </div>
                <ToggleSwitch
                  enabled={settings.securityAlerts}
                  onChange={() => {}}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Download className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Data Management</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Download Your Data</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Request a copy of your data in a portable format
                </p>
                <button
                  onClick={handleDownloadData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Request Data Export
                </button>
              </div>

              <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
                <h3 className="font-semibold text-red-900 mb-2">Delete Your Account</h3>
                <p className="text-sm text-red-800 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2 disabled:bg-blue-400"
            >
              <Save className="w-5 h-5" />
              {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}