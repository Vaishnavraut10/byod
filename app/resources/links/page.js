'use client';
import React, { useState } from 'react';
import { 
  ArrowLeft, ExternalLink, Star, Globe,
  Award, BookOpen, HelpCircle, Briefcase,
  Newspaper, MessageCircle, Shield, Link as LinkIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WebLinksPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([1, 4, 7]);

  const links = [
    {
      id: 1,
      name: 'Company Intranet',
      description: 'Internal news, announcements, company updates, and employee directory',
      url: 'https://intranet.company.com',
      category: 'General',
      icon: Globe,
      color: 'blue',
      popular: true
    },
    {
      id: 2,
      name: 'Learning Portal',
      description: 'Online training courses, certifications, and professional development',
      url: 'https://learning.company.com',
      category: 'Training',
      icon: Award,
      color: 'purple',
      popular: true
    },
    {
      id: 3,
      name: 'IT Help Desk',
      description: 'Submit support tickets, track issues, and access IT resources',
      url: 'https://helpdesk.company.com',
      category: 'Support',
      icon: HelpCircle,
      color: 'red',
      popular: false
    },
    {
      id: 4,
      name: 'Knowledge Base',
      description: 'Documentation, FAQs, how-to guides, and best practices',
      url: 'https://kb.company.com',
      category: 'Documentation',
      icon: BookOpen,
      color: 'green',
      popular: true
    },
    {
      id: 5,
      name: 'Career Portal',
      description: 'Internal job postings, career paths, and professional development',
      url: 'https://careers.company.com',
      category: 'HR',
      icon: Briefcase,
      color: 'orange',
      popular: false
    },
    {
      id: 6,
      name: 'Company News',
      description: 'Latest company news, press releases, and media coverage',
      url: 'https://news.company.com',
      category: 'General',
      icon: Newspaper,
      color: 'indigo',
      popular: false
    },
    {
      id: 7,
      name: 'Employee Forum',
      description: 'Discussion boards, Q&A, and employee community',
      url: 'https://forum.company.com',
      category: 'Communication',
      icon: MessageCircle,
      color: 'teal',
      popular: true
    },
    {
      id: 8,
      name: 'Security Portal',
      description: 'Security policies, incident reporting, and compliance resources',
      url: 'https://security.company.com',
      category: 'Security',
      icon: Shield,
      color: 'red',
      popular: false
    },
    {
      id: 9,
      name: 'Benefits Hub',
      description: 'Health insurance, retirement plans, and employee benefits information',
      url: 'https://benefits.company.com',
      category: 'HR',
      icon: Award,
      color: 'pink',
      popular: true
    },
    {
      id: 10,
      name: 'Company Wiki',
      description: 'Internal knowledge sharing, processes, and documentation',
      url: 'https://wiki.company.com',
      category: 'Documentation',
      icon: BookOpen,
      color: 'yellow',
      popular: false
    },
    {
      id: 11,
      name: 'Time Tracking',
      description: 'Log hours, submit timesheets, and manage project time',
      url: 'https://time.company.com',
      category: 'Productivity',
      icon: Globe,
      color: 'slate',
      popular: false
    },
    {
      id: 12,
      name: 'Vendor Portal',
      description: 'Manage vendor relationships, contracts, and procurement',
      url: 'https://vendors.company.com',
      category: 'Business',
      icon: Briefcase,
      color: 'gray',
      popular: false
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    teal: 'bg-teal-100 text-teal-600',
    pink: 'bg-pink-100 text-pink-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    slate: 'bg-slate-100 text-slate-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  const categories = ['All', 'General', 'Training', 'Support', 'Documentation', 'HR', 'Communication', 'Security', 'Productivity', 'Business'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredLinks = links.filter(link => 
    selectedCategory === 'All' || link.category === selectedCategory
  );

  const favoriteLinks = links.filter(link => favorites.includes(link.id));
  const popularLinks = links.filter(link => link.popular);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Web Resources</h1>
          <p className="text-gray-600 text-lg">Quick access to important company websites and portals</p>
        </div>

        {/* Favorites Section */}
        {favoriteLinks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Favorite Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoriteLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg ${colorClasses[link.color]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(link.id);
                        }}
                        className="text-yellow-500"
                      >
                        <Star className="w-5 h-5 fill-yellow-500" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {link.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{link.description}</p>
                    <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                      Visit <ExternalLink className="w-4 h-4 ml-1" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Popular Links Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularLinks.map((link) => {
              const Icon = link.icon;
              const isFavorite = favorites.includes(link.id);
              return (
                <div
                  key={link.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${colorClasses[link.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(link.id)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <Star 
                        className={`w-4 h-4 ${
                          isFavorite 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{link.name}</h3>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                  >
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
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

        {/* All Links */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedCategory === 'All' ? 'All Links' : selectedCategory} ({filteredLinks.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLinks.map((link) => {
              const Icon = link.icon;
              const isFavorite = favorites.includes(link.id);
              
              return (
                <div
                  key={link.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${colorClasses[link.color]}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{link.name}</h3>
                        <button
                          onClick={() => toggleFavorite(link.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
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
                      <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {link.category}
                        </span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Visit Site <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredLinks.length === 0 && (
          <div className="text-center py-12">
            <LinkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No links found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}