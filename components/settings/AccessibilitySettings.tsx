import React from "react";

export default function AccessibilitySettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Accessibility</h1>
      
      <div className="grid grid-cols-4 gap-6">
        {/* Left sidebar/categories */}
        <div className="col-span-1">
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-[#AEAEAE] uppercase mb-1">Vision</h2>
            <button className="w-full text-left text-[#E0E0E0] bg-blue-600 rounded-md px-3 py-1.5 text-sm">VoiceOver</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Zoom</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Display</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Spoken Content</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Descriptions</button>
            
            <h2 className="text-xs font-semibold text-[#AEAEAE] uppercase mt-4 mb-1">Hearing</h2>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Audio</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Captions</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">RTT</button>
            
            <h2 className="text-xs font-semibold text-[#AEAEAE] uppercase mt-4 mb-1">Motor</h2>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Voice Control</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Keyboard</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Pointer Control</button>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Switch Control</button>
            
            <h2 className="text-xs font-semibold text-[#AEAEAE] uppercase mt-4 mb-1">General</h2>
            <button className="w-full text-left text-[#E0E0E0] hover:bg-[#3A3A3A] rounded-md px-3 py-1.5 text-sm">Shortcut</button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-span-3">
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-medium text-[#E0E0E0]">VoiceOver</h2>
              <div className="flex items-center">
                <span className="text-sm text-[#E0E0E0] mr-3">Off</span>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-[#444444]">
                  <label htmlFor="voiceover-toggle" className="absolute left-0 w-6 h-6 mb-2 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer"></label>
                  <input type="checkbox" id="voiceover-toggle" name="voiceover-toggle" className="sr-only" />
                </div>
              </div>
            </div>
            
            <p className="text-[#AEAEAE] text-sm mb-5">
              VoiceOver gives audible descriptions of items on the screen and helps you navigate using the keyboard.
            </p>
            
            <div className="flex space-x-3 mb-4">
              <button className="bg-[#3A3A3A] text-[#E0E0E0] rounded px-3 py-1.5 text-sm hover:bg-[#4A4A4A]">
                Open VoiceOver Training...
              </button>
              <button className="bg-[#3A3A3A] text-[#E0E0E0] rounded px-3 py-1.5 text-sm hover:bg-[#4A4A4A]">
                VoiceOver Utility...
              </button>
            </div>
            
            <div className="bg-[#1E1E1E] p-3 rounded-lg text-sm text-[#AEAEAE] mb-5">
              Press Option-Command-F5 to show Accessibility controls.
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-[#E0E0E0] mb-3">VoiceOver speaks:</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="speak-system-notifications" className="mr-2" defaultChecked />
                  <label htmlFor="speak-system-notifications" className="text-[#E0E0E0] text-sm">System notifications and alerts</label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="speak-text-under-mouse" className="mr-2" defaultChecked />
                  <label htmlFor="speak-text-under-mouse" className="text-[#E0E0E0] text-sm">Text under mouse after delay</label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="speak-echo" className="mr-2" defaultChecked />
                  <label htmlFor="speak-echo" className="text-[#E0E0E0] text-sm">Speak items on the screen</label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="speak-keyboard" className="mr-2" defaultChecked />
                  <label htmlFor="speak-keyboard" className="text-[#E0E0E0] text-sm">Allow VoiceOver to be controlled with AppleScript</label>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-[#E0E0E0] mb-3">VoiceOver cursor:</h3>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#E0E0E0] text-sm">Cursor size:</span>
                  <div className="w-1/2">
                    <input type="range" className="w-full" defaultValue="70" />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="display-braille-panel" className="mr-2" defaultChecked />
                  <label htmlFor="display-braille-panel" className="text-[#E0E0E0] text-sm">Display braille panel</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 