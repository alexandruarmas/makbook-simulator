import React from "react";

export default function FamilySettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Family</h1>
      
      <div className="bg-[#232323] rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#303030] flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium text-[#E0E0E0]">Family Sharing</h2>
            <p className="text-sm text-[#999] mt-1">
              Family Sharing makes it easy for you and up to five family members to share Apple services, subscriptions, and more—all without sharing an Apple ID.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-[#1c1c1c] rounded-lg mb-4">
          <div>
            <h3 className="text-sm font-medium text-[#E0E0E0]">You are the family organizer</h3>
            <p className="text-xs text-[#999] mt-1">Sam Smith • sam.smith@icloud.com</p>
          </div>
          <button className="px-3 py-1.5 bg-[#303030] text-[#E0E0E0] text-sm rounded-md hover:bg-[#3A3A3A] transition-colors mt-3 md:mt-0">
            View Family Settings
          </button>
        </div>
      </div>
      
      {/* Family Members */}
      <div className="bg-[#232323] rounded-xl p-6 mb-6">
        <h2 className="text-base font-medium text-[#E0E0E0] mb-4">Family Members</h2>
        
        <div className="space-y-4">
          {/* Family Organizer */}
          <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Sam Smith</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-[#999]">Organizer</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#999]"></span>
                  <span className="text-xs text-[#999]">Adult</span>
                </div>
              </div>
            </div>
            <button className="text-[#0066FF] text-sm hover:underline">
              Edit
            </button>
          </div>
          
          {/* Family Member 1 */}
          <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Alex Smith</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-[#999]">Member</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#999]"></span>
                  <span className="text-xs text-[#999]">Adult</span>
                </div>
              </div>
            </div>
            <button className="text-[#0066FF] text-sm hover:underline">
              Edit
            </button>
          </div>
          
          {/* Family Member 2 */}
          <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Michael Smith</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-[#999]">Member</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#999]"></span>
                  <span className="text-xs text-[#999]">Child</span>
                </div>
              </div>
            </div>
            <button className="text-[#0066FF] text-sm hover:underline">
              Edit
            </button>
          </div>
          
          {/* Add Family Member */}
          <button className="w-full flex items-center justify-center gap-2 p-3 bg-[#303030] text-[#E0E0E0] text-sm rounded-lg hover:bg-[#3A3A3A] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>Add Family Member</span>
          </button>
        </div>
      </div>
      
      {/* Shared Features */}
      <div className="bg-[#232323] rounded-xl p-6">
        <h2 className="text-base font-medium text-[#E0E0E0] mb-4">Shared with Your Family</h2>
        
        <div className="space-y-4">
          {/* Shared Subscriptions */}
          <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FC2C55] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 12.5l3 3 8.5-8.5"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Apple One</h3>
                <p className="text-xs text-[#999]">Premier Plan</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#999]">Shared</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Shared Purchases */}
          <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Purchases & Subscriptions</h3>
                <p className="text-xs text-[#999]">Apps, music, movies, and more</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#999]">Shared</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Screen Time */}
          <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6FC13E] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0]">Screen Time</h3>
                <p className="text-xs text-[#999]">Manage family screen time</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#999]">Configure</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 