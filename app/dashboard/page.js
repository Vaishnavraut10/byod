'use client';
import React, { useState } from 'react';
import {
  Shield,
  Smartphone,
  Monitor,
  Bell,
  LogOut,
  Home,
  Lock,
  AlertCircle,
  CheckCircle,
  FileText,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs'; // ✅ Clerk imports

export default function DashboardPage() {
  const router = useRouter();
  const { signOut } = useClerk(); // ✅ Clerk signOut function
  const { user, isSignedIn } = useUser(); // ✅ Clerk user session

  const [userName] = useState(user?.fullName || 'John Doe');
  const [userDepartment] = useState('Engineering');
  const [userEmail] = useState(user?.primaryEmailAddress?.emailAddress || 'john.doe@company.com');

  // Mock data for dashboard statistics
  const stats = {
    totalDevices: 3,
    compliantDevices: 2,
    issuesFound: 1
  };

  // ✅ Proper logout handling
  const handleLogout = async () => {
    try {
      await signOut(); // Properly ends Clerk session
      router.push('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/login');
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  // ✅ Prevent dashboard from rendering for logged-out users
  if (!isSignedIn) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BYOD Portal</h1>
                <p className="text-xs text-gray-500">Employee Dashboard</p>
              </div>
            </div>

            {/* Right Side - Notifications and Profile */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button
                onClick={() => handleNavigation('/notifications')}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{userDepartment}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {userName.split(' ').map(n => n[0]).join('')}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium transition"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/devices')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <Smartphone className="w-5 h-5" />
              My Devices
            </button>
            <button
              onClick={() => handleNavigation('/resources')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <FileText className="w-5 h-5" />
              Resources
            </button>
            <button
              onClick={() => handleNavigation('/notifications')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <Bell className="w-5 h-5" />
              <span className="flex-1 text-left">Notifications</span>
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">1</span>
            </button>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => handleNavigation('/help')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <HelpCircle className="w-5 h-5" />
                Help & Support
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back, {userName.split(' ')[0]}! 👋
            </h2>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your devices today.
            </p>
          </div>

          {/* Warning Banner for Non-Compliant Devices */}
          {stats.issuesFound > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900">
                    Action Required: Non-Compliant Device Detected
                  </h3>
                  <p className="text-sm text-yellow-800 mt-1">
                    {stats.issuesFound} device(s) need attention. Please review and fix compliance issues to maintain access to company resources.
                  </p>
                  <button 
                    onClick={() => handleNavigation('/devices')}
                    className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm font-medium"
                  >
                    View Devices
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Devices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Devices</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDevices}</p>
                  <p className="text-xs text-gray-500 mt-1">Registered devices</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Compliant Devices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Compliant</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.compliantDevices}</p>
                  <p className="text-xs text-gray-500 mt-1">Meeting requirements</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Issues Found */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Issues Found</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{stats.issuesFound}</p>
                  <p className="text-xs text-gray-500 mt-1">Requires attention</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Compliance Requirements</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                5 Rules
              </span>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Screen Lock Enabled',
                  description: 'Device must have PIN, password, or biometric lock',
                  priority: 'HIGH',
                  icon: Lock
                },
                {
                  title: 'Latest OS Version',
                  description: 'Operating system must be updated to latest stable version',
                  priority: 'HIGH',
                  icon: Monitor
                },
                {
                  title: 'Encryption Enabled',
                  description: 'Full disk encryption must be active on all devices',
                  priority: 'HIGH',
                  icon: Shield
                },
                {
                  title: 'Anti-Malware Installed',
                  description: 'Approved security software must be installed and active',
                  priority: 'MEDIUM',
                  icon: Shield
                },
                {
                  title: 'Auto-Lock Timeout',
                  description: 'Device must auto-lock after 5 minutes of inactivity',
                  priority: 'MEDIUM',
                  icon: Lock
                }
              ].map((rule, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <rule.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{rule.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        rule.priority === 'HIGH' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rule.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enroll New Device */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition">
              <Smartphone className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Enroll New Device</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Register a new phone, tablet, or laptop to access company resources securely.
              </p>
              <button 
                onClick={() => handleNavigation('/devices/enroll')}
                className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Access Resources */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition">
              <FileText className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Access Resources</h3>
              <p className="text-green-100 mb-4 text-sm">
                Browse and access company applications, files, and approved web services.
              </p>
              <button 
                onClick={() => handleNavigation('/resources')}
                className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Browse Resources
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Device synced successfully', device: 'iPhone 14 Pro', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
                { action: 'Compliance check passed', device: 'MacBook Pro', time: '5 hours ago', icon: Shield, color: 'text-blue-600' },
                { action: 'Non-compliant device detected', device: 'Personal Android', time: '1 day ago', icon: AlertCircle, color: 'text-red-600' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.device}</p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}