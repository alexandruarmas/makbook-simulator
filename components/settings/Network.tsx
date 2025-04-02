import React from "react";

export default function NetworkSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Network</h1>
      
      <div className="space-y-6">
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex">
            <div className="w-48 border-r border-[#333] pr-4">
              <div className="mb-4">
                <button className="w-full px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                  + Add Interface
                </button>
              </div>
              <ul className="space-y-2">
                <li className="text-sm font-medium text-[#0066FF] py-1 px-2 bg-[#0066FF20] rounded flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  Wi-Fi
                </li>
                <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  Ethernet
                </li>
                <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  Bluetooth PAN
                </li>
                <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  Thunderbolt Bridge
                </li>
              </ul>
            </div>
            
            <div className="flex-1 pl-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium text-[#E0E0E0]">Wi-Fi is connected to "HomeNetwork" and has the IP address 192.168.1.105</span>
                </div>
                <div>
                  <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                    Turn Wi-Fi Off
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Network Name:</span>
                  <span className="text-sm text-[#E0E0E0]">HomeNetwork</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Auto-Join:</span>
                  <div className="flex items-center">
                    <input type="checkbox" id="auto-join" defaultChecked
                      className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                    />
                    <label htmlFor="auto-join" className="ml-2 text-sm text-[#E0E0E0]">
                      Automatically join this network
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Security:</span>
                  <span className="text-sm text-[#E0E0E0]">WPA3 Personal</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">IP Address:</span>
                  <span className="text-sm text-[#E0E0E0]">192.168.1.105</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Subnet Mask:</span>
                  <span className="text-sm text-[#E0E0E0]">255.255.255.0</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Router:</span>
                  <span className="text-sm text-[#E0E0E0]">192.168.1.1</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">DNS:</span>
                  <span className="text-sm text-[#E0E0E0]">1.1.1.1, 8.8.8.8</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">MAC Address:</span>
                  <span className="text-sm text-[#E0E0E0]">00:1B:44:11:3A:B7</span>
                </div>
                
                <div className="border-t border-[#333] pt-4 flex justify-between">
                  <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                    Network Preferences...
                  </button>
                  <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                    Advanced...
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-sm font-medium text-[#E0E0E0] mb-3">Network Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#E0E0E0]">Wi-Fi:</span>
              <span className="text-sm text-green-500">Connected</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#E0E0E0]">Internet:</span>
              <span className="text-sm text-green-500">Connected</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#E0E0E0]">Current Download Speed:</span>
              <span className="text-sm text-[#E0E0E0]">42.5 Mbps</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#E0E0E0]">Current Upload Speed:</span>
              <span className="text-sm text-[#E0E0E0]">12.8 Mbps</span>
            </div>
            
            <div className="border-t border-[#333] pt-4">
              <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                Run Diagnostics...
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-sm font-medium text-[#E0E0E0] mb-3">Firewall</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium text-[#E0E0E0] block">Firewall is turned off</span>
                <span className="text-xs text-[#999] block mt-1">Your computer is not protected from unwanted incoming connections.</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-[#E0E0E0]">Off</span>
              </div>
            </div>
            
            <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
              Turn On Firewall...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 