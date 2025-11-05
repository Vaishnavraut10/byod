'use client';
import React, { useState } from 'react';
import { 
  Shield, Bell, Search, LogOut, Home, Users, Smartphone, 
  MapPin, BarChart3, FileText, Settings, Monitor, Tablet,
  CheckCircle, AlertCircle, Circle, RefreshCw, Lock, Trash2,
  Download, Filter, X, Eye, ChevronDown, Wifi, WifiOff, Battery,
  HardDrive
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDevicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  
  // Filter states
  const [filterType, setFilterType] = useState('all');
  const [filterOS, setFilterOS] = useState('all');
  const [filterCompliance, setFilterCompliance] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock devices data
  const [devices] = useState([
    { 
      id: 1, 
      name: 'iPhone 14 Pro', 
      type: 'Mobile', 
      os: 'iOS 17.2', 
      model: 'iPhone 14 Pro',
      employee: 'John Doe',
      department: 'Engineering',
      status: 'online',
      compliant: true, 
      lastSync: '5 minutes ago',
      location: 'New York, NY',
      battery: '85%',
      storage: '64/128 GB',
      serialNumber: 'FVFXC2K8Q6L2'
    },
    { 
      id: 2, 
      name: 'MacBook Pro', 
      type: 'Laptop', 
      os: 'macOS 14.1', 
      model: 'MacBook Pro 16"',
      employee: 'Sarah Smith',
      department: 'Engineering',
      status: 'online',
      compliant: true, 
      lastSync: '10 minutes ago',
      location: 'San Francisco, CA',
      battery: '92%',
      storage: '256/512 GB',
      serialNumber: 'C02XL7YGJG5H'
    },
    { 
      id: 3, 
      name: 'Personal Android', 
      type: 'Mobile', 
      os: 'Android 13', 
      model: 'Samsung Galaxy S23',
      employee: 'Mike Johnson',
      department: 'Sales',
      status: 'offline',
      compliant: false, 
      lastSync: '2 hours ago',
      location: 'Chicago, IL',
      battery: '45%',
      storage: '128/256 GB',
      serialNumber: 'RF8N20XXXXXX'
    },
    { 
      id: 4, 
      name: 'iPad Pro', 
      type: 'Tablet', 
      os: 'iPadOS 17.1', 
      model: 'iPad Pro 12.9"',
      employee: 'Emily Chen',
      department: 'Marketing',
      status: 'online',
      compliant: true, 
      lastSync: '1 hour ago',
      location: 'Los Angeles, CA',
      battery: '78%',
      storage: '128/256 GB',
      serialNumber: 'DMPH2K8Q6L2'
    },
    { 
      id: 5, 
      name: 'Dell XPS 15', 
      type: 'Laptop', 
      os: 'Windows 11', 
      model: 'Dell XPS 15',
      employee: 'David Wilson',
      department: 'Finance',
      status: 'online',
      compliant: false, 
      lastSync: '30 minutes ago',
      location: 'Austin, TX',
      battery: '67%',
      storage: '512/1024 GB',
      serialNumber: 'DXPS15XXXXX'
    },
    { 
      id: 6, 
      name: 'iPhone 13', 
      type: 'Mobile', 
      os: 'iOS 16.5', 
      model: 'iPhone 13',
      employee: 'Lisa Martinez',
      department: 'HR',
      status: 'offline',
      compliant: true, 
      lastSync: '4 hours ago',
      location: 'Boston, MA',
      battery: '34%',
      storage: '64/128 GB',
      serialNumber: 'FVGXC2K8Q6L2'
    },
    { 
      id: 7, 
      name: 'MacBook Air', 
      type: 'Laptop', 
      os: 'macOS 14.2', 
      model: 'MacBook Air M2',
      employee: 'Robert Taylor',
      department: 'Operations',
      status: 'online',
      compliant: true, 
      lastSync: '15 minutes ago',
      location: 'Seattle, WA',
      battery: '88%',
      storage: '128/256 GB',
      serialNumber: 'C02XM7YGJG5H'
    },
    { 
      id: 8, 
      name: 'Samsung Tab S9', 
      type: 'Tablet', 
      os: 'Android 14', 
      model: 'Galaxy Tab S9',
      employee: 'Jennifer Lee',
      department: 'Design',
      status: 'online',
      compliant: false, 
      lastSync: '45 minutes ago',
      location: 'Miami, FL',
      battery: '56%',
      storage: '128/256 GB',
      serialNumber: 'GTS9XXXXXXX'
    }
  ]);

  // Statistics
  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    compliant: devices.filter(d => d.compliant).length,
    nonCompliant: devices.filter(d => !d.compliant).length
  };

  // Filtering logic
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || device.type === filterType;
    const matchesOS = filterOS === 'all' || device.os.includes(filterOS);
    const matchesCompliance = filterCompliance === 'all' || 
                              (filterCompliance === 'compliant' && device.compliant) ||
                              (filterCompliance === 'non-compliant' && !device.compliant);
    const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
    
    return matchesSearch && matchesType && matchesOS && matchesCompliance && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDevices(filteredDevices.map(d => d.id));
    } else {
      setSelectedDevices([]);
    }
  };

  const handleSelectDevice = (deviceId) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
    } else {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
  };

  const handleViewDevice = (device) => {
    setSelectedDevice(device);
    setShowDeviceModal(true);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const getDeviceIcon = (type) => {
    switch(type) {
      case 'Mobile': return <Smartphone className="w-5 h-5" />;
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      case 'Laptop': return <Monitor className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BYOD Admin Portal</h1>
                <p className="text-xs text-gray-500">Device Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AU
                </div>
                <button
                  onClick={() => handleNavigation('/admin/login')}
                  className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
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
              onClick={() => handleNavigation('/admin')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/admin/employees')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <Users className="w-5 h-5" />
              <span className="flex-1 text-left">Employees</span>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">8</span>
            </button>
            <button
              onClick={() => handleNavigation('/admin/devices')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium transition"
            >
              <Smartphone className="w-5 h-5" />
              <span className="flex-1 text-left">All Devices</span>
              <span className="px-2 py-0.5 bg-blue-200 text-blue-700 text-xs rounded-full">{devices.length}</span>
            </button>
            <button
              onClick={() => handleNavigation('/admin/geolocation')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <MapPin className="w-5 h-5" />
              <span className="flex-1 text-left">Geolocation</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">LIVE</span>
            </button>
            <button
              onClick={() => handleNavigation('/admin/compliance')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <Shield className="w-5 h-5" />
              <span className="flex-1 text-left">Compliance</span>
              {stats.nonCompliant > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{stats.nonCompliant}</span>
              )}
            </button>
            <button
              onClick={() => handleNavigation('/admin/policies')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <FileText className="w-5 h-5" />
              Policies
            </button>
            <button
              onClick={() => handleNavigation('/admin/reports')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              <BarChart3 className="w-5 h-5" />
              Reports
            </button>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => handleNavigation('/admin/settings')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">All Devices</h2>
              <p className="text-gray-600 mt-1">Manage and monitor all registered devices</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="w-5 h-5" />
                Export Data
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Online</p>
              <p className="text-2xl font-bold text-green-600">{stats.online}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Offline</p>
              <p className="text-2xl font-bold text-gray-600">{stats.offline}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Compliant</p>
              <p className="text-2xl font-bold text-green-600">{stats.compliant}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Non-Compliant</p>
              <p className="text-2xl font-bold text-red-600">{stats.nonCompliant}</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search devices, employees, or models..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {selectedDevices.length > 0 && (
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Sync Selected ({selectedDevices.length})
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Lock Selected
                  </button>
                  <button 
                    onClick={() => setSelectedDevices([])}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Device Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
                  <select
                    value={filterOS}
                    onChange={(e) => setFilterOS(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All OS</option>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                    <option value="Windows">Windows</option>
                    <option value="macOS">macOS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compliance</label>
                  <select
                    value={filterCompliance}
                    onChange={(e) => setFilterCompliance(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Devices</option>
                    <option value="compliant">Compliant Only</option>
                    <option value="non-compliant">Non-Compliant Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="online">Online Only</option>
                    <option value="offline">Offline Only</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Devices Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedDevices.length === filteredDevices.length && filteredDevices.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Device</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">OS</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Compliance</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Last Sync</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDevices.map((device) => (
                    <tr key={device.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedDevices.includes(device.id)}
                          onChange={() => handleSelectDevice(device.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{device.name}</p>
                            <p className="text-sm text-gray-500">{device.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{device.employee}</p>
                        <p className="text-sm text-gray-500">{device.department}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                          {device.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{device.os}</td>
                      <td className="px-4 py-3">
                        {device.status === 'online' ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <Wifi className="w-4 h-4" />
                            Online
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-500 text-sm">
                            <WifiOff className="w-4 h-4" />
                            Offline
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {device.compliant ? (
                          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Compliant
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            <AlertCircle className="w-3 h-3" />
                            Non-Compliant
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{device.lastSync}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDevice(device)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition"
                            title="Sync Device"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded transition"
                            title="Lock Device"
                          >
                            <Lock className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDevices.length === 0 && (
              <div className="text-center py-12">
                <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No devices found matching your criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Device Details Modal */}
      {showDeviceModal && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
                    {getDeviceIcon(selectedDevice.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDevice.name}</h2>
                    <p className="text-gray-600">{selectedDevice.model}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeviceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Status Banner */}
                <div className={`p-4 rounded-lg border-l-4 ${
                  selectedDevice.compliant 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center gap-2">
                    {selectedDevice.compliant ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">Device is Compliant</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-900">Compliance Issues Detected</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Owner Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Owner Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Employee Name</p>
                      <p className="font-medium text-gray-900">{selectedDevice.employee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium text-gray-900">{selectedDevice.department}</p>
                    </div>
                  </div>
                </div>

                {/* Device Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Device Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Device Type</p>
                      <p className="font-medium text-gray-900">{selectedDevice.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Operating System</p>
                      <p className="font-medium text-gray-900">{selectedDevice.os}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="font-medium text-gray-900">{selectedDevice.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Serial Number</p>
                      <p className="font-medium text-gray-900 font-mono text-sm">{selectedDevice.serialNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Device Status */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Device Status</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        {selectedDevice.status === 'online' ? (
                          <Wifi className="w-4 h-4 text-green-600" />
                        ) : (
                          <WifiOff className="w-4 h-4 text-gray-500" />
                        )}
                        <p className="text-sm text-gray-500">Connection</p>
                      </div>
                      <p className="font-semibold text-gray-900 capitalize">{selectedDevice.status}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Battery className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-gray-500">Battery</p>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedDevice.battery}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <HardDrive className="w-4 h-4 text-purple-600" />
                        <p className="text-sm text-gray-500">Storage</p>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedDevice.storage}</p>
                    </div>
                  </div>
                </div>

                {/* Location & Sync */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Location & Activity</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Last Known Location</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <p className="font-medium text-gray-900">{selectedDevice.location}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Sync</p>
                      <div className="flex items-center gap-2 mt-1">
                        <RefreshCw className="w-4 h-4 text-blue-500" />
                        <p className="font-medium text-gray-900">{selectedDevice.lastSync}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Sync Now
                  </button>
                  <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Lock Device
                  </button>
                  <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}