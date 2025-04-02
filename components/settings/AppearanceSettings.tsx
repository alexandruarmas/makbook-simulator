import React from "react";

export default function AppearanceSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Appearance</h1>
      
      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Appearance</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#1E1E1E] border border-[#444444] rounded-lg p-3 cursor-pointer relative">
              <div className="bg-gray-800 h-16 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
              <div className="absolute top-2 right-2 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-center text-sm text-[#E0E0E0] mt-2">Dark</p>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#444444] rounded-lg p-3 cursor-pointer">
              <div className="bg-gray-200 h-16 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <p className="text-center text-sm text-[#E0E0E0] mt-2">Light</p>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#444444] rounded-lg p-3 cursor-pointer">
              <div className="h-16 rounded mb-2 bg-gradient-to-r from-gray-200 to-gray-200 dark:from-gray-800 dark:to-gray-800"></div>
              <div className="h-4 w-2/3 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-700 dark:to-gray-700 rounded mb-1"></div>
              <div className="h-4 w-1/2 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-700 dark:to-gray-700 rounded"></div>
              <p className="text-center text-sm text-[#E0E0E0] mt-2">Auto</p>
            </div>
          </div>
        </div>
        
        {/* Accent Color */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Accent color</h2>
          
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-orange-500 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-500 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-blue-400 cursor-pointer"></div>
          </div>
          
          <div className="mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-[#E0E0E0]">Multicolor</span>
            </label>
          </div>
        </div>
        
        {/* Highlight color */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Highlight color</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-[#E0E0E0]">Highlight color:</span>
            <select className="bg-[#333333] text-[#E0E0E0] rounded border border-[#444444] px-3 py-1">
              <option>Blue</option>
              <option>Purple</option>
              <option>Pink</option>
              <option>Red</option>
              <option>Orange</option>
              <option>Yellow</option>
              <option>Green</option>
              <option>Graphite</option>
            </select>
          </div>
        </div>
        
        {/* Sidebar size */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Sidebar icon size</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-[#E0E0E0]">Size:</span>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="size" className="mr-2" />
                <span className="text-[#E0E0E0]">Small</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="size" className="mr-2" defaultChecked />
                <span className="text-[#E0E0E0]">Medium</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="size" className="mr-2" />
                <span className="text-[#E0E0E0]">Large</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Additional options */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Additional options</h2>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-[#E0E0E0]">Allow wallpaper tinting in windows</span>
            </label>
            
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-[#E0E0E0]">Show scroll bars: Automatically based on mouse or trackpad</span>
            </label>
            
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-[#E0E0E0]">Click in the scroll bar to: Jump to the spot that's clicked</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
} 