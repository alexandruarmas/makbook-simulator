import React from "react";

export default function DisplaysSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Displays</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Display Settings</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Resolution</span>
                <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                  <option>Default for display</option>
                  <option>Scaled (1920 x 1080)</option>
                  <option>Scaled (1680 x 1050)</option>
                  <option>Scaled (1440 x 900)</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Brightness</span>
                <div className="flex-1 ml-4 max-w-[200px]">
                  <input type="range" min="0" max="100" defaultValue="80" 
                    className="w-full h-2 rounded-lg appearance-none bg-[#444]" 
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="auto-brightness" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="auto-brightness" className="ml-2 text-sm text-[#E0E0E0]">
                  Automatically adjust brightness
                </label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="true-tone" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="true-tone" className="ml-2 text-sm text-[#E0E0E0]">
                  True Tone
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Night Shift</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-[#E0E0E0] block mb-1">Schedule</span>
                  <span className="text-xs text-[#999]">Sunset to Sunrise</span>
                </div>
                <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                  <option>Off</option>
                  <option>Sunset to Sunrise</option>
                  <option>Custom</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Color Temperature</span>
                <div className="flex-1 ml-4 max-w-[200px]">
                  <input type="range" min="0" max="100" defaultValue="50" 
                    className="w-full h-2 rounded-lg appearance-none bg-[#444]" 
                  />
                </div>
              </div>
              
              <p className="text-xs text-[#999]">
                Night Shift adjusts the color of your display to the warmer end of the spectrum after dark. This may help you get a better night's sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 