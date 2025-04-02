import React from "react";

const ControlCenter = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Control Center</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Control Center Modules</h2>
          <p className="text-sm text-[#999] mb-4">These modules are always visible in Control Center. You can choose when they should also show in the Menu Bar.</p>
          
          <div className="bg-[#232323] rounded-xl overflow-hidden">
            {/* Wi-Fi Module */}
            <div className="border-b border-[#333] p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <line x1="12" y1="20" x2="12.01" y2="20"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-[#E0E0E0] font-medium">Wi-Fi</p>
                  <p className="text-xs text-[#999]">Connected to "Home Network"</p>
                </div>
              </div>
              <div className="relative">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#0066FF] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
            
            {/* Bluetooth Module */}
            <div className="border-b border-[#333] p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6.5 6.5l11 11"></path>
                    <path d="M17.5 6.5l-11 11"></path>
                    <path d="M12 2v20"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#E0E0E0] font-medium">Bluetooth</p>
                  <p className="text-xs text-[#999]">On</p>
                </div>
              </div>
              <div className="relative">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#0066FF] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
            
            {/* AirDrop Module */}
            <div className="border-b border-[#333] p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                    <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#E0E0E0] font-medium">AirDrop</p>
                  <p className="text-xs text-[#999]">Contacts Only</p>
                </div>
              </div>
              <div className="relative">
                <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0] focus:ring-1 focus:outline-none focus:ring-[#0066FF]">
                  <option>Contacts Only</option>
                  <option>Everyone</option>
                  <option>No One</option>
                </select>
              </div>
            </div>
            
            {/* Focus Module */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#9966FF] rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#E0E0E0] font-medium">Focus</p>
                  <p className="text-xs text-[#999]">Off</p>
                </div>
              </div>
              <div className="relative">
                <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0] focus:ring-1 focus:outline-none focus:ring-[#0066FF]">
                  <option>Off</option>
                  <option>Do Not Disturb</option>
                  <option>Work</option>
                  <option>Personal</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Display & Sound Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* Display Module */}
          <div className="bg-[#232323] rounded-xl p-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <p className="text-[#E0E0E0] font-medium">Display</p>
            </div>
            
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#999] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="80"
                className="w-full h-1 bg-[#505050] rounded-lg appearance-none cursor-pointer accent-[#0066FF]" 
              />
            </div>
            
            <div className="flex justify-between">
              <button className="bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-lg p-2 flex items-center justify-center w-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                </svg>
              </button>
              <button className="bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-lg p-2 flex items-center justify-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Sound Module */}
          <div className="bg-[#232323] rounded-xl p-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </div>
              <p className="text-[#E0E0E0] font-medium">Sound</p>
            </div>
            
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#999] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              </svg>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="60"
                className="w-full h-1 bg-[#505050] rounded-lg appearance-none cursor-pointer accent-[#0066FF]" 
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#999] ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </div>
            
            <div className="flex justify-between">
              <button className="bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-lg p-2 flex items-center justify-center w-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
              <button className="bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-lg p-2 flex items-center justify-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Controls */}
        <div className="grid grid-cols-4 gap-4">
          {/* Do Not Disturb */}
          <div className="bg-[#232323] rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-[#9966FF] rounded-lg flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <p className="text-xs text-[#E0E0E0] text-center">Do Not Disturb</p>
          </div>
          
          {/* Keyboard Brightness */}
          <div className="bg-[#232323] rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-[#0066FF] rounded-lg flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                <line x1="6" y1="10" x2="6" y2="10"></line>
                <line x1="10" y1="10" x2="10" y2="10"></line>
                <line x1="14" y1="10" x2="14" y2="10"></line>
                <line x1="18" y1="10" x2="18" y2="10"></line>
                <line x1="6" y1="14" x2="18" y2="14"></line>
              </svg>
            </div>
            <p className="text-xs text-[#E0E0E0] text-center">Keyboard Brightness</p>
          </div>
          
          {/* Screen Mirroring */}
          <div className="bg-[#232323] rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-[#0066FF] rounded-lg flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <p className="text-xs text-[#E0E0E0] text-center">Screen Mirroring</p>
          </div>
          
          {/* Night Shift */}
          <div className="bg-[#232323] rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-[#FF9500] rounded-lg flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a9 9 0 1 0 9 9"></path>
                <path d="M12 3v9l9 0"></path>
              </svg>
            </div>
            <p className="text-xs text-[#E0E0E0] text-center">Night Shift</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter; 