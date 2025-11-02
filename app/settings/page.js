'use client';
import React from 'react';
import { 
  User, Shield, Lock, Eye, Palette, 
  Globe, Bell, Smartphone, Link as LinkIcon,
  HelpCircle, LogOut, ChevronRight, Settings as SettingsIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          description: 'Manage your personal information and profile photo',
          link: '/settings/profile',
          color: 'blue'
        },
        {
          icon: Lock,
          label: 'Security',
          description: 'Password, two-factor authentication, and sessions',
          link: '/settings/security',
          color: 'red'
        },
        {
          icon: Eye,
          label: 'Privacy',
          description: 'Control your data and privacy preferences',
          link: '/settings/privacy',
          color: 'purple'
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Palette,
          label: 'Appearance',
          description: 'Theme, display settings, and customization',
          link: '/settings/appearance',
          color: 'pink'
        },
        {
          icon: Globe,
          label: 'Language & Region',
          description: 'Language, timezone, and regional preferences',
          link: '/settings/language',
          color: 'green'
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Configure how you receive alerts and updates',
          link: '/notifications/settings',
          color: 'yellow'
        }
      ]
    },
    {
      title: 'Devices & Apps',
      items: [
        {
          icon: Smartphone,
          label: 'Devices',
          description: 'Manage your enrolled devices',
          link: '/devices',
          color: 'indigo'
        },
        {
          icon: LinkIcon,
          label: 'Connected Apps',
          description: 'Apps and services connected to your account',
          link: '/settings/integrations',
          color: 'teal'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Get help, view FAQs, and contact support',
          link: '/support',
          color: 'gray'
        }
      ]
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    teal: 'bg-teal-100 text-teal-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      router.push('/login');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* User Profile Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-blue-100">john.doe@company.com</p>
            <p className="text-blue-100 text-sm mt-1">Product Manager • IT Department</p>
          </div>
          <button
            onClick={() => router.push('/settings/profile')}
            className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIdx) => (
        <div key={sectionIdx}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
            {section.items.map((item, itemIdx) => {
              const Icon = item.icon;
              return (
                <button
                  key={itemIdx}
                  onClick={() => router.push(item.link)}
                  className="w-full p-5 hover:bg-gray-50 transition flex items-center gap-4 text-left"
                >
                  <div className={`p-3 rounded-lg ${colorClasses[item.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Devices Enrolled</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">3</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Account Status</p>
            <p className="text-3xl font-bold text-green-900 mt-1">Active</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Last Login</p>
            <p className="text-3xl font-bold text-purple-900 mt-1">Today</p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h2 className="text-xl font-bold text-red-900 mb-2">Danger Zone</h2>
        <p className="text-gray-600 mb-4">Irreversible and destructive actions</p>
        <div className="space-y-3">
          <button className="w-full p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition text-left">
            <h3 className="font-semibold text-red-900">Deactivate Account</h3>
            <p className="text-sm text-gray-600 mt-1">Temporarily disable your account</p>
          </button>
          <button className="w-full p-4 border-2 border-red-300 rounded-lg hover:bg-red-50 transition text-left">
            <h3 className="font-semibold text-red-900">Delete Account</h3>
            <p className="text-sm text-gray-600 mt-1">Permanently delete your account and all data</p>
          </button>
        </div>
      </div>

      {/* Version Info */}
      <div className="text-center text-sm text-gray-500">
        <p>BYOD Portal v2.4.1 • © 2024 Company Inc.</p>
      </div>
    </div>
  );
}