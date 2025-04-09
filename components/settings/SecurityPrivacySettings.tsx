import React from "react";

export default function SecurityPrivacySettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Security & Privacy</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">General</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-[#E0E0E0] block">Require password</span>
                  <span className="text-xs text-[#999]">after sleep or screen saver begins</span>
                </div>
                <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                  <option>Immediately</option>
                  <option>After 5 minutes</option>
                  <option>After 15 minutes</option>
                  <option>After 1 hour</option>
                  <option>After 4 hours</option>
                  <option>Never</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="show-message" 
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="show-message" className="ml-2 text-sm text-[#E0E0E0]">
                  Show a message when the screen is locked
                </label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="disable-automatic-login" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="disable-automatic-login" className="ml-2 text-sm text-[#E0E0E0]">
                  Disable automatic login
                </label>
              </div>
              
              <div className="border-t border-[#333] pt-4">
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                    Change Password...
                  </button>
                  <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                    Set Lock Message...
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">FileVault</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-[#E0E0E0] block">FileVault is turned on for the disk "MacBook Pro"</span>
                  <span className="text-xs text-[#999] block mt-1">Your disk is encrypted.</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-[#E0E0E0]">On</span>
                </div>
              </div>
              
              <p className="text-xs text-[#999]">
                FileVault secures your data by encrypting it. If you turn off FileVault, your data will no longer be encrypted and anyone with access to your computer may be able to access your data.
              </p>
              
              <button className="px-3 py-1.5 bg-[#303030] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm transition-colors">
                Turn Off FileVault...
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Privacy</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex">
              <div className="w-48 border-r border-[#333] pr-4">
                <ul className="space-y-2">
                  <li className="text-sm font-medium text-[#0066FF] py-1 px-2 bg-[#0066FF20] rounded">Location Services</li>
                  <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Contacts</li>
                  <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Calendar</li>
                  <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Reminders</li>
                  <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Photos</li>
                  <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Camera</li>
                  <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Microphone</li>
                  <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Analytics</li>
                </ul>
              </div>
              
              <div className="flex-1 pl-4">
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="location-services" defaultChecked
                    className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                  />
                  <label htmlFor="location-services" className="ml-2 text-sm font-medium text-[#E0E0E0]">
                    Enable Location Services
                  </label>
                </div>
                
                <p className="text-xs text-[#999] mb-4">
                  Location Services allows CherryOS apps and websites to gather and use information based on the current location of your computer.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-[#E0E0E0]">Maps</span>
                    <select className="bg-[#303030] border-none rounded-md px-3 py-1 text-xs text-[#E0E0E0]">
                      <option>While Using</option>
                      <option>Never</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-[#E0E0E0]">System Services</span>
                    <select className="bg-[#303030] border-none rounded-md px-3 py-1 text-xs text-[#E0E0E0]">
                      <option>Always</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 