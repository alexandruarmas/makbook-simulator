import React, { useState } from "react";

export default function PrintersScanners() {
  const [printers, setPrinters] = useState([
    { 
      id: 1, 
      name: "HP LaserJet Pro M404dn", 
      isDefault: true, 
      location: "Home Office",
      status: "Idle",
      lastUsed: "Today, 10:32 AM",
      type: "HP LaserJet",
      connection: "USB"
    },
    { 
      id: 2, 
      name: "EPSON WorkForce Pro WF-3820", 
      isDefault: false, 
      location: "Living Room",
      status: "Offline",
      lastUsed: "Yesterday, 4:15 PM",
      type: "EPSON WorkForce",
      connection: "Wi-Fi"
    }
  ]);
  
  const [scanners, setScanners] = useState([
    { 
      id: 1, 
      name: "EPSON WorkForce Pro WF-3820", 
      isDefault: true, 
      status: "Available",
      lastUsed: "Yesterday, 4:15 PM"
    }
  ]);
  
  const [showDefaultOptions, setShowDefaultOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("printers");
  const [showPrinterInfo, setShowPrinterInfo] = useState(null);

  const setDefaultPrinter = (id) => {
    setPrinters(printers.map(printer => ({
      ...printer,
      isDefault: printer.id === id
    })));
  };
  
  const setDefaultScanner = (id) => {
    setScanners(scanners.map(scanner => ({
      ...scanner,
      isDefault: scanner.id === id
    })));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Printers & Scanners</h1>
      
      <div className="mb-5 bg-[#232323] rounded-xl overflow-hidden">
        <div className="flex border-b border-[#333]">
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === "printers" ? "text-[#0066FF] border-b-2 border-[#0066FF]" : "text-[#999] hover:text-[#E0E0E0]"}`}
            onClick={() => setActiveTab("printers")}
          >
            Printers
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === "scanners" ? "text-[#0066FF] border-b-2 border-[#0066FF]" : "text-[#999] hover:text-[#E0E0E0]"}`}
            onClick={() => setActiveTab("scanners")}
          >
            Scanners
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === "printers" ? (
            <>
              {printers.length > 0 ? (
                <div className="space-y-3">
                  {printers.map(printer => (
                    <div 
                      key={printer.id} 
                      className={`bg-[#2A2A2A] rounded-lg p-4 cursor-pointer transition-colors ${showPrinterInfo === printer.id ? 'ring-1 ring-[#0066FF]' : 'hover:bg-[#333]'}`}
                      onClick={() => setShowPrinterInfo(showPrinterInfo === printer.id ? null : printer.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-[#E0E0E0]">{printer.name}</span>
                              {printer.isDefault && (
                                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#0066FF] text-white">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#999] mt-0.5">
                              {printer.status} — Last used: {printer.lastUsed}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${printer.status === 'Idle' ? 'bg-green-500' : 'bg-[#666]'}`}></div>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`w-5 h-5 text-[#999] transform transition-transform ${showPrinterInfo === printer.id ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      
                      {showPrinterInfo === printer.id && (
                        <div className="mt-4 pt-4 border-t border-[#333]">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs text-[#999] mb-1">Type</div>
                              <div className="text-sm text-[#E0E0E0]">{printer.type}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#999] mb-1">Connection</div>
                              <div className="text-sm text-[#E0E0E0]">{printer.connection}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#999] mb-1">Location</div>
                              <div className="text-sm text-[#E0E0E0]">{printer.location}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#999] mb-1">Status</div>
                              <div className="text-sm text-[#E0E0E0]">{printer.status}</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
                              Options & Supplies...
                            </button>
                            
                            {!printer.isDefault && (
                              <button 
                                className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDefaultPrinter(printer.id);
                                }}
                              >
                                Set as Default
                              </button>
                            )}
                            
                            <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
                              Print Test Page
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-[#333] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">No Printers Found</h3>
                  <p className="text-sm text-[#999] text-center max-w-md mb-6">
                    Connect a printer to your Mac or add a network printer to get started.
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex justify-between">
                <button className="p-2 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="p-2 bg-[#333] hover:bg-[#404040] text-[#999] rounded-md disabled:opacity-50" disabled={printers.length === 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <div className="flex-1"></div>
                <button 
                  className="p-2 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md"
                  onClick={() => setShowDefaultOptions(!showDefaultOptions)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              
              {showDefaultOptions && (
                <div className="mt-4 bg-[#2A2A2A] p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-[#E0E0E0] mb-3">Default Printer Options</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="default-printer-option" 
                        className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0" 
                        defaultChecked 
                      />
                      <span className="ml-2 text-sm text-[#E0E0E0]">Last printer used</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="default-printer-option" 
                        className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0" 
                      />
                      <span className="ml-2 text-sm text-[#E0E0E0]">Default printer</span>
                    </label>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-[#333]">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0" defaultChecked />
                      <span className="ml-2 text-sm text-[#E0E0E0]">Share printers connected to this Mac</span>
                    </label>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {scanners.length > 0 ? (
                <div className="space-y-3">
                  {scanners.map(scanner => (
                    <div 
                      key={scanner.id} 
                      className="bg-[#2A2A2A] rounded-lg p-4 hover:bg-[#333] cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-[#E0E0E0]">{scanner.name}</span>
                              {scanner.isDefault && (
                                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#0066FF] text-white">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#999] mt-0.5">
                              {scanner.status} — Last used: {scanner.lastUsed}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${scanner.status === 'Available' ? 'bg-green-500' : 'bg-[#666]'}`}></div>
                          <button className="p-1 text-[#999] hover:text-[#E0E0E0]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-[#333] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">No Scanners Found</h3>
                  <p className="text-sm text-[#999] text-center max-w-md mb-6">
                    Connect a scanner to your Mac or add a network scanner to get started.
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex justify-between">
                <button className="p-2 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="p-2 bg-[#333] hover:bg-[#404040] text-[#999] rounded-md disabled:opacity-50" disabled={scanners.length === 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-[#232323] rounded-xl p-5">
        <h2 className="text-sm font-medium text-[#E0E0E0] mb-3">AirPrint</h2>
        <p className="text-sm text-[#999] mb-4">
          Your Mac automatically finds AirPrint printers on your network.
        </p>
        <button className="bg-[#333] hover:bg-[#404040] text-[#E0E0E0] px-4 py-2 rounded text-sm">
          Learn more about AirPrint...
        </button>
      </div>
    </div>
  );
} 