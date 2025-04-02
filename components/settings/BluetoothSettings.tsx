import React from "react";

export default function BluetoothSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Bluetooth</h1>
      
      <div className="space-y-6">
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#E0E0E0] mr-3">Bluetooth:</span>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-[#E0E0E0]">On</span>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
              Turn Bluetooth Off
            </button>
          </div>
          
          <div className="space-y-3 mb-4">
            <p className="text-xs text-[#999]">
              Now discoverable as "MacBook Pro"
            </p>
            <div className="flex items-center">
              <input type="checkbox" id="show-bluetooth" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="show-bluetooth" className="ml-2 text-sm text-[#E0E0E0]">
                Show Bluetooth in menu bar
              </label>
            </div>
          </div>
          
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Devices</h2>
          
          <div className="border border-[#333] rounded-lg mb-4">
            <div className="p-3 border-b border-[#333] flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#E0E0E0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <div>
                  <span className="text-sm font-medium text-[#E0E0E0] block">AirPods Pro</span>
                  <span className="text-xs text-green-500">Connected</span>
                </div>
              </div>
              <div>
                <button className="px-2 py-1 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-xs transition-colors">
                  Disconnect
                </button>
              </div>
            </div>
            
            <div className="p-3 border-b border-[#333] flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#E0E0E0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <div>
                  <span className="text-sm font-medium text-[#E0E0E0] block">Magic Mouse</span>
                  <span className="text-xs text-[#999]">Not Connected</span>
                </div>
              </div>
              <div>
                <button className="px-2 py-1 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-xs transition-colors">
                  Connect
                </button>
              </div>
            </div>
            
            <div className="p-3 flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#E0E0E0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="text-sm font-medium text-[#E0E0E0] block">Magic Keyboard</span>
                  <span className="text-xs text-[#999]">Not Connected</span>
                </div>
              </div>
              <div>
                <button className="px-2 py-1 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-xs transition-colors">
                  Connect
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Device
            </button>
            <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
              Advanced...
            </button>
          </div>
        </div>
        
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-sm font-medium text-[#E0E0E0] mb-4">Battery Levels</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#E0E0E0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span className="text-sm text-[#E0E0E0]">AirPods Pro</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-[#333] rounded-full mr-2 overflow-hidden">
                  <div className="h-full bg-green-500 w-8"></div>
                </div>
                <span className="text-sm text-[#E0E0E0]">50%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#E0E0E0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span className="text-sm text-[#E0E0E0]">Magic Mouse</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-[#333] rounded-full mr-2 overflow-hidden">
                  <div className="h-full bg-yellow-500 w-6"></div>
                </div>
                <span className="text-sm text-[#E0E0E0]">35%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#E0E0E0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-[#E0E0E0]">Magic Keyboard</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-[#333] rounded-full mr-2 overflow-hidden">
                  <div className="h-full bg-red-500 w-3"></div>
                </div>
                <span className="text-sm text-[#E0E0E0]">15%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-sm font-medium text-[#E0E0E0] mb-3">Options</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="allow-bluetooth-devices" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="allow-bluetooth-devices" className="ml-2 text-sm text-[#E0E0E0]">
                Allow Bluetooth devices to find this computer
              </label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="allow-handoff" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="allow-handoff" className="ml-2 text-sm text-[#E0E0E0]">
                Allow Handoff between this Mac and your iCloud devices
              </label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="auto-connect" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="auto-connect" className="ml-2 text-sm text-[#E0E0E0]">
                Automatically connect to last used devices
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 