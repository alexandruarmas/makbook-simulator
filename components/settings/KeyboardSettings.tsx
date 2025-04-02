import React from "react";

export default function KeyboardSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Keyboard</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Keyboard</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Key Repeat Rate</span>
                <div className="flex-1 ml-4 max-w-[200px]">
                  <input type="range" min="0" max="100" defaultValue="60" 
                    className="w-full h-2 rounded-lg appearance-none bg-[#444]" 
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Delay Until Repeat</span>
                <div className="flex-1 ml-4 max-w-[200px]">
                  <input type="range" min="0" max="100" defaultValue="40" 
                    className="w-full h-2 rounded-lg appearance-none bg-[#444]" 
                  />
                </div>
              </div>
              
              <div className="border-t border-[#333] pt-4">
                <div className="flex items-center">
                  <input type="checkbox" id="use-f-keys" defaultChecked
                    className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                  />
                  <label htmlFor="use-f-keys" className="ml-2 text-sm text-[#E0E0E0]">
                    Use F1, F2, etc. keys as standard function keys
                  </label>
                </div>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="keyboard-navigation" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="keyboard-navigation" className="ml-2 text-sm text-[#E0E0E0]">
                  Use keyboard navigation to move focus between controls
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Text</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="correct-spelling" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="correct-spelling" className="ml-2 text-sm text-[#E0E0E0]">
                  Correct spelling automatically
                </label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="capitalize" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="capitalize" className="ml-2 text-sm text-[#E0E0E0]">
                  Capitalize words automatically
                </label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="add-period" defaultChecked
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="add-period" className="ml-2 text-sm text-[#E0E0E0]">
                  Add period with double-space
                </label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="smart-quotes"
                  className="h-4 w-4 rounded border-[#555] bg-[#333] focus:ring-[#0066FF]"
                />
                <label htmlFor="smart-quotes" className="ml-2 text-sm text-[#E0E0E0]">
                  Use smart quotes and dashes
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Shortcuts</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Spotlight</span>
                <button className="px-3 py-1 bg-[#303030] text-[#E0E0E0] rounded-md text-sm">
                  ⌘ Space
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Screenshot</span>
                <button className="px-3 py-1 bg-[#303030] text-[#E0E0E0] rounded-md text-sm">
                  ⇧ ⌘ 3
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Copy</span>
                <button className="px-3 py-1 bg-[#303030] text-[#E0E0E0] rounded-md text-sm">
                  ⌘ C
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#E0E0E0]">Paste</span>
                <button className="px-3 py-1 bg-[#303030] text-[#E0E0E0] rounded-md text-sm">
                  ⌘ V
                </button>
              </div>
              
              <div className="flex justify-center">
                <button className="px-3 py-1 text-[#0066FF] text-sm font-medium">
                  Customize Shortcuts...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 