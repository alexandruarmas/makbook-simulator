import React, { useState } from "react";

export default function DateTimeSettings() {
  const [automaticTime, setAutomaticTime] = useState(true);
  const [timeZoneAutomatic, setTimeZoneAutomatic] = useState(true);
  const [use24HourTime, setUse24HourTime] = useState(false);
  const [showDayOfWeek, setShowDayOfWeek] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showAmPm, setShowAmPm] = useState(true);
  const [flashSeparators, setFlashSeparators] = useState(false);
  const [timezone, setTimezone] = useState("Europe/London");
  const [selectedClock, setSelectedClock] = useState("digital");

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Date & Time</h1>
      
      <div className="space-y-6">
        {/* Date & Time Section */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Date & Time</h2>
          <div className="bg-[#232323] rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-[#E0E0E0]">Set date and time automatically</div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="automatic-time" 
                  className="peer sr-only" 
                  checked={automaticTime}
                  onChange={() => setAutomaticTime(!automaticTime)}
                />
                <label htmlFor="automatic-time" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            {!automaticTime && (
              <div className="pt-2 border-t border-[#333]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#999] mb-1">Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-[#333] border-none text-[#E0E0E0] rounded px-3 py-2"
                      defaultValue="2024-05-24"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#999] mb-1">Time</label>
                    <input 
                      type="time" 
                      className="w-full bg-[#333] border-none text-[#E0E0E0] rounded px-3 py-2"
                      defaultValue="14:30"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="text-[#E0E0E0]">Set time zone automatically using current location</div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="automatic-timezone" 
                  className="peer sr-only" 
                  checked={timeZoneAutomatic}
                  onChange={() => setTimeZoneAutomatic(!timeZoneAutomatic)}
                />
                <label htmlFor="automatic-timezone" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            {!timeZoneAutomatic && (
              <div className="pt-2 border-t border-[#333]">
                <label className="block text-xs text-[#999] mb-1">Time Zone</label>
                <select 
                  className="w-full bg-[#333] border-none text-[#E0E0E0] rounded px-3 py-2"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="Europe/London">London (GMT+1)</option>
                  <option value="Europe/Paris">Paris (GMT+2)</option>
                  <option value="America/New_York">New York (GMT-4)</option>
                  <option value="America/Los_Angeles">Los Angeles (GMT-7)</option>
                  <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                </select>
                <div className="text-xs text-[#999] mt-1">Current time in {timezone.split('/')[1]}: 14:30</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Clock Section */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Clock</h2>
          <div className="bg-[#232323] rounded-xl p-5 space-y-4">
            <div className="flex gap-4 mb-4">
              <button 
                className={`flex-1 py-2 rounded-md ${selectedClock === "digital" ? "bg-[#0066FF] text-white" : "bg-[#333] text-[#E0E0E0] hover:bg-[#404040]"}`}
                onClick={() => setSelectedClock("digital")}
              >
                Digital
              </button>
              <button 
                className={`flex-1 py-2 rounded-md ${selectedClock === "analog" ? "bg-[#0066FF] text-white" : "bg-[#333] text-[#E0E0E0] hover:bg-[#404040]"}`}
                onClick={() => setSelectedClock("analog")}
              >
                Analog
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-[#E0E0E0]">Use 24-hour time</div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="24-hour-time" 
                  className="peer sr-only" 
                  checked={use24HourTime}
                  onChange={() => setUse24HourTime(!use24HourTime)}
                />
                <label htmlFor="24-hour-time" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-[#E0E0E0]">Show day of week in menu bar</div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="show-day" 
                  className="peer sr-only" 
                  checked={showDayOfWeek}
                  onChange={() => setShowDayOfWeek(!showDayOfWeek)}
                />
                <label htmlFor="show-day" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-[#E0E0E0]">Show date in menu bar</div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="show-date" 
                  className="peer sr-only" 
                  checked={showDate}
                  onChange={() => setShowDate(!showDate)}
                />
                <label htmlFor="show-date" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            {!use24HourTime && (
              <div className="flex justify-between items-center">
                <div className="text-[#E0E0E0]">Show AM/PM</div>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="show-am-pm" 
                    className="peer sr-only" 
                    checked={showAmPm}
                    onChange={() => setShowAmPm(!showAmPm)}
                  />
                  <label htmlFor="show-am-pm" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="text-[#E0E0E0]">Flash the time separators</div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="flash-separators" 
                  className="peer sr-only" 
                  checked={flashSeparators}
                  onChange={() => setFlashSeparators(!flashSeparators)}
                />
                <label htmlFor="flash-separators" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-[#191919] rounded-md">
              <div className="text-xs text-[#999]">Preview:</div>
              <div className="text-center p-4 text-[#E0E0E0]">
                {showDayOfWeek && <span className="mr-1">Fri</span>}
                {showDate && <span className="mr-1">May 24</span>}
                {use24HourTime ? (
                  <span>14:30{flashSeparators ? ' ' : ':'}{flashSeparators ? ' ' : ''}22</span>
                ) : (
                  <span>2:30{flashSeparators ? ' ' : ':'}{flashSeparators ? ' ' : ''}22{showAmPm ? ' PM' : ''}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Time Formats Section */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Advanced</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <button className="w-full bg-[#333] text-[#E0E0E0] hover:bg-[#404040] py-2 px-4 rounded-md text-left">
              Open Language & Region Preferences...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 