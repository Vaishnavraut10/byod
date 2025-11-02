'use client';
import React, { useState } from 'react';
import { Smartphone, Info, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EnrollDevicePage() {
  const router = useRouter();
  const [newDevice, setNewDevice] = useState({ 
    name: '', 
    type: 'Mobile', 
    os: '', 
    model: '' 
  });
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnrollDevice = (e) => {
    e.preventDefault();
    
    if (newDevice.name && newDevice.os && newDevice.model) {
      setIsEnrolling(true);
      
      // Simulate enrollment process
      setTimeout(() => {
        alert(`Device "${newDevice.name}" enrolled successfully!`);
        router.push('/devices');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Devices
        </button>

        {/* Enrollment Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enroll New Device</h1>
              <p className="text-gray-600">Register your device to access company resources</p>
            </div>
          </div>

          <form onSubmit={handleEnrollDevice} className="space-y-6">
            {/* Device Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newDevice.name}
                onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                placeholder="e.g., My iPhone, Work Laptop"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Device Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={newDevice.type}
                onChange={(e) => setNewDevice({...newDevice, type: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Mobile">Mobile Phone</option>
                <option value="Tablet">Tablet</option>
                <option value="Laptop">Laptop</option>
              </select>
            </div>

            {/* Operating System */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating System <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newDevice.os}
                onChange={(e) => setNewDevice({...newDevice, os: e.target.value})}
                placeholder="e.g., iOS 17, Android 14, Windows 11"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Device Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newDevice.model}
                onChange={(e) => setNewDevice({...newDevice, model: e.target.value})}
                placeholder="e.g., iPhone 15 Pro, Dell XPS 15"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Before enrolling your device:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Enable screen lock with PIN/password</li>
                    <li>Update to the latest OS version</li>
                    <li>Install company security certificate</li>
                    <li>Enable device encryption</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isEnrolling}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-blue-300"
              >
                {isEnrolling ? 'Enrolling...' : 'Enroll Device'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}