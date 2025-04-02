import React, { useState } from 'react';

const FinderPREF: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="h-full flex flex-col bg-[#f5f5f7] dark:bg-[#1e1e1e] text-black dark:text-white">
      {/* Header Tabs */}
      <div className="flex justify-center py-3 bg-[#e8e8e8] dark:bg-[#2d2d2d] border-b border-[#d1d1d1] dark:border-[#3a3a3a]">
        <div className="grid grid-cols-4 gap-1 bg-[#d9d9d9] dark:bg-[#3d3d3d] p-1 rounded-lg">
          <button 
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'general' 
                ? 'bg-white dark:bg-[#4d4d4d] shadow-sm' 
                : 'text-[#505050] dark:text-[#b0b0b0] hover:bg-white/50 dark:hover:bg-[#4d4d4d]/50'
            }`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'tags' 
                ? 'bg-white dark:bg-[#4d4d4d] shadow-sm' 
                : 'text-[#505050] dark:text-[#b0b0b0] hover:bg-white/50 dark:hover:bg-[#4d4d4d]/50'
            }`}
            onClick={() => setActiveTab('tags')}
          >
            Tags
          </button>
          <button 
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'sidebar' 
                ? 'bg-white dark:bg-[#4d4d4d] shadow-sm' 
                : 'text-[#505050] dark:text-[#b0b0b0] hover:bg-white/50 dark:hover:bg-[#4d4d4d]/50'
            }`}
            onClick={() => setActiveTab('sidebar')}
          >
            Sidebar
          </button>
          <button 
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'advanced' 
                ? 'bg-white dark:bg-[#4d4d4d] shadow-sm' 
                : 'text-[#505050] dark:text-[#b0b0b0] hover:bg-white/50 dark:hover:bg-[#4d4d4d]/50'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Show these items on the desktop:</h3>
              <div className="space-y-2 ml-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                  <span className="text-sm">Hard disks</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                  <span className="text-sm">External disks</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                  <span className="text-sm">CDs, DVDs, and iPods</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" />
                  <span className="text-sm">Connected servers</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">New Finder windows show:</h3>
              <div className="flex items-center space-x-3 ml-1">
                <select className="form-select text-sm bg-white dark:bg-[#3d3d3d] border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                  <option>Home</option>
                  <option>Desktop</option>
                  <option>Documents</option>
                  <option>Recents</option>
                  <option>AirDrop</option>
                  <option>Applications</option>
                  <option>Downloads</option>
                </select>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                <span className="text-sm">Open folders in tabs instead of new windows</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Show these tags in the sidebar:</h3>
              <div className="space-y-2 ml-1">
                {[
                  { name: 'Red', color: 'bg-red-500' },
                  { name: 'Orange', color: 'bg-orange-500' },
                  { name: 'Yellow', color: 'bg-yellow-500' },
                  { name: 'Green', color: 'bg-green-500' },
                  { name: 'Blue', color: 'bg-blue-500' },
                  { name: 'Purple', color: 'bg-purple-500' },
                  { name: 'Gray', color: 'bg-gray-500' }
                ].map((tag, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked={i < 4} />
                    <div className={`w-3 h-3 rounded-full ${tag.color}`}></div>
                    <span className="text-sm">{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <button className="text-sm bg-[#e8e8e8] dark:bg-[#3d3d3d] hover:bg-[#e0e0e0] dark:hover:bg-[#4a4a4a] px-4 py-1 rounded-md">
                Edit Tags...
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sidebar' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Show these items in the sidebar:</h3>
              <div className="space-y-2 ml-1">
                <h4 className="text-xs font-medium text-[#777] dark:text-[#999] mt-3">Favorites</h4>
                {[
                  'AirDrop', 'Recents', 'Applications', 'Downloads', 'Documents', 
                  'Desktop', 'iCloud Drive', 'Home'
                ].map((item, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}

                <h4 className="text-xs font-medium text-[#777] dark:text-[#999] mt-4">Locations</h4>
                {[
                  'Macintosh HD', 'Hard disks', 'External disks', 'CDs, DVDs, and iOS Devices', 
                  'Connected servers', 'Network'
                ].map((item, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked={i < 3} />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Show all filename extensions</h3>
              <div className="flex items-center ml-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Show warning before changing an extension</h3>
              <div className="flex items-center ml-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Show warning before removing from iCloud Drive</h3>
              <div className="flex items-center ml-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Show warning before emptying the Trash</h3>
              <div className="flex items-center ml-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">Remove items from the Trash after 30 days</h3>
              <div className="flex items-center ml-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-gray-600" defaultChecked />
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-3">
              <h3 className="text-sm font-medium text-[#555] dark:text-[#aaa]">When performing a search:</h3>
              <div className="flex items-center space-x-3 ml-1">
                <select className="form-select text-sm bg-white dark:bg-[#3d3d3d] border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                  <option>Search This Mac</option>
                  <option>Search the Current Folder</option>
                  <option>Use the Previous Search Scope</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinderPREF; 