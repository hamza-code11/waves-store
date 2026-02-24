import React, { useState, useRef } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiHeart,
  FiMapPin, FiPhone, FiMail, FiSend,
  FiTwitter, FiFacebook, FiInstagram, FiYoutube,
  FiSave, FiClock
} from "react-icons/fi";

const FooterCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("brand");
  const [saving, setSaving] = useState(false);

  // Footer Data - Bottom Bar Removed
  const [footerData, setFooterData] = useState({
    brand: {
      name: "Wapo",
      description: "Reinventing the way of creating websites, we aim to create the most masterpiece WordPress theme available on the market.",
      madeWithText: "Made with passion",
      logo: null,
      logoPreview: null
    },
    contact: {
      title: "Contact Us",
      address: "202 Helga Springs Rd, Crawford, TN 38554",
      phone: "800.275.8777",
      email: "alex@company.com",
      addressLine2: "",
      showIconBackground: true
    },
    newsletter: {
      title: "Newsletter",
      description: "Sign up with your email address to receive news and updates.",
      placeholder: "Your e-mail address",
      buttonText: "Subscribe",
      trustText: "No spam, unsubscribe anytime",
      showTrustBadge: true
    },
    socialLinks: [
      { id: 1, platform: "facebook", url: "https://facebook.com", active: true },
      { id: 2, platform: "twitter", url: "https://twitter.com", active: true },
      { id: 3, platform: "instagram", url: "https://instagram.com", active: true },
      { id: 4, platform: "youtube", url: "https://youtube.com", active: true }
    ],
    wavesImage: "/assets/home/footer.jfif",
    wavesPreview: null,
    active: true
  });

  const updateField = (section, field, value) => {
    setFooterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateSocialLink = (id, field, value) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const toggleSocialActive = (id) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link =>
        link.id === id ? { ...link, active: !link.active } : link
      )
    }));
  };

  const toggleActive = () => {
    setFooterData(prev => ({ ...prev, active: !prev.active }));
  };

  const handleWavesUpload = (file) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setFooterData(prev => ({
          ...prev,
          wavesImage: reader.result,
          wavesPreview: reader.result
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

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      console.log("Footer data saved:", footerData);
      setSaving(false);
      alert("Footer settings saved successfully!");
    }, 1000);
  };

  const getSocialIcon = (platform) => {
    switch(platform) {
      case 'facebook': return <FiFacebook />;
      case 'twitter': return <FiTwitter />;
      case 'instagram': return <FiInstagram />;
      case 'youtube': return <FiYoutube />;
      default: return <FiTwitter />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input for waves bg */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleWavesUpload(e.target.files[0]);
          }
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Footer Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage footer content and settings
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
              footerData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {footerData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{footerData.active ? 'Active' : 'Inactive'}</span>
          </button>
        </div>
      </div>

      {/* Tabs - Bottom Bar Removed */}
      <div className={`border-b flex flex-wrap gap-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={() => setActiveTab("brand")}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 
            ${activeTab === "brand" ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Brand
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 
            ${activeTab === "contact" ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Contact
        </button>
        <button
          onClick={() => setActiveTab("newsletter")}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 
            ${activeTab === "newsletter" ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Newsletter
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 
            ${activeTab === "social" ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Social Links
        </button>
        <button
          onClick={() => setActiveTab("background")}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 
            ${activeTab === "background" ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
        >
          Background
        </button>
      </div>

      {/* Content Area */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Brand Tab */}
        {activeTab === "brand" && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Brand Name
              </label>
              <input
                type="text"
                value={footerData.brand.name}
                onChange={(e) => updateField('brand', 'name', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Brand Description
              </label>
              <textarea
                value={footerData.brand.description}
                onChange={(e) => updateField('brand', 'description', e.target.value)}
                rows="3"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Made With Text
              </label>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <FiHeart className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                </div>
                <input
                  type="text"
                  value={footerData.brand.madeWithText}
                  onChange={(e) => updateField('brand', 'madeWithText', e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Section Title
              </label>
              <input
                type="text"
                value={footerData.contact.title}
                onChange={(e) => updateField('contact', 'title', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Address
              </label>
              <div className="flex gap-2">
                <FiMapPin className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="text"
                  value={footerData.contact.address}
                  onChange={(e) => updateField('contact', 'address', e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone
              </label>
              <div className="flex gap-2">
                <FiPhone className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="text"
                  value={footerData.contact.phone}
                  onChange={(e) => updateField('contact', 'phone', e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="flex gap-2">
                <FiMail className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="email"
                  value={footerData.contact.email}
                  onChange={(e) => updateField('contact', 'email', e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={footerData.contact.showIconBackground}
                  onChange={(e) => updateField('contact', 'showIconBackground', e.target.checked)}
                />
                <div className={`w-11 h-6 rounded-full peer 
                  ${isDarkMode 
                    ? 'bg-gray-600 peer-checked:bg-blue-600' 
                    : 'bg-gray-200 peer-checked:bg-blue-600'
                  } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                </div>
              </label>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show icon background
              </span>
            </div>
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === "newsletter" && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Section Title
              </label>
              <input
                type="text"
                value={footerData.newsletter.title}
                onChange={(e) => updateField('newsletter', 'title', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value={footerData.newsletter.description}
                onChange={(e) => updateField('newsletter', 'description', e.target.value)}
                rows="2"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Input Placeholder
              </label>
              <input
                type="text"
                value={footerData.newsletter.placeholder}
                onChange={(e) => updateField('newsletter', 'placeholder', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Button Text
              </label>
              <div className="flex gap-2">
                <FiSend className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="text"
                  value={footerData.newsletter.buttonText}
                  onChange={(e) => updateField('newsletter', 'buttonText', e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Trust Badge Text
              </label>
              <input
                type="text"
                value={footerData.newsletter.trustText}
                onChange={(e) => updateField('newsletter', 'trustText', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={footerData.newsletter.showTrustBadge}
                  onChange={(e) => updateField('newsletter', 'showTrustBadge', e.target.checked)}
                />
                <div className={`w-11 h-6 rounded-full peer 
                  ${isDarkMode 
                    ? 'bg-gray-600 peer-checked:bg-blue-600' 
                    : 'bg-gray-200 peer-checked:bg-blue-600'
                  } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                </div>
              </label>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show trust badge
              </span>
            </div>
          </div>
        )}

        {/* Social Links Tab */}
        {activeTab === "social" && (
          <div className="space-y-4">
            <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage social media links
            </p>
            {footerData.socialLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {getSocialIcon(link.platform)}
                </div>
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                </select>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                  placeholder="https://..."
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <button
                  onClick={() => toggleSocialActive(link.id)}
                  className={`p-2 rounded ${
                    link.active
                      ? isDarkMode ? 'text-green-400' : 'text-green-600'
                      : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {link.active ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Background Tab */}
        {activeTab === "background" && (
          <div className="space-y-4">
            <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Waves Background Image
            </h3>
            <div className={`relative rounded-xl border-2 border-dashed overflow-hidden max-w-md ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <div className="aspect-video relative group">
                {footerData.wavesImage || footerData.wavesPreview ? (
                  <img 
                    src={footerData.wavesPreview || footerData.wavesImage} 
                    alt="Waves Background"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      No image
                    </p>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={triggerFileInput}
                    disabled={uploading}
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FiUpload />
                        Upload Image
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Recommended: 1920x1080px • Max 2MB
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Social Links: <strong>{footerData.socialLinks.filter(l => l.active).length}</strong> active
          </span>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
        <button
          onClick={() => window.location.reload()}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}
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
    </div>
  );
};

export default FooterCMS;