import React, { useState } from "react";

interface AppUsage {
  id: string;
  name: string;
  icon: string;
  timeUsed: number; // in minutes
  category: string;
}

interface UsageData {
  totalTime: number; // in minutes
  socialTime: number;
  productivityTime: number;
  entertainmentTime: number;
  previousDayTotal: number;
  pickups: number;
  notifications: number;
  appUsage: AppUsage[];
}

export default function ScreenTimeSettings() {
  const [enableScreenTime, setEnableScreenTime] = useState(true);
  const [activeTab, setActiveTab] = useState("usage");
  const [selectedDay, setSelectedDay] = useState(0); // 0 = today, 1 = yesterday, etc.
  const [showAppLimits, setShowAppLimits] = useState(false);
  
  // Mock usage data
  const [usageData, setUsageData] = useState<UsageData>({
    totalTime: 342, // 5 hours 42 minutes
    socialTime: 96, // 1 hour 36 minutes
    productivityTime: 156, // 2 hours 36 minutes
    entertainmentTime: 90, // 1 hour 30 minutes
    previousDayTotal: 398, // 6 hours 38 minutes
    pickups: 24,
    notifications: 87,
    appUsage: [
      {
        id: "vscode",
        name: "Visual Studio Code",
        icon: "💻",
        timeUsed: 126, // 2 hours 6 minutes
        category: "Productivity"
      },
      {
        id: "safari",
        name: "Safari",
        icon: "🧭",
        timeUsed: 85, // 1 hour 25 minutes
        category: "Reference"
      },
      {
        id: "slack",
        name: "Slack",
        icon: "💬",
        timeUsed: 58, // 58 minutes
        category: "Social"
      },
      {
        id: "mail",
        name: "Mail",
        icon: "📧",
        timeUsed: 30, // 30 minutes
        category: "Productivity"
      },
      {
        id: "music",
        name: "Music",
        icon: "🎵",
        timeUsed: 28, // 28 minutes
        category: "Entertainment"
      }
    ]
  });
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };
  
  const getPercentage = (time: number) => {
    return Math.round((time / usageData.totalTime) * 100);
  };
  
  const getDayName = (dayOffset: number) => {
    const days = ["Today", "Yesterday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (dayOffset === 0) return days[0];
    if (dayOffset === 1) return days[1];
    
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    return days[date.getDay() + 2];
  };
  
  const renderUsageTab = () => (
    <div>
      {/* Time Summary */}
      <div className="bg-[#232323] rounded-xl p-5 mb-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-medium text-[#E0E0E0]">Screen Time</h2>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5, 6].map(day => (
              <button
                key={day}
                className={`px-2 py-1 text-sm rounded ${
                  selectedDay === day
                    ? "bg-[#3578F6] text-white"
                    : "text-[#999] hover:bg-[#2A2A2A] hover:text-[#E0E0E0]"
                }`}
                onClick={() => setSelectedDay(day)}
              >
                {day === 0 ? "Today" : day === 1 ? "Y'day" : getDayName(day).substring(0, 1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="mr-6">
            <div className="text-4xl font-light text-[#E0E0E0]">{formatTime(usageData.totalTime)}</div>
            <div className="text-sm text-[#999] mt-1">
              {selectedDay === 0 ? (
                <>
                  {usageData.totalTime > usageData.previousDayTotal ? (
                    <span className="text-[#FF3B30]">▲ {formatTime(usageData.totalTime - usageData.previousDayTotal)} from yesterday</span>
                  ) : (
                    <span className="text-[#34C759]">▼ {formatTime(usageData.previousDayTotal - usageData.totalTime)} from yesterday</span>
                  )}
                </>
              ) : (
                getDayName(selectedDay)
              )}
            </div>
          </div>
          
          <div className="flex-1 h-24 flex items-center">
            <div className="w-full h-16 bg-[#1D1D1D] rounded-lg overflow-hidden flex">
              <div 
                className="h-full bg-[#5856D6]" 
                style={{ width: `${getPercentage(usageData.socialTime)}%` }}
              ></div>
              <div 
                className="h-full bg-[#30D158]" 
                style={{ width: `${getPercentage(usageData.productivityTime)}%` }}
              ></div>
              <div 
                className="h-full bg-[#FF9F0A]" 
                style={{ width: `${getPercentage(usageData.entertainmentTime)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#5856D6] rounded-full mr-2"></div>
            <div className="text-sm">
              <div className="text-[#E0E0E0]">Social</div>
              <div className="text-[#999]">{formatTime(usageData.socialTime)}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#30D158] rounded-full mr-2"></div>
            <div className="text-sm">
              <div className="text-[#E0E0E0]">Productivity</div>
              <div className="text-[#999]">{formatTime(usageData.productivityTime)}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#FF9F0A] rounded-full mr-2"></div>
            <div className="text-sm">
              <div className="text-[#E0E0E0]">Entertainment</div>
              <div className="text-[#999]">{formatTime(usageData.entertainmentTime)}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Most Used Apps */}
      <div className="mb-6">
        <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Most Used Apps</h2>
        <div className="bg-[#232323] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#333]">
            {usageData.appUsage.map((app) => (
              <div key={app.id} className="p-4 flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-[#303030] rounded-lg flex items-center justify-center mr-4 text-xl">
                  {app.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-[#E0E0E0] font-medium">{app.name}</h3>
                      <p className="text-sm text-[#999]">{app.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#E0E0E0]">{formatTime(app.timeUsed)}</div>
                      <div className="text-xs text-[#999]">{getPercentage(app.timeUsed)}% of screen time</div>
                    </div>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-[#1D1D1D] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        app.category === "Social" 
                          ? "bg-[#5856D6]" 
                          : app.category === "Productivity"
                          ? "bg-[#30D158]"
                          : "bg-[#FF9F0A]"
                      }`}
                      style={{ width: `${getPercentage(app.timeUsed)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#333]">
            <button className="flex items-center text-[#0066FF] hover:text-[#4D94FF]">
              <span>See All Apps</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Pickups & Notifications */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Pickups</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-3xl font-light text-[#E0E0E0] mb-1">{usageData.pickups}</div>
              <div className="text-sm text-[#999]">Times you have unlocked your Mac</div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Notifications</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-3xl font-light text-[#E0E0E0] mb-1">{usageData.notifications}</div>
              <div className="text-sm text-[#999]">Notifications received today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderLimitsTab = () => (
    <div>
      <div className="bg-[#232323] rounded-xl p-5 mb-6">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">App Limits</h2>
        
        {!showAppLimits ? (
          <div>
            <p className="text-sm text-[#999] mb-4">
              Set limits for how long you can use specific apps, categories of apps, or websites.
            </p>
            <button 
              className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm"
              onClick={() => setShowAppLimits(true)}
            >
              Add Limit
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#999] mb-1">Limit Type</label>
              <select className="w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]">
                <option>All Apps & Categories</option>
                <option>Specific Apps</option>
                <option>App Categories</option>
                <option>Websites</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-[#999] mb-1">Time Limit</label>
              <div className="grid grid-cols-2 gap-4">
                <select className="bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]">
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>3 hours</option>
                  <option>4 hours</option>
                  <option>Custom</option>
                </select>
                <select className="bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]">
                  <option>Every Day</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button 
                className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm"
                onClick={() => setShowAppLimits(false)}
              >
                Cancel
              </button>
              <button 
                className="px-3 py-1.5 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm"
                onClick={() => setShowAppLimits(false)}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-[#232323] rounded-xl p-5 mb-6">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Downtime</h2>
        <p className="text-sm text-[#999] mb-4">
          Schedule time away from the screen. During downtime, only apps you choose to allow and phone calls will be available.
        </p>
        <button className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm">
          Set Up Downtime
        </button>
      </div>
      
      <div className="bg-[#232323] rounded-xl p-5">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Always Allowed</h2>
        <p className="text-sm text-[#999] mb-4">
          Choose apps that are always allowed, even during downtime or when an app limit is set.
        </p>
        <button className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm">
          Choose Apps
        </button>
      </div>
    </div>
  );
  
  const renderPrivacyTab = () => (
    <div>
      <div className="bg-[#232323] rounded-xl p-5 mb-6">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Content & Privacy Restrictions</h2>
        <p className="text-sm text-[#999] mb-4">
          Block inappropriate content and limit privacy changes. You can set up an admin passcode to prevent changes to these settings.
        </p>
        <button className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm">
          Set Up Content Restrictions
        </button>
      </div>
      
      <div className="bg-[#232323] rounded-xl p-5">
        <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Family Screen Time</h2>
        <p className="text-sm text-[#999] mb-4">
          View screen time reports and set limits for children in your Family Sharing group.
        </p>
        <button className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm">
          Set Up Family Screen Time
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#E0E0E0]">Screen Time</h1>
        
        <div className="flex items-center">
          <span className="mr-3 text-[#E0E0E0]">
            {enableScreenTime ? "On" : "Off"}
          </span>
          <div className="relative">
            <input 
              type="checkbox" 
              id="toggle-screen-time" 
              className="peer sr-only" 
              checked={enableScreenTime}
              onChange={() => setEnableScreenTime(!enableScreenTime)}
            />
            <label 
              htmlFor="toggle-screen-time" 
              className="block w-12 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6 peer-checked:bg-[#0066FF]"
            ></label>
          </div>
        </div>
      </div>
      
      <div className="bg-[#1D1D1D] rounded-lg overflow-hidden mb-6">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "usage"
                ? "bg-[#333] text-[#E0E0E0]"
                : "text-[#999] hover:bg-[#2A2A2A] hover:text-[#E0E0E0]"
            }`}
            onClick={() => setActiveTab("usage")}
          >
            App Usage
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "limits"
                ? "bg-[#333] text-[#E0E0E0]"
                : "text-[#999] hover:bg-[#2A2A2A] hover:text-[#E0E0E0]"
            }`}
            onClick={() => setActiveTab("limits")}
          >
            App Limits
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "privacy"
                ? "bg-[#333] text-[#E0E0E0]"
                : "text-[#999] hover:bg-[#2A2A2A] hover:text-[#E0E0E0]"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            Content & Privacy
          </button>
        </div>
      </div>
      
      {enableScreenTime ? (
        <>
          {activeTab === "usage" && renderUsageTab()}
          {activeTab === "limits" && renderLimitsTab()}
          {activeTab === "privacy" && renderPrivacyTab()}
        </>
      ) : (
        <div className="bg-[#232323] rounded-xl p-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-[#303030] rounded-full flex items-center justify-center mb-4 text-[#999]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-[#E0E0E0] mb-2">Screen Time is turned off</h2>
          <p className="text-[#999] text-center max-w-md mb-4">
            Turn on Screen Time to track your app usage, set app limits, and schedule downtime.
          </p>
          <button 
            className="px-4 py-2 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm"
            onClick={() => setEnableScreenTime(true)}
          >
            Turn On Screen Time
          </button>
        </div>
      )}
    </div>
  );
} 