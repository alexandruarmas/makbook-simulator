import React from "react";

export default function NotificationsSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Notifications</h1>
      
      {/* Notification Center */}
      <div className="bg-[#232323] rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium text-[#E0E0E0]">Notification Center</h2>
          <div className="relative">
            <input type="checkbox" id="do-not-disturb" className="peer sr-only" />
            <label htmlFor="do-not-disturb" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#303030] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#E0E0E0]">Do Not Disturb</h3>
            <p className="text-xs text-[#999]">Silence notifications when display is sleeping, mirroring, or locked</p>
          </div>
        </div>
        
        <div className="px-4 py-3 bg-[#1c1c1c] rounded-lg mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#E0E0E0]">Allow notifications when display is sleeping</h3>
            <div className="relative">
              <input type="checkbox" id="allow-when-sleeping" className="peer sr-only" />
              <label htmlFor="allow-when-sleeping" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#E0E0E0]">Allow notifications when screen is locked</h3>
            <div className="relative">
              <input type="checkbox" id="allow-when-locked" className="peer sr-only" defaultChecked />
              <label htmlFor="allow-when-locked" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#E0E0E0]">Allow notifications when mirroring or sharing the display</h3>
            <div className="relative">
              <input type="checkbox" id="allow-when-mirroring" className="peer sr-only" />
              <label htmlFor="allow-when-mirroring" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-[#E0E0E0]">Turn on Do Not Disturb</h3>
            <p className="text-xs text-[#999]">Set a schedule for Do Not Disturb</p>
          </div>
          <button className="px-3 py-1.5 bg-[#303030] text-[#E0E0E0] text-sm rounded-md hover:bg-[#3A3A3A] transition-colors">
            Schedule...
          </button>
        </div>
      </div>
      
      {/* App Notifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium text-[#E0E0E0]">App Notifications</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#303030] border-none rounded-md px-3 py-1.5 pl-8 text-sm text-[#E0E0E0] placeholder-[#999] focus:ring-1 focus:outline-none focus:ring-[#0066FF]"
            />
            <svg className="absolute left-3 top-2 w-3.5 h-3.5 text-[#999]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <div className="space-y-3">
          {/* Calendar App */}
          <div className="bg-[#232323] rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF5D50] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#E0E0E0]">Calendar</h3>
                  <p className="text-xs text-[#999]">Event alerts, invitations, and notifications</p>
                </div>
              </div>
              <div className="relative">
                <input type="checkbox" id="calendar-notifications" className="peer sr-only" defaultChecked />
                <label htmlFor="calendar-notifications" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#E0E0E0]">Allow Notifications</h4>
                <div className="relative">
                  <input type="checkbox" id="calendar-allow" className="peer sr-only" defaultChecked />
                  <label htmlFor="calendar-allow" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#E0E0E0]">Show in Notification Center</h4>
                <div className="relative">
                  <input type="checkbox" id="calendar-center" className="peer sr-only" defaultChecked />
                  <label htmlFor="calendar-center" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#E0E0E0]">Play Sound for Notifications</h4>
                <div className="relative">
                  <input type="checkbox" id="calendar-sound" className="peer sr-only" defaultChecked />
                  <label htmlFor="calendar-sound" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#E0E0E0]">Badge App Icon</h4>
                <div className="relative">
                  <input type="checkbox" id="calendar-badge" className="peer sr-only" defaultChecked />
                  <label htmlFor="calendar-badge" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Messages App */}
          <div className="bg-[#232323] rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#33C552] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#E0E0E0]">Messages</h3>
                  <p className="text-xs text-[#999]">Text messages, iMessages, and notifications</p>
                </div>
              </div>
              <div className="relative">
                <input type="checkbox" id="messages-notifications" className="peer sr-only" defaultChecked />
                <label htmlFor="messages-notifications" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#E0E0E0]">Show Notification Preview</h4>
                <div>
                  <select className="bg-[#303030] border-none rounded text-sm text-[#E0E0E0] py-1 px-2 pr-8 appearance-none focus:ring-[#0066FF] focus:outline-none" defaultValue="always">
                    <option value="always">Always</option>
                    <option value="unlocked">When Unlocked</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#E0E0E0]">Play Sound for Notifications</h4>
                <div className="relative">
                  <input type="checkbox" id="messages-sound" className="peer sr-only" defaultChecked />
                  <label htmlFor="messages-sound" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-[#E0E0E0]">Badge App Icon</h4>
                <div className="relative">
                  <input type="checkbox" id="messages-badge" className="peer sr-only" defaultChecked />
                  <label htmlFor="messages-badge" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mail App */}
          <div className="bg-[#232323] rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3F8CF6] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#E0E0E0]">Mail</h3>
                  <p className="text-xs text-[#999]">Email notifications and alerts</p>
                </div>
              </div>
              <div className="relative">
                <input type="checkbox" id="mail-notifications" className="peer sr-only" defaultChecked />
                <label htmlFor="mail-notifications" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <button className="text-[#0066FF] text-sm hover:underline">
                Configure in Mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 