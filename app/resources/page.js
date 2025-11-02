'use client';
import React, { useState } from 'react';
import { 
  Search, Star, Download, ExternalLink, FileText, 
  Folder, Link as LinkIcon, Smartphone, Mail, 
  Calendar, MessageSquare, Database, Settings,
  TrendingUp, Users, ShoppingCart, Award
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResourcesPage() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([1, 3, 7]);

  // Mock Resources Data
  const resources = [
    // Applications
    { 
      id: 1, 
      name: 'Company Email', 
      type: 'Application', 
      description: 'Access your work email and calendar',
      icon: 'Mail',
      link: 'https://mail.company.com',
      category: 'Productivity'
    },
    { 
      id: 2, 
      name: 'CRM System', 
      type: 'Application', 
      description: 'Customer relationship management platform',
      icon: 'Users',
      link: 'https://crm.company.com',
      category: 'Sales'
    },
    { 
      id: 3, 
      name: 'Project Manager', 
      type: 'Application', 
      description: 'Track projects, tasks, and team collaboration',
      icon: 'TrendingUp',
      link: 'https://projects.company.com',
      category: 'Productivity'
    },
    { 
      id: 4, 
      name: 'HR Portal', 
      type: 'Application', 
      description: 'Employee benefits, payroll, and time-off',
      icon: 'Users',
      link: 'https://hr.company.com',
      category: 'HR'
    },
    
    // Documents
    { 
      id: 5, 
      name: 'Employee Handbook', 
      type: 'Document', 
      description: 'Company policies and procedures',
      icon: 'FileText',
      fileSize: '2.4 MB',
      lastUpdated: 'Oct 15, 2024',
      category: 'HR'
    },
    { 
      id: 6, 
      name: 'Security Guidelines', 
      type: 'Document', 
      description: 'BYOD security best practices',
      icon: 'FileText',
      fileSize: '1.8 MB',
      lastUpdated: 'Nov 1, 2024',
      category: 'Security'
    },
    { 
      id: 7, 
      name: 'Product Catalog', 
      type: 'Document', 
      description: 'Latest product specifications and pricing',
      icon: 'ShoppingCart',
      fileSize: '5.2 MB',
      lastUpdated: 'Oct 28, 2024',
      category: 'Sales'
    },
    
    // Web Resources
    { 
      id: 8, 
      name: 'Company Intranet', 
      type: 'Link', 
      description: 'Internal news, announcements, and resources',
      icon: 'LinkIcon',
      link: 'https://intranet.company.com',
      category: 'General'
    },
    { 
      id: 9, 
      name: 'Learning Portal', 
      type: 'Link', 
      description: 'Training courses and certifications',
      icon: 'Award',
      link: 'https://learning.company.com',
      category: 'Training'
    },
    { 
      id: 10, 
      name: 'IT Help Desk', 
      type: 'Link', 
      description: 'Submit tickets and get technical support',
      icon: 'Settings',
      link: 'https://helpdesk.company.com',
      category: 'Support'
    }
  ];

  const getIcon = (iconName) => {
    const icons = {
      Mail: Mail,
      Users: Users,
      TrendingUp: TrendingUp,
      FileText: FileText,
      ShoppingCart: ShoppingCart,
      LinkIcon: LinkIcon,
      Award: Award,
      Settings: Settings
    };
    const IconComponent = icons[iconName] || FileText;
    return <IconComponent className="w-6 h-6" />;
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Application', 'Document', 'Link'];
  const stats = {
    totalResources: resources.length,
    applications: resources.filter(r => r.type === 'Application').length,
    documents: resources.filter(r => r.type === 'Document').length,
    links: resources.filter(r => r.type === 'Link').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600 mt-1">Access company apps, files, and web resources</p>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalResources}</p>
            </div>
            <Folder className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Applications</p>
              <p className="text-2xl font-bold text-purple-600">{stats.applications}</p>
            </div>
            <Smartphone className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Documents</p>
              <p className="text-2xl font-bold text-green-600">{stats.documents}</p>
            </div>
            <FileText className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Web Links</p>
              <p className="text-2xl font-bold text-orange-600">{stats.links}</p>
            </div>
            <LinkIcon className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <div 
            key={resource.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-lg ${
                resource.type === 'Application' ? 'bg-purple-100' :
                resource.type === 'Document' ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {getIcon(resource.icon)}
              </div>
              <button
                onClick={() => toggleFavorite(resource.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Star 
                  className={`w-5 h-5 ${
                    favorites.includes(resource.id) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">{resource.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                resource.type === 'Application' ? 'bg-purple-100 text-purple-700' :
                resource.type === 'Document' ? 'bg-green-100 text-green-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {resource.type}
              </span>

              {resource.type === 'Application' || resource.type === 'Link' ? (
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Open <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Download <Download className="w-4 h-4" />
                </button>
              )}
            </div>

            {resource.fileSize && (
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Size: {resource.fileSize}</span>
                  <span>Updated: {resource.lastUpdated}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Quick Links Section */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/resources/apps')}
            className="bg-white p-4 rounded-lg hover:shadow-md transition text-left"
          >
            <Smartphone className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Applications</h3>
            <p className="text-sm text-gray-600">View all company apps</p>
          </button>
          <button
            onClick={() => router.push('/resources/files')}
            className="bg-white p-4 rounded-lg hover:shadow-md transition text-left"
          >
            <FileText className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Files</h3>
            <p className="text-sm text-gray-600">Browse documents</p>
          </button>
          <button
            onClick={() => router.push('/resources/links')}
            className="bg-white p-4 rounded-lg hover:shadow-md transition text-left"
          >
            <LinkIcon className="w-8 h-8 text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Web Resources</h3>
            <p className="text-sm text-gray-600">Important links</p>
          </button>
        </div>
      </div>
    </div>
  );
}