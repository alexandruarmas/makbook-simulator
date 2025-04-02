import React, { useState } from "react";

const MouseSettings = () => {
  const [scrollDirection, setScrollDirection] = useState("natural");
  const [trackingSpeed, setTrackingSpeed] = useState(5);
  const [doubleClickSpeed, setDoubleClickSpeed] = useState(3);
  const [primaryMouseButton, setPrimaryMouseButton] = useState("left");
  const [enableSecondaryClick, setEnableSecondaryClick] = useState(true);
  const [smartZoom, setSmartZoom] = useState(true);
  const [rotateAccess, setRotateAccess] = useState(true);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Mouse</h1>
      
      <div className="space-y-6">
        {/* Point & Click Section */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Point & Click</h2>
          <div className="bg-[#232323] rounded-xl p-5 space-y-5">
            {/* Primary mouse button */}
            <div className="space-y-3">
              <div className="font-medium text-[#E0E0E0] mb-1">Primary mouse button</div>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={primaryMouseButton === "left"}
                    onChange={() => setPrimaryMouseButton("left")}
                    className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#E0E0E0]">Left</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={primaryMouseButton === "right"}
                    onChange={() => setPrimaryMouseButton("right")}
                    className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#E0E0E0]">Right</span>
                </label>
              </div>
            </div>

            {/* Secondary click */}
            <div className="space-y-1">
              <label className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Secondary click</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="secondary-click" 
                    className="peer sr-only" 
                    checked={enableSecondaryClick}
                    onChange={() => setEnableSecondaryClick(!enableSecondaryClick)}
                  />
                  <label htmlFor="secondary-click" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </label>
              <p className="text-xs text-[#999]">Click with two fingers or click on the right side</p>
            </div>

            {/* Smart zoom */}
            <div className="space-y-1">
              <label className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Smart zoom</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="smart-zoom" 
                    className="peer sr-only" 
                    checked={smartZoom}
                    onChange={() => setSmartZoom(!smartZoom)}
                  />
                  <label htmlFor="smart-zoom" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </label>
              <p className="text-xs text-[#999]">Double-tap with one finger to zoom</p>
            </div>

            {/* Rotate */}
            <div className="space-y-1">
              <label className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Rotate</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="rotate" 
                    className="peer sr-only" 
                    checked={rotateAccess}
                    onChange={() => setRotateAccess(!rotateAccess)}
                  />
                  <label htmlFor="rotate" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </label>
              <p className="text-xs text-[#999]">Rotate with two fingers</p>
            </div>
          </div>
        </div>

        {/* More Gestures Section */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">More Gestures</h2>
          <div className="bg-[#232323] rounded-xl p-5 space-y-5">
            {/* Tracking speed */}
            <div>
              <div className="font-medium text-[#E0E0E0] mb-2">Tracking speed</div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#999]">Slow</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={trackingSpeed}
                  onChange={(e) => setTrackingSpeed(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-[#424242] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <span className="text-xs text-[#999]">Fast</span>
              </div>
            </div>

            {/* Double-click speed */}
            <div>
              <div className="font-medium text-[#E0E0E0] mb-2">Double-click speed</div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#999]">Slow</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={doubleClickSpeed}
                  onChange={(e) => setDoubleClickSpeed(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-[#424242] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <span className="text-xs text-[#999]">Fast</span>
              </div>
            </div>

            {/* Scrolling direction */}
            <div>
              <div className="font-medium text-[#E0E0E0] mb-3">Scrolling direction</div>
              <div className="flex flex-col space-y-3">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={scrollDirection === "natural"}
                    onChange={() => setScrollDirection("natural")}
                    className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#E0E0E0]">Natural: Content tracks finger movement</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={scrollDirection === "standard"}
                    onChange={() => setScrollDirection("standard")}
                    className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#E0E0E0]">Standard: Content moves in the opposite direction</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Options and Accessibility Section */}
        <div>
          <div className="flex justify-between gap-4">
            <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">Mouse & Trackpad Preferences...</button>
            <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">Accessibility Preferences...</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MouseSettings; 