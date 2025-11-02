'use client';
import React, { useState } from 'react';
import { 
  ArrowLeft, ExternalLink, Star, Mail, Users, 
  TrendingUp, MessageSquare, Calendar, Database,
  ShoppingCart, BarChart, FileText, Settings
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ApplicationsPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([1, 3]);

  const applications = [
    { 
      id: 1, 
      name: 'Company Email', 
      description: 'Access your work email, calendar, and contacts',
      icon: Mail,
      link: 'https://mail.company.com',
      category: 'Productivity',
      color: 'blue',
      version: 'v2.4.1',
      lastUsed: '5 minutes ago'
    },
    { 
      id: 2, 
      name: 'CRM System', 
      description: 'Manage customer relationships and sales pipeline',
      icon: Users,
      link: 'https://crm.company.com',
      category: 'Sales',
      color: 'purple',
      version: 'v3.1.0',
      lastUsed: '2 hours ago'
    },
    { 
      id: 3, 
      name: 'Project Manager', 
      description: 'Track projects, assign tasks, and collaborate with teams',
      icon: TrendingUp,
      link: 'https://projects.company.com',
      category: 'Productivity',
      color: 'green',
      version: 'v1.8.5',
      lastUsed: '1 hour ago'
    },
    { 
      id: 4, 
      name: 'HR Portal', 
      description: 'Manage benefits, payroll, time-off, and employee records',
      icon: Users,
      link: 'https://hr.company.com',
      category: 'HR',
      color: 'orange',
      version: 'v2.0.3',
      lastUsed: '1 day ago'
    },
    { 
      id: 5, 
      name: 'Team Chat', 
      description: 'Real-time messaging and file sharing with your team',
      icon: MessageSquare,
      link: 'https://chat.company.com',
      category: 'Communication',
      color: 'indigo',
      version: 'v4.2.0',
      lastUsed: '30 minutes ago'
    },
    { 
      id: 6, 
      name: 'Calendar Pro', 
      description: 'Schedule meetings, manage events, and sync calendars',
      icon: Calendar,
      link: 'https://calendar.company.com',
      category: 'Productivity',
      color: 'red',
      version: 'v1.5.2',
      lastUsed: '3 hours ago'
    },
    { 
      id: 7, 
      name: 'Data Analytics', 
      description: 'Business intelligence and data visualization tools',
      icon: BarChart,
      link: 'https://analytics.company.com',
      category: 'Analytics',
      color: 'teal',
      version: 'v2.3.1',
      lastUsed: '1 week ago'
    },
    { 
      id: 8, 
      name: 'Document Manager', 
      description: 'Store, organize, and share company documents securely',
      icon: FileText,
      link: 'https://docs.company.com',
      category: 'Productivity',
      color: 'yellow',
      version: 'v3.0.0',
      lastUsed: '2 days ago'
    },
    { 
      id: 9, 
      name: 'ERP System', 
      description: 'Enterprise resource planning and business management',
      icon: Database,
      link: 'https://erp.company.com',
      category: 'Business',
      color: 'gray',
      version: 'v5.1.2',
      lastUsed: '1 week ago'
    },
    { 
      id: 10, 
      name: 'E-Commerce Dashboard', 
      description: 'Manage online store, inventory, and order fulfillment',
      icon: ShoppingCart,
      link: 'https://shop.company.com',
      category: 'Sales',
      color: 'pink',
      version: 'v2.7.4',
      lastUsed: '4 hours ago'
    },
    { 
      id: 11, 
      name: 'IT Service Desk', 
      description: 'Submit tickets, track issues, and get technical support',
      icon: Settings,
      link: 'https://helpdesk.company.com',
      category: 'Support',
      color: 'slate',
      version: 'v1.9.0',
      lastUsed: '3 days ago'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    red: 'bg-red-100 text-red-600',
    teal: 'bg-teal-100 text-teal-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    gray: 'bg-gray-100 text-gray-600',
    pink: 'bg-pink-100 text-pink-600',
    slate: 'bg-slate-100 text-slate-600'
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const favoriteApps = applications.filter(app => favorites.includes(app.id));
  const recentApps = applications.slice(0, 4);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Applications</h1>
          <p className="text-gray-600 text-lg">Access all your work applications in one place</p>
        </div>

        {/* Favorites Section */}
        {favoriteApps.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Favorite Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {favoriteApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div 
                    key={app.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg ${colorClasses[app.color]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <button
                        onClick={() => toggleFavorite(app.id)}
                        className="text-yellow-500"
                      >
                        <Star className="w-5 h-5 fill-yellow-500" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{app.name}</h3>
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Open App <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Applications */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const Icon = app.icon;
              const isFavorite = favorites.includes(app.id);
              
              return (
                <div 
                  key={app.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-xl ${colorClasses[app.color]}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(app.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          isFavorite 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{app.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{app.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {app.category}
                    </span>
                    <span>{app.version}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      Last used: {app.lastUsed}
                    </span>
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Open <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}