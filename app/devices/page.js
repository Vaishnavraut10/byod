"use client";
import React, { useState } from 'react';
import { Smartphone, Monitor, CheckCircle, AlertCircle, RefreshCw, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DevicesPage() {
  const router = useRouter();
  
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      name: 'iPhone 14 Pro', 
      type: 'Mobile', 
      os: 'iOS 17.2', 
      model: 'iPhone 14 Pro', 
      compliant: true, 
      lastSync: '2 hours ago', 
      enrolledDate: 'Jan 15, 2024' 
    },
    { 
      id: 2, 
      name: 'MacBook Pro', 
      type: 'Laptop', 
      os: 'macOS 14.1', 
      model: 'MacBook Pro 16"', 
      compliant: true, 
      lastSync: '5 minutes ago', 
      enrolledDate: 'Dec 1, 2023' 
    },
    { 
      id: 3, 
      name: 'Personal Android', 
      type: 'Mobile', 
      os: 'Android 13', 
      model: 'Samsung Galaxy S23', 
      compliant: false, 
      lastSync: '1 day ago', 
      enrolledDate: 'Oct 20, 2023' 
    }
  ]);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleSyncDevice = (deviceId) => {
    setDevices(devices.map(d => 
      d.id === deviceId ? { ...d, lastSync: 'Just now' } : d
    ));
  };

  const handleRemoveDevice = () => {
    setDevices(devices.filter(d => d.id !== selectedDevice.id));
    setShowRemoveModal(false);
    setSelectedDevice(null);
  };

  const handleViewDevice = (deviceId) => {
    router.push(`/devices/${deviceId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Devices</h1>
          <p className="text-gray-600 mt-1">Manage your registered devices and enroll new ones</p>
        </div>
        <button
          onClick={() => router.push('/devices/enroll')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Enroll New Device
        </button>
      </div>

      {/* Device Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{devices.length}</p>
            </div>
            <Smartphone className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Compliant</p>
              <p className="text-2xl font-bold text-green-600">
                {devices.filter(d => d.compliant).length}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Non-Compliant</p>
              <p className="text-2xl font-bold text-red-600">
                {devices.filter(d => !d.compliant).length}
              </p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Registered Devices</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {devices.map((device) => (
            <div key={device.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {device.type === 'Mobile' ? (
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Monitor className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{device.name}</h3>
                      {device.compliant ? (
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
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="text-gray-900 font-medium">{device.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Operating System</p>
                        <p className="text-gray-900 font-medium">{device.os}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Model</p>
                        <p className="text-gray-900 font-medium">{device.model}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Sync</p>
                        <p className="text-gray-900 font-medium">{device.lastSync}</p>
                      </div>
                    </div>
                    {!device.compliant && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div className="text-sm">
                            <p className="text-red-900 font-medium">Compliance Issues:</p>
                            <ul className="text-red-700 mt-1 space-y-1 list-disc list-inside">
                              <li>Screen lock not enabled</li>
                              <li>OS update required</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleViewDevice(device.id)}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleSyncDevice(device.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Sync Device"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDevice(device);
                      setShowRemoveModal(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Remove Device"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remove Device Modal */}
      {showRemoveModal && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Remove Device</h2>
              <button onClick={() => setShowRemoveModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-900">
                    <p className="font-medium mb-1">Warning: This action cannot be undone</p>
                    <p>Removing this device will revoke its access to all company resources immediately.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Device to remove:</p>
                <p className="font-semibold text-gray-900">{selectedDevice.name}</p>
                <p className="text-sm text-gray-600">{selectedDevice.model} • {selectedDevice.os}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowRemoveModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">Cancel</button>
                <button onClick={handleRemoveDevice} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Remove Device</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}