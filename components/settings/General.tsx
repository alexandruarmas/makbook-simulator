import React from "react";

export default function GeneralSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">General</h1>
      
      <div className="space-y-6">
        {/* About this Rac */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">About</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#E94C2B]">
                  <path d="M9 6.75V15M15 8.25V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#E0E0E0]">CherryOS Blossom</h3>
              <p className="text-sm text-[#999] mt-1">Version 15.0 (Build 24A50)</p>
            </div>
            
            <div className="space-y-3 border-t border-[#333] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#E0E0E0]">MackBook Pro (16-inch, 2023)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#999]">Processor</span>
                <span className="text-sm text-[#E0E0E0]">Cherry C2 Pro</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#999]">Memory</span>
                <span className="text-sm text-[#E0E0E0]">32 GB</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#999]">Graphics</span>
                <span className="text-sm text-[#E0E0E0]">Cherry C2 Pro 19-Core GPU</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#999]">Serial Number</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-[#E0E0E0]">C02ZQ3NLPG7H</span>
                  <button className="text-xs text-[#0066FF] hover:underline">Copy</button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-4 py-2 bg-[#303030] text-[#E0E0E0] text-sm rounded-md hover:bg-[#3A3A3A] transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10H3M21 6H3M21 14H3M21 18H3"></path>
                </svg>
                <span>System Report...</span>
              </button>
              <button className="px-4 py-2 bg-[#303030] text-[#E0E0E0] text-sm rounded-md hover:bg-[#3A3A3A] transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 16v-4M12 8h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
                </svg>
                <span>System Settings...</span>
              </button>
              <button className="px-4 py-2 bg-[#303030] text-[#E0E0E0] text-sm rounded-md hover:bg-[#3A3A3A] transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                <span>Software Update...</span>
              </button>
            </div>
          </div>
        </div>

        {/* Software Update */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Software Update</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-[#E0E0E0]">Automatic Updates</h3>
              <div className="relative">
                <input type="checkbox" id="auto-updates" className="peer sr-only" defaultChecked />
                <label htmlFor="auto-updates" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#E94C2B]"></label>
              </div>
            </div>
            <p className="text-sm text-[#999] mb-3">
              Your device is set to automatically check for updates and install them when they're available.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="check-updates" className="w-4 h-4 rounded bg-[#303030] border-none focus:ring-[#E94C2B] text-[#E94C2B]" defaultChecked />
                <label htmlFor="check-updates" className="text-sm text-[#E0E0E0]">Check for updates</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input type="checkbox" id="download-updates" className="w-4 h-4 rounded bg-[#303030] border-none focus:ring-[#E94C2B] text-[#E94C2B]" defaultChecked />
                <label htmlFor="download-updates" className="text-sm text-[#E0E0E0]">Download new updates when available</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input type="checkbox" id="install-updates" className="w-4 h-4 rounded bg-[#303030] border-none focus:ring-[#E94C2B] text-[#E94C2B]" defaultChecked />
                <label htmlFor="install-updates" className="text-sm text-[#E0E0E0]">Install CherryOS updates</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input type="checkbox" id="install-app-updates" className="w-4 h-4 rounded bg-[#303030] border-none focus:ring-[#E94C2B] text-[#E94C2B]" defaultChecked />
                <label htmlFor="install-app-updates" className="text-sm text-[#E0E0E0]">Install app updates from the Cherry Store</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input type="checkbox" id="install-security-updates" className="w-4 h-4 rounded bg-[#303030] border-none focus:ring-[#E94C2B] text-[#E94C2B]" defaultChecked />
                <label htmlFor="install-security-updates" className="text-sm text-[#E0E0E0]">Install security responses and system files</label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Language & Region */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Language & Region</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-[#E0E0E0]">Preferred languages</h3>
                <button className="text-xs text-[#0066FF] hover:underline">Add Language...</button>
              </div>
              
              <div className="bg-[#1c1c1c] rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-[#333]">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#E0E0E0]">English (US)</span>
                    <span className="text-xs px-1.5 py-0.5 bg-[#303030] text-[#999] rounded">Primary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#303030]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"></path>
                      </svg>
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#303030]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#E0E0E0]">Spanish</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#303030]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"></path>
                      </svg>
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#303030]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-[#333]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#E0E0E0]">Region</h3>
                <div>
                  <select className="bg-[#303030] border-none rounded text-sm text-[#E0E0E0] py-1 px-2 pr-8 appearance-none focus:ring-[#0066FF] focus:outline-none" defaultValue="us">
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#E0E0E0]">Temperature</h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5">
                    <input type="radio" name="temp" className="w-3.5 h-3.5 text-[#0066FF] focus:ring-[#0066FF] border-none bg-[#303030]" defaultChecked />
                    <span className="text-sm text-[#E0E0E0]">℉</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="radio" name="temp" className="w-3.5 h-3.5 text-[#0066FF] focus:ring-[#0066FF] border-none bg-[#303030]" />
                    <span className="text-sm text-[#E0E0E0]">℃</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Date & Time */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Date & Time</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#E0E0E0]">Set date and time automatically</h3>
                <div className="relative">
                  <input type="checkbox" id="auto-date" className="peer sr-only" defaultChecked />
                  <label htmlFor="auto-date" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#E0E0E0]">Time Zone</h3>
                <div>
                  <select className="bg-[#303030] border-none rounded text-sm text-[#E0E0E0] py-1 px-2 pr-8 appearance-none focus:ring-[#0066FF] focus:outline-none" defaultValue="eastern">
                    <option value="eastern">Eastern Time (US & Canada)</option>
                    <option value="central">Central Time (US & Canada)</option>
                    <option value="mountain">Mountain Time (US & Canada)</option>
                    <option value="pacific">Pacific Time (US & Canada)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#E0E0E0]">24-hour time</h3>
                <div className="relative">
                  <input type="checkbox" id="24hr-time" className="peer sr-only" />
                  <label htmlFor="24hr-time" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#E0E0E0]">Announce time</h3>
                <div>
                  <select className="bg-[#303030] border-none rounded text-sm text-[#E0E0E0] py-1 px-2 pr-8 appearance-none focus:ring-[#0066FF] focus:outline-none" defaultValue="off">
                    <option value="off">Off</option>
                    <option value="hourly">Hourly</option>
                    <option value="half-hourly">Half-hourly</option>
                    <option value="quarter-hourly">Quarter-hourly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 