import React from "react";

export default function TrackpadSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Trackpad</h1>
      
      <div className="space-y-6">
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex">
            <div className="w-48 border-r border-[#333] pr-4">
              <ul className="space-y-2">
                <li className="text-sm font-medium text-[#0066FF] py-1 px-2 bg-[#0066FF20] rounded">Point & Click</li>
                <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">Scroll & Zoom</li>
                <li className="text-sm font-medium text-[#E0E0E0] py-1 px-2 hover:bg-[#303030] rounded">More Gestures</li>
              </ul>
            </div>
            
            <div className="flex-1 pl-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-[#E0E0E0]">Look up & data detectors</span>
                <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                  <option>Force Click with one finger</option>
                  <option>Tap with three fingers</option>
                  <option>Off</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-[#E0E0E0]">Secondary click</span>
                <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                  <option>Click with two fingers</option>
                  <option>Click in bottom right corner</option>
                  <option>Click in bottom left corner</option>
                </select>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#E0E0E0]">Tracking speed</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-[#999] mr-2">Slow</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    defaultValue="7"
                    className="flex-1 h-1 bg-[#333] rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-[#999] ml-2">Fast</span>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <input type="checkbox" id="silent-clicking" 
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="silent-clicking" className="ml-2 text-sm text-[#E0E0E0]">
                  Silent clicking
                </label>
              </div>
              
              <div className="flex items-center mb-4">
                <input type="checkbox" id="force-click" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="force-click" className="ml-2 text-sm text-[#E0E0E0]">
                  Force Click and haptic feedback
                </label>
              </div>
              
              <div className="flex items-center mb-4">
                <input type="checkbox" id="tap-to-click" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="tap-to-click" className="ml-2 text-sm text-[#E0E0E0]">
                  Tap to click
                </label>
              </div>
              
              <div className="flex justify-center mt-8">
                <div className="relative w-48 h-32 bg-[#1A1A1A] rounded-lg border border-[#444] flex items-center justify-center">
                  <div className="w-36 h-24 bg-[#2A2A2A] rounded-md border border-[#555] flex items-center justify-center">
                    <span className="text-xs text-[#999]">Trackpad</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#444] rounded-full"></div>
                </div>
              </div>
              
              <p className="text-xs text-[#999] text-center mt-3">
                Click the trackpad to test settings. Force click by clicking then pressing firmly.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-sm font-medium text-[#E0E0E0] mb-3">Scroll & Zoom</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="natural-scrolling" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="natural-scrolling" className="ml-2 text-sm text-[#E0E0E0]">
                Natural scrolling
              </label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="zoom-in-out" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="zoom-in-out" className="ml-2 text-sm text-[#E0E0E0]">
                Zoom in or out: Pinch with two fingers
              </label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="smart-zoom" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="smart-zoom" className="ml-2 text-sm text-[#E0E0E0]">
                Smart zoom: Double-tap with two fingers
              </label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="rotate" defaultChecked
                className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
              />
              <label htmlFor="rotate" className="ml-2 text-sm text-[#E0E0E0]">
                Rotate: Rotate with two fingers
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-sm font-medium text-[#E0E0E0] mb-3">More Gestures</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#E0E0E0]">Swipe between pages</span>
              <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                <option>Scroll left or right with two fingers</option>
                <option>Swipe with three fingers</option>
                <option>Swipe with two or three fingers</option>
                <option>Off</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#E0E0E0]">Swipe between full-screen apps</span>
              <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                <option>Swipe left or right with four fingers</option>
                <option>Swipe left or right with three fingers</option>
                <option>Off</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#E0E0E0]">Mission Control</span>
              <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                <option>Swipe up with four fingers</option>
                <option>Swipe up with three fingers</option>
                <option>Off</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#E0E0E0]">App Exposé</span>
              <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                <option>Swipe down with four fingers</option>
                <option>Swipe down with three fingers</option>
                <option>Off</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#E0E0E0]">Launchpad</span>
              <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                <option>Pinch with thumb and three fingers</option>
                <option>Off</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#E0E0E0]">Show Desktop</span>
              <select className="bg-[#303030] border-none rounded-md px-3 py-1.5 text-sm text-[#E0E0E0]">
                <option>Spread with thumb and three fingers</option>
                <option>Off</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 