import React, { useState, useRef } from "react";
import { 
  FiEye, FiEyeOff, FiUpload, FiSave, FiClock
} from "react-icons/fi";

const NavbarCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Navbar Data - Simplified
  const [navbarData, setNavbarData] = useState({
    general: {
      logo: {
        text: "WAPO",
        showLogo: true,
        logoType: "text", // text or image
        logoImage: null,
        logoPreview: null
      }
    },
    active: true
  });

  const updateLogo = (field, value) => {
    setNavbarData(prev => ({
      ...prev,
      general: {
        ...prev.general,
        logo: {
          ...prev.general.logo,
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Navbar settings saved successfully!");
    }, 1000);
  };

  const toggleActive = () => {
    setNavbarData(prev => ({ ...prev, active: !prev.active }));
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setNavbarData(prev => ({
          ...prev,
          general: {
            ...prev.general,
            logo: {
              ...prev.general.logo,
              logoType: "image",
              logoImage: reader.result,
              logoPreview: reader.result
            }
          }
        }));
        setUploading(false);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeLogoImage = () => {
    setNavbarData(prev => ({
      ...prev,
      general: {
        ...prev.general,
        logo: {
          ...prev.general.logo,
          logoType: "text",
          logoImage: null,
          logoPreview: null
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Navbar Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage navigation bar logo
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isVisible && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
              Section Hidden
            </span>
          )}
          <button 
            onClick={toggleActive}
            className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
              navbarData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {navbarData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{navbarData.active ? 'Active' : 'Inactive'}</span>
          </button>
        </div>
      </div>

      {/* Logo Settings Only */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Logo Settings
        </h3>
        
        <div className="space-y-4">
          {/* Show Logo Toggle */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={navbarData.general.logo.showLogo}
                onChange={(e) => updateLogo('showLogo', e.target.checked)}
              />
              <div className={`w-11 h-6 rounded-full peer 
                ${isDarkMode 
                  ? 'bg-gray-600 peer-checked:bg-blue-600' 
                  : 'bg-gray-200 peer-checked:bg-blue-600'
                } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
              </div>
            </label>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Show Logo
            </span>
          </div>

          {/* Logo Type Selection */}
          {navbarData.general.logo.showLogo && (
            <div className="ml-14 space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="logoType"
                    value="text"
                    checked={navbarData.general.logo.logoType === "text"}
                    onChange={(e) => updateLogo('logoType', e.target.value)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Text Logo
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="logoType"
                    value="image"
                    checked={navbarData.general.logo.logoType === "image"}
                    onChange={(e) => updateLogo('logoType', e.target.value)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Image Logo
                  </span>
                </label>
              </div>

              {/* Text Logo Input */}
              {navbarData.general.logo.logoType === "text" && (
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Logo Text
                  </label>
                  <input
                    type="text"
                    value={navbarData.general.logo.text}
                    onChange={(e) => updateLogo('text', e.target.value)}
                    className={`w-full max-w-md px-4 py-2.5 rounded-lg border text-sm ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              )}

              {/* Image Logo Upload */}
              {navbarData.general.logo.logoType === "image" && (
                <div>
                  <div className={`relative rounded-lg border-2 border-dashed overflow-hidden max-w-xs ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <div className="aspect-video relative group">
                      {navbarData.general.logo.logoPreview || navbarData.general.logo.logoImage ? (
                        <img 
                          src={navbarData.general.logo.logoPreview || navbarData.general.logo.logoImage} 
                          alt="Logo"
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className={`w-full h-full flex flex-col items-center justify-center ${
                          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                        }`}>
                          <span className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No logo image
                          </span>
                        </div>
                      )}

                      {/* Upload Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={triggerFileInput}
                          disabled={uploading}
                          className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          {uploading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <FiUpload size={12} />
                              Upload
                            </>
                          )}
                        </button>
                        {(navbarData.general.logo.logoPreview || navbarData.general.logo.logoImage) && (
                          <button
                            onClick={removeLogoImage}
                            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Recommended: 200x100px • Max 2MB
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
        <button
          onClick={() => window.history.back()}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <FiClock className="animate-spin" /> : <FiSave />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Status: <strong className={navbarData.active ? 'text-green-500' : 'text-red-500'}>
              {navbarData.active ? 'Active' : 'Inactive'}
            </strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Logo: <strong>{navbarData.general.logo.logoType === 'text' ? 'Text' : 'Image'}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarCMS;