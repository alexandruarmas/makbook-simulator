import React, { useState } from "react";

const SpotlightSettings = () => {
  const [searchLocations, setSearchLocations] = useState([
    { id: 1, name: "Applications", checked: true },
    { id: 2, name: "Documents", checked: true },
    { id: 3, name: "System Files", checked: false },
    { id: 4, name: "Pictures", checked: true },
    { id: 5, name: "Music", checked: true },
    { id: 6, name: "Movies", checked: true },
    { id: 7, name: "Mail & Messages", checked: true },
    { id: 8, name: "Developer", checked: false },
    { id: 9, name: "Downloads", checked: true },
    { id: 10, name: "Desktop", checked: true },
    { id: 11, name: "iCloud Drive", checked: true },
  ]);

  const [excludedLocations, setExcludedLocations] = useState([
    { id: 1, name: "Time Machine Backups", path: "/Volumes/TimeMachine" },
    { id: 2, name: "System", path: "/System" },
  ]);

  const [shortcutEnabled, setShortcutEnabled] = useState(true);
  const [spotlight] = useState({ shortcut: "⌘ Space" });
  const [allowSpotlightSuggestions, setAllowSpotlightSuggestions] = useState(true);
  const [isReindexing, setIsReindexing] = useState(false);

  const toggleLocation = (id: number) => {
    setSearchLocations(searchLocations.map(location => 
      location.id === id ? { ...location, checked: !location.checked } : location
    ));
  };

  const removeExcludedLocation = (id: number) => {
    setExcludedLocations(excludedLocations.filter(location => location.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Spotlight</h1>
      
      <div className="bg-[#232323] rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-[#1D1D1D] border-b border-[#333]">
          <p className="text-sm text-[#999]">
            Spotlight helps you quickly find things on your Mac, get suggestions, and more.
          </p>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Search Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#2A2A2A] rounded-lg p-4">
              <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Search these categories:</h3>
              <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
                {searchLocations.map(location => (
                  <label key={location.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={location.checked}
                      onChange={() => toggleLocation(location.id)}
                      className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#E0E0E0] ml-2">{location.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="bg-[#2A2A2A] rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-[#E0E0E0]">Allow Spotlight Suggestions in:</h3>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="spotlight-suggestions" 
                    className="peer sr-only" 
                    checked={allowSpotlightSuggestions}
                    onChange={() => setAllowSpotlightSuggestions(!allowSpotlightSuggestions)}
                  />
                  <label htmlFor="spotlight-suggestions" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
              
              <div className="space-y-1 mb-3">
                <p className="text-sm text-[#999]">
                  Spotlight suggestions show suggestions from the Internet, iTunes, App Store, movie showtimes, locations nearby, and more.
                </p>
              </div>
              
              <button className="text-[#0077CC] text-sm hover:underline">
                About Spotlight Suggestions & Privacy...
              </button>
            </div>
          </div>
          
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Privacy</h2>
          
          <div className="bg-[#2A2A2A] rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Prevent Spotlight from searching these locations:</h3>
            
            <div className="border border-[#444] rounded-md overflow-hidden mb-4">
              <div className="bg-[#262626] p-2 text-xs text-[#999] uppercase tracking-wide font-medium">
                Excluded Items
              </div>
              
              {excludedLocations.length > 0 ? (
                <div className="divide-y divide-[#333]">
                  {excludedLocations.map(location => (
                    <div key={location.id} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#E0E0E0]">{location.name}</div>
                        <div className="text-xs text-[#999]">{location.path}</div>
                      </div>
                      <button 
                        onClick={() => removeExcludedLocation(location.id)}
                        className="p-1 text-[#999] hover:text-[#E0E0E0]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-sm text-[#999] text-center">
                  No excluded locations
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-3 py-1.5 rounded text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add
              </button>
              <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-3 py-1.5 rounded text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Remove
              </button>
            </div>
          </div>
          
          <div className="bg-[#2A2A2A] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-[#E0E0E0]">Keyboard Shortcuts</h3>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="shortcut-toggle" 
                  className="peer sr-only" 
                  checked={shortcutEnabled}
                  onChange={() => setShortcutEnabled(!shortcutEnabled)}
                />
                <label htmlFor="shortcut-toggle" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-[#333]">
              <div className="text-sm text-[#E0E0E0]">Spotlight</div>
              <div className={`px-2 py-1 bg-[#303030] rounded text-sm text-[#E0E0E0] ${!shortcutEnabled && 'opacity-50'}`}>
                {spotlight.shortcut}
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="text-sm text-[#E0E0E0]">Spotlight file window</div>
              <div className={`px-2 py-1 bg-[#303030] rounded text-sm text-[#E0E0E0] ${!shortcutEnabled && 'opacity-50'}`}>
                Option + ⌘ Space
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-[#1D1D1D] border-t border-[#333] flex justify-between">
          <button 
            className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm flex items-center"
            onClick={() => setIsReindexing(true)}
          >
            {isReindexing ? (
              <>
                <div className="w-4 h-4 border-2 border-[#E0E0E0] border-t-transparent rounded-full animate-spin mr-2"></div>
                Reindexing...
              </>
            ) : (
              "Reindex Spotlight"
            )}
          </button>
          
          <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">
            Restore Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotlightSettings; 