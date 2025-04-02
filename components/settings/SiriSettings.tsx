import React, { useState } from "react";

const SiriSettings = () => {
  const [siriEnabled, setSiriEnabled] = useState(true);
  const [listenForHeySiri, setListenForHeySiri] = useState(true);
  const [keyboardShortcut, setKeyboardShortcut] = useState("hold-cmd-space");
  const [language, setLanguage] = useState("English (US)");
  const [siriVoice, setSiriVoice] = useState("Siri Voice 2");
  const [voiceGender, setVoiceGender] = useState("female");
  const [voiceFeedback, setVoiceFeedback] = useState("when-headphones");
  const [showSiriInMenuBar, setShowSiriInMenuBar] = useState(true);
  const [siriSuggestions, setSiriSuggestions] = useState(true);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Cherry</h1>
      
      <div className="space-y-6">
        {/* Enable Siri Section */}
        <div>
          <div className="bg-[#232323] rounded-xl p-5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FC0D1C] via-[#7940EE] to-[#08F7FE] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"></path>
                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                    <path d="M15.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                  </svg>
                </div>
                <span className="text-lg text-[#E0E0E0] font-medium">Enable Cherry</span>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="enable-siri" 
                  className="peer sr-only" 
                  checked={siriEnabled}
                  onChange={() => setSiriEnabled(!siriEnabled)}
                />
                <label htmlFor="enable-siri" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            {siriEnabled && (
              <p className="text-sm text-[#999]">
                Cherry helps you get things done by using your voice. Cherry can send messages, 
                find files, open apps, and much more. You can also use Type to Cherry to communicate with Cherry using your keyboard.
              </p>
            )}
          </div>
        </div>

        {siriEnabled && (
          <>
            {/* Listen for "Hey Siri" */}
            <div>
              <div className="bg-[#232323] rounded-xl p-5">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Listen for "Hey Cherry"</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="hey-siri" 
                      className="peer sr-only" 
                      checked={listenForHeySiri}
                      onChange={() => setListenForHeySiri(!listenForHeySiri)}
                    />
                    <label htmlFor="hey-siri" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>
              </div>
            </div>

            {/* Keyboard Shortcut */}
            <div>
              <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Keyboard Shortcut</h2>
              <div className="bg-[#232323] rounded-xl p-5">
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={keyboardShortcut === "hold-cmd-space"}
                      onChange={() => setKeyboardShortcut("hold-cmd-space")}
                      className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#E0E0E0]">Hold Command Space</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={keyboardShortcut === "press-cmd-space"}
                      onChange={() => setKeyboardShortcut("press-cmd-space")}
                      className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#E0E0E0]">Press Command Space</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={keyboardShortcut === "custom"}
                      onChange={() => setKeyboardShortcut("custom")}
                      className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#E0E0E0]">Customize...</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Language & Voice */}
            <div>
              <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Language & Voice</h2>
              <div className="bg-[#232323] rounded-xl p-5 space-y-5">
                <div>
                  <div className="font-medium text-[#E0E0E0] mb-2">Language</div>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-[#333] border-none text-[#E0E0E0] py-2 px-3 rounded-md focus:ring-2 focus:ring-[#0066FF] focus:outline-none"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="English (Australia)">English (Australia)</option>
                    <option value="English (Canada)">English (Canada)</option>
                    <option value="English (India)">English (India)</option>
                    <option value="French (France)">French (France)</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Chinese (Simplified)">Chinese (Simplified)</option>
                  </select>
                </div>

                <div>
                  <div className="font-medium text-[#E0E0E0] mb-2">Cherry Voice</div>
                  <select 
                    value={siriVoice}
                    onChange={(e) => setSiriVoice(e.target.value)}
                    className="w-full bg-[#333] border-none text-[#E0E0E0] py-2 px-3 rounded-md focus:ring-2 focus:ring-[#0066FF] focus:outline-none"
                  >
                    <option value="Siri Voice 1">Cherry Voice 1</option>
                    <option value="Siri Voice 2">Cherry Voice 2</option>
                    <option value="Siri Voice 3">Cherry Voice 3</option>
                    <option value="Siri Voice 4">Cherry Voice 4</option>
                  </select>
                </div>

                <div>
                  <div className="font-medium text-[#E0E0E0] mb-2">Voice Feedback</div>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        checked={voiceFeedback === "always"}
                        onChange={() => setVoiceFeedback("always")}
                        className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#E0E0E0]">Always On</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        checked={voiceFeedback === "when-headphones"}
                        onChange={() => setVoiceFeedback("when-headphones")}
                        className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#E0E0E0]">Only with "Hey Cherry" or when connected to headphones</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        checked={voiceFeedback === "off"}
                        onChange={() => setVoiceFeedback("off")}
                        className="w-4 h-4 text-[#0066FF] bg-[#333] border-[#555] focus:ring-[#0066FF] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#E0E0E0]">Off</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Siri History & Privacy */}
            <div>
              <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Siri Suggestions & Privacy</h2>
              <div className="bg-[#232323] rounded-xl p-5 space-y-5">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Show Cherry in menu bar</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="siri-menu-bar" 
                      className="peer sr-only" 
                      checked={showSiriInMenuBar}
                      onChange={() => setShowSiriInMenuBar(!showSiriInMenuBar)}
                    />
                    <label htmlFor="siri-menu-bar" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-[#E0E0E0]">Enable Cherry Suggestions</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="siri-suggestions" 
                      className="peer sr-only" 
                      checked={siriSuggestions}
                      onChange={() => setSiriSuggestions(!siriSuggestions)}
                    />
                    <label htmlFor="siri-suggestions" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                  </div>
                </label>

                <div className="pt-2">
                  <button className="bg-[#303030] hover:bg-[#3A3A3A] text-[#E0E0E0] px-4 py-2 rounded text-sm">Delete Siri & Dictation History...</button>
                </div>

                <p className="text-xs text-[#999] pt-2">
                  When you use Cherry, your requests are sent to Cherry servers for processing. 
                  Your request history is associated with a random identifier, not your Cherry ID, 
                  and is kept for up to six months. Learn more about Cherry and Privacy in Settings.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SiriSettings; 