import React, { useState } from "react";

const PasswordsSettings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample password data
  const passwords = [
    { id: 1, website: "apple.com", username: "john.doe@example.com", lastUsed: "Today", category: "web" },
    { id: 2, website: "amazon.com", username: "johndoe", lastUsed: "Yesterday", category: "web" },
    { id: 3, website: "netflix.com", username: "john.doe@example.com", lastUsed: "2 days ago", category: "web" },
    { id: 4, website: "WiFi Network", username: "Home Network", lastUsed: "1 week ago", category: "wifi" },
    { id: 5, website: "Github", username: "johndoe", lastUsed: "3 days ago", category: "web" },
    { id: 6, website: "Twitter", username: "johndoe", lastUsed: "1 month ago", category: "web" },
    { id: 7, website: "Bank of America", username: "john.doe", lastUsed: "Today", category: "financial" },
    { id: 8, website: "MySQL Server", username: "admin", lastUsed: "1 month ago", category: "app" },
  ];

  // Filter passwords based on search term and category
  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = password.website.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          password.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || password.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Passwords</h1>
      
      <div className="bg-[#232323] rounded-xl overflow-hidden">
        <div className="flex h-[500px]">
          {/* Sidebar */}
          <div className="w-64 border-r border-[#333] p-4 h-full flex flex-col">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#333] border-none text-[#E0E0E0] py-2 px-3 rounded-md focus:ring-2 focus:ring-[#0066FF] focus:outline-none pl-9"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#999] absolute top-3 left-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xs text-[#999] font-medium uppercase tracking-wide mb-2">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${selectedCategory === 'all' ? 'bg-[#0066FF] text-white' : 'text-[#E0E0E0] hover:bg-[#333]'}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Passwords
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${selectedCategory === 'web' ? 'bg-[#0066FF] text-white' : 'text-[#E0E0E0] hover:bg-[#333]'}`}
                    onClick={() => setSelectedCategory('web')}
                  >
                    Website & App Passwords
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${selectedCategory === 'financial' ? 'bg-[#0066FF] text-white' : 'text-[#E0E0E0] hover:bg-[#333]'}`}
                    onClick={() => setSelectedCategory('financial')}
                  >
                    Financial
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${selectedCategory === 'wifi' ? 'bg-[#0066FF] text-white' : 'text-[#E0E0E0] hover:bg-[#333]'}`}
                    onClick={() => setSelectedCategory('wifi')}
                  >
                    Wi-Fi Passwords
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${selectedCategory === 'app' ? 'bg-[#0066FF] text-white' : 'text-[#E0E0E0] hover:bg-[#333]'}`}
                    onClick={() => setSelectedCategory('app')}
                  >
                    App Passwords
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto">
              <button className="flex items-center text-[#0066FF] hover:underline text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create new password
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-[#E0E0E0]">
                {selectedCategory === 'all' ? 'All Passwords' : 
                 selectedCategory === 'web' ? 'Website & App Passwords' : 
                 selectedCategory === 'financial' ? 'Financial' : 
                 selectedCategory === 'wifi' ? 'Wi-Fi Passwords' : 'App Passwords'}
              </h2>
              <div className="text-sm text-[#999]">{filteredPasswords.length} items</div>
            </div>
            
            <div className="space-y-2">
              {filteredPasswords.length > 0 ? (
                filteredPasswords.map(password => (
                  <div 
                    key={password.id} 
                    className="bg-[#2A2A2A] rounded-md p-3 cursor-pointer hover:bg-[#333] transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white mr-3">
                        {password.website.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="text-[#E0E0E0] font-medium">{password.website}</div>
                        <div className="text-sm text-[#999]">{password.username}</div>
                      </div>
                      <div className="text-xs text-[#999]">{password.lastUsed}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#333] rounded-full mx-auto flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#999]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 5 5 0 015 5 1 1 0 102 0 7 7 0 00-7-7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-[#999]">No passwords found</p>
                  <p className="text-sm text-[#777] mt-1">Try a different search term or category</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom toolbar */}
        <div className="bg-[#1D1D1D] p-3 border-t border-[#333] flex justify-between items-center">
          <div>
            <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-3 py-1.5 rounded text-sm">Import...</button>
          </div>
          <div>
            <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-3 py-1.5 rounded text-sm mr-2">Password Options...</button>
            <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-3 py-1.5 rounded text-sm">Export...</button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-[#232323] rounded-xl p-5">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Password Security</h2>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#303030] flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#999]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-[#E0E0E0] font-medium">Security Recommendations</h3>
            <p className="text-sm text-[#999] mt-1">Check for passwords that are weak, reused, or have been involved in data breaches</p>
          </div>
        </div>
        <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">View Security Recommendations</button>
      </div>
    </div>
  );
};

export default PasswordsSettings; 