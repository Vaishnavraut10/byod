'use client';
import React, { useState } from 'react';
import { 
  Shield, Bell, Search, LogOut, Home, Users, Smartphone, 
  MapPin, BarChart3, FileText, Settings, CheckCircle, 
  AlertCircle, Eye, X, Mail, Phone, Calendar, Filter,
  Download, UserPlus, Edit, Trash2, MoreVertical, ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminEmployeesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  
  // Filter states
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock employees data with enhanced details
  const [employees] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering', 
      role: 'Senior Developer',
      status: 'Active',
      devices: 2,
      compliant: true,
      joinDate: 'Jan 15, 2023',
      lastActive: '5 minutes ago',
      avatar: 'JD'
    },
    { 
      id: 2, 
      name: 'Sarah Smith', 
      email: 'sarah.smith@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Engineering', 
      role: 'Tech Lead',
      status: 'Active',
      devices: 2,
      compliant: true,
      joinDate: 'Mar 10, 2022',
      lastActive: '1 hour ago',
      avatar: 'SS'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike.j@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Sales', 
      role: 'Sales Manager',
      status: 'Active',
      devices: 1,
      compliant: false,
      joinDate: 'Jul 22, 2023',
      lastActive: '2 hours ago',
      avatar: 'MJ'
    },
    { 
      id: 4, 
      name: 'Emily Chen', 
      email: 'emily.chen@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Marketing', 
      role: 'Marketing Director',
      status: 'Active',
      devices: 1,
      compliant: true,
      joinDate: 'Feb 05, 2023',
      lastActive: '30 minutes ago',
      avatar: 'EC'
    },
    { 
      id: 5, 
      name: 'David Wilson', 
      email: 'david.w@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Finance', 
      role: 'Financial Analyst',
      status: 'Active',
      devices: 1,
      compliant: false,
      joinDate: 'Sep 18, 2022',
      lastActive: '1 day ago',
      avatar: 'DW'
    },
    { 
      id: 6, 
      name: 'Lisa Martinez', 
      email: 'lisa.m@company.com',
      phone: '+1 (555) 678-9012',
      department: 'HR', 
      role: 'HR Manager',
      status: 'Inactive',
      devices: 1,
      compliant: true,
      joinDate: 'Nov 30, 2021',
      lastActive: '3 days ago',
      avatar: 'LM'
    },
    { 
      id: 7, 
      name: 'Robert Taylor', 
      email: 'robert.t@company.com',
      phone: '+1 (555) 789-0123',
      department: 'Operations', 
      role: 'Operations Lead',
      status: 'Active',
      devices: 1,
      compliant: true,
      joinDate: 'Apr 12, 2023',
      lastActive: '15 minutes ago',
      avatar: 'RT'
    },
    { 
      id: 8, 
      name: 'Jennifer Lee', 
      email: 'jennifer.l@company.com',
      phone: '+1 (555) 890-1234',
      department: 'Design', 
      role: 'UX Designer',
      status: 'Inactive',
      devices: 1,
      compliant: false,
      joinDate: 'Aug 25, 2023',
      lastActive: '1 week ago',
      avatar: 'JL'
    }
  ]);

  // Statistics
  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'Active').length,
    inactive: employees.filter(e => e.status === 'Inactive').length,
    nonCompliant: employees.filter(e => !e.compliant).length
  };

  // Filtering logic
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map(e => e.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (empId) => {
    if (selectedEmployees.includes(empId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== empId));
    } else {
      setSelectedEmployees([...selectedEmployees, empId]);
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const getAvatarColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-teal-500 to-teal-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Admin Navbar - Enhanced */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BYOD Admin Portal</h1>
                <p className="text-xs text-gray-500">Employee Management</p>
              </div>
            </div>

            {/* Search Bar - Enhanced */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees, departments, or emails..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                  AU
                </div>
                <button
                  onClick={() => handleNavigation('/admin/login')}
                  className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition"
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
        {/* Sidebar - Enhanced */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16 shadow-sm">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => handleNavigation('/admin')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="flex-1 text-left">Dashboard</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/admin/employees')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-xl font-medium shadow-sm"
            >
              <Users className="w-5 h-5" />
              <span className="flex-1 text-left">Employees</span>
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">{employees.length}</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/admin/devices')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition group"
            >
              <Smartphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="flex-1 text-left">All Devices</span>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">12</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/admin/geolocation')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition group"
            >
              <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="flex-1 text-left">Geolocation</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                LIVE
              </span>
            </button>
            
            <button
              onClick={() => handleNavigation('/admin/compliance')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition group"
            >
              <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="flex-1 text-left">Compliance</span>
              {stats.nonCompliant > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">{stats.nonCompliant}</span>
              )}
            </button>
            
            <button
              onClick={() => handleNavigation('/admin/policies')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition group"
            >
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="flex-1 text-left">Policies</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/admin/reports')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition group"
            >
              <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="flex-1 text-left">Reports</span>
            </button>
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => handleNavigation('/admin/settings')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition group"
              >
                <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="flex-1 text-left">Settings</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content - Enhanced */}
        <main className="flex-1 p-6 space-y-6">
          {/* Page Header - Enhanced */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Employee Management</h2>
              <p className="text-gray-600 flex items-center gap-2">
                Monitor and manage all BYOD enrolled employees
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  {filteredEmployees.length} Results
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl transition shadow-sm ${
                  showFilters 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm">
                <Download className="w-5 h-5" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition shadow-lg">
                <UserPlus className="w-5 h-5" />
                Add Employee
              </button>
            </div>
          </div>

          {/* Statistics Cards - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </div>
              <p className="text-sm opacity-90 mb-1">Total Employees</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </div>
              <p className="text-sm opacity-90 mb-1">Active</p>
              <p className="text-3xl font-bold">{stats.active}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-500 to-gray-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </div>
              <p className="text-sm opacity-90 mb-1">Inactive</p>
              <p className="text-3xl font-bold">{stats.inactive}</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </div>
              <p className="text-sm opacity-90 mb-1">Non-Compliant</p>
              <p className="text-3xl font-bold">{stats.nonCompliant}</p>
            </div>
          </div>

          {/* Search and Filters - Enhanced */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or department..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              {selectedEmployees.length > 0 && (
                <div className="flex gap-2">
                  <button className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
                    Export Selected ({selectedEmployees.length})
                  </button>
                  <button 
                    onClick={() => setSelectedEmployees([])}
                    className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Filters Panel - Enhanced */}
            {showFilters && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="all">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Operations">Operations</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active Only</option>
                    <option value="Inactive">Inactive Only</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Employees Grid - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((employee, index) => (
              <div 
                key={employee.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                {/* Header with Checkbox */}
                <div className="flex items-start justify-between mb-4">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleSelectEmployee(employee.id)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Avatar and Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getAvatarColor(index)} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {employee.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{employee.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{employee.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        employee.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {employee.status}
                      </span>
                      {!employee.compliant && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          Non-Compliant
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Smartphone className="w-4 h-4" />
                    <span>{employee.devices} Device{employee.devices > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Department Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-sm font-medium">
                    {employee.department}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewEmployee(employee)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-medium flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-900 mb-2">No employees found</p>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>

      {/* Employee Details Modal - Enhanced */}
      {showEmployeeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${getAvatarColor(employees.indexOf(selectedEmployee))} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                    {selectedEmployee.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                    <p className="text-gray-600">{selectedEmployee.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedEmployee.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedEmployee.status}
                      </span>
                      {selectedEmployee.compliant ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Compliant
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Non-Compliant
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowEmployeeModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <p className="text-gray-900 font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-medium">Phone</span>
                      </div>
                      <p className="text-gray-900 font-medium">{selectedEmployee.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Employment Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Department</p>
                      <p className="font-semibold text-gray-900">{selectedEmployee.department}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Role</p>
                      <p className="font-semibold text-gray-900">{selectedEmployee.role}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Join Date</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedEmployee.joinDate}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Last Active</p>
                      <p className="font-semibold text-gray-900">{selectedEmployee.lastActive}</p>
                    </div>
                  </div>
                </div>

                {/* Device Summary */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Device Summary</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Registered Devices</p>
                        <p className="text-3xl font-bold text-gray-900">{selectedEmployee.devices}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedEmployee.compliant ? '✓ All devices compliant' : '⚠ Compliance issues detected'}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-xl shadow-sm">
                        <Smartphone className="w-10 h-10 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance Status */}
                {!selectedEmployee.compliant && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-900 mb-2">Compliance Issues</h4>
                        <ul className="space-y-1 text-sm text-red-800">
                          <li>• Device screen lock not enabled</li>
                          <li>• Operating system update required</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => handleNavigation('/admin/devices')}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-medium flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Smartphone className="w-5 h-5" />
                    View Devices
                  </button>
                  <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2">
                    <Edit className="w-5 h-5" />
                    Edit Profile
                  </button>
                  <button className="px-6 py-3 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition font-medium flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
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