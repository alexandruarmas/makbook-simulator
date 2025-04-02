import React from "react";

export default function SoundSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Sound</h1>
      
      <div className="space-y-6">
        {/* Sound Effects */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Sound Effects</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Alert sound:</span>
              <select className="bg-[#333333] text-[#E0E0E0] rounded border border-[#444444] px-3 py-1">
                <option>Basso</option>
                <option>Blow</option>
                <option>Bottle</option>
                <option>Frog</option>
                <option>Funk</option>
                <option>Glass</option>
                <option>Hero</option>
                <option>Morse</option>
                <option>Ping</option>
                <option>Pop</option>
                <option>Purr</option>
                <option>Sosumi</option>
                <option>Submarine</option>
                <option>Tink</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Alert volume:</span>
              <div className="flex items-center w-56">
                <span className="text-[#E0E0E0] mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 14H3C2.44772 14 2 13.5523 2 13V11C2 10.4477 2.44772 10 3 10H5L9 6H10V18H9L5 14Z" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input type="range" className="w-full" />
                <span className="text-[#E0E0E0] ml-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 14H3C2.44772 14 2 13.5523 2 13V11C2 10.4477 2.44772 10 3 10H5L9 6H10V18H9L5 14Z" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 10.8944C14.5 11.3148 14.8 12.1148 14.8 12.8944C14.8 13.6944 14.5 14.4944 14 14.8944" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8.89441C18 9.79442 18.5 11.2944 18.5 12.8944C18.5 14.4944 18 15.9944 17 16.8944" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            
            <div className="flex items-center mt-2">
              <input type="checkbox" id="play-sound-effects" className="mr-2" defaultChecked />
              <label htmlFor="play-sound-effects" className="text-[#E0E0E0]">Play sound effects through: Internal Speakers</label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="play-user-interface-sounds" className="mr-2" defaultChecked />
              <label htmlFor="play-user-interface-sounds" className="text-[#E0E0E0]">Play user interface sound effects</label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="play-feedback-when-changing-volume" className="mr-2" defaultChecked />
              <label htmlFor="play-feedback-when-changing-volume" className="text-[#E0E0E0]">Play feedback when volume is changed</label>
            </div>
          </div>
        </div>
        
        {/* Output */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Output</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Select a device for sound output:</span>
              <select className="bg-[#333333] text-[#E0E0E0] rounded border border-[#444444] px-3 py-1">
                <option>Internal Speakers</option>
                <option>External Headphones</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Output volume:</span>
              <div className="flex items-center w-56">
                <span className="text-[#E0E0E0] mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 14H3C2.44772 14 2 13.5523 2 13V11C2 10.4477 2.44772 10 3 10H5L9 6H10V18H9L5 14Z" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input type="range" className="w-full" defaultValue="75" />
                <span className="text-[#E0E0E0] ml-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 14H3C2.44772 14 2 13.5523 2 13V11C2 10.4477 2.44772 10 3 10H5L9 6H10V18H9L5 14Z" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 10.8944C14.5 11.3148 14.8 12.1148 14.8 12.8944C14.8 13.6944 14.5 14.4944 14 14.8944" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8.89441C18 9.79442 18.5 11.2944 18.5 12.8944C18.5 14.4944 18 15.9944 17 16.8944" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="mute" className="mr-2" />
              <label htmlFor="mute" className="text-[#E0E0E0]">Mute</label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Balance:</span>
              <div className="flex items-center w-56">
                <span className="text-[#E0E0E0] mr-2">Left</span>
                <input type="range" className="w-full" defaultValue="50" />
                <span className="text-[#E0E0E0] ml-2">Right</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Input */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Input</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Select a device for sound input:</span>
              <select className="bg-[#333333] text-[#E0E0E0] rounded border border-[#444444] px-3 py-1">
                <option>Internal Microphone</option>
                <option>External Microphone</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Input volume:</span>
              <div className="flex items-center w-56">
                <span className="text-[#E0E0E0] mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19V23" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 23H16" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input type="range" className="w-full" defaultValue="50" />
              </div>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="input-mute" className="mr-2" />
              <label htmlFor="input-mute" className="text-[#E0E0E0]">Mute</label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#E0E0E0]">Input level:</span>
              <div className="w-56 h-4 bg-[#333333] rounded-full overflow-hidden">
                <div className="bg-[#4CAF50] h-full w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 