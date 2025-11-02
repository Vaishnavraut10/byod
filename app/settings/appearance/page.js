'use client';
import React, { useState } from 'react';
import { 
  ArrowLeft, Sun, Moon, Monitor, Palette, 
  Type, Layout, CheckCircle, Save
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AppearanceSettingsPage() {
  const router = useRouter();
  
  const [settings, setSettings] = useState({
    theme: 'light',
    accentColor: 'blue',
    fontSize: 'medium',
    layout: 'comfortable',
    compactMode: false,
    animations: true,
    highContrast: false
  });

  const [saveStatus, setSaveStatus] = useState('');

  const themes = [
    { value: 'light', label: 'Light', icon: Sun, desc: 'Bright and clean interface' },
    { value: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
    { value: 'auto', label: 'System', icon: Monitor, desc: 'Match system preference' }
  ];

  const accentColors = [
    { value: 'blue', label: 'Blue', color: 'bg-blue-600' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-600' },
    { value: 'green', label: 'Green', color: 'bg-green-600' },
    { value: 'red', label: 'Red', color: 'bg-red-600' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-600' },
    { value: 'pink', label: 'Pink', color: 'bg-pink-600' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', size: 'text-sm' },
    { value: 'medium', label: 'Medium', size: 'text-base' },
    { value: 'large', label: 'Large', size: 'text-lg' },
    { value: 'xlarge', label: 'Extra Large', size: 'text-xl' }
  ];

  const layouts = [
    { value: 'compact', label: 'Compact', desc: 'More content, less spacing' },
    { value: 'comfortable', label: 'Comfortable', desc: 'Balanced layout (recommended)' },
    { value: 'spacious', label: 'Spacious', desc: 'More breathing room' }
  ];

  const handleThemeChange = (value) => {
    setSettings(prev => ({ ...prev, theme: value }));
  };

  const handleAccentChange = (value) => {
    setSettings(prev => ({ ...prev, accentColor: value }));
  };

  const handleFontSizeChange = (value) => {
    setSettings(prev => ({ ...prev, fontSize: value }));
  };

  const handleLayoutChange = (value) => {
    setSettings(prev => ({ ...prev, layout: value }));
  };

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Settings
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Appearance</h1>
          <p className="text-gray-600 text-lg">Customize the look and feel of your portal</p>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveStatus === 'saved' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-5 h-5 ${saveStatus === 'saved' ? 'text-green-600' : 'text-blue-600'}`} />
              <span className={`font-medium ${saveStatus === 'saved' ? 'text-green-900' : 'text-blue-900'}`}>
                {saveStatus === 'saved' ? 'Appearance settings saved!' : 'Saving changes...'}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Theme Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Theme</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange(theme.value)}
                    className={`p-4 border-2 rounded-lg text-left transition ${
                      settings.theme === theme.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-6 h-6 ${
                        settings.theme === theme.value ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      {settings.theme === theme.value && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900">{theme.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{theme.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Accent Color</h2>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleAccentChange(color.value)}
                  className={`p-4 border-2 rounded-lg text-center transition ${
                    settings.accentColor === color.value
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 ${color.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                    {settings.accentColor === color.value && (
                      <CheckCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{color.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Type className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Font Size</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => handleFontSizeChange(size.value)}
                  className={`p-4 border-2 rounded-lg text-center transition ${
                    settings.fontSize === size.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`${size.size} font-semibold text-gray-900 mb-2`}>Aa</p>
                  <p className="text-sm font-medium text-gray-900">{size.label}</p>
                  {settings.fontSize === size.value && (
                    <CheckCircle className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Layout Density */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Layout className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Layout Density</h2>
            </div>
            
            <div className="space-y-3">
              {layouts.map((layout) => (
                <button
                  key={layout.value}
                  onClick={() => handleLayoutChange(layout.value)}
                  className={`w-full p-4 border-2 rounded-lg text-left transition ${
                    settings.layout === layout.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{layout.label}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{layout.desc}</p>
                    </div>
                    {settings.layout === layout.value && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Options</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Compact Mode</p>
                  <p className="text-sm text-gray-600">Reduce spacing in sidebar and navigation</p>
                </div>
                <ToggleSwitch
                  enabled={settings.compactMode}
                  onChange={() => handleToggle('compactMode')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Animations</p>
                  <p className="text-sm text-gray-600">Enable smooth transitions and effects</p>
                </div>
                <ToggleSwitch
                  enabled={settings.animations}
                  onChange={() => handleToggle('animations')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">High Contrast</p>
                  <p className="text-sm text-gray-600">Increase contrast for better accessibility</p>
                </div>
                <ToggleSwitch
                  enabled={settings.highContrast}
                  onChange={() => handleToggle('highContrast')}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Your Portal Preview</h3>
              <p className="text-blue-100">
                This is how your portal will look with the current settings
              </p>
              <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                Sample Button
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2 disabled:bg-blue-400"
            >
              <Save className="w-5 h-5" />
              {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}