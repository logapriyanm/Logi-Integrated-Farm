import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Settings = ({ token }) => {
  const [settings, setSettings] = useState({
    general: {
      storeName: '',
      contactEmail: '',
      phoneNumber: '',
      address: '',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      businessHours: ''
    },
    payment: {
      enableCOD: true,
      enableOnlinePayments: true,
      razorpayEnabled: true,
      testMode: true,
      minimumOrderAmount: 100
    },
    shipping: {
      deliveryFee: 50,
      freeDeliveryThreshold: 500,
      enableLocalPickup: true,
      estimatedDeliveryDays: '2-3'
    },
    notifications: {
      newOrder: true,
      lowStock: true,
      failedPayment: true,
      orderShipped: true,
      emailNotifications: true,
      smsNotifications: false
    },
    products: {
      lowStockThreshold: 5,
      enableBackorders: false,
      productsPerPage: 12,
      taxRate: 18
    },
    security: {
      twoFA: false,
      sessionTimeout: 60
    }
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, [token]);

  const fetchSettings = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/admin/settings`, {
        headers: { token }
      });
      
      if (response.data) {
        setSettings(prevSettings => ({
          ...prevSettings,
          ...response.data
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      if (error.response?.status !== 404) {
        toast.error('Failed to load settings');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!token) {
      toast.error('Authentication required');
      return;
    }

    setSaving(true);
    try {
      const response = await axios.post(`${backendUrl}/api/admin/settings`, settings, {
        headers: { token }
      });

      toast.success('Settings saved successfully!');
      console.log('Settings saved:', response.data);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSettingsSection = (section, updates) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings({
        general: {
          storeName: 'FarmFresh Market',
          contactEmail: 'admin@farmfresh.com',
          phoneNumber: '+91 9876543210',
          address: '123 Farm Street, Agricultural Zone',
          currency: 'INR',
          timezone: 'Asia/Kolkata',
          businessHours: '9:00 AM - 8:00 PM'
        },
        payment: {
          enableCOD: true,
          enableOnlinePayments: true,
          razorpayEnabled: true,
          testMode: true,
          minimumOrderAmount: 100
        },
        shipping: {
          deliveryFee: 50,
          freeDeliveryThreshold: 500,
          enableLocalPickup: true,
          estimatedDeliveryDays: '2-3'
        },
        notifications: {
          newOrder: true,
          lowStock: true,
          failedPayment: true,
          orderShipped: true,
          emailNotifications: true,
          smsNotifications: false
        },
        products: {
          lowStockThreshold: 5,
          enableBackorders: false,
          productsPerPage: 12,
          taxRate: 18
        },
        security: {
          twoFA: false,
          sessionTimeout: 60
        }
      });
      toast.info('Settings reset to defaults');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-1 pt-16 md:mt-8 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 sm:mb-8">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-700">Admin Settings</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your store configuration</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Reset Defaults
            </button>
            <button
              onClick={saveSettings}
              disabled={saving}
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
            >
              {saving ? (
                <span className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </span>
              ) : (
                'Save All Settings'
              )}
            </button>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          
          {/* General Settings */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">General Settings</h2>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(settings.general).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs sm:text-sm font-medium mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateSettingsSection('general', { [key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Payment Settings</h2>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(settings.payment).map(([key, value]) => (
                <div key={key}>
                  {typeof value === 'boolean' ? (
                    <div className="flex items-center justify-between py-1">
                      <label className="text-xs sm:text-sm font-medium capitalize cursor-pointer">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateSettingsSection('payment', { [key]: e.target.checked })}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                    </div>
                  ) : (
                    <>
                      <label className="block text-xs sm:text-sm font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateSettingsSection('payment', { [key]: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Shipping Settings</h2>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(settings.shipping).map(([key, value]) => (
                <div key={key}>
                  {typeof value === 'boolean' ? (
                    <div className="flex items-center justify-between py-1">
                      <label className="text-xs sm:text-sm font-medium capitalize cursor-pointer">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateSettingsSection('shipping', { [key]: e.target.checked })}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                    </div>
                  ) : typeof value === 'number' ? (
                    <>
                      <label className="block text-xs sm:text-sm font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()} (₹)
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateSettingsSection('shipping', { [key]: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </>
                  ) : (
                    <>
                      <label className="block text-xs sm:text-sm font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateSettingsSection('shipping', { [key]: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Notifications</h2>
            <div className="space-y-2 sm:space-y-3">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-1">
                  <label className="text-xs sm:text-sm font-medium capitalize cursor-pointer">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateSettingsSection('notifications', { [key]: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Settings */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Product Settings</h2>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(settings.products).map(([key, value]) => (
                <div key={key}>
                  {typeof value === 'boolean' ? (
                    <div className="flex items-center justify-between py-1">
                      <label className="text-xs sm:text-sm font-medium capitalize cursor-pointer">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateSettingsSection('products', { [key]: e.target.checked })}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                    </div>
                  ) : (
                    <>
                      <label className="block text-xs sm:text-sm font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                        {key.includes('Threshold') && ' (units)'}
                        {key.includes('taxRate') && ' (%)'}
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateSettingsSection('products', { [key]: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Security Settings</h2>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(settings.security).map(([key, value]) => (
                <div key={key}>
                  {typeof value === 'boolean' ? (
                    <div className="flex items-center justify-between py-1">
                      <label className="text-xs sm:text-sm font-medium capitalize cursor-pointer">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateSettingsSection('security', { [key]: e.target.checked })}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                    </div>
                  ) : (
                    <>
                      <label className="block text-xs sm:text-sm font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()} (minutes)
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateSettingsSection('security', { [key]: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={fetchSettings}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Reload Settings
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Print Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;