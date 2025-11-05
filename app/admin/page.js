
'use client';
import React, { useState } from 'react';
import { Shield, Users, Smartphone, MapPin, BarChart3, Settings, FileText, Bell, LogOut, Search, AlertTriangle, CheckCircle, XCircle, Clock, Activity, TrendingUp, TrendingDown, Eye, Lock, Globe, Monitor, ChevronRight, Calendar, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Statistics Data
  const stats = {
    totalEmployees: 124,
    activeEmployees: 98,
    totalDevices: 342,
    onlineDevices: 287,
    compliantDevices: 298,
    nonCompliantDevices: 44,
    criticalAlerts: 5,
    pendingApprovals: 12
  };

  // Mock Recent Activity
  const recentActivity = [
    { id: 1, type: 'device_enrolled', user: 'Sarah Williams', device: 'iPhone 15 Pro', time: '5 minutes ago', icon: CheckCircle, color: 'text-green-600' },
    { id: 2, type: 'compliance_failed', user: 'Mike Johnson', device: 'Android Phone', time: '12 minutes ago', icon: AlertTriangle, color: 'text-red-600' },
    { id: 3, type: 'device_synced', user: 'John Doe', device: 'MacBook Pro', time: '1 hour ago', icon: Activity, color: 'text-blue-600' },
    { id: 4, type: 'policy_updated', user: 'Admin', device: 'Screen Lock Policy', time: '2 hours ago', icon: Shield, color: 'text-purple-600' },
    { id: 5, type: 'device_removed', user: 'Jane Smith', device: 'iPad Air', time: '3 hours ago', icon: XCircle, color: 'text-orange-600' }
  ];

  // Mock Top Departments
  const departments = [
    { name: 'Engineering', employees: 45, devices: 128, compliance: 94 },
    { name: 'Sales', employees: 32, devices: 89, compliance: 87 },
    { name: 'Marketing', employees: 21, devices: 58, compliance: 96 },
    { name: 'HR', employees: 12, devices: 34, compliance: 100 },
    { name: 'Operations', employees: 14, devices: 33, compliance: 91 }
  ];

  // Mock System Health
  const systemHealth = [
    { metric: 'API Response Time', value: '124ms', status: 'good', trend: 'down' },
    { metric: 'Database Load', value: '42%', status: 'good', trend: 'up' },
    { metric: 'Active Connections', value: '287', status: 'good', trend: 'up' },
    { metric: 'Error Rate', value: '0.12%', status: 'good', trend: 'down' }
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BYOD Admin Portal</h1>
                  <p className="text-xs text-gray-500">System Management Dashboard</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search employees, devices, policies..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side - Notifications & Profile */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  5
                </span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">System Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  AD
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
        {/* Admin Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => handleNavigation('/admin')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium transition"
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/admin/employees')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <Users className="w-5 h-5" />
              Employees
              <span className="ml-auto px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                {stats.totalEmployees}
              </span>
            </button>
            <button
              onClick={() => handleNavigation('/admin/devices')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <Smartphone className="w-5 h-5" />
              All Devices
              <span className="ml-auto px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                {stats.totalDevices}
              </span>
            </button>
            <button
              onClick={() => handleNavigation('/admin/geolocation')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <MapPin className="w-5 h-5" />
              Geolocation
              <span className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                LIVE
              </span>
            </button>
            <button
              onClick={() => handleNavigation('/admin/compliance')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <Shield className="w-5 h-5" />
              Compliance
              {stats.nonCompliantDevices > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-semibold">
                  {stats.nonCompliantDevices}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavigation('/admin/policies')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <FileText className="w-5 h-5" />
              Policies
            </button>
            <button
              onClick={() => handleNavigation('/admin/reports')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <Activity className="w-5 h-5" />
              Reports
            </button>
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => handleNavigation('/admin/settings')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Welcome Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-600 mt-1">Monitor and manage your BYOD ecosystem</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Critical Alerts Banner */}
          {stats.criticalAlerts > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 text-lg">
                    {stats.criticalAlerts} Critical Alerts Require Attention
                  </h3>
                  <p className="text-sm text-red-800 mt-1">
                    Multiple devices have failed compliance checks. Immediate action required.
                  </p>
                  <button 
                    onClick={() => handleNavigation('/admin/compliance')}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                  >
                    View Critical Issues
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Employees */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer" onClick={() => handleNavigation('/admin/employees')}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEmployees}</p>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <span className="font-semibold">+8.2%</span> from last month
              </p>
            </div>

            {/* Active Employees */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-semibold">LIVE</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium">Active Now</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeEmployees}</p>
              <p className="text-sm text-gray-600 mt-2">
                {Math.round((stats.activeEmployees / stats.totalEmployees) * 100)}% online rate
              </p>
            </div>

            {/* Total Devices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer" onClick={() => handleNavigation('/admin/devices')}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Devices</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDevices}</p>
              <p className="text-sm text-gray-600 mt-2">
                {stats.onlineDevices} currently online
              </p>
            </div>

            {/* Compliance Rate */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer" onClick={() => handleNavigation('/admin/compliance')}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                {stats.nonCompliantDevices > 0 ? (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <p className="text-sm text-gray-600 font-medium">Compliance Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {Math.round((stats.compliantDevices / stats.totalDevices) * 100)}%
              </p>
              <p className="text-sm text-red-600 mt-2 font-medium">
                {stats.nonCompliantDevices} devices need attention
              </p>
            </div>
          </div>

          {/* Charts and Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Department Overview */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Department Overview</h3>
                <button className="text-blue-600 hover:underline text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{dept.name}</span>
                        <span className="text-sm text-gray-600">
                          {dept.employees} employees · {dept.devices} devices
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            dept.compliance >= 95 ? 'bg-green-500' : 
                            dept.compliance >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${dept.compliance}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">Compliance Rate</span>
                        <span className={`text-sm font-semibold ${
                          dept.compliance >= 95 ? 'text-green-600' : 
                          dept.compliance >= 85 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {dept.compliance}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">System Health</h3>
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-4">
                {systemHealth.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{item.metric}</span>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{item.value}</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <button 
                onClick={() => handleNavigation('/admin/activity')}
                className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className={`p-2 rounded-lg ${
                    activity.color.includes('green') ? 'bg-green-50' :
                    activity.color.includes('red') ? 'bg-red-50' :
                    activity.color.includes('blue') ? 'bg-blue-50' :
                    activity.color.includes('purple') ? 'bg-purple-50' : 'bg-orange-50'
                  }`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {activity.user} · {activity.device}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {activity.type.replace('_', ' ')}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => handleNavigation('/admin/geolocation')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition transform hover:-translate-y-1 text-left"
            >
              <MapPin className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">View Geolocation Map</h3>
              <p className="text-blue-100 text-sm mb-4">
                Track device locations in real-time on interactive map
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                Open Map <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => handleNavigation('/admin/compliance')}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition transform hover:-translate-y-1 text-left"
            >
              <Shield className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Compliance Monitor</h3>
              <p className="text-orange-100 text-sm mb-4">
                Review and fix non-compliant devices immediately
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                Check Status <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => handleNavigation('/admin/reports')}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition transform hover:-translate-y-1 text-left"
            >
              <BarChart3 className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Generate Reports</h3>
              <p className="text-green-100 text-sm mb-4">
                Export analytics and compliance reports
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                Create Report <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}