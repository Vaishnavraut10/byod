"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Shield, LogOut, Home, Monitor, FileText, Bell,
  CheckCircle, AlertTriangle, Lock, Smartphone
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const dashboardStats = { totalDevices: 2, compliantDevices: 1, issues: 1 };

  const complianceRules = [
    { id: 1, rule: "OS Version", requirement: "Latest stable version", priority: "high", description: "Operating system must be updated to the latest stable release" },
    { id: 2, rule: "Screen Lock", requirement: "Enabled with PIN/Biometric", priority: "high", description: "Device must have screen lock enabled with at least 6-digit PIN or biometric" },
    { id: 3, rule: "Encryption", requirement: "Full disk encryption", priority: "high", description: "Full device encryption must be enabled for data protection" },
    { id: 4, rule: "Antivirus", requirement: "Active and updated", priority: "medium", description: "Antivirus software must be installed and regularly updated" },
    { id: 5, rule: "Firewall", requirement: "Enabled", priority: "medium", description: "System firewall must be turned on and properly configured" }
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem("byod_user");
      const logged = localStorage.getItem("byod_logged");
      if (!raw || logged !== "true") {
        router.push("/login");
        return;
      }
      setUser(JSON.parse(raw));
    } catch (err) {
      router.push("/login");
    }
  }, [router]);

  // update currentPage based on pathname so active sidebar matches route
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/devices")) setCurrentPage("devices");
    else if (pathname.startsWith("/resources")) setCurrentPage("resources");
    else if (pathname.startsWith("/notifications")) setCurrentPage("notifications");
    else setCurrentPage("dashboard");
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("byod_user");
    localStorage.removeItem("byod_logged");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">BYOD Portal</h1>
              <p className="text-xs text-gray-500">Device Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">1</span>
            </div>

            <div className="flex items-center space-x-3 border-l pl-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.department}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0)}
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Logout">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
          <nav className="space-y-2">
            <button
              onClick={() => router.push("/dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'dashboard' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => router.push("/devices")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'devices' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Monitor className="w-5 h-5" />
              <span>My Devices</span>
            </button>

            <button
              onClick={() => router.push("/resources")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'resources' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <FileText className="w-5 h-5" />
              <span>Resources</span>
            </button>

            <button
              onClick={() => router.push("/notifications")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'notifications' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
            </button>
          </nav>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-semibold text-blue-900 mb-1">Need Help?</p>
            <p className="text-xs text-blue-700">Contact IT Support</p>
            <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">Get Support →</button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-900">Action Required</h3>
                <p className="text-sm text-yellow-800 mt-1">1 device is non-compliant. Please update your device to maintain access to company resources.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h2>
            <p className="text-gray-600 mt-2">Manage your registered devices and access company resources securely</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Devices</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{dashboardStats.totalDevices}</p>
                  <p className="text-sm text-gray-500 mt-1">Registered devices</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-full"><Monitor className="w-8 h-8 text-blue-600" /></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Compliant</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">{dashboardStats.compliantDevices}</p>
                  <p className="text-sm text-gray-500 mt-1">Meeting requirements</p>
                </div>
                <div className="p-4 bg-green-100 rounded-full"><CheckCircle className="w-8 h-8 text-green-600" /></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Issues Found</p>
                  <p className="text-4xl font-bold text-red-600 mt-2">{dashboardStats.issues}</p>
                  <p className="text-sm text-gray-500 mt-1">Needs attention</p>
                </div>
                <div className="p-4 bg-red-100 rounded-full"><AlertTriangle className="w-8 h-8 text-red-600" /></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Compliance Requirements</h3>
                <p className="text-sm text-gray-600 mt-1">Your devices must meet these security standards</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>

            <div className="space-y-4">
              {complianceRules.map(rule => (
                <div key={rule.id} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <Lock className="w-5 h-5 text-gray-600 mt-1 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{rule.rule}</h4>
                        <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                        <p className="text-xs text-blue-600 font-medium mt-2">Required: {rule.requirement}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-4 flex-shrink-0 ${rule.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {rule.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
              <Smartphone className="w-10 h-10 mb-4" />
              <h4 className="text-xl font-bold mb-2">Enroll New Device</h4>
              <p className="text-blue-100 mb-4">Add a new device to access company resources</p>
              <button onClick={() => router.push("/devices")} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">Get Started →</button>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-md p-6 text-white">
              <FileText className="w-10 h-10 mb-4" />
              <h4 className="text-xl font-bold mb-2">Access Resources</h4>
              <p className="text-green-100 mb-4">View and access approved company applications</p>
              <button onClick={() => router.push("/resources")} className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition">Browse Resources →</button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">✅ <strong>Login → Dashboard Connection Complete!</strong></p>
            <p className="text-sm text-blue-700 mt-2">• Click "My Devices" in sidebar to see Step 3<br/>• Click logout button (top right) to return to login<br/>• Quick action buttons navigate to respective pages</p>
          </div>
        </main>
      </div>
    </div>
  );
}