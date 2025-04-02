import React, { useState } from "react";

interface SharingService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function Sharing() {
  const [computerName, setComputerName] = useState("MacBook Pro");
  const [localName, setLocalName] = useState("MacBook-Pro.local");
  const [editingName, setEditingName] = useState(false);
  
  const [services, setServices] = useState<SharingService[]>([
    {
      id: "screen-sharing",
      name: "Screen Sharing",
      description: "Allow users to access this computer's screen remotely",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      enabled: false
    },
    {
      id: "file-sharing",
      name: "File Sharing",
      description: "Allow users to access shared folders on this computer",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      ),
      enabled: true
    },
    {
      id: "media-sharing",
      name: "Media Sharing",
      description: "Share media libraries with other devices on your network",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
      enabled: false
    },
    {
      id: "printer-sharing",
      name: "Printer Sharing",
      description: "Share printers connected to this computer",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      ),
      enabled: false
    },
    {
      id: "remote-login",
      name: "Remote Login",
      description: "Allow users to access this computer remotely using SSH",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      enabled: false
    },
    {
      id: "remote-management",
      name: "Remote Management",
      description: "Allow remote management of this computer using Apple Remote Desktop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      enabled: false
    },
    {
      id: "airdrop",
      name: "AirDrop",
      description: "Allow users to send files to this computer via AirDrop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      enabled: true
    }
  ]);
  
  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, enabled: !service.enabled } : service
    ));
  };
  
  const saveComputerName = () => {
    setEditingName(false);
    // Calculate local name based on computer name
    setLocalName(`${computerName.replace(/\s+/g, '-')}.local`);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Sharing</h1>
      
      <div className="space-y-6">
        {/* Computer Name */}
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#E0E0E0]">Computer Name</h2>
              {!editingName ? (
                <button 
                  className="text-[#0066FF] text-sm hover:underline"
                  onClick={() => setEditingName(true)}
                >
                  Edit
                </button>
              ) : (
                <button 
                  className="text-[#0066FF] text-sm hover:underline"
                  onClick={saveComputerName}
                >
                  Save
                </button>
              )}
            </div>
            
            {!editingName ? (
              <div className="mt-2 text-[#E0E0E0]">{computerName}</div>
            ) : (
              <input
                type="text"
                value={computerName}
                onChange={(e) => setComputerName(e.target.value)}
                className="mt-2 w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]"
                placeholder="Computer Name"
              />
            )}
            <div className="mt-1 text-sm text-[#999]">
              Other devices on your local network can reach this computer at:
              <span className="block mt-1 font-mono bg-[#1A1A1A] px-2 py-1 rounded">
                {localName}
              </span>
            </div>
          </div>
        </div>
        
        {/* Sharing Services */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Services</h2>
          <div className="bg-[#232323] rounded-xl overflow-hidden">
            <div className="divide-y divide-[#333]">
              {services.map((service) => (
                <div key={service.id} className="p-4 flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#303030] flex items-center justify-center mr-4 text-[#E0E0E0]">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#E0E0E0] font-medium">{service.name}</h3>
                    <p className="text-sm text-[#999] mt-0.5">{service.description}</p>
                  </div>
                  <div className="relative ml-4">
                    <input 
                      type="checkbox" 
                      id={`toggle-${service.id}`} 
                      className="peer sr-only" 
                      checked={service.enabled}
                      onChange={() => toggleService(service.id)}
                    />
                    <label 
                      htmlFor={`toggle-${service.id}`} 
                      className="block w-12 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6 peer-checked:bg-[#0066FF]"
                    ></label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Network Info */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Network</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-[#303030] flex items-center justify-center mr-3 text-[#0066FF]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <div>
                <div className="text-[#E0E0E0] font-medium">Wi-Fi</div>
                <div className="text-xs text-[#999]">Connected • 192.168.1.5</div>
              </div>
              <button className="ml-auto px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
                Network Preferences...
              </button>
            </div>
            <div className="text-sm text-[#999] mt-2">
              Sharing services are available over Wi-Fi. For more security, you can
              limit access to specific users for each service.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 