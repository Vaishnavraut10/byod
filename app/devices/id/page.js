'use client';
import React from 'react';
import { Smartphone, Monitor, CheckCircle, AlertCircle, Calendar, Clock, HardDrive, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function DeviceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  
  // Mock device data (in real app, fetch by ID)
  const devices = {
    '1': { 
      id: 1, 
      name: 'iPhone 14 Pro', 
      type: 'Mobile', 
      os: 'iOS 17.2', 
      model: 'iPhone 14 Pro', 
      compliant: true, 
      lastSync: '2 hours ago', 
      enrolledDate: 'Jan 15, 2024',
      storage: '128 GB',
      serialNumber: 'FVFXC2K8Q6L2',
      imei: '353456789012345',
      batteryHealth: '95%'
    },
    '2': { 
      id: 2, 
      name: 'MacBook Pro', 
      type: 'Laptop', 
      os: 'macOS 14.1', 
      model: 'MacBook Pro 16"', 
      compliant: true, 
      lastSync: '5 minutes ago', 
      enrolledDate: 'Dec 1, 2023',
      storage: '512 GB SSD',
      serialNumber: 'C02XL7YGJG5H',
      processor: 'Apple M2 Pro',
      ram: '16 GB'
    },
    '3': { 
      id: 3, 
      name: 'Personal Android', 
      type: 'Mobile', 
      os: 'Android 13', 
      model: 'Samsung Galaxy S23', 
      compliant: false, 
      lastSync: '1 day ago', 
      enrolledDate: 'Oct 20, 2023',
      storage: '256 GB',
      serialNumber: 'RF8N20XXXXXX',
      imei: '354678901234567',
      batteryHealth: '88%'
    }
  };

  const device = devices[params.id];

  if (!device) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Not Found</h1>
          <button
            onClick={() => router.push('/devices')}
            className="text-blue-600 hover:underline"
          >
            Back to Devices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Devices
        </button>

        {/* Device Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-blue-100 rounded-xl">
              {device.type === 'Mobile' ? (
                <Smartphone className="w-12 h-12 text-blue-600" />
              ) : (
                <Monitor className="w-12 h-12 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{device.name}</h1>
                {device.compliant ? (
                  <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Compliant
                  </span>
                ) : (
                  <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Non-Compliant
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-lg">{device.model}</p>
              <p className="text-gray-500 mt-1">{device.os}</p>
            </div>
          </div>
        </div>

        {/* Compliance Status */}
        {!device.compliant && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">Compliance Issues Detected</h3>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    Screen lock is not enabled
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    Operating system update required
                  </li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Fix Issues
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Device Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* General Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">General Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Enrolled Date</p>
                  <p className="font-medium text-gray-900">{device.enrolledDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Sync</p>
                  <p className="font-medium text-gray-900">{device.lastSync}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Storage</p>
                  <p className="font-medium text-gray-900">{device.storage}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Serial Number</p>
                <p className="font-medium text-gray-900 font-mono">{device.serialNumber}</p>
              </div>
              {device.imei && (
                <div>
                  <p className="text-sm text-gray-500">IMEI</p>
                  <p className="font-medium text-gray-900 font-mono">{device.imei}</p>
                </div>
              )}
              {device.processor && (
                <div>
                  <p className="text-sm text-gray-500">Processor</p>
                  <p className="font-medium text-gray-900">{device.processor}</p>
                </div>
              )}
              {device.ram && (
                <div>
                  <p className="text-sm text-gray-500">RAM</p>
                  <p className="font-medium text-gray-900">{device.ram}</p>
                </div>
              )}
              {device.batteryHealth && (
                <div>
                  <p className="text-sm text-gray-500">Battery Health</p>
                  <p className="font-medium text-gray-900">{device.batteryHealth}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Device Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sync Now
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Run Compliance Check
            </button>
            <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
              Remove Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}