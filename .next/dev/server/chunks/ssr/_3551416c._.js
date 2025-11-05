module.exports = [
"[project]/app/admin/geolocation/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeolocationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function GeolocationPage() {
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [selectedDevice, setSelectedDevice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showDetailModal, setShowDetailModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoRefresh, setAutoRefresh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [lastUpdate, setLastUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [complianceFilter, setComplianceFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [leafletLoaded, setLeafletLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [devices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
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
            coordinates: [
                40.7128,
                -74.006
            ],
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
            coordinates: [
                37.7749,
                -122.4194
            ],
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
            coordinates: [
                41.8781,
                -87.6298
            ],
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
            coordinates: [
                34.0522,
                -118.2437
            ],
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
            coordinates: [
                30.2672,
                -97.7431
            ],
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
            coordinates: [
                42.3601,
                -71.0589
            ],
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
            coordinates: [
                47.6062,
                -122.3321
            ],
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
            coordinates: [
                25.7617,
                -80.1918
            ],
            lastSync: '7 mins ago',
            speed: 15
        }
    ]);
    // Load Leaflet dynamically (client-only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const link = undefined;
        const script = undefined;
    }, []);
    // Initialize Map
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;
        const L = window.L;
        const map = L.map(mapRef.current).setView([
            39.8283,
            -98.5795
        ], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        mapInstanceRef.current = map;
        updateMarkers();
    }, [
        leafletLoaded
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mapInstanceRef.current && leafletLoaded) {
            updateMarkers();
        }
    }, [
        statusFilter,
        complianceFilter
    ]);
    const updateMarkers = ()=>{
        if (!mapInstanceRef.current || !window.L) return;
        const L = window.L;
        const map = mapInstanceRef.current;
        markersRef.current.forEach((marker)=>marker.remove());
        markersRef.current = [];
        const filtered = devices.filter((device)=>{
            if (statusFilter !== 'all' && device.status !== statusFilter) return false;
            if (complianceFilter === 'compliant' && !device.compliant) return false;
            if (complianceFilter === 'non-compliant' && device.compliant) return false;
            return true;
        });
        filtered.forEach((device)=>{
            const color = device.status === 'offline' ? '#9CA3AF' : device.compliant ? '#10B981' : '#EF4444';
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `
          <div style="
            width: 40px; height: 40px; 
            background: ${color}; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex; 
            align-items: center; 
            justify-content: center;
            animation: ${device.status === 'online' ? 'pulse 2s infinite' : 'none'};
          ">
            <span style="font-size: 20px;">📍</span>
          </div>`,
                iconSize: [
                    40,
                    40
                ],
                iconAnchor: [
                    20,
                    40
                ]
            });
            const popupHtml = `
        <div style="font-family: system-ui; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${device.name}</h3>
          <p style="margin: 4px 0; color: #6B7280;">👤 ${device.employee}</p>
          <p style="margin: 4px 0; color: #6B7280;">📍 ${device.location}</p>
          <p style="margin: 4px 0; color: #6B7280;">🔋 ${device.battery}%</p>
          ${device.speed > 0 ? `<p style="margin: 4px 0; color: #6B7280;">🚗 ${device.speed} mph</p>` : ''}
          <div style="margin-top: 8px; padding: 4px 8px; background: ${device.compliant ? '#D1FAE5' : '#FEE2E2'}; color: ${device.compliant ? '#065F46' : '#991B1B'}; border-radius: 4px; font-size: 12px; text-align: center;">
            ${device.compliant ? '✓ Compliant' : '⚠ Non-Compliant'}
          </div>
        </div>
      `;
            const marker = L.marker(device.coordinates, {
                icon
            }).addTo(map).bindPopup(popupHtml);
            marker.on('click', ()=>{
                setSelectedDevice(device);
                setShowDetailModal(true);
            });
            markersRef.current.push(marker);
        });
        if (filtered.length > 0) {
            const bounds = L.latLngBounds(filtered.map((d)=>d.coordinates));
            map.fitBounds(bounds, {
                padding: [
                    50,
                    50
                ]
            });
        }
    };
    // Center and refresh controls
    const centerMap = ()=>{
        if (mapInstanceRef.current && window.L) {
            const filtered = devices.filter((device)=>{
                if (statusFilter !== 'all' && device.status !== statusFilter) return false;
                if (complianceFilter === 'compliant' && !device.compliant) return false;
                if (complianceFilter === 'non-compliant' && device.compliant) return false;
                return true;
            });
            if (filtered.length > 0) {
                const bounds = window.L.latLngBounds(filtered.map((d)=>d.coordinates));
                mapInstanceRef.current.fitBounds(bounds, {
                    padding: [
                        50,
                        50
                    ]
                });
            }
        }
    };
    const locateOnMap = (device)=>{
        if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(device.coordinates, 13, {
                duration: 1.5
            });
            setShowDetailModal(false);
        }
    };
    // Auto-refresh clock
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (autoRefresh) {
            const interval = setInterval(()=>{
                setLastUpdate(new Date());
            }, 10000);
            return ()=>clearInterval(interval);
        }
    }, [
        autoRefresh
    ]);
    const stats = {
        total: devices.length,
        online: devices.filter((d)=>d.status === 'online').length,
        inMotion: devices.filter((d)=>d.speed > 0).length,
        compliant: devices.filter((d)=>d.compliant).length
    };
    const filteredDevices = devices.filter((device)=>{
        if (statusFilter !== 'all' && device.status !== statusFilter) return false;
        if (complianceFilter === 'compliant' && !device.compliant) return false;
        if (complianceFilter === 'non-compliant' && device.compliant) return false;
        return true;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/geolocation/page.js",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-white shadow-sm border-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-blue-600",
                        children: "🗺️ Geolocation Tracking"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/geolocation/page.js",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "Monitor devices in real-time across locations"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/geolocation/page.js",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/geolocation/page.js",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 grid grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 bg-white rounded-2xl shadow-sm border p-4 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: mapRef,
                                className: "w-full h-[600px]"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/geolocation/page.js",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            !leafletLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center bg-gray-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/geolocation/page.js",
                                            lineNumber: 200,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Loading map..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/geolocation/page.js",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/geolocation/page.js",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/geolocation/page.js",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/geolocation/page.js",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-sm border overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: [
                                        "Devices (",
                                        filteredDevices.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/geolocation/page.js",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/geolocation/page.js",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-y-auto h-[560px]",
                                children: filteredDevices.map((device)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>locateOnMap(device),
                                        className: "p-4 border-b hover:bg-gray-50 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-semibold",
                                                                children: device.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/geolocation/page.js",
                                                                lineNumber: 220,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-500",
                                                                children: [
                                                                    "👤 ",
                                                                    device.employee
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/geolocation/page.js",
                                                                lineNumber: 221,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/geolocation/page.js",
                                                        lineNumber: 219,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/geolocation/page.js",
                                                        lineNumber: 223,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/geolocation/page.js",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: [
                                                    "📍 ",
                                                    device.location
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/geolocation/page.js",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: [
                                                    "🔋 ",
                                                    device.battery,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/geolocation/page.js",
                                                lineNumber: 230,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: [
                                                    "⏱️ ",
                                                    device.lastSync
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/geolocation/page.js",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, device.id, true, {
                                        fileName: "[project]/app/admin/geolocation/page.js",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/geolocation/page.js",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/geolocation/page.js",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/geolocation/page.js",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/geolocation/page.js",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_3551416c._.js.map