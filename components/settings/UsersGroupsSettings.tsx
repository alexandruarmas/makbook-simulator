import React, { useState } from "react";

const UsersGroupsSettings = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      username: "johndoe", 
      isAdmin: true, 
      isCurrentUser: true,
      avatar: "JD",
      lastLogin: "Today, 9:30 AM" 
    },
    { 
      id: 2, 
      name: "Guest User", 
      username: "guest", 
      isAdmin: false, 
      isCurrentUser: false,
      avatar: "GU",
      lastLogin: "Never" 
    },
    { 
      id: 3, 
      name: "Sarah Johnson", 
      username: "sarahj", 
      isAdmin: false, 
      isCurrentUser: false,
      avatar: "SJ",
      lastLogin: "Yesterday, 4:15 PM" 
    }
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: "Admin", members: ["johndoe"] },
    { id: 2, name: "Standard", members: ["guest", "sarahj"] },
    { id: 3, name: "Sharing Only", members: [] }
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [loginItemsEnabled, setLoginItemsEnabled] = useState(true);
  const [passwordHint, setPasswordHint] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [showAdminUsers, setShowAdminUsers] = useState(false);
  const [guestUser, setGuestUser] = useState(false);

  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Users & Groups</h1>
      
      <div className="bg-[#232323] rounded-xl overflow-hidden">
        <div className="flex">
          {/* Sidebar with users list */}
          <div className="w-64 border-r border-[#333] h-[500px] overflow-auto">
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-xs text-[#999] font-medium uppercase tracking-wide mb-2">Current User</h3>
              </div>
              
              <div className="space-y-2">
                {users.filter(u => u.isCurrentUser).map(user => (
                  <button 
                    key={user.id}
                    className={`w-full text-left px-3 py-2 rounded-md bg-[#0066FF] text-white flex items-center`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 text-white">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-white/70">Admin</div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 mb-4">
                <h3 className="text-xs text-[#999] font-medium uppercase tracking-wide mb-2">Other Users</h3>
              </div>
              
              <div className="space-y-2">
                {users.filter(u => !u.isCurrentUser).map(user => (
                  <button 
                    key={user.id}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-[#333] flex items-center ${selectedUser.id === user.id ? 'bg-[#303030]' : ''} text-[#E0E0E0]`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#444] flex items-center justify-center mr-3 text-[#E0E0E0]">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-[#999]">{user.isAdmin ? 'Admin' : 'Standard'}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-64 p-4 bg-[#232323] border-t border-[#333] flex items-center space-x-2">
              <button 
                className={`w-8 h-8 rounded-full ${unlocked ? 'bg-[#303030] hover:bg-[#3A3A3A]' : 'bg-[#444] opacity-50 cursor-not-allowed'} flex items-center justify-center text-[#E0E0E0]`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="w-8 h-8 rounded-full bg-[#303030] hover:bg-[#3A3A3A] flex items-center justify-center text-[#E0E0E0]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="border-l border-[#444] h-6 mx-1"></div>
              
              <button 
                className={`flex-1 px-3 py-1.5 rounded text-sm flex items-center justify-center ${unlocked ? 'bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0]' : 'bg-[#0066FF] hover:bg-[#0055DD] text-white'}`}
                onClick={() => setUnlocked(!unlocked)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  {unlocked ? (
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  ) : (
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  )}
                </svg>
                {unlocked ? "Lock" : "Unlock"}
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#303030] flex items-center justify-center mr-4 text-[#E0E0E0] text-xl">
                {selectedUser.avatar}
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#E0E0E0]">{selectedUser.name}</h2>
                <p className="text-sm text-[#999]">
                  {selectedUser.isAdmin ? 'Administrator' : 'Standard'} • Last login: {selectedUser.lastLogin}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Login Options</h3>
                <div className="bg-[#2A2A2A] rounded-lg p-4 space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-[#E0E0E0]">Allow user to login automatically</span>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="auto-login" 
                        className="peer sr-only" 
                        checked={autoLogin}
                        onChange={() => setAutoLogin(!autoLogin)}
                        disabled={!unlocked}
                      />
                      <label htmlFor="auto-login" className={`block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF] ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}></label>
                    </div>
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-[#E0E0E0]">Show password hints</span>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="password-hints" 
                        className="peer sr-only" 
                        checked={passwordHint}
                        onChange={() => setPasswordHint(!passwordHint)}
                        disabled={!unlocked}
                      />
                      <label htmlFor="password-hints" className={`block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF] ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}></label>
                    </div>
                  </label>
                  
                  <div className="pt-2">
                    <button 
                      className={`${unlocked ? 'bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0]' : 'bg-[#303030] opacity-50 cursor-not-allowed text-[#999]'} px-4 py-2 rounded text-sm`}
                      disabled={!unlocked}
                    >
                      Change Password...
                    </button>
                  </div>
                </div>
              </div>
              
              {selectedUser.isCurrentUser && (
                <div>
                  <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Login Items</h3>
                  <div className="bg-[#2A2A2A] rounded-lg p-4">
                    <label className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#E0E0E0]">Open at login</span>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          id="login-items" 
                          className="peer sr-only" 
                          checked={loginItemsEnabled}
                          onChange={() => setLoginItemsEnabled(!loginItemsEnabled)}
                        />
                        <label htmlFor="login-items" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                      </div>
                    </label>
                    
                    {loginItemsEnabled && (
                      <div className="mt-4 border border-[#444] rounded-md overflow-hidden">
                        <div className="bg-[#262626] p-2 text-xs text-[#999] uppercase tracking-wide font-medium flex">
                          <div className="w-6"></div>
                          <div className="flex-1">Item</div>
                          <div className="w-24">Kind</div>
                        </div>
                        <div className="divide-y divide-[#333]">
                          <div className="p-2 flex items-center text-sm">
                            <div className="w-6">
                              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0" />
                            </div>
                            <div className="flex-1 text-[#E0E0E0]">Dropbox</div>
                            <div className="w-24 text-[#999]">Application</div>
                          </div>
                          <div className="p-2 flex items-center text-sm">
                            <div className="w-6">
                              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0" />
                            </div>
                            <div className="flex-1 text-[#E0E0E0]">Calendar</div>
                            <div className="w-24 text-[#999]">Application</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {unlocked && selectedUser.isCurrentUser && (
                <div>
                  <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Advanced Options</h3>
                  <div className="bg-[#2A2A2A] rounded-lg p-4 space-y-4">
                    <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm w-full text-left">
                      Login Options...
                    </button>
                    <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm w-full text-left">
                      Change Home Directory...
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom toolbar */}
        <div className="bg-[#1D1D1D] p-3 border-t border-[#333] flex justify-between items-center">
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={showAdminUsers}
                onChange={() => setShowAdminUsers(!showAdminUsers)}
                className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
              />
              <span className="text-sm text-[#E0E0E0] ml-2">Show admin users</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={guestUser}
                onChange={() => setGuestUser(!guestUser)}
                className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
              />
              <span className="text-sm text-[#E0E0E0] ml-2">Enable Guest User</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-[#232323] rounded-xl p-5">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Groups</h2>
        <p className="text-sm text-[#999] mb-4">
          Groups are used to share files and folders with other users of this Mac or on your network.
        </p>
        <div className="flex items-center justify-between">
          <button className={`${unlocked ? 'bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0]' : 'bg-[#303030] opacity-50 cursor-not-allowed text-[#999]'} px-4 py-2 rounded text-sm`} disabled={!unlocked}>
            Manage Groups...
          </button>
          <button className={`${unlocked ? 'bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0]' : 'bg-[#303030] opacity-50 cursor-not-allowed text-[#999]'} px-4 py-2 rounded text-sm`} disabled={!unlocked}>
            Network Account Server...
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersGroupsSettings; 