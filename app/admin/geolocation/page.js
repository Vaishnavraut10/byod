'use client';
import { useState, useEffect, useRef } from 'react';

export default function GeolocationPage() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [complianceFilter, setComplianceFilter] = useState('all');
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const [devices] = useState([
    {
      id: 1,
      name: 'iPhone 14 Pro',
      employee: 'John Doe',
      type: 'Mobile',
      os: 'iOS 17.2',
      status: 'online',
      compliant: true,
      battery: 85,
      location: 'New York, NY',
      coordinates: [40.7128, -74.0060],
      lastSync: '2 mins ago',
      speed: 0
    },
    {
      id: 2,
      name: 'MacBook Pro',
      employee: 'Sarah Smith',
      type: 'Laptop',
      os: 'macOS 14.2',
      status: 'online',
      compliant: true,
      battery: 92,
      location: 'San Francisco, CA',
      coordinates: [37.7749, -122.4194],
      lastSync: '5 mins ago',
      speed: 0
    },
    {
      id: 3,
      name: 'Samsung Galaxy S23',
      employee: 'Mike Johnson',
      type: 'Mobile',
      os: 'Android 14',
      status: 'offline',
      compliant: false,
      battery: 45,
      location: 'Chicago, IL',
      coordinates: [41.8781, -87.6298],
      lastSync: '2 hours ago',
      speed: 0
    },
    {
      id: 4,
      name: 'iPad Pro',
      employee: 'Emily Chen',
      type: 'Tablet',
      os: 'iPadOS 17.2',
      status: 'online',
      compliant: true,
      battery: 78,
      location: 'Los Angeles, CA',
      coordinates: [34.0522, -118.2437],
      lastSync: '1 min ago',
      speed: 25
    },
    {
      id: 5,
      name: 'Dell XPS 15',
      employee: 'David Wilson',
      type: 'Laptop',
      os: 'Windows 11',
      status: 'online',
      compliant: false,
      battery: 65,
      location: 'Austin, TX',
      coordinates: [30.2672, -97.7431],
      lastSync: '10 mins ago',
      speed: 0
    },
    {
      id: 6,
      name: 'iPhone 13',
      employee: 'Lisa Martinez',
      type: 'Mobile',
      os: 'iOS 17.1',
      status: 'offline',
      compliant: true,
      battery: 30,
      location: 'Boston, MA',
      coordinates: [42.3601, -71.0589],
      lastSync: '1 hour ago',
      speed: 0
    },
    {
      id: 7,
      name: 'MacBook Air',
      employee: 'Robert Taylor',
      type: 'Laptop',
      os: 'macOS 14.1',
      status: 'online',
      compliant: true,
      battery: 88,
      location: 'Seattle, WA',
      coordinates: [47.6062, -122.3321],
      lastSync: '3 mins ago',
      speed: 0
    },
    {
      id: 8,
      name: 'Samsung Tab S9',
      employee: 'Jennifer Lee',
      type: 'Tablet',
      os: 'Android 14',
      status: 'online',
      compliant: false,
      battery: 55,
      location: 'Miami, FL',
      coordinates: [25.7617, -80.1918],
      lastSync: '7 mins ago',
      speed: 15
    }
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;
    updateMarkers();
  }, [leafletLoaded]);

  useEffect(() => {
    if (mapInstanceRef.current && leafletLoaded) {
      updateMarkers();
    }
  }, [statusFilter, complianceFilter]);

  const updateMarkers = () => {
    if (!mapInstanceRef.current || !window.L) return;

    const L = window.L;
    const map = mapInstanceRef.current;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const filtered = devices.filter(device => {
      if (statusFilter !== 'all' && device.status !== statusFilter) return false;
      if (complianceFilter === 'compliant' && !device.compliant) return false;
      if (complianceFilter === 'non-compliant' && device.compliant) return false;
      return true;
    });

    filtered.forEach(device => {
      const color = device.status === 'offline' ? '#9CA3AF' :
                    device.compliant ? '#10B981' : '#EF4444';
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="width: 40px; height: 40px; background: ${color}; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; animation: ${device.status === 'online' ? 'pulse 2s infinite' : 'none'};"><span style="font-size: 20px;">📍</span></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      const marker = L.marker(device.coordinates, { icon })
        .addTo(map)
        .bindPopup(`<div style="font-family: system-ui; min-width: 200px;"><h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${device.name}</h3><p style="margin: 4px 0; font-size: 14px; color: #6B7280;">👤 ${device.employee}</p><p style="margin: 4px 0; font-size: 14px; color: #6B7280;">📍 ${device.location}</p><p style="margin: 4px 0; font-size: 14px; color: #6B7280;">🔋 ${device.battery}%</p>${device.speed > 0 ? `<p style="margin: 4px 0; font-size: 14px; color: #6B7280;">🚗 ${device.speed} mph</p>` : ''}<div style="margin-top: 8px; padding: 4px 8px; background: ${device.compliant ? '#D1FAE5' : '#FEE2E2'}; color: ${device.compliant ? '#065F46' : '#991B1B'}; border-radius: 4px; font-size: 12px; text-align: center;">${device.compliant ? '✓ Compliant' : '⚠ Non-Compliant'}</div></div>`);

      marker.on('click', () => {
        setSelectedDevice(device);
        setShowDetailModal(true);
      });

      markersRef.current.push(marker);
    });

    if (filtered.length > 0) {
      const bounds = L.latLngBounds(filtered.map(d => d.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const centerMap = () => {
    if (mapInstanceRef.current && window.L) {
      const filtered = devices.filter(device => {
        if (statusFilter !== 'all' && device.status !== statusFilter) return false;
        if (complianceFilter === 'compliant' && !device.compliant) return false;
        if (complianceFilter === 'non-compliant' && device.compliant) return false;
        return true;
      });
      
      if (filtered.length > 0) {
        const bounds = window.L.latLngBounds(filtered.map(d => d.coordinates));
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  };

  const locateOnMap = (device) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(device.coordinates, 13, { duration: 1.5 });
      setShowDetailModal(false);
    }
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    inMotion: devices.filter(d => d.speed > 0).length,
    compliant: devices.filter(d => d.compliant).length
  };

  const filteredDevices = devices.filter(device => {
    if (statusFilter !== 'all' && device.status !== statusFilter) return false;
    if (complianceFilter === 'compliant' && !device.compliant) return false;
    if (complianceFilter === 'non-compliant' && device.compliant) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BYOD Admin Portal</h1>
                <p className="text-sm text-gray-500">Geolocation Tracking</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-xl relative">
                <span className="text-2xl">🔔</span>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
          <nav className="space-y-2">
            {[
              { icon: '📊', label: 'Dashboard', path: '/admin' },
              { icon: '👥', label: 'Employees', path: '/admin/employees' },
              { icon: '📱', label: 'All Devices', path: '/admin/devices' },
              { icon: '🗺️', label: 'Geolocation', path: '/admin/geolocation', active: true },
              { icon: '🛡️', label: 'Compliance', path: '/admin/compliance' },
              { icon: '📋', label: 'Policies', path: '/admin/policies' },
              { icon: '📈', label: 'Reports', path: '/admin/reports' },
              { icon: '⚙️', label: 'Settings', path: '/admin/settings' }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <button onClick={() => handleNavigation('/admin/login')} className="w-full mt-8 flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100">
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </aside>

        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-200">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-xl"><span className="text-2xl">📱</span></div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-500">Total Devices</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-xl"><span className="text-2xl">🟢</span></div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.online}</p>
                  <p className="text-sm text-gray-500">Online Now</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-xl"><span className="text-2xl">🚗</span></div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{stats.inMotion}</p>
                  <p className="text-sm text-gray-500">In Motion</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-xl"><span className="text-2xl">✅</span></div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.compliant}</p>
                  <p className="text-sm text-gray-500">Compliant</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-xl">
                  <option value="all">All Devices</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
                <select value={complianceFilter} onChange={(e) => setComplianceFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-xl">
                  <option value="all">All Compliance</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                </select>
                <button onClick={() => { setStatusFilter('all'); setComplianceFilter('all'); }} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl">Clear</button>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm">Auto-refresh</span>
                </label>
                <span className="text-sm text-gray-500">Last: {lastUpdate.toLocaleTimeString()}</span>
                <button onClick={centerMap} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">🎯 Center</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 relative">
              <div ref={mapRef} className="w-full h-[600px]" style={{ background: '#E5E7EB' }}>
                {!leafletLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg">
                <h4 className="font-semibold text-sm mb-2">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Online & Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Non-Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-xs">Offline</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-lg">Devices ({filteredDevices.length})</h3>
              </div>
              <div className="overflow-y-auto h-[560px]">
                {filteredDevices.map((device) => (
                  <div key={device.id} onClick={() => { setSelectedDevice(device); locateOnMap(device); }} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{device.name}</h4>
                        <p className="text-sm text-gray-500">👤 {device.employee}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">📍 {device.location}</p>
                      <p className="text-xs text-gray-600">🔋 {device.battery}%</p>
                      <p className="text-xs text-gray-600">⏱️ {device.lastSync}</p>
                      {device.speed > 0 && <p className="text-xs text-purple-600 font-medium">🚗 {device.speed} mph</p>}
                    </div>
                    {!device.compliant && <div className="mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg">⚠️ Non-compliant</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showDetailModal && selectedDevice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedDevice.name}</h2>
                  <p className="text-blue-100">Device Details</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="text-white hover:bg-white/20 p-2 rounded-xl">
                  <span className="text-2xl">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">👤 Owner</h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-900 font-medium">{selectedDevice.employee}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">📱 Device Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{selectedDevice.type}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">OS</p>
                    <p className="font-medium">{selectedDevice.os}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Battery</p>
                    <p className="font-medium">{selectedDevice.battery}%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${selectedDevice.status === 'online' ? 'text-green-600' : 'text-gray-600'}`}>
                      {selectedDevice.status === 'online' ? '🟢 Online' : '⚫ Offline'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">📍 Location</h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-medium mb-2">{selectedDevice.location}</p>
                  <p className="text-sm text-gray-600">Coordinates: {selectedDevice.coordinates[0].toFixed(4)}, {selectedDevice.coordinates[1].toFixed(4)}</p>
                  <p className="text-sm text-gray-600">Last sync: {selectedDevice.lastSync}</p>
                  {selectedDevice.speed > 0 && <p className="text-sm text-purple-600 font-medium mt-2">🚗 Moving at {selectedDevice.speed} mph</p>}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">🛡️ Compliance</h3>
                <div className={`p-4 rounded-xl ${selectedDevice.compliant ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className={`font-medium ${selectedDevice.compliant ? 'text-green-700' : 'text-red-700'}`}>
                    {selectedDevice.compliant ? '✓ Compliant' : '⚠️ Non-compliant'}
                  </p>
                  {!selectedDevice.compliant && <p className="text-sm text-red-600 mt-2">Security updates required</p>}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => locateOnMap(selectedDevice)} className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium">
                  🗺️ Locate on Map
                </button>
                <button className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium">
                  🔒 Lock Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}