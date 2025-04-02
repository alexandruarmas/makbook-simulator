import React, { useState } from "react";

interface Extension {
  id: string;
  name: string;
  developer: string;
  icon: string;
  description: string;
  enabled: boolean;
  permissions: string[];
}

export default function Extensions() {
  const [category, setCategory] = useState<string>("installed");
  const [selectedExtension, setSelectedExtension] = useState<string | null>(null);
  
  const extensionCategories = [
    { id: "installed", name: "Installed Extensions" },
    { id: "sharing", name: "Sharing" },
    { id: "actions", name: "Actions" },
    { id: "photos", name: "Photos" },
    { id: "finder", name: "Finder" },
    { id: "safari", name: "Safari" }
  ];
  
  const extensions: Extension[] = [
    {
      id: "com.apple.share.mail",
      name: "Mail",
      developer: "Apple",
      icon: "📧",
      description: "Share content via Mail",
      enabled: true,
      permissions: ["Access to selected content", "Send emails"]
    },
    {
      id: "com.apple.share.messages",
      name: "Messages",
      developer: "Apple",
      icon: "💬",
      description: "Share content via Messages",
      enabled: true,
      permissions: ["Access to selected content", "Send messages"]
    },
    {
      id: "com.apple.share.airdrop",
      name: "AirDrop",
      developer: "Apple",
      icon: "📡",
      description: "Share content with nearby Apple devices",
      enabled: true,
      permissions: ["Access to selected content", "Bluetooth access"]
    },
    {
      id: "com.apple.share.notes",
      name: "Notes",
      developer: "Apple",
      icon: "📝",
      description: "Add content to Notes",
      enabled: true,
      permissions: ["Access to selected content", "Create Notes"]
    },
    {
      id: "com.apple.share.reminders",
      name: "Reminders",
      developer: "Apple",
      icon: "🔔",
      description: "Create reminders from selected content",
      enabled: false,
      permissions: ["Access to selected content", "Create Reminders"]
    }
  ];
  
  // Find the currently selected extension
  const currentExtension = extensions.find(ext => ext.id === selectedExtension) || extensions[0];
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Extensions</h1>
      
      <div className="bg-[#232323] rounded-xl overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-56 border-r border-[#333] p-2">
            <ul className="space-y-1">
              {extensionCategories.map(cat => (
                <li key={cat.id}>
                  <button
                    className={`w-full text-left py-1.5 px-3 rounded-md ${
                      category === cat.id
                        ? "bg-[#3578F6] text-white"
                        : "text-[#E0E0E0] hover:bg-[#2A2A2A]"
                    }`}
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Extensions List */}
          <div className="min-w-[200px] border-r border-[#333] p-2">
            <div className="mb-4 px-2">
              <input
                type="text"
                placeholder="Search Extensions"
                className="w-full bg-[#1C1C1E] text-[#E0E0E0] rounded-md px-3 py-1.5 text-sm border border-[#333] focus:outline-none focus:border-[#4281CE]"
              />
            </div>
            
            <ul className="space-y-1">
              {extensions.map(extension => (
                <li key={extension.id}>
                  <button
                    className={`w-full text-left py-2 px-2 rounded-md flex items-center ${
                      selectedExtension === extension.id
                        ? "bg-[#2A2A2A]"
                        : "hover:bg-[#2A2A2A]"
                    }`}
                    onClick={() => setSelectedExtension(extension.id)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#303030] rounded-md flex items-center justify-center mr-2 text-xl">
                      {extension.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#E0E0E0]">
                        {extension.name}
                      </div>
                      <div className="text-xs text-[#999]">{extension.developer}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Extension Details */}
          <div className="flex-1 p-6">
            {currentExtension && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-[#303030] rounded-lg flex items-center justify-center text-4xl mr-4">
                    {currentExtension.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-[#E0E0E0]">
                      {currentExtension.name}
                    </h2>
                    <p className="text-sm text-[#999]">
                      Developed by {currentExtension.developer}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`toggle-${currentExtension.id}`}
                        className="peer sr-only"
                        defaultChecked={currentExtension.enabled}
                      />
                      <label
                        htmlFor={`toggle-${currentExtension.id}`}
                        className="block w-12 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6 peer-checked:bg-[#0066FF]"
                      ></label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-[#333] py-4">
                  <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Description</h3>
                  <p className="text-sm text-[#999] mb-6">{currentExtension.description}</p>
                  
                  <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Permissions</h3>
                  <ul className="space-y-1 mb-6">
                    {currentExtension.permissions.map((permission, index) => (
                      <li key={index} className="text-sm text-[#999] flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0066FF] mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {permission}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm">
                      Learn More
                    </button>
                    {currentExtension.developer !== "Apple" && (
                      <button className="px-4 py-2 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
                        Uninstall
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-[#232323] rounded-xl p-6">
        <h2 className="text-md font-semibold text-[#E0E0E0] mb-4">App Store Extensions</h2>
        <p className="text-sm text-[#999] mb-4">
          Extend the functionality of your Mac with extensions from the App Store.
        </p>
        <button className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm">
          Visit App Store
        </button>
      </div>
    </div>
  );
} 