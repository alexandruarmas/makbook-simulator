import React from "react";

export default function TimeMachineSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Time Machine</h1>
      
      <div className="space-y-6">
        {/* Backup Status */}
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[#E0E0E0]">Back up automatically</h2>
            <div className="relative">
              <input type="checkbox" id="auto-backup" className="peer sr-only" defaultChecked />
              <label htmlFor="auto-backup" className="block w-12 h-6 bg-[#444444] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6 peer-checked:bg-[#0066FF]"></label>
            </div>
          </div>
          
          <p className="text-[#AEAEAE] text-sm mb-4">
            Time Machine keeps hourly backups for the past 24 hours, daily backups for the past month, and weekly backups for all previous months.
          </p>
          
          <div className="flex items-center text-[#E0E0E0] mt-6">
            <div className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#0066FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Latest backup: Today at 2:30 PM</p>
              <p className="text-sm text-[#AEAEAE]">to "Time Machine Backup" (2.1 TB available)</p>
            </div>
          </div>
        </div>
        
        {/* Available Disks */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Available disks for backup</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg border border-[#444444]">
              <div className="flex items-center">
                <div className="bg-[#444444] w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0E0E0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#E0E0E0] font-medium">Time Machine Backup</p>
                  <p className="text-sm text-[#AEAEAE]">3.9 TB / 6 TB (2.1 TB available)</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#0066FF] text-white rounded text-sm">
                Select
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg border border-[#444444]/30">
              <div className="flex items-center">
                <div className="bg-[#444444] w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0E0E0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#E0E0E0] font-medium">External Backup</p>
                  <p className="text-sm text-[#AEAEAE]">1.2 TB / 2 TB (800 GB available)</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#333333] hover:bg-[#444444] text-white rounded text-sm">
                Select
              </button>
            </div>
          </div>
          
          <button className="mt-4 px-3 py-1.5 bg-[#333333] hover:bg-[#444444] text-white rounded text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Disk
          </button>
        </div>
        
        {/* Backup History */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Backup history</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 hover:bg-[#2A2A2A] rounded">
              <span className="text-[#E0E0E0]">Today, 2:30 PM</span>
              <span className="text-[#AEAEAE]">42.5 GB</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-[#2A2A2A] rounded">
              <span className="text-[#E0E0E0]">Today, 10:15 AM</span>
              <span className="text-[#AEAEAE]">41.8 GB</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-[#2A2A2A] rounded">
              <span className="text-[#E0E0E0]">Yesterday, 8:45 PM</span>
              <span className="text-[#AEAEAE]">40.2 GB</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-[#2A2A2A] rounded">
              <span className="text-[#E0E0E0]">Yesterday, 12:30 PM</span>
              <span className="text-[#AEAEAE]">39.7 GB</span>
            </div>
          </div>
          
          <button className="mt-3 text-[#0066FF] text-sm hover:underline">
            View all backups...
          </button>
        </div>
        
        {/* Options */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Options</h2>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded bg-[#333333] border-none focus:ring-[#0066FF] text-[#0066FF]" defaultChecked />
              <span className="text-[#E0E0E0]">Back up while on battery power</span>
            </label>
            
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded bg-[#333333] border-none focus:ring-[#0066FF] text-[#0066FF]" defaultChecked />
              <span className="text-[#E0E0E0]">Notify after old backups are deleted</span>
            </label>
            
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded bg-[#333333] border-none focus:ring-[#0066FF] text-[#0066FF]" />
              <span className="text-[#E0E0E0]">Show Time Machine in menu bar</span>
            </label>
          </div>
          
          <div className="mt-4">
            <button className="px-3 py-1.5 bg-[#333333] hover:bg-[#444444] text-white rounded text-sm">
              Advanced Options...
            </button>
          </div>
        </div>
        
        {/* Excluded Items */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Exclude these items from backups</h2>
          
          <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
            <div className="flex justify-between items-center p-2 bg-[#2A2A2A] rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E0E0E0] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1M5 19h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2z" />
                </svg>
                <span className="text-[#E0E0E0]">Downloads</span>
              </div>
              <button className="text-[#E0E0E0] hover:text-[#FF3B30]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-[#2A2A2A] rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E0E0E0] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1M5 19h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2z" />
                </svg>
                <span className="text-[#E0E0E0]">Virtual Machines</span>
              </div>
              <button className="text-[#E0E0E0] hover:text-[#FF3B30]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          
          <button className="px-3 py-1.5 bg-[#333333] hover:bg-[#444444] text-white rounded text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
} 