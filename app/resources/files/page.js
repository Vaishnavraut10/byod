'use client';
import React, { useState } from 'react';
import { 
  ArrowLeft, Download, Eye, Search, Filter,
  FileText, File, FileSpreadsheet, FileImage,
  Folder, Clock, User, HardDrive
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FilesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All Files');

  const folders = [
    { name: 'All Files', count: 24, icon: Folder },
    { name: 'HR Documents', count: 8, icon: Folder },
    { name: 'Policies', count: 6, icon: Folder },
    { name: 'Training', count: 5, icon: Folder },
    { name: 'Sales', count: 3, icon: Folder },
    { name: 'Marketing', count: 2, icon: Folder }
  ];

  const files = [
    {
      id: 1,
      name: 'Employee Handbook 2024',
      type: 'PDF',
      size: '2.4 MB',
      folder: 'HR Documents',
      lastModified: 'Oct 15, 2024',
      modifiedBy: 'HR Team',
      icon: FileText,
      color: 'red'
    },
    {
      id: 2,
      name: 'Security Guidelines',
      type: 'PDF',
      size: '1.8 MB',
      folder: 'Policies',
      lastModified: 'Nov 1, 2024',
      modifiedBy: 'IT Security',
      icon: FileText,
      color: 'red'
    },
    {
      id: 3,
      name: 'BYOD Policy Document',
      type: 'PDF',
      size: '890 KB',
      folder: 'Policies',
      lastModified: 'Sep 20, 2024',
      modifiedBy: 'IT Department',
      icon: FileText,
      color: 'red'
    },
    {
      id: 4,
      name: 'Product Catalog',
      type: 'PDF',
      size: '5.2 MB',
      folder: 'Sales',
      lastModified: 'Oct 28, 2024',
      modifiedBy: 'Sales Team',
      icon: FileText,
      color: 'red'
    },
    {
      id: 5,
      name: 'Q4 2024 Training Schedule',
      type: 'XLSX',
      size: '245 KB',
      folder: 'Training',
      lastModified: 'Oct 1, 2024',
      modifiedBy: 'Training Dept',
      icon: FileSpreadsheet,
      color: 'green'
    },
    {
      id: 6,
      name: 'Benefits Overview 2024',
      type: 'PDF',
      size: '1.2 MB',
      folder: 'HR Documents',
      lastModified: 'Jan 10, 2024',
      modifiedBy: 'HR Team',
      icon: FileText,
      color: 'red'
    },
    {
      id: 7,
      name: 'Remote Work Policy',
      type: 'PDF',
      size: '680 KB',
      folder: 'Policies',
      lastModified: 'Aug 15, 2024',
      modifiedBy: 'HR Team',
      icon: FileText,
      color: 'red'
    },
    {
      id: 8,
      name: 'Onboarding Checklist',
      type: 'DOCX',
      size: '125 KB',
      folder: 'HR Documents',
      lastModified: 'Sep 5, 2024',
      modifiedBy: 'HR Team',
      icon: File,
      color: 'blue'
    },
    {
      id: 9,
      name: 'Company Logo Pack',
      type: 'ZIP',
      size: '8.4 MB',
      folder: 'Marketing',
      lastModified: 'Jul 12, 2024',
      modifiedBy: 'Marketing',
      icon: FileImage,
      color: 'purple'
    },
    {
      id: 10,
      name: 'Sales Playbook 2024',
      type: 'PDF',
      size: '3.1 MB',
      folder: 'Sales',
      lastModified: 'Oct 5, 2024',
      modifiedBy: 'Sales Team',
      icon: FileText,
      color: 'red'
    },
    {
      id: 11,
      name: 'Compliance Training Video',
      type: 'MP4',
      size: '45.2 MB',
      folder: 'Training',
      lastModified: 'Sep 18, 2024',
      modifiedBy: 'Training Dept',
      icon: File,
      color: 'orange'
    },
    {
      id: 12,
      name: 'Expense Report Template',
      type: 'XLSX',
      size: '89 KB',
      folder: 'HR Documents',
      lastModified: 'Aug 22, 2024',
      modifiedBy: 'Finance',
      icon: FileSpreadsheet,
      color: 'green'
    }
  ];

  const colorClasses = {
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'All Files' || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleDownload = (fileName) => {
    alert(`Downloading: ${fileName}`);
  };

  const handlePreview = (fileName) => {
    alert(`Opening preview: ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Resources
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Files & Documents</h1>
          <p className="text-gray-600 text-lg">Access company documents, policies, and resources</p>
        </div>

        {/* Storage Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Storage Usage</h3>
              <p className="text-3xl font-bold">24 files • 78.5 MB</p>
            </div>
            <HardDrive className="w-16 h-16 opacity-50" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Folders */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Folders</h2>
              <div className="space-y-2">
                {folders.map((folder) => {
                  const Icon = folder.icon;
                  return (
                    <button
                      key={folder.name}
                      onClick={() => setSelectedFolder(folder.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                        selectedFolder === folder.name
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{folder.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{folder.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content - File List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Files List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedFolder} ({filteredFiles.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredFiles.map((file) => {
                  const Icon = file.icon;
                  return (
                    <div 
                      key={file.id}
                      className="p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        {/* File Icon */}
                        <div className={`p-3 rounded-lg ${colorClasses[file.color]}`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {file.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <File className="w-4 h-4" />
                              {file.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-4 h-4" />
                              {file.size}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {file.lastModified}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {file.modifiedBy}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePreview(file.name)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="Preview"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDownload(file.name)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Download"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredFiles.length === 0 && (
                <div className="p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No files found</h3>
                  <p className="text-gray-600">Try adjusting your search or select a different folder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}