import React from "react";

export default function CherryIDSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Cherry ID</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-3">
              <img 
                src="https://i.ibb.co/M4pgXXJ/Leonardo-Phoenix-10-A-luminously-sleek-logo-the-name-Alexandru-3.jpg" 
                alt="Sam Smith profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-[#E0E0E0]">Alexandru Armas</h3>
            <p className="text-sm text-[#999]">alexandruarmas02@gmail.com</p>
            <button className="mt-4 px-3 py-1.5 bg-[#303030] text-[#E0E0E0] text-sm rounded-md hover:bg-[#3A3A3A] transition-colors w-full max-w-[200px] text-center">
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Main Settings Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* CherryCloud */}
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E94C2B] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.5 19.25C18.9497 19.25 20.1325 18.0773 20.25 16.6361C20.364 15.2443 19.4141 14 17.9149 14C17.9149 10.5 15.0149 9.5 12.9149 12C12.9149 8.5 11.4149 5 6.91994 5C3.91994 5 2.91494 8.5 2.91494 10.75C2.91494 13 3.1017 14.25 6.41493 14.25C4.5 14.25 3.5 16 3.75 17.5C4 19 5.25 19.25 6.75 19.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-medium text-[#E0E0E0]">CherryCloud</h3>
                  <p className="text-xs text-[#999]">199.5 GB available of 2 TB</p>
                </div>
              </div>
              <button className="text-[#E94C2B] text-sm hover:underline">Manage</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-[#1c1c1c] rounded-lg">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span className="text-sm text-[#E0E0E0]">Photos</span>
                </div>
                <div className="relative">
                  <input type="checkbox" id="photos" className="peer sr-only" defaultChecked />
                  <label htmlFor="photos" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#E94C2B]"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1c1c1c] rounded-lg">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <span className="text-sm text-[#E0E0E0]">CherryCloud Drive</span>
                </div>
                <div className="relative">
                  <input type="checkbox" id="icloud-drive" className="peer sr-only" defaultChecked />
                  <label htmlFor="icloud-drive" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#E94C2B]"></label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Media & Purchases */}
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#FC3B6F] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a6 6 0 0 0-6 6v8a6 6 0 0 0 12 0V8a6 6 0 0 0-6-6Z"></path>
                  <path d="M4.5 14H3a5 5 0 0 0 10 0h-1.5"></path>
                  <path d="M20.3 18.1a9 9 0 0 1-16.6 0"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-[#E0E0E0]">Media & Purchases</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Payment Method</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#999]">Visa •••• 4321</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Shipping Address</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#999]">123 Cherry St</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Country/Region</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#999]">United States</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Password & Security */}
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#6FC13E] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-[#E0E0E0]">Password & Security</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Password</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#999]">Last changed May 2023</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]">Two-Factor Authentication</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#999]">On</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
              
              <button className="w-full mt-2 px-3 py-1.5 bg-[#303030] text-[#E0E0E0] text-sm rounded-md hover:bg-[#3A3A3A] transition-colors">
                Manage Security Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 