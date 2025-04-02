import React, { useState } from "react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface Region {
  code: string;
  name: string;
}

export default function LanguageRegion() {
  const [primaryLanguage, setPrimaryLanguage] = useState<string>("en-US");
  const [region, setRegion] = useState<string>("US");
  const [measurementUnits, setMeasurementUnits] = useState<string>("us");
  const [temperature, setTemperature] = useState<string>("fahrenheit");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<string>("sunday");
  const [timeFormat, setTimeFormat] = useState<string>("12h");
  const [dateFormat, setDateFormat] = useState<string>("mdy");
  const [numberFormat, setNumberFormat] = useState<string>("us");
  const [languages, setLanguages] = useState<Language[]>([
    { code: "en-US", name: "English", nativeName: "English (US)" },
    { code: "fr-FR", name: "French", nativeName: "Français" },
    { code: "es-ES", name: "Spanish", nativeName: "Español" },
  ]);
  
  const availableLanguages: Language[] = [
    { code: "en-US", name: "English (US)", nativeName: "English (US)" },
    { code: "en-GB", name: "English (UK)", nativeName: "English (UK)" },
    { code: "fr-FR", name: "French", nativeName: "Français" },
    { code: "es-ES", name: "Spanish", nativeName: "Español" },
    { code: "de-DE", name: "German", nativeName: "Deutsch" },
    { code: "it-IT", name: "Italian", nativeName: "Italiano" },
    { code: "ja-JP", name: "Japanese", nativeName: "日本語" },
    { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文" },
    { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)" },
    { code: "ru-RU", name: "Russian", nativeName: "Русский" }
  ];
  
  const availableRegions: Region[] = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "BR", name: "Brazil" },
    { code: "RU", name: "Russia" }
  ];
  
  const addLanguage = (code: string) => {
    const langToAdd = availableLanguages.find(lang => lang.code === code);
    if (langToAdd && !languages.some(lang => lang.code === code)) {
      setLanguages([...languages, langToAdd]);
    }
  };
  
  const removeLanguage = (code: string) => {
    if (languages.length > 1) {
      setLanguages(languages.filter(lang => lang.code !== code));
      if (primaryLanguage === code) {
        setPrimaryLanguage(languages[0].code === code ? languages[1].code : languages[0].code);
      }
    }
  };
  
  const moveLanguageUp = (index: number) => {
    if (index <= 0) return;
    const newLanguages = [...languages];
    [newLanguages[index], newLanguages[index - 1]] = [newLanguages[index - 1], newLanguages[index]];
    setLanguages(newLanguages);
  };
  
  const moveLanguageDown = (index: number) => {
    if (index >= languages.length - 1) return;
    const newLanguages = [...languages];
    [newLanguages[index], newLanguages[index + 1]] = [newLanguages[index + 1], newLanguages[index]];
    setLanguages(newLanguages);
  };
  
  const setPrimary = (code: string) => {
    setPrimaryLanguage(code);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Language & Region</h1>
      
      <div className="space-y-6">
        {/* Languages */}
        <div className="bg-[#232323] rounded-xl overflow-hidden">
          <div className="p-5">
            <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Preferred Languages</h2>
            <p className="text-sm text-[#999] mb-4">
              Apps and websites will appear in your preferred language, when available.
              Drag to reorder the list of languages.
            </p>
            
            <div className="mb-4">
              <div className="mb-2">
                <button 
                  className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm"
                  onClick={() => {
                    const code = availableLanguages.find(lang => !languages.some(l => l.code === lang.code))?.code;
                    if (code) addLanguage(code);
                  }}
                >
                  Add Language...
                </button>
              </div>
              
              <div className="bg-[#1D1D1D] rounded-lg overflow-hidden">
                {languages.map((language, index) => (
                  <div 
                    key={language.code} 
                    className={`flex items-center justify-between p-3 ${
                      index !== languages.length - 1 ? "border-b border-[#333]" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 flex items-center justify-center mr-3 text-[#999] cursor-grab">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[#E0E0E0]">{language.name}</div>
                        <div className="text-xs text-[#999]">{language.nativeName}</div>
                      </div>
                      {primaryLanguage === language.code && (
                        <div className="ml-3 text-xs bg-[#3578F6] text-white px-2 py-0.5 rounded-full">
                          Primary
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {primaryLanguage !== language.code && (
                        <button 
                          className="text-sm text-[#0066FF] hover:underline"
                          onClick={() => setPrimary(language.code)}
                        >
                          Make Primary
                        </button>
                      )}
                      <button 
                        className="text-sm text-[#999] hover:text-[#E0E0E0]"
                        onClick={() => moveLanguageUp(index)}
                        disabled={index === 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button 
                        className="text-sm text-[#999] hover:text-[#E0E0E0]"
                        onClick={() => moveLanguageDown(index)}
                        disabled={index === languages.length - 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button 
                        className="text-sm text-[#999] hover:text-[#E0E0E0]"
                        onClick={() => removeLanguage(language.code)}
                        disabled={languages.length <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Region */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Region</h2>
          <p className="text-sm text-[#999] mb-4">
            Your region is used to set the calendar, date, time, and number formats.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#999] mb-1">Region</label>
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]"
              >
                {availableRegions.map(region => (
                  <option key={region.code} value={region.code}>{region.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-[#999] mb-1">First day of week</label>
              <select 
                value={firstDayOfWeek}
                onChange={(e) => setFirstDayOfWeek(e.target.value)}
                className="w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]"
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-[#999] mb-1">Calendar</label>
              <select 
                className="w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]"
              >
                <option>Gregorian</option>
                <option>Japanese</option>
                <option>Buddhist</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-[#999] mb-1">Time format</label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="timeFormat" 
                    value="12h" 
                    checked={timeFormat === "12h"}
                    onChange={() => setTimeFormat("12h")}
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">12-hour (3:45 PM)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="timeFormat" 
                    value="24h" 
                    checked={timeFormat === "24h"}
                    onChange={() => setTimeFormat("24h")}
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">24-hour (15:45)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Measurement */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Measurement Units</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Measurement system</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="measurementUnits" 
                      value="metric" 
                      checked={measurementUnits === "metric"}
                      onChange={() => setMeasurementUnits("metric")}
                      className="mr-2"
                    />
                    <span className="text-[#E0E0E0]">Metric (cm, m, km, kg)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="measurementUnits" 
                      value="us" 
                      checked={measurementUnits === "us"}
                      onChange={() => setMeasurementUnits("us")}
                      className="mr-2"
                    />
                    <span className="text-[#E0E0E0]">U.S. (in, ft, mi, lb)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="measurementUnits" 
                      value="uk" 
                      checked={measurementUnits === "uk"}
                      onChange={() => setMeasurementUnits("uk")}
                      className="mr-2"
                    />
                    <span className="text-[#E0E0E0]">U.K. (in, ft, mi, st, lb)</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Temperature</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="temperature" 
                      value="celsius" 
                      checked={temperature === "celsius"}
                      onChange={() => setTemperature("celsius")}
                      className="mr-2"
                    />
                    <span className="text-[#E0E0E0]">Celsius (°C)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="temperature" 
                      value="fahrenheit" 
                      checked={temperature === "fahrenheit"}
                      onChange={() => setTemperature("fahrenheit")}
                      className="mr-2"
                    />
                    <span className="text-[#E0E0E0]">Fahrenheit (°F)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Advanced */}
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[#E0E0E0]">Advanced</h2>
            <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
              Advanced Options...
            </button>
          </div>
          <p className="text-sm text-[#999]">
            Configure advanced language and region settings for specific apps or services.
          </p>
        </div>
      </div>
    </div>
  );
} 