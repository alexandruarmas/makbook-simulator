import React, { useState } from "react";

const InternetAccountsSettings = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "iCloud", icon: "cloud", isActive: true, connected: true },
    { id: 2, name: "Google", icon: "google", isActive: true, connected: true },
    { id: 3, name: "Microsoft", icon: "microsoft", isActive: false, connected: false },
    { id: 4, name: "Twitter", icon: "twitter", isActive: false, connected: false },
    { id: 5, name: "Facebook", icon: "facebook", isActive: false, connected: false },
    { id: 6, name: "LinkedIn", icon: "linkedin", isActive: false, connected: false },
  ]);

  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  const toggleAccount = (id: number) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, isActive: !account.isActive } : account
    ));
  };

  const getIconForService = (icon: string) => {
    switch (icon) {
      case 'cloud':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0066FF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
          </svg>
        );
      case 'google':
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M12 11v2h2.8c-.2.7-.8 2-2.8 2-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1c1 0 1.6.4 1.9.7l1.9-1.8C14.4 6.4 13.3 6 12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6c3.5 0 5.8-2.5 5.8-5.9 0-.5-.1-.9-.2-1.1H12z"/>
          </svg>
        );
      case 'microsoft':
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path fill="#F25022" d="M11 11H4V4h7z"/>
            <path fill="#00A4EF" d="M11 20H4v-7h7z"/>
            <path fill="#7FBA00" d="M20 11h-7V4h7z"/>
            <path fill="#FFB900" d="M20 20h-7v-7h7z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className="h-6 w-6 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="h-6 w-6 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="h-6 w-6 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#999]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Internet Accounts</h1>
      
      <div className="bg-[#232323] rounded-xl overflow-hidden">
        <div className="flex h-[500px]">
          {/* Sidebar with accounts list */}
          <div className="w-64 border-r border-[#333] overflow-auto">
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-xs text-[#999] font-medium uppercase tracking-wide mb-2">Internet Accounts</h3>
              </div>
              
              <ul className="space-y-1">
                {accounts.map(account => (
                  <li key={account.id}>
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-md hover:bg-[#333] flex items-center ${selectedAccount.id === account.id ? 'bg-[#0066FF] text-white' : 'text-[#E0E0E0]'}`}
                      onClick={() => setSelectedAccount(account)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedAccount.id === account.id ? 'bg-white/20' : 'bg-[#333]'}`}>
                        {getIconForService(account.icon)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{account.name}</div>
                        <div className={`text-xs ${selectedAccount.id === account.id ? 'text-white/70' : 'text-[#999]'}`}>
                          {account.connected ? 'Connected' : 'Not connected'}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="absolute bottom-0 left-0 w-64 p-4 bg-[#232323] border-t border-[#333]">
              <button className="flex items-center text-[#0066FF] hover:underline text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Account
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center mr-4">
                {getIconForService(selectedAccount.icon)}
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#E0E0E0]">{selectedAccount.name}</h2>
                <p className="text-sm text-[#999]">
                  {selectedAccount.connected ? 'Account connected' : 'Account not connected'}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {selectedAccount.connected && (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Account Details</h3>
                    <div className="bg-[#2A2A2A] rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-[#999]">Email</span>
                        <span className="text-sm text-[#E0E0E0]">user@example.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#999]">Account ID</span>
                        <span className="text-sm text-[#E0E0E0]">user_12345</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Enable Services</h3>
                    <div className="bg-[#2A2A2A] rounded-lg p-4 space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-[#E0E0E0]">Contacts</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="contacts-sync" 
                            className="peer sr-only" 
                            defaultChecked={selectedAccount.id === 1 || selectedAccount.id === 2} 
                          />
                          <label htmlFor="contacts-sync" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                        </div>
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-[#E0E0E0]">Calendars</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="calendar-sync" 
                            className="peer sr-only" 
                            defaultChecked={selectedAccount.id === 1 || selectedAccount.id === 2}
                          />
                          <label htmlFor="calendar-sync" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                        </div>
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-[#E0E0E0]">Mail</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="mail-sync" 
                            className="peer sr-only" 
                            defaultChecked={selectedAccount.id === 1 || selectedAccount.id === 2}
                          />
                          <label htmlFor="mail-sync" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                        </div>
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-[#E0E0E0]">Notes</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="notes-sync" 
                            className="peer sr-only" 
                            defaultChecked={selectedAccount.id === 1}
                          />
                          <label htmlFor="notes-sync" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                        </div>
                      </label>
                      
                      {selectedAccount.id === 1 && (
                        <label className="flex items-center justify-between">
                          <span className="text-sm text-[#E0E0E0]">Keychain</span>
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              id="keychain-sync" 
                              className="peer sr-only" 
                              defaultChecked 
                            />
                            <label htmlFor="keychain-sync" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">
                      Account Details...
                    </button>
                    <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">
                      Sign Out
                    </button>
                  </div>
                </>
              )}
              
              {!selectedAccount.connected && (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-[#333] flex items-center justify-center mx-auto mb-4">
                    {getIconForService(selectedAccount.icon)}
                  </div>
                  <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">Connect to {selectedAccount.name}</h3>
                  <p className="text-sm text-[#999] mb-6 max-w-lg mx-auto">
                    Sign in to your {selectedAccount.name} account to sync your emails, contacts, calendars, and more.
                  </p>
                  <button className="bg-[#0066FF] hover:bg-[#0055DD] text-white px-6 py-2 rounded-md text-sm">
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-[#232323] rounded-xl p-5">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Internet Account Privacy</h2>
        <p className="text-sm text-[#999] mb-4">
          Internet account information is used by apps on your Mac according to the privacy settings you've set for each app.
        </p>
        <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">
          Privacy Preferences...
        </button>
      </div>
    </div>
  );
};

export default InternetAccountsSettings; 