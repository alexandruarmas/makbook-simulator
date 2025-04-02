import React from "react";

export default function BatterySettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Battery</h1>
      
      {/* Battery Status */}
      <div className="bg-[#232323] rounded-xl p-5 mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#33C552]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
              <line x1="22" y1="11" x2="22" y2="13"></line>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-medium text-[#E0E0E0]">Battery Health: 100%</h2>
            <p className="text-sm text-[#999]">Maximum Capacity • Normal</p>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-[#E0E0E0]">Battery Level</h3>
            <span className="text-sm text-[#999]">82%</span>
          </div>
          <div className="w-full bg-[#1c1c1c] rounded-full h-2.5">
            <div className="bg-[#33C552] h-2.5 rounded-full" style={{ width: "82%" }}></div>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#E0E0E0]">Power Source</h3>
            <span className="text-sm text-[#999]">Battery Power</span>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#E0E0E0]">Time Until Full</h3>
            <span className="text-sm text-[#999]">2:15 Remaining</span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#E0E0E0]">Time Since Last Full Charge</h3>
            <span className="text-sm text-[#999]">4 hours, 23 minutes</span>
          </div>
        </div>
      </div>
      
      {/* Battery Usage */}
      <div className="bg-[#232323] rounded-xl p-5 mb-6">
        <h2 className="text-base font-medium text-[#E0E0E0] mb-4">Battery Usage</h2>
        
        <div className="mb-5">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-[#999]">Last 24 Hours</span>
            <span className="text-sm text-[#999]">Last 10 Days</span>
          </div>
          
          <div className="h-48 mb-4 bg-[#1c1c1c] rounded-lg p-3 flex items-end justify-between">
            {[85, 76, 90, 65, 82, 75, 91, 79, 67, 82, 73, 81].map((level, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-6 bg-[#33C552] rounded-t-sm" style={{ height: `${level * 0.35}%` }}></div>
                <div className="w-full h-[1px] bg-[#333] mt-1"></div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <span className="text-xs text-[#999]">12 AM</span>
            <span className="text-xs text-[#999]">6 AM</span>
            <span className="text-xs text-[#999]">12 PM</span>
            <span className="text-xs text-[#999]">6 PM</span>
            <span className="text-xs text-[#999]">Now</span>
          </div>
        </div>
      </div>
      
      {/* Battery Settings */}
      <div className="bg-[#232323] rounded-xl p-5">
        <h2 className="text-base font-medium text-[#E0E0E0] mb-4">Power Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[#E0E0E0]">Low Power Mode</h3>
              <p className="text-xs text-[#999]">Reduces system performance to extend battery life</p>
            </div>
            <div className="relative">
              <input type="checkbox" id="low-power-mode" className="peer sr-only" />
              <label htmlFor="low-power-mode" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[#E0E0E0]">Optimize video streaming while on battery</h3>
              <p className="text-xs text-[#999]">Extends battery life when streaming video</p>
            </div>
            <div className="relative">
              <input type="checkbox" id="optimize-video" className="peer sr-only" defaultChecked />
              <label htmlFor="optimize-video" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
            </div>
          </div>
          
          <div className="pt-3 border-t border-[#333]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Turn display off after</h3>
                <p className="text-xs text-[#999]">When using the battery</p>
              </div>
              <div>
                <select 
                  className="bg-[#303030] border-none rounded text-sm text-[#E0E0E0] py-1 px-2 pr-8 appearance-none focus:ring-[#0066FF] focus:outline-none"
                  defaultValue="10"
                >
                  <option value="2">2 minutes</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Turn display off after</h3>
                <p className="text-xs text-[#999]">When plugged in</p>
              </div>
              <div>
                <select 
                  className="bg-[#303030] border-none rounded text-sm text-[#E0E0E0] py-1 px-2 pr-8 appearance-none focus:ring-[#0066FF] focus:outline-none"
                  defaultValue="30"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Prevent automatic sleeping when display is off</h3>
                <p className="text-xs text-[#999]">For Power Adapter</p>
              </div>
              <div className="relative">
                <input type="checkbox" id="prevent-sleep" className="peer sr-only" />
                <label htmlFor="prevent-sleep" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Show battery percentage in menu bar</h3>
              </div>
              <div className="relative">
                <input type="checkbox" id="show-percentage" className="peer sr-only" defaultChecked />
                <label htmlFor="show-percentage" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 