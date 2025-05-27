import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { motion } from 'framer-motion';

const Settings = () => {
  const { user, logout } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Mock API call - in a real app this would update the user profile
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Settings
      </motion.h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
          <p className="text-gray-600 mt-1">
            Manage your profile and account preferences
          </p>
        </div>
        
        <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
          {saveSuccess && (
            <div className="p-3 bg-success-50 text-success-700 rounded-md text-sm">
              Profile updated successfully!
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="btn-primary"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-error-200 rounded-lg bg-error-50">
              <h4 className="text-error-700 font-medium mb-2">Log out of all devices</h4>
              <p className="text-gray-600 mb-3 text-sm">
                This will log you out of all devices where you're currently signed in.
              </p>
              <button className="btn bg-white text-error-700 border border-error-300 hover:bg-error-50">
                Log out everywhere
              </button>
            </div>
            
            <div className="p-4 border border-error-200 rounded-lg bg-error-50">
              <h4 className="text-error-700 font-medium mb-2">Delete account</h4>
              <p className="text-gray-600 mb-3 text-sm">
                This will permanently delete your account and all associated data.
              </p>
              <button className="btn bg-error-600 text-white hover:bg-error-700">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;