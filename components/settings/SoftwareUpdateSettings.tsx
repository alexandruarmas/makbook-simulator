import React, { useState } from "react";

const SoftwareUpdateSettings = () => {
  const [automaticUpdates, setAutomaticUpdates] = useState(true);
  const [downloadNewUpdates, setDownloadNewUpdates] = useState(true);
  const [installMacOSUpdates, setInstallMacOSUpdates] = useState(true);
  const [installAppUpdates, setInstallAppUpdates] = useState(true);
  const [securityResponses, setSecurityResponses] = useState(true);
  const [installSystemFiles, setInstallSystemFiles] = useState(true);
  const [checkingForUpdates, setCheckingForUpdates] = useState(false);

  const handleCheckForUpdates = () => {
    setCheckingForUpdates(true);
    // Simulate checking for updates
    setTimeout(() => {
      setCheckingForUpdates(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Software Update</h1>
      
      <div className="space-y-6">
        {/* Current macOS version */}
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-[#E0E0E0]">CherryOS Blossom</h2>
              <p className="text-sm text-[#999] mt-1">Version 1.0</p>
            </div>
            <div className="flex gap-3">
              <button 
                className={`bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm ${checkingForUpdates ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleCheckForUpdates}
                disabled={checkingForUpdates}
              >
                {checkingForUpdates ? 'Checking...' : 'Check for Updates'}
              </button>
              <button className="bg-[#0066FF] hover:bg-[#0055DD] text-white px-4 py-2 rounded text-sm">
                More Info...
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-[#E0E0E0]">Your Mac is up to date</p>
          </div>
        </div>
        
        {/* Advanced Options */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Automatic Updates</h2>
          <div className="bg-[#232323] rounded-xl p-5 space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-[#E0E0E0]">Automatically keep my Mac up to date</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="auto-updates" 
                  className="peer sr-only" 
                  checked={automaticUpdates}
                  onChange={() => setAutomaticUpdates(!automaticUpdates)}
                />
                <label htmlFor="auto-updates" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </label>
            
            {automaticUpdates && (
              <div className="pl-5 border-l border-[#444] ml-2 mt-3 space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Check for updates</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="check-updates" 
                      className="peer sr-only" 
                      checked={true}
                      readOnly
                    />
                    <label htmlFor="check-updates" className="block w-10 h-6 bg-[#333] rounded-full cursor-not-allowed before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>
                
                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Download new updates when available</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="download-updates" 
                      className="peer sr-only" 
                      checked={downloadNewUpdates}
                      onChange={() => setDownloadNewUpdates(!downloadNewUpdates)}
                    />
                    <label htmlFor="download-updates" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>
                
                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Install macOS updates</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="install-macos" 
                      className="peer sr-only" 
                      checked={installMacOSUpdates}
                      onChange={() => setInstallMacOSUpdates(!installMacOSUpdates)}
                    />
                    <label htmlFor="install-macos" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>
                
                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Install app updates from the App Store</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="install-apps" 
                      className="peer sr-only" 
                      checked={installAppUpdates}
                      onChange={() => setInstallAppUpdates(!installAppUpdates)}
                    />
                    <label htmlFor="install-apps" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>
                
                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Install security responses and system files</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="install-security" 
                      className="peer sr-only" 
                      checked={securityResponses}
                      onChange={() => setSecurityResponses(!securityResponses)}
                    />
                    <label htmlFor="install-security" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>
              </div>
            )}
            
            <div className="text-sm text-[#999] mt-2">
              Your Mac will check for updates automatically and notify you when they're available. You can install updates from 
              Software Update preferences.
            </div>
          </div>
        </div>
        
        {/* Advanced button */}
        <div className="bg-[#232323] rounded-xl p-5">
          <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">
            Advanced...
          </button>
        </div>
        
        {/* Update History */}
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-[#E0E0E0]">Update History</h2>
            <button className="text-[#0066FF] hover:underline text-sm">Show History</button>
          </div>
          <p className="text-sm text-[#999] mt-1">
            The last update was installed on April 1, 2023.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoftwareUpdateSettings; 