"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import ControlCenter from "./ControlCenter";
import MapClient from "@/components/MapClient";
import MacOSMap from "@/components/MacOSMap";
import LanguageRegion from "@/components/settings/LanguageRegion";
import WalletApplePaySettings from "@/components/settings/WalletApplePaySettings";
import NetscapeBrowser from "@/components/NetscapeBrowser";
import PhotosApp from "@/components/PhotosApp";
import MessagesApp from "@/components/MessagesApp";
import MusicApp from "@/components/MusicApp";
import AppStoreApp from "@/components/AppStoreApp";
import FinderPREF from "@/components/FinderPREF";
import TimeMachineSettings from "@/components/settings/TimeMachineSettings";
import PrintersScanners from "@/components/settings/PrintersScanners";
import Extensions from "@/components/settings/Extensions";
import Sharing from "@/components/settings/Sharing";
import Storage from "@/components/settings/Storage";
import DateTimeSettings from "@/components/settings/DateTimeSettings";
import FamilySettings from "@/components/settings/Family";
import GeneralSettings from "@/components/settings/General";
import CherryIDSettings from "@/components/settings/AppleID";
import NotificationsSettings from "@/components/settings/Notifications";
import BatterySettings from "@/components/settings/Battery";
import NetworkSettings from "@/components/settings/Network";
import KeyboardSettings from "@/components/settings/KeyboardSettings";
import SecurityPrivacySettings from "@/components/settings/SecurityPrivacySettings";
import BluetoothSettings from "@/components/settings/BluetoothSettings";
import TrackpadSettings from "@/components/settings/TrackpadSettings";
import SoundSettings from "@/components/settings/SoundSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import DisplaysSettings from "@/components/settings/DisplaysSettings";
import PasswordsSettings from "@/components/settings/PasswordsSettings";
import InternetAccountsSettings from "@/components/settings/InternetAccountsSettings";
import UsersGroupsSettings from "@/components/settings/UsersGroupsSettings";
import SpotlightSettings from "@/components/settings/SpotlightSettings";
import ScreenTimeSettings from "@/components/settings/ScreenTimeSettings";
import MouseSettings from "@/components/settings/MouseSettings";
import SoftwareUpdateSettings from "@/components/settings/SoftwareUpdateSettings";
import SiriSettings from "@/components/settings/SiriSettings";
import AccessibilitySettings from "@/components/settings/AccessibilitySettings";

// Define weather data interface
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  hourlyForecast: Array<{
    time: string;
    icon: string;
    temp: number;
  }>;
  dailyForecast: Array<{
    day: string;
    icon: string;
    high: number;
    low: number;
  }>;
}

interface MacOSDesktopProps {
  brightness: number;
  isPoweredOn: boolean;
}

// Define window position type
interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WindowPositions {
  finder: WindowPosition;
  netscape: WindowPosition;
  about: WindowPosition;
  "finder-preferences": WindowPosition;
  trash: WindowPosition;
  weather: WindowPosition;
  music: WindowPosition;
  [key: string]: WindowPosition; // Add index signature to allow string indexing
}

export default function MacOSDesktop({
  brightness,
  isPoweredOn,
}: MacOSDesktopProps) {
  // Define state variables
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [windowPositions, setWindowPositions] = useState<{ [key: string]: { x: number; y: number; width: number; height: number } }>({
    "about": { x: 347, y: 110, width: 634, height: 410 },
    "settings": { x: 347, y: 110, width: 634, height: 410 },
    "cherstore": { x: 0, y: 28, width: 800, height: 600 }, // Default values that don't rely on window
    "finder-prefs": { x: 347, y: 110, width: 634, height: 410 },
    "finder": { x: 347, y: 110, width: 634, height: 410 },
    "trash": { x: 347, y: 110, width: 634, height: 410 },
    "weather": { x: 250, y: 100, width: 700, height: 500 },
    "photos": { x: 347, y: 110, width: 800, height: 600 },
    "mail": { x: 347, y: 110, width: 634, height: 410 },
    "messages": { x: 347, y: 110, width: 634, height: 410 },
    "maps": { x: 347, y: 110, width: 634, height: 410 },
    "music": { x: 347, y: 110, width: 634, height: 410 },
    "netscape": { x: 347, y: 110, width: 634, height: 410 }
  });
  
  // Update cherstore window dimensions after component mounts
  useEffect(() => {
    // Only run on client-side where window is available
    if (typeof window !== 'undefined') {
      setWindowPositions(prev => ({
        ...prev,
        "cherstore": { 
          ...prev["cherstore"], 
          width: window.innerWidth, 
          height: window.innerHeight - 28 
        }
      }));
    }
  }, []);

  const [isTrashEmpty, setIsTrashEmpty] = useState(true);
  const [openWindows, setOpenWindows] = useState<Record<string, number>>({});
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [worldClocks, setWorldClocks] = useState([
    { city: 'New York', timezone: 'America/New_York' },
    { city: 'London', timezone: 'Europe/London' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo' }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [contextMenu, setContextMenu] = useState<{ type: string; x: number; y: number } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  
  // Settings state variables
  const [activeSettingsPanel, setActiveSettingsPanel] = useState<string>("general");
  const [usesTwentyFourHourTime, setUsesTwentyFourHourTime] = useState(false);
  const [setsTimeAutomatically, setSetsTimeAutomatically] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [selectedAppearance, setSelectedAppearance] = useState("dark");
  const [selectedAccentColor, setSelectedAccentColor] = useState(0);
  const [useAccentForHighlights, setUseAccentForHighlights] = useState(true);
  const [dockSize, setDockSize] = useState(50);
  const [dockPosition, setDockPosition] = useState("bottom");
  const [dockMagnification, setDockMagnification] = useState(true);
  const [minimizeToAppIcon, setMinimizeToAppIcon] = useState(true);
  const [animateAppOpening, setAnimateAppOpening] = useState(true);
  const [autoHideDock, setAutoHideDock] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState({
    Calendar: true,
    Mail: true,
    Messages: true,
    Netscape: true,
    Weather: true
  });
  const [displayResolution, setDisplayResolution] = useState("default");
  
  // Define dock apps
  const [dockApps, setDockApps] = useState<string[]>([
    "Finder",
    "Netscape",
    "Mail",
    "Photos",
    "Messages",
    "Maps",
    "Music",
    "CherStore",
    "System Settings"
  ]);
  
  // Add dock visibility state
  const [isDockVisible, setIsDockVisible] = useState(true);
  
  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to get time in a specific timezone
  const getTimeInTimezone = (timezone: string): {time: string, hours: number, minutes: number, day: string} => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: timezone
    };
    
    const dayOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      timeZone: timezone
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const dayFormatter = new Intl.DateTimeFormat('en-US', dayOptions);
    
    const time = formatter.format(currentTime);
    
    // Get hours and minutes for clock hands positioning
    const dateInTimezone = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }));
    const hours = dateInTimezone.getHours() % 12;
    const minutes = dateInTimezone.getMinutes();
    const day = dayFormatter.format(currentTime);
    
    return { time, hours, minutes, day };
  };

  // Format time for display
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Format date for display
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Menu bar items
  const menuItems = [
    { id: "cherry", icon: "cherry", label: "" },
    { id: "finder", label: "Finder" },
    { id: "file", label: "File" },
    { id: "edit", label: "Edit" },
    { id: "view", label: "View" },
    { id: "go", label: "Go" },
    { id: "window", label: "Window" },
    { id: "help", label: "Help" },
  ];

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  
  // Handle menu bar click
  const handleMenuBarClick = (menuId: string, e: React.MouseEvent) => {
    // Get the position for the dropdown menu
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
      setMenuPosition({ x: rect.left, y: rect.bottom });
    }
  };
  
  // Close active menu when clicking elsewhere
  useEffect(() => {
    if (!activeMenu) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById(`menu-${activeMenu}`);
      const menuItems = document.querySelectorAll('.menu-bar-item');
      let clickedOnMenu = false;
      
      menuItems.forEach(item => {
        if (item.contains(e.target as Node)) {
          clickedOnMenu = true;
        }
      });
      
      if (menu && !menu.contains(e.target as Node) && !clickedOnMenu) {
        setActiveMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  // Handle menu item clicks
  const handleMenuItemClick = (menuId: string, itemName: string) => {
    // Close the menu after clicking an item
    setActiveMenu(null);

    // Handle specific menu actions
    if (menuId === "cherry") {
      if (itemName === "About this Mac") {
        // Open About window
        openWindow("about");
      } else if (itemName === "System Settings...") {
        openWindow("settings");
      } else if (itemName === "App Store...") {
        openWindow("CherStore");
      }
    } else if (menuId === "finder") {
      if (itemName === "About Finder") {
        // Could show a modal or alert
        alert("Finder - macOS File Manager");
      } else if (itemName === "Preferences...") {
        openWindow("finder-prefs");
      } else if (itemName === "Empty Trash") {
        setIsTrashEmpty(true);
      }
    } else if (menuId === "file") {
      if (itemName === "New Finder Window") {
        openWindow("finder");
      }
    }
  };

  // Window drag functionality
  const startDragWindow = (e: React.MouseEvent, windowId: string) => {
    // Don't allow dragging in fullscreen mode
    if (isFullscreen) {
      return;
    }
    
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const currentPos = windowPositions[windowId];

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      setWindowPositions((prev) => ({
        ...prev,
        [windowId]: {
          ...prev[windowId],
          x: currentPos.x + deltaX,
          y: currentPos.y + deltaY,
        },
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Function to open a window
  const openWindow = (windowType: string) => {
    // Convert app names to window IDs
    let windowId = windowType.toLowerCase();
    
    // Specific window ID mappings
    if (windowType.toLowerCase() === "system settings") {
      windowId = "settings";
    } else if (windowType === "App Store" || windowType === "CherStore") {
      windowId = "cherstore";
    }
      
    setActiveWindow(windowId);
    
    // Always set to fullscreen mode
    setIsFullscreen(true);
    
    // Ensure dock is visible initially when opening a window
    setIsDockVisible(true);
    
    // Set window position - when fullscreen, set x and y to 0
    setWindowPositions({
      ...windowPositions,
      [windowId]: { 
        x: 0, 
        y: 28, // Move down to account for menu bar height
        width: window.innerWidth, 
        height: window.innerHeight - 28  // Subtract height of the menu bar
      }
    });
    
    // Update window z-index
    const newWindows = { ...openWindows };
    if (!newWindows[windowId]) {
      newWindows[windowId] = Object.keys(newWindows).length + 1;
    } else {
      const currentZ = newWindows[windowId];
      Object.keys(newWindows).forEach(key => {
        if (newWindows[key] > currentZ) {
          newWindows[key]--;
        }
      });
      newWindows[windowId] = Object.keys(newWindows).length;
    }
    setOpenWindows(newWindows);
  };

  // Close a window
  const closeWindow = (e: React.MouseEvent, windowId: string) => {
    e.stopPropagation();
    setActiveWindow("");
    
    // Reset fullscreen state when closing a window
    setIsFullscreen(false);
    
    // Ensure dock is visible when closing a window
    setIsDockVisible(true);
    
    // Remove window from open windows
    const newOpenWindows = { ...openWindows };
    if (windowId in newOpenWindows) {
      delete newOpenWindows[windowId];
      setOpenWindows(newOpenWindows);
    }
  };

  // Focus a window by clicking on it
  const focusWindow = (windowId: string) => {
    setActiveWindow(windowId);
  };

  // Add dock hover detection
  const handleDockHover = () => {
    if (isFullscreen) {
      setIsDockVisible(true);
    }
  };

  const handleDockLeave = () => {
    if (isFullscreen) {
      setIsDockVisible(false);
    }
  };

  // Update toggleFullscreen to handle dock visibility
  const toggleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    
    // Hide dock when entering fullscreen
    if (newFullscreenState) {
      setIsDockVisible(false);
    } else {
      setIsDockVisible(true);
    }
    
    // If activeWindow exists, update its dimensions for fullscreen mode
    if (activeWindow) {
      if (newFullscreenState) {
        const currentPos = windowPositions[activeWindow];
        setWindowPositions({
          ...windowPositions,
          [activeWindow]: {
            ...currentPos,
            x: 0,
            y: 28,
            width: window.innerWidth,
            height: window.innerHeight - 28 // Only account for menu bar in fullscreen
          }
        });
      } else {
        setWindowPositions({
          ...windowPositions,
          [activeWindow]: {
            x: 100,
            y: 100,
            width: 800,
            height: 600
          }
        });
      }
    }
  };

  // Context menu for desktop items
  const showContextMenu = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, type });
  };

  const hideContextMenu = () => {
    setContextMenu(null);
  };

  // Click away to hide context menu
  useEffect(() => {
    const handleClickAway = () => hideContextMenu();
    document.addEventListener("click", handleClickAway);
    return () => document.removeEventListener("click", handleClickAway);
  }, []);

  const handleMoveToTrash = () => {
    setIsTrashEmpty(false);
    hideContextMenu();
  };

  // Handle trash click
  const handleTrashClick = () => {
    // Make sure dock is visible when opening trash
    setIsDockVisible(true);
    openWindow("trash");
  };

  // Add weather widget click handler
  const handleWeatherWidgetClick = () => {
    openWindow("weather");
  };
  
  // Add calendar widget click handler
  // const handleCalendarWidgetClick = () => {
  //   openWindow("calendar");
  // };
  
  // Add clock widget click handler
  // const handleClockWidgetClick = () => {
  //   openWindow("clock");
  // };

  // Fetch weather data based on geolocation
  useEffect(() => {
    const fetchWeatherData = async (lat: number, lon: number) => {
      try {
        setIsLoading(true);
        // Using OpenWeatherMap API with a free API key - in a real app you'd want to hide this in an environment variable
        const apiKey = "bd5e378503939ddaee76f12ad7a97608";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        
        const data = await response.json();
        
        // Fetch 5-day forecast for hourly and daily data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        
        if (!forecastResponse.ok) {
          throw new Error("Forecast data not available");
        }
        
        const forecastData = await forecastResponse.json();
        
        // Process hourly forecast (next 24 hours, in 3-hour increments)
        const hourlyForecast = forecastData.list.slice(0, 8).map((item: any) => {
          const time = new Date(item.dt * 1000);
          return {
            time: time.getHours() + ":00",
            icon: getWeatherIcon(item.weather[0].id, item.weather[0].icon.includes("d")),
            temp: Math.round(item.main.temp)
          };
        });
        
        // Process daily forecast (next 5 days)
        const dailyMap = new Map();
        forecastData.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          if (!dailyMap.has(day)) {
            dailyMap.set(day, {
              day,
              temps: [],
              icons: [],
              conditions: [],
            });
          }
          
          const dayData = dailyMap.get(day);
          dayData.temps.push(item.main.temp);
          dayData.icons.push(item.weather[0].id);
          dayData.conditions.push(item.weather[0].main);
        });
        
        const dailyForecast = Array.from(dailyMap.values()).slice(0, 5).map(day => {
          const temps = day.temps;
          return {
            day: day.day,
            icon: getWeatherIcon(getMostFrequent(day.icons), true),
            high: Math.round(Math.max(...temps)),
            low: Math.round(Math.min(...temps))
          };
        });
        
        // Set processed weather data
        setWeatherData({
          location: data.name,
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: getWeatherIcon(data.weather[0].id, data.weather[0].icon.includes("d")),
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
          hourlyForecast,
          dailyForecast
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherError("Weather data unavailable");
        setIsLoading(false);
      }
    };
    
    // Helper function to get the most frequent item in an array
    const getMostFrequent = (arr: number[]) => {
      const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      return parseInt(Object.keys(hashmap).reduce((a, b) => 
        hashmap[parseInt(a)] > hashmap[parseInt(b)] ? a : b));
    };
    
    // Helper function to convert weather code to emoji icon
    const getWeatherIcon = (code: number, isDay: boolean): string => {
      // Thunderstorm
      if (code >= 200 && code < 300) {
        return "⛈️";
      }
      // Drizzle & Rain
      else if ((code >= 300 && code < 400) || (code >= 500 && code < 600)) {
        return "🌧️";
      }
      // Snow
      else if (code >= 600 && code < 700) {
        return "❄️";
      }
      // Atmosphere (fog, mist, etc)
      else if (code >= 700 && code < 800) {
        return "🌫️";
      }
      // Clear
      else if (code === 800) {
        return isDay ? "☀️" : "🌙";
      }
      // Clouds
      else if (code > 800) {
        return isDay ? "⛅" : "☁️";
      }
      return "❓";
    };
    
    // Get user location and fetch weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setWeatherError("Location access denied");
          setIsLoading(false);
          
          // Fallback to a default location (New York)
          fetchWeatherData(40.7128, -74.0060);
        }
      );
    } else {
      setWeatherError("Geolocation not supported");
      setIsLoading(false);
      
      // Fallback to a default location
      fetchWeatherData(40.7128, -74.0060);
    }
  }, []);

  // Add macOS Sequoia scrollbar styles
  useEffect(() => {
    // Add a style tag to the document head
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .macos-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      .macos-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .macos-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        transition: background 0.2s ease;
      }
      
      .macos-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .macos-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
      }
      
      /* Hide scrollbar when not in use but maintain functionality */
      .macos-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(styleTag);

    // Clean up
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Render Cherry logo in menu bar
  const renderMenuIcon = (icon: string) => {
    if (icon === "cherry") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12,3c-0.5,0-1,0.2-1.4,0.6L7.5,7H5C3.9,7,3,7.9,3,9v10c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9c0-1.1-0.9-2-2-2h-2.5L13.4,3.6
        C13,3.2,12.5,3,12,3z M12,5l2,3.5h1.7L14,6l-2-1z M5,9h14v10H5V9z M7.5,11C6.7,11,6,11.7,6,12.5S6.7,14,7.5,14S9,13.3,9,12.5
        S8.3,11,7.5,11z M16.5,11c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S17.3,11,16.5,11z M7.8,15c-0.7,0-1.3,0.5-1.5,1.2
        l-0.1,0.8h11.6l-0.1-0.8c-0.2-0.7-0.8-1.2-1.5-1.2H7.8z"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <div 
      className="relative w-full h-full bg-black overflow-hidden"
      style={{
        filter: `brightness(${brightness}%)`,
        opacity: isPoweredOn ? 1 : 0,
      }}
    >
      {/* Wallpaper */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          !isPoweredOn && "opacity-0",
          !isFullscreen && "animated-wallpaper" // Only apply animated-wallpaper class when not in fullscreen
        )}
        style={{ 
          opacity: isPoweredOn ? brightness / 100 : 0,
          display: isPoweredOn ? "block" : "none",
          pointerEvents: isPoweredOn ? "auto" : "none",
        }}
      >
        {/* Animated comets - only show when not in fullscreen */}
        {!isFullscreen && (
          <>
            <div className="comet"></div>
            <div className="comet comet-2"></div>
            <div className="comet comet-3"></div>
            
            {/* Desktop Widgets - only visible when not in fullscreen */}
            <div className="fixed left-6 top-20 flex flex-col gap-4 z-30">
              {/* GitHub Widget */}
              <a 
                href="https://github.com/mrarmas02" 
                target="_blank" 
                rel="noopener noreferrer"
                className="desktop-widget bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold">GitHub</h3>
                    <p className="text-gray-400 text-xs">View my Profile</p>
                  </div>
                </div>
              </a>
              
              {/* TikTok Widget */}
              <a 
                href="https://www.tiktok.com/@mrarmas02" 
                target="_blank" 
                rel="noopener noreferrer"
                className="desktop-widget bg-gradient-to-br from-pink-600 to-blue-500 p-4 rounded-xl border border-pink-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold">TikTok</h3>
                    <p className="text-gray-100 text-xs">Check out my videos</p>
                  </div>
                </div>
              </a>
              
              {/* Portfolio Widget */}
              <a 
                href="https://alexarmas.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="desktop-widget bg-gradient-to-br from-purple-700 to-indigo-900 p-4 rounded-xl border border-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src="https://i.ibb.co/M4pgXXJ/Leonardo-Phoenix-10-A-luminously-sleek-logo-the-name-Alexandru-3.jpg" 
                      alt="Alexandru Armas" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Portofolio</h3>
                    <p className="text-gray-300 text-xs">View my projects</p>
                  </div>
                </div>
              </a>
            </div>
          </>
        )}
        
        {/* Menu Bar */}
        <div
          className="fixed top-0 left-0 right-0 h-7 bg-[#252525]/95 backdrop-blur-xl z-40 border-b border-white/5 flex items-center px-2 sm:px-4 text-[11px] text-white font-medium overflow-x-auto md:overflow-visible"
          style={{ pointerEvents: "auto" }}
        >
          {/* Cherry Logo - changed to Cherry */}
          <div 
            className={`flex-shrink-0 mr-2 sm:mr-4 flex items-center justify-center menu-bar-item px-2 py-0.5 rounded-sm ${activeMenu === 'cherry' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors`}
            onClick={(e) => handleMenuBarClick('cherry', e)}
          >
            {renderMenuIcon("cherry")}
          </div>
          
          {/* Menu Items */}
          <div 
            className={`flex-shrink-0 px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm menu-bar-item ${activeMenu === 'finder' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors cursor-default`}
            onClick={(e) => handleMenuBarClick('finder', e)}
          >
            Finder
          </div>
          <div 
            className={`flex-shrink-0 px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm menu-bar-item ${activeMenu === 'file' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors cursor-default hidden sm:block`}
            onClick={(e) => handleMenuBarClick('file', e)}
          >
            File
          </div>
          <div 
            className={`flex-shrink-0 px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm menu-bar-item ${activeMenu === 'edit' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors cursor-default hidden sm:block`}
            onClick={(e) => handleMenuBarClick('edit', e)}
          >
            Edit
          </div>
          <div 
            className={`flex-shrink-0 px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm menu-bar-item ${activeMenu === 'view' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors cursor-default hidden md:block`}
            onClick={(e) => handleMenuBarClick('view', e)}
          >
            View
          </div>
          <div 
            className={`flex-shrink-0 px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm menu-bar-item ${activeMenu === 'go' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors cursor-default hidden md:block`}
            onClick={(e) => handleMenuBarClick('go', e)}
          >
            Go
          </div>
          <div 
            className={`flex-shrink-0 px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm menu-bar-item ${activeMenu === 'window' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors cursor-default hidden lg:block`}
            onClick={(e) => handleMenuBarClick('window', e)}
          >
            Window
          </div>
          <div 
            className={`flex-shrink-0 px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm menu-bar-item ${activeMenu === 'help' ? 'bg-blue-500' : 'hover:bg-white/10'} transition-colors cursor-default hidden lg:block`}
            onClick={(e) => handleMenuBarClick('help', e)}
          >
            Help
          </div>
          
          {/* Right side menu items */}
          <div className="ml-auto flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
            {/* Battery Icon */}
            <div className="flex items-center hover:bg-white/10 px-1.5 py-0.5 rounded-sm transition-colors cursor-default hidden sm:flex">
              <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-white">
                <path fill="currentColor" d="M16,12H8V6h8V12z M16.67,4H15V2H9v2H7.33C6.6,4,6,4.6,6,5.33v15.33C6,21.4,6.6,22,7.33,22h9.33c0.74,0,1.34-0.6,1.34-1.33V5.33C18,4.6,17.4,4,16.67,4z" />
              </svg>
              <span className="text-xs">100%</span>
            </div>
            
            {/* WiFi Icon */}
            <div className="hover:bg-white/10 px-1.5 py-0.5 rounded-sm transition-colors cursor-default hidden md:block">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
                <path fill="currentColor" d="M1,9l2,2c4.97-4.97,13.03-4.97,18,0l2-2C16.93,2.93,7.08,2.93,1,9z M9,17l3,3l3-3C13.35,15.35,10.65,15.35,9,17z M5,13l2,2c2.76-2.76,7.24-2.76,10,0l2-2C15.14,9.14,8.87,9.14,5,13z" />
              </svg>
            </div>
            
            {/* Control Center Icon */}
            <div className="hover:bg-white/10 px-1.5 py-0.5 rounded-sm transition-colors cursor-default">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
                <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4-9a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
              </svg>
            </div>
            
            {/* Spotlight Icon */}
            <div className="hover:bg-white/10 px-1.5 py-0.5 rounded-sm transition-colors cursor-default hidden md:block">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
            
            {/* Date/Time */}
            <div className="text-xs hover:bg-white/10 px-1 sm:px-2 py-0.5 rounded-sm transition-colors cursor-default truncate max-w-[120px] md:max-w-none">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </div>
          </div>
        </div>
        
        {/* Dropdown Menus */}
        {activeMenu && (
          <div
            id={`menu-${activeMenu}`}
            className="fixed z-50 bg-[#2D2D2D]/95 backdrop-blur-xl shadow-xl rounded-lg border border-[#444]/30 text-white text-[13px] w-60 py-1"
            style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px`, pointerEvents: "auto" }}
          >
            {activeMenu === 'cherry' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default" onClick={() => openWindow("about")}>
                  About this Mac
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  System Settings...
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  App Store...
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Recent Items
                  <span className="float-right">▶</span>
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Force Quit...
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Sleep
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Restart...
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Shut Down...
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Lock Screen
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Log Out...
                </div>
              </>
            )}
            
            {activeMenu === 'finder' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  About Finder
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default" onClick={() => openWindow("finder-prefs")}>
                  Preferences...
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Empty Trash...
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Services
                  <span className="float-right">▶</span>
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Hide Finder
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Hide Others
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Show All
                </div>
              </>
            )}
            
            {activeMenu === 'file' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  New Finder Window
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  New Folder
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  New Folder with Selection
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  New Smart Folder
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  New Tab
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Open
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Open With
                  <span className="float-right">▶</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Close Window
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Get Info
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Rename
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Move to Trash
                </div>
              </>
            )}
            
            {activeMenu === 'edit' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Undo
                  <span className="float-right ml-8 text-gray-400">⌘Z</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Redo
                  <span className="float-right ml-8 text-gray-400">⇧⌘Z</span>
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Cut
                  <span className="float-right ml-8 text-gray-400">⌘X</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Copy
                  <span className="float-right ml-8 text-gray-400">⌘C</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Paste
                  <span className="float-right ml-8 text-gray-400">⌘V</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Select All
                  <span className="float-right ml-8 text-gray-400">⌘A</span>
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Find
                  <span className="float-right">▶</span>
                </div>
              </>
            )}
            
            {activeMenu === 'view' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  as Icons
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  as List
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  as Columns
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  as Gallery
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Use Groups
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Sort By
                  <span className="float-right">▶</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Clean Up
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Show Path Bar
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Show Status Bar
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Show Sidebar
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Show Preview
                </div>
              </>
            )}
            
            {activeMenu === 'go' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default" onClick={() => openWindow("finder")}>
                  Back
                  <span className="float-right ml-8 text-gray-400">⌘[</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Forward
                  <span className="float-right ml-8 text-gray-400">⌘]</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Enclosing Folder
                  <span className="float-right ml-8 text-gray-400">⌘↑</span>
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Computer
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Home
                  <span className="float-right ml-8 text-gray-400">⇧⌘H</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Downloads
                  <span className="float-right ml-8 text-gray-400">⌥⌘L</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Documents
                  <span className="float-right ml-8 text-gray-400">⇧⌘O</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Applications
                  <span className="float-right ml-8 text-gray-400">⇧⌘A</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Utilities
                  <span className="float-right ml-8 text-gray-400">⇧⌘U</span>
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Go to Folder...
                  <span className="float-right ml-8 text-gray-400">⇧⌘G</span>
                </div>
              </>
            )}
            
            {activeMenu === 'window' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Minimize
                  <span className="float-right ml-8 text-gray-400">⌘M</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Zoom
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Move Window to Left Side of Screen
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Move Window to Right Side of Screen
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Cycle Through Windows
                  <span className="float-right ml-8 text-gray-400">⌘`</span>
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Show Previous Tab
                  <span className="float-right ml-8 text-gray-400">⇧⌘{}</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Show Next Tab
                  <span className="float-right ml-8 text-gray-400">⌘{}</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  New Tab
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Bring All to Front
                </div>
              </>
            )}
            
            {activeMenu === 'help' && (
              <>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  Search
                </div>
                <div className="border-b border-[#444] my-1"></div>
                <div className="px-4 py-2 hover:bg-blue-500 cursor-default">
                  macOS Help
                  <span className="float-right ml-8 text-gray-400">⇧⌘?</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Desktop Widgets */}
        <div className="absolute top-6 left-4" style={{ pointerEvents: "auto" }}>
          {/* World Clocks widget removed */}
        </div>

        {/* Weather Widget - Enhanced with internal interactivity */}
        {!isFullscreen && (
        <div 
          className="absolute top-8 bg-gradient-to-br from-blue-600/80 to-blue-700/80 backdrop-blur-xl rounded-3xl p-4 text-white w-44 shadow-xl border border-white/10 transition-all duration-300 group weather-widget"
          style={{ 
            pointerEvents: "auto",
            animation: "bounce-gentle 6s ease-in-out infinite",
            right: "1rem",
            left: "auto",
            position: "absolute"
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-24">
              <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin mb-2"></div>
              <div className="text-sm">Loading weather...</div>
            </div>
          ) : weatherError ? (
            <div className="flex flex-col items-center justify-center h-24">
              <div className="text-3xl mb-2">⚠️</div>
              <div className="text-sm text-center">{weatherError}</div>
              <button 
                className="mt-3 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWeatherWidgetClick(); // Use existing handler instead of direct fetch
                }}
              >
                Try Again
              </button>
            </div>
          ) : weatherData && (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-200 transition-colors cursor-pointer" onClick={handleWeatherWidgetClick}>{weatherData.location}</h2>
                  <div className="text-4xl font-bold animate-pulse">{weatherData.temperature}°C</div>
                  <div className="text-sm mt-2">{weatherData.condition}</div>
                  <div className="text-sm mt-1">H:{weatherData.high}° L:{weatherData.low}°</div>
                </div>
                <div className="text-4xl animate-spin-slow cursor-pointer relative group" onClick={handleWeatherWidgetClick}>
                  {weatherData.icon}
                  <div className="absolute top-full right-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-blue-900/80 px-1.5 py-0.5 rounded whitespace-nowrap">
                    Open Weather
                  </div>
                </div>
              </div>

              {/* Mini forecast previews */}
              <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-4 gap-1">
                {weatherData.hourlyForecast?.slice(0, 4).map((hour, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-[10px]">{hour.time}</div>
                    <div className="text-xs">{hour.icon}</div>
                    <div className="text-[10px]">{hour.temp}°</div>
                  </div>
                ))}
              </div>

              {/* Control buttons */}
              <div className="mt-3 flex justify-between items-center">
                <button 
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWeatherWidgetClick(); // Use existing handler instead of direct fetch
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="text-xs opacity-70">Updated just now</div>
                
                <button 
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWeatherWidgetClick(); // Use existing handler instead of direct fetch
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
        )}

        {/* Calendar Widget - removed */}
        
        {/* Analog Clock Widget - removed */}

        {/* App Windows */}
        {activeWindow && windowPositions[activeWindow] && (
          <div
            className="absolute rounded-xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              top: `${windowPositions[activeWindow].y}px`,
              left: `${windowPositions[activeWindow].x}px`,
              width: isFullscreen
                ? "100%"
                : `${windowPositions[activeWindow].width}px`,
              height: isFullscreen
                ? "calc(100% - 28px)"
                : `${windowPositions[activeWindow].height}px`,
              transition: "all 0.3s ease",
              pointerEvents: "auto",
            }}
            onClick={() => focusWindow(activeWindow)}
          >
            {/* Window title bar */}
            <div
              className="h-8 bg-[#1A1A1A]/90 backdrop-blur-xl flex items-center px-2"
              onMouseDown={(e) => startDragWindow(e, activeWindow)}
            >
              {/* Traffic light buttons */}
              <div className="flex gap-2">
                <button
                  className="w-3 h-3 rounded-full bg-[#D81B60] hover:opacity-90 relative group"
                  onClick={(e) => closeWindow(e, activeWindow)}
                >
                  <svg
                    className="w-3 h-3 absolute inset-0 opacity-0 group-hover:opacity-100"
                    viewBox="0 0 14 14"
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4l6 6m0-6l-6 6" />
                  </svg>
                </button>
                <button className="w-3 h-3 rounded-full bg-[#FFA000] hover:opacity-90 relative group">
                  <svg
                    className="w-3 h-3 absolute inset-0 opacity-0 group-hover:opacity-100"
                    viewBox="0 0 14 14"
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="1.5"
                  >
                    <path d="M4 7h6" />
                  </svg>
                </button>
                <button
                  className="w-3 h-3 rounded-full bg-[#00ACC1] hover:opacity-90 relative group"
                  onClick={toggleFullscreen}
                >
                  <svg
                    className="w-3 h-3 absolute inset-0 opacity-0 group-hover:opacity-100"
                    viewBox="0 0 14 14"
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4h6v6H4z" fill="none" />
                  </svg>
                </button>
              </div>

              {/* Window title */}
              <div className="flex-1 text-center text-[11px] text-white/80">
                {activeWindow === "about" 
                  ? "About this Mac"
                  : activeWindow.charAt(0).toUpperCase() +
                    activeWindow.slice(1).replace("-", " ")}
              </div>
            </div>

            {/* Window content */}
            <div className="bg-[#1A1A1A] h-full rounded-b-xl overflow-hidden">
              {activeWindow === "finder" && (
                <div className="h-full flex flex-col">
                  {/* Finder Toolbar */}
                  <div className="flex items-center px-4 py-2 bg-[#f6f6f6] dark:bg-[#2c2c2c] border-b border-[#e1e1e1] dark:border-[#3d3d3d]">
                    <div className="flex items-center space-x-2 mr-4">
                      <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#e5e5e5] dark:hover:bg-[#3d3d3d] text-[#5a5a5a] dark:text-gray-400">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#e5e5e5] dark:hover:bg-[#3d3d3d] text-[#5a5a5a] dark:text-gray-400">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex space-x-1.5 mr-4">
                      <button className="flex items-center bg-[#e5e5e5] dark:bg-[#1a1a1a] px-2.5 py-1 rounded-md text-xs text-[#5a5a5a] dark:text-gray-300 hover:bg-[#dedede] dark:hover:bg-[#333]">
                        <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                        View
                      </button>
                      <button className="flex items-center bg-[#e5e5e5] dark:bg-[#1a1a1a] px-2.5 py-1 rounded-md text-xs text-[#5a5a5a] dark:text-gray-300 hover:bg-[#dedede] dark:hover:bg-[#333]">
                        <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Actions
                      </button>
                    </div>
                    
                    <div className="relative flex-1 max-w-xs">
                      <input
                        type="text"
                        className="w-full px-7 py-1 bg-[#e5e5e5] dark:bg-[#1a1a1a] text-[#5a5a5a] dark:text-gray-300 rounded-md text-xs"
                        placeholder="Search"
                      />
                      <svg
                        className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#858585] dark:text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    
                    <div className="flex ml-4 space-x-2">
                      <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#e5e5e5] dark:hover:bg-[#333] text-[#5a5a5a] dark:text-gray-400">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                      <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#e5e5e5] dark:hover:bg-[#333] text-[#5a5a5a] dark:text-gray-400">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#e5e5e5] dark:hover:bg-[#333] text-[#5a5a5a] dark:text-gray-400">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex bg-white dark:bg-black">
                    {/* Sidebar */}
                    <div className="w-44 p-2 space-y-4 border-r border-[#e1e1e1] dark:border-[#333] overflow-auto macos-scrollbar bg-[#f0f0f2] dark:bg-black" style={{ maxHeight: "calc(100% - 40px)" }}>
                      <div style={{ minHeight: "100%" }}>
                        <div className="mb-4">
                          <div className="text-xs text-[#8e8e8e] dark:text-gray-500 font-medium px-3 mb-1 mt-1">
                            Favorites
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center py-1 px-2 text-white bg-[#0066FF] rounded-md text-sm">
                              <svg
                                className="w-4 h-4 mr-2"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                              </svg>
                              <span>AirDrop</span>
                            </div>
                            <div className="flex items-center py-1 px-2 text-[#444] dark:text-gray-300 hover:bg-[#e5e5e5] dark:hover:bg-[#1a1a1a] rounded-md text-sm">
                              <svg
                                className="w-4 h-4 mr-2 text-[#777] dark:text-gray-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                              </svg>
                              <span>Recents</span>
                            </div>
                            <div className="flex items-center py-1 px-2 text-[#444] dark:text-gray-300 hover:bg-[#e5e5e5] dark:hover:bg-[#1a1a1a] rounded-md text-sm">
                              <svg
                                className="w-4 h-4 mr-2 text-[#777] dark:text-gray-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-0.9 2-2V6c0-1.1-.9-2-2-2zm-7.53 12L9 13.47l1.06-1.06 2.41 2.41 5.94-5.94L19.47 10l-7 7z" />
                              </svg>
                              <span>Applications</span>
                            </div>
                            <div className="flex items-center py-1 px-2 text-[#444] dark:text-gray-300 hover:bg-[#e5e5e5] dark:hover:bg-[#1a1a1a] rounded-md text-sm">
                              <svg
                                className="w-4 h-4 mr-2 text-[#777] dark:text-gray-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h11c.67 0 1.27-.34 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z" />
                              </svg>
                              <span>Desktop</span>
                            </div>
                            </div>
                            </div>
                          </div>
                        </div>

                    {/* File Browser */}
                    <div className="flex-1 overflow-auto macos-scrollbar bg-white dark:bg-black">
                      <div className="p-4">
                        <div className="text-sm font-medium text-[#444] dark:text-gray-300 mb-3">AirDrop</div>
                        <div className="grid grid-cols-5 gap-4">
                          {[
                            { name: "Macbook Pro", type: "device", icon: "laptop" },
                            { name: "iPhone 15 Pro", type: "device", icon: "phone" },
                            { name: "John's iPad", type: "device", icon: "tablet" },
                            { name: "Sarah's iPhone", type: "device", icon: "phone" },
                            { name: "Office iMac", type: "device", icon: "desktop" }
                          ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#f0f0f0] dark:hover:bg-[#1a1a1a] cursor-pointer">
                              <div className="w-16 h-16 rounded-full bg-[#e5e5e5] dark:bg-[#1a1a1a] flex items-center justify-center mb-2">
                                {item.icon === "laptop" && (
                                  <svg className="w-8 h-8 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                                </svg>
                                )}
                                {item.icon === "phone" && (
                                  <svg className="w-8 h-8 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                                </svg>
                                )}
                                {item.icon === "tablet" && (
                                  <svg className="w-8 h-8 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 1H5c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H5V5h14v14z" />
                                </svg>
                                )}
                                {item.icon === "desktop" && (
                                  <svg className="w-8 h-8 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
                                </svg>
                                )}
                  </div>
                              <div className="text-xs text-[#444] dark:text-gray-300 text-center max-w-[90px] truncate">{item.name}</div>
                      </div>
                          ))}
                    </div>
                        <div className="text-xs text-[#8e8e8e] dark:text-gray-500 mt-4 text-center">
                          Looking for devices...
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeWindow === "netscape" && (
                <NetscapeBrowser />
              )}
              
              {activeWindow === "mail" && (
                <div className="h-full flex flex-col">
                  {/* Mail Toolbar */}
                  <div className="px-3 py-1.5 flex items-center space-x-2 bg-[#f5f5f7] dark:bg-[#252525] border-b border-[#ddd] dark:border-[#333]">
                    <div className="flex space-x-1">
                      <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#323232] text-[#555] dark:text-gray-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                      <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#323232] text-[#555] dark:text-gray-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 7l-7 7-7-7" />
                        </svg>
                      </button>
                      <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#323232] text-[#555] dark:text-gray-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="h-4 w-px bg-[#ddd] dark:bg-[#444]"></div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#323232] text-[#555] dark:text-gray-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </button>
                      <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#323232] text-[#555] dark:text-gray-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                        </svg>
                      </button>
                    </div>
                    <div className="h-4 w-px bg-[#ddd] dark:bg-[#444]"></div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#323232] text-[#555] dark:text-gray-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 19v-8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <path d="M16 9V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v5" />
                        </svg>
                      </button>
                      <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#323232] text-[#555] dark:text-gray-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 flex justify-end">
                      <div className="relative">
                      <input
                        type="text"
                          className="px-8 py-1 bg-[#e5e5e5] dark:bg-[#323232] text-[#333] dark:text-gray-300 rounded-md border border-[#ddd] dark:border-[#3A3A3A]/50 text-xs w-56"
                          placeholder="Search"
                      />
                        <svg className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mail Content */}
                  <div className="flex-1 flex bg-[#f5f5f7] dark:bg-[#1A1A1A]">
                    {/* Sidebar */}
                    <div className="w-44 bg-[#f0f0f2] dark:bg-[#252525] p-2 border-r border-[#ddd] dark:border-[#333] macos-scrollbar">
                      <div className="text-xs font-bold text-[#777] dark:text-gray-400 mb-1.5 mt-1 px-2">FAVORITES</div>
                      <div className="space-y-0.5">
                        <div className="text-sm bg-[#0066CC] text-white px-2 py-1 rounded flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Inbox
                          <span className="ml-auto bg-[#0055AA] text-xs px-1.5 rounded-full">14</span>
                        </div>
                        <div className="text-sm text-[#333] dark:text-gray-300 hover:bg-[#e0e0e0] dark:hover:bg-[#323232] px-2 py-1 rounded flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-[#E74C3C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          VIP
                        </div>
                        <div className="text-sm text-[#333] dark:text-gray-300 hover:bg-[#e0e0e0] dark:hover:bg-[#323232] px-2 py-1 rounded flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-[#3498DB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Sent
                        </div>
                      </div>
                      
                      <div className="text-xs font-bold text-[#777] dark:text-gray-400 mt-3 mb-1.5 px-2">MAILBOXES</div>
                      <div className="space-y-0.5">
                        <div className="text-sm text-[#333] dark:text-gray-300 hover:bg-[#e0e0e0] dark:hover:bg-[#323232] px-2 py-1 rounded flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7l-7 7-7-7" />
                          </svg>
                          Drafts
                          <span className="ml-auto bg-[#ddd] dark:bg-[#444] text-[#666] dark:text-gray-300 text-xs px-1.5 rounded-full">3</span>
                        </div>
                        <div className="text-sm text-[#333] dark:text-gray-300 hover:bg-[#e0e0e0] dark:hover:bg-[#323232] px-2 py-1 rounded flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                          Outbox
                        </div>
                        <div className="text-sm text-[#333] dark:text-gray-300 hover:bg-[#e0e0e0] dark:hover:bg-[#323232] px-2 py-1 rounded flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Archive
                        </div>
                        <div className="text-sm text-[#333] dark:text-gray-300 hover:bg-[#e0e0e0] dark:hover:bg-[#323232] px-2 py-1 rounded flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-[#777] dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7l-7 7-7-7" />
                          </svg>
                          Deleted Items
                        </div>
                      </div>
                    </div>
                    
                    {/* Email List */}
                    <div className="w-1/3 border-r border-[#ddd] dark:border-[#333] overflow-auto macos-scrollbar bg-white dark:bg-[#232323]">
                      <div className="sticky top-0 bg-[#f5f5f7] dark:bg-[#1A1A1A] border-b border-[#ddd] dark:border-[#333] px-3 py-2 flex justify-between items-center">
                        <div className="text-sm font-medium text-[#333] dark:text-white">Inbox</div>
                        <div className="flex items-center space-x-2">
                          <button className="text-xs text-[#0066CC] dark:text-blue-400 hover:underline">
                          Edit
                        </button>
                          <span className="text-xs text-[#777] dark:text-gray-400">14 messages</span>
                        </div>
                      </div>
                      
                      {/* Email Items */}
                      {[
                        { id: 1, sender: "Apple", subject: "Your Apple ID was used to sign in", preview: "Your Apple ID (user@example.com) was used to sign in to iCloud via a web browser.", time: "9:41 AM", unread: true, flagged: false },
                        { id: 2, sender: "GitHub", subject: "Security alert: New sign-in to GitHub", preview: "We noticed a recent sign-in to your GitHub account from a new location.", time: "Yesterday", unread: true, flagged: true },
                        { id: 3, sender: "Netflix", subject: "New TV shows and movies on Netflix", preview: "Here are the latest TV shows and movies now available on Netflix.", time: "Yesterday", unread: false, flagged: false },
                        { id: 4, sender: "Spotify", subject: "Your weekly mix is ready", preview: "Your Discover Weekly playlist is updated with new songs we think you'll love.", time: "Mon", unread: false, flagged: false },
                        { id: 5, sender: "Amazon", subject: "Your Amazon order has shipped", preview: "Your package with order #123-4567890-1234567 has shipped.", time: "Sun", unread: false, flagged: false },
                        { id: 6, sender: "LinkedIn", subject: "You have 3 new connections", preview: "See who's joined your network this week and stay connected.", time: "Sat", unread: false, flagged: true },
                        { id: 7, sender: "Twitter", subject: "You have new notifications", preview: "See what's happening on Twitter with your recent notifications.", time: "Fri", unread: false, flagged: false },
                        { id: 8, sender: "Dropbox", subject: "Someone shared a folder with you", preview: "John Doe has shared the folder 'Project X' with you.", time: "Thu", unread: false, flagged: false },
                        { id: 9, sender: "Slack", subject: "New messages in your channels", preview: "You have unread messages in the #general channel.", time: "Wed", unread: false, flagged: false },
                        { id: 10, sender: "Google", subject: "Security alert: New sign-in on Chrome", preview: "New sign-in detected on Chrome on macOS.", time: "Tue", unread: false, flagged: false }
                      ].map((email) => (
                        <div key={email.id} className={`px-3 py-2 border-b border-[#eee] dark:border-[#333] hover:bg-[#f0f0f2] dark:hover:bg-[#2a2a2a] cursor-pointer ${email.id === 1 ? 'bg-[#e8e8ea] dark:bg-[#2a2a2a]' : ''}`}>
                          <div className="flex justify-between items-start mb-0.5">
                            <div className={`text-sm text-[#333] dark:text-gray-200 ${email.unread ? 'font-bold' : 'font-medium'}`}>{email.sender}</div>
                            <div className="flex items-center">
                              {email.flagged && (
                                <svg className="w-3.5 h-3.5 text-[#E74C3C] mr-1" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M3.5 6.5h17v11L14 13l-7 4.5v-11z" />
                                </svg>
                              )}
                              <div className="text-xs text-[#777] dark:text-gray-400">{email.time}</div>
                          </div>
                          </div>
                          <div className={`text-sm text-[#333] dark:text-gray-200 ${email.unread ? 'font-semibold' : ''}`}>{email.subject}</div>
                          <div className="text-xs text-[#666] dark:text-gray-400 truncate">{email.preview}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Email Content */}
                    <div className="flex-1 bg-white dark:bg-[#232323] overflow-auto macos-scrollbar">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-lg font-bold text-[#333] dark:text-white">Your Apple ID was used to sign in</h2>
                            <div className="flex items-center mt-1">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold mr-2">A</div>
                              <div>
                                <div className="text-sm font-medium text-[#333] dark:text-gray-200">Apple <span className="text-[#777] dark:text-gray-400">&lt;noreply@apple.com&gt;</span></div>
                                <div className="text-xs text-[#777] dark:text-gray-400">To: you@example.com</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-xs text-[#777] dark:text-gray-400">Today at 9:41 AM</div>
                            <div className="flex space-x-1 mt-1">
                              <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#333] text-[#777] dark:text-gray-400">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </button>
                              <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#333] text-[#777] dark:text-gray-400">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </button>
                              <button className="p-1 rounded-md hover:bg-[#e0e0e0] dark:hover:bg-[#333] text-[#777] dark:text-gray-400">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 text-[#333] dark:text-gray-200">
                          <div className="space-y-4 text-sm">
                            <p>Dear Customer,</p>
                            <p>Your Apple ID (user@example.com) was used to sign in to iCloud via a web browser.</p>
                            <p><strong>Date and Time:</strong> November 8, 2023, 9:41 AM PST</p>
                            <p><strong>Device:</strong> Safari on macOS</p>
                            <p><strong>Location:</strong> Cupertino, CA, United States</p>
                            <p>If you recently signed in to iCloud via a web browser, you can disregard this email.</p>
                            <p>If you have not recently signed in to iCloud via a web browser and believe someone else may have accessed your account, you should reset your Apple ID password as soon as possible.</p>
                            <p>To reset your password, go to the Apple ID account page (https://appleid.apple.com) or Apple ID Sign-in and Security (https://appleid.apple.com/signin).</p>
                            <p>Apple Support</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeWindow === "trash" && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <button className="px-2 py-1 bg-[#323232] text-gray-300 rounded-l-md border border-[#3A3A3A]/50 hover:bg-[#424242]">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="px-2 py-1 bg-[#323232] text-gray-300 rounded-r-md border-t border-r border-b border-[#3A3A3A]/50 hover:bg-[#424242]">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 px-2 py-1 bg-[#323232] text-gray-400 rounded-md border border-[#3A3A3A]/50 text-xs">
                      Search
                    </div>
                    {!isTrashEmpty && (
                      <button
                        className="px-2 py-1 bg-[#323232] text-gray-300 rounded-md border border-[#3A3A3A]/50 hover:bg-[#424242] text-xs"
                        onClick={() => setIsTrashEmpty(true)}
                      >
                        Empty Trash
                      </button>
                    )}
                  </div>

                  <div className="flex-1 bg-[#1A1A1A] rounded-lg border border-[#3A3A3A]/30 flex items-center justify-center">
                    {isTrashEmpty ? (
                      <div className="text-center text-gray-400">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-12 h-12 mx-auto mb-2 opacity-50"
                        >
                          <path
                            fill="currentColor"
                            d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"
                          />
                        </svg>
                        <p className="text-sm">Trash is Empty</p>
                      </div>
                    ) : (
                      <div className="w-full h-full p-4 grid grid-cols-4 gap-4 content-start">
          <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-[#323232] rounded-xl flex items-center justify-center mb-1.5 shadow-md">
                            <svg
                              className="w-10 h-10 text-blue-400"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-0.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                              />
              </svg>
            </div>
                          <span className="text-[11px] text-gray-300">
                            Macintosh HD
                          </span>
          </div>
        </div>
                    )}
                  </div>
                </div>
              )}

              {activeWindow === "weather" && (
                <div className="w-full h-full overflow-hidden">
                  {/* Weather app toolbar */}
                  <div className="h-10 bg-[#1e1e1e] flex items-center justify-center relative text-white/80 text-sm font-medium border-b border-[#333]">
                    <div className="absolute left-4 flex items-center space-x-2">
                      <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-[#333] text-white/70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-[#333] text-white/70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    Weather
                    <div className="absolute right-4 flex items-center space-x-2">
                      <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-[#333] text-white/70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-[#333] text-white/70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Weather app content */}
                  <div className="w-full h-[calc(100%-2.5rem)] bg-[#1a3a8f] text-white overflow-y-auto">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-10 h-10 border-3 border-white rounded-full border-t-transparent animate-spin mb-4"></div>
                        <div className="text-xl">Loading weather data...</div>
                      </div>
                    ) : weatherError ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-5xl mb-4">⚠️</div>
                        <div className="text-xl text-center">{weatherError}</div>
                        <div className="mt-4 text-sm text-center max-w-md">
                          Please enable location services in your browser to see weather information for your current location.
                        </div>
                      </div>
                    ) : weatherData && (
                      <div className="p-8 pt-10">
                        {/* City name */}
                        <h1 className="text-3xl font-semibold mb-6">{weatherData.location}</h1>
                        
                        {/* Temperature and icon in simplified format */}
                        <div className="flex items-center">
                          <div className="text-[140px] font-light relative leading-none">
                            {weatherData.temperature < 0 ? "-" : ""}
                            {Math.abs(weatherData.temperature)}°
                          </div>
                          <div className="text-6xl ml-2 mt-4">{weatherData.icon}</div>
                        </div>
                        
                        {/* Condition and high/low */}
                        <div className="text-2xl mt-2">{weatherData.condition}</div>
                        <div className="text-xl mt-2">
                          H: {weatherData.high > 0 ? "" : "-"}{Math.abs(weatherData.high)}°C 
                          L: {weatherData.low > 0 ? "" : "-"}{Math.abs(weatherData.low)}°C
                        </div>
                        
                        {/* Hourly forecast in a more subtle format */}
                        <div className="mt-12">
                          <h2 className="text-xl font-medium mb-4">Hourly Forecast</h2>
                          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                            <div className="grid grid-cols-8 gap-2">
                              {weatherData.hourlyForecast.map((hour, i) => (
                                <div key={i} className="flex flex-col items-center p-2">
                                  <div className="font-medium">{hour.time}</div>
                                  <div className="my-2 text-xl">{hour.icon}</div>
                                  <div className="font-medium">
                                    {hour.temp > 0 ? "" : "-"}{Math.abs(hour.temp)}°
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* 5-Day forecast */}
                        <div className="mt-8 pb-8">
                          <h2 className="text-xl font-medium mb-4">5-Day Forecast</h2>
                          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                            {weatherData.dailyForecast.map((day, i) => (
                              <div key={i} className={`flex items-center py-3 ${i !== weatherData.dailyForecast.length - 1 ? 'border-b border-white/10' : ''}`}>
                                <div className="w-24 font-medium">{day.day}</div>
                                <div className="text-2xl mx-4">{day.icon}</div>
                                <div className="flex-1 flex items-center">
                                  <div className="font-medium w-10">
                                    {day.low > 0 ? "" : "-"}{Math.abs(day.low)}°
                                  </div>
                                  <div className="flex-1 mx-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-white rounded-full"
                                      style={{ 
                                        width: `${Math.abs((day.high - day.low) / 20) * 100}%`,
                                        marginLeft: `${Math.min(100, Math.max(0, ((day.low + 20) / 40) * 100))}%` 
                                      }}
                                    ></div>
                                  </div>
                                  <div className="font-medium w-10">
                                    {day.high > 0 ? "" : "-"}{Math.abs(day.high)}°
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeWindow === "maps" && (
                <div className="h-full flex flex-col">
                  <div className="p-3 flex items-center justify-between bg-[#252525] border-b border-[#333]">
                    <div className="flex-1 flex items-center">
                      <div className="bg-[#323232] rounded-md px-3 py-1.5 text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        Search for a place or address
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-[#1A1A1A] overflow-hidden">
                    <MacOSMap />
                  </div>
                </div>
              )}

              {activeWindow === "netscape" && (
                <NetscapeBrowser />
              )}

              {activeWindow === "mail" && (
                <div className="h-full flex flex-col">
                   {/* Mail Toolbar */}
                   <div className="flex h-10 items-center px-4 py-2 justify-between bg-[#252525] border-b border-[#333]">
                     <div className="flex space-x-2">
                       <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                       </svg>
                       <span className="text-sm text-gray-400">Search Mail</span>
                  </div>
                     <div className="flex items-center space-x-3">
                       <button className="p-1 rounded hover:bg-[#3A3A3A]">
                         <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                           <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                         </svg>
                       </button>
                       <button className="p-1 rounded hover:bg-[#3A3A3A]">
                         <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                         </svg>
                       </button>
                      </div>
                    </div>
                   <div className="flex-1 flex bg-[#1A1A1A]">
                     {/* Sidebar */}
                     <div className="w-64 bg-[#232323] overflow-y-auto border-r border-[#3A3A3A] macos-scrollbar" style={{ maxHeight: "calc(100% - 40px)" }}>
                       <div className="p-2" style={{ minHeight: "130%" }}>
                         <div className="mb-2">
                           <div className="text-[11px] text-gray-500 font-medium px-3 py-1 uppercase">Folders</div>
                           <div className="space-y-1 mt-1">
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                              </svg>
                               <span className="text-sm text-gray-300">Inbox</span>
                            </div>
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.41 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z" />
                               </svg>
                               <span className="text-sm text-gray-300">Sent</span>
                          </div>
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.41 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z" />
                               </svg>
                               <span className="text-sm text-gray-300">Drafts</span>
                      </div>
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.41 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z" />
                               </svg>
                               <span className="text-sm text-gray-300">Junk</span>
                    </div>
                  </div>
                </div>
                         
                         <div>
                           <div className="text-[11px] text-gray-500 font-medium px-3 py-1 uppercase">Mailboxes</div>
                           <div className="space-y-1 mt-1">
                             {[
                               { 
                                 name: "Family Group", 
                                 avatar: "F",
                                 avatarColor: "bg-green-500",
                                 lastMessage: "What time should we meet?",
                                 time: "Yesterday" 
                               },
                               { 
                                 name: "Alex Taylor", 
                                 avatar: "A",
                                 avatarColor: "bg-purple-500",
                                 lastMessage: "Did you see the new update?",
                                 time: "Yesterday" 
                               },
                               { 
                                 name: "Sarah Johnson", 
                                 avatar: "S",
                                 avatarColor: "bg-red-500",
                                 lastMessage: "Thanks for sending that!",
                                 time: "Friday" 
                               },
                               { 
                                 name: "Work Team", 
                                 avatar: "W",
                                 avatarColor: "bg-orange-500",
                                 lastMessage: "Meeting moved to 3pm",
                                 time: "Friday" 
                               }
                             ].map((contact, i) => (
                               <div key={i} className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                                 <div className={`w-8 h-8 ${contact.avatarColor} rounded-full flex items-center justify-center text-white font-semibold mr-2`}>
                                   {contact.avatar}
                      </div>
                                 <div className="flex-1 min-w-0">
                                   <div className="flex justify-between items-center">
                                     <p className="text-sm font-medium text-gray-300 truncate">{contact.name}</p>
                                     <p className="text-xs text-gray-500">{contact.time}</p>
                    </div>
                                   <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                    </div>
                    </div>
                             ))}
                  </div>
                         </div>
                       </div>
                  </div>
                  
                     {/* Main conversation area */}
                     <div className="flex-1 flex flex-col">
                       {/* Conversation header */}
                       <div className="p-3 bg-[#252525] border-b border-[#333] flex items-center justify-between">
                         <div className="flex items-center">
                           <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                             J
                           </div>
                           <div className="font-medium text-white">John Appleseed</div>
                         </div>
                         <div className="flex space-x-2">
                           <button className="p-1 rounded hover:bg-[#3A3A3A]">
                             <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                               <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                             </svg>
                            </button>
                           <button className="p-1 rounded hover:bg-[#3A3A3A]">
                             <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                               <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                             </svg>
                            </button>
                          </div>
                        </div>
                       
                       {/* Messages */}
                       <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-[#1A1A1A] macos-scrollbar" style={{ maxHeight: "calc(100% - 85px)" }}>
                         <div className="flex justify-center">
                           <div className="text-xs text-gray-500 bg-[#252525] px-3 py-1 rounded-full">
                             Today, 9:41 AM
                      </div>
                    </div>
                    
                         <div className="flex justify-end">
                           <div className="bg-[#0066FF] text-white p-2 rounded-2xl rounded-tr-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">Hey there! How's it going?</p>
                             <div className="text-right mt-1">
                               <span className="text-xs opacity-70">9:41 AM</span>
                      </div>
                              </div>
                            </div>
                         
                         <div className="flex justify-start">
                           <div className="bg-[#252525] text-white p-2 rounded-2xl rounded-tl-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">Not bad, just working on this macOS simulator.</p>
                             <div className="text-right mt-1">
                               <span className="text-xs text-gray-400">9:42 AM</span>
                          </div>
                      </div>
                    </div>
                    
                         <div className="flex justify-end">
                           <div className="bg-[#0066FF] text-white p-2 rounded-2xl rounded-tr-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">That's cool! It looks great so far.</p>
                             <div className="text-right mt-1">
                               <span className="text-xs opacity-70">9:43 AM</span>
                      </div>
                              </div>
                              </div>
                         
                         <div className="flex justify-start">
                           <div className="bg-[#252525] text-white p-2 rounded-2xl rounded-tl-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">Thanks! I just added Maps with real location tracking!</p>
                             <div className="text-right mt-1">
                               <span className="text-xs text-gray-400">9:45 AM</span>
                            </div>
                          </div>
                      </div>
                    </div>
                    
                       {/* Message input */}
                       <div className="p-3 bg-[#252525] border-t border-[#333]">
                         <div className="flex items-center bg-[#1E1E1E] rounded-full px-3 py-1.5">
                           <button className="p-1 mr-2 text-gray-400 hover:text-gray-300">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                              </svg>
                           </button>
                           <input 
                             type="text" 
                             placeholder="iMessage" 
                             className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm" 
                           />
                           <button className="p-1 ml-2 text-blue-400 hover:text-blue-300">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                               <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                             </svg>
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeWindow === "settings" && (
                <div className="w-full h-full bg-[#161616] text-white p-0 flex overflow-hidden rounded-xl shadow-xl">
                  {/* Sidebar with modern icons */}
                  <div className="w-56 bg-[#1D1D1D] overflow-auto flex flex-col macos-scrollbar-always pr-1">
                    <div className="sticky top-0 bg-[#1D1D1D] z-10 px-4 py-3 border-b border-[#303030]">
                      <div className="relative">
                        <svg className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#999]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full bg-[#303030] border-none rounded-md px-3 py-1.5 pl-8 text-sm text-[#E0E0E0] placeholder-[#999] focus:ring-1 focus:outline-none focus:ring-[#0066FF]"
                        />
                      </div>
                    </div>
                    
                    <div className="py-1 pb-16">
                      <div className="px-4 py-1.5 text-xs text-[#999] font-medium mt-2">
                        PERSONAL
                      </div>
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "cherry-id" ? "bg-[#E94C2B] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("cherry-id")}
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#E94C2B] to-[#C13E23] flex items-center justify-center text-white text-xs font-bold">S</div>
                        <span className="text-sm font-medium">Cherry ID</span>
                      </button>
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "family" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("family")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Family</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "passwords" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("passwords")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Passwords</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "internet-accounts" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("internet-accounts")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Internet Accounts</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "users-groups" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("users-groups")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Users & Groups</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "spotlight" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("spotlight")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="22" y1="22" x2="18" y2="18"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Spotlight</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "screen-time" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("screen-time")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Screen Time</span>
                      </button>
                      
                      <div className="px-4 py-1.5 text-xs text-[#999] font-medium mt-4">
                        APPEARANCE
                      </div>
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "appearance" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("appearance")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Appearance</span>
                      </button>
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "desktop" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("desktop")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Desktop & Dock</span>
                      </button>
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "control-center" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("control-center")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Control Center</span>
                      </button>
                      
                      <div className="px-4 py-1.5 text-xs text-[#999] font-medium mt-4">
                        INPUT & OUTPUT
                      </div>
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "keyboard" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("keyboard")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                            <line x1="6" y1="10" x2="6" y2="10"></line>
                            <line x1="10" y1="10" x2="10" y2="10"></line>
                            <line x1="14" y1="10" x2="14" y2="10"></line>
                            <line x1="18" y1="10" x2="18" y2="10"></line>
                            <line x1="6" y1="14" x2="18" y2="14"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Keyboard</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "trackpad" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("trackpad")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Trackpad</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "mouse" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("mouse")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="6" y="3" width="12" height="18" rx="6" ry="6"></rect>
                            <line x1="12" y1="7" x2="12" y2="11"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Mouse</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "sound" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("sound")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Sound</span>
                      </button>
                      
                      <div className="px-4 py-1.5 text-xs text-[#999] font-medium mt-4">
                        SYSTEM
                      </div>
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "general" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("general")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">General</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "software-update" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("software-update")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 2v6h-6"></path>
                            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                            <path d="M3 22v-6h6"></path>
                            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Software Update</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "security-privacy" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("security-privacy")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Security & Privacy</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "siri" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("siri")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"></path>
                            <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                            <path d="M15.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Cherry</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "accessibility" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("accessibility")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 8v8"></path>
                            <path d="M8 12h8"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Accessibility</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "notifications" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("notifications")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Notifications</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "battery" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("battery")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
                            <line x1="22" y1="11" x2="22" y2="13"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Battery</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "network" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("network")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                            <line x1="12" y1="20" x2="12.01" y2="20"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Network</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "bluetooth" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("bluetooth")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 7l10 10-5 5V2l5 5L7 17"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Bluetooth</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "time-machine" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("time-machine")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Time Machine</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "printers-scanners" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("printers-scanners")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Printers & Scanners</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "extensions" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("extensions")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Extensions</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "sharing" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("sharing")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                            <line x1="6" y1="10" x2="6" y2="10"></line>
                            <line x1="10" y1="10" x2="10" y2="10"></line>
                            <line x1="14" y1="10" x2="14" y2="10"></line>
                            <line x1="18" y1="10" x2="18" y2="10"></line>
                            <line x1="6" y1="14" x2="18" y2="14"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Sharing</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "storage" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("storage")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Storage</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "date-time" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("date-time")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="6" y="3" width="12" height="18" rx="6" ry="6"></rect>
                            <line x1="12" y1="7" x2="12" y2="11"></line>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Date & Time</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "language-region" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("language-region")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Language & Region</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "wallet-apple-pay" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("wallet-apple-pay")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Wallet & Apple Pay</span>
                      </button>
                      
                      <button 
                        className={`w-full px-3 py-2 flex items-center gap-3 rounded-md ${activeSettingsPanel === "screen-time" ? "bg-[#0066FF] text-white" : "text-[#E0E0E0] hover:bg-[#303030]"}`}
                        onClick={() => setActiveSettingsPanel("screen-time")}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Screen Time</span>
                      </button>
                      
                      <div className="h-6"></div>
                    </div>
                  </div>
                  
                  {/* Main content area */}
                  <div className="flex-1 bg-[#161616] overflow-auto p-6 macos-scrollbar">
                    {/* General settings panel */}
                    {activeSettingsPanel === "general" && <GeneralSettings />}
                    
                    {/* Appearance settings panel */}
                    {activeSettingsPanel === "appearance" && (
                      <div className="max-w-3xl mx-auto">
                        <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Appearance</h1>
                        
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Appearance</h2>
                            <div className="bg-[#232323] rounded-xl p-5">
                              <div className="flex items-center justify-between mb-5">
                                <div className="font-medium text-[#E0E0E0]">Appearance</div>
                                <div className="flex items-center gap-4">
                                  <button 
                                    className={`h-10 w-10 rounded-full flex items-center justify-center ${selectedAppearance === 'light' ? 'bg-[#0066FF] text-white' : 'bg-[#303030] text-[#999]'}`}
                                    onClick={() => setSelectedAppearance('light')}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <circle cx="12" cy="12" r="5"></circle>
                                      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
                                    </svg>
                                  </button>
                                  <button 
                                    className={`h-10 w-10 rounded-full flex items-center justify-center ${selectedAppearance === 'dark' ? 'bg-[#0066FF] text-white' : 'bg-[#303030] text-[#999]'}`}
                                    onClick={() => setSelectedAppearance('dark')}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                  </button>
                                  <button 
                                    className={`h-10 w-10 rounded-full flex items-center justify-center ${selectedAppearance === 'auto' ? 'bg-[#0066FF] text-white' : 'bg-[#303030] text-[#999]'}`}
                                    onClick={() => setSelectedAppearance('auto')}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-md overflow-hidden">
                                  <div className="h-24 bg-white"></div>
                                  <div className="bg-[#F2F2F7] p-3 flex items-center justify-between">
                                    <span className="text-xs text-[#1D1D1F] font-medium">Light</span>
                                    {selectedAppearance === 'light' && (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0066FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="rounded-md overflow-hidden">
                                  <div className="h-24 bg-[#1D1D1D]"></div>
                                  <div className="bg-[#2C2C2E] p-3 flex items-center justify-between">
                                    <span className="text-xs text-[#E0E0E0] font-medium">Dark</span>
                                    {selectedAppearance === 'dark' && (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0066FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Accent Color</h2>
                            <div className="bg-[#232323] rounded-xl p-5">
                              <div className="font-medium text-[#E0E0E0] mb-3">Accent color</div>
                              <div className="flex flex-wrap gap-3">
                                {['#0066FF', '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#5AC8FA', '#AF52DE', '#FF2D55'].map((color, i) => (
                                  <button 
                                    key={i}
                                    className={`h-8 w-8 rounded-full flex items-center justify-center ${selectedAccentColor === i ? 'ring-2 ring-white' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedAccentColor(i)}
                                  >
                                    {selectedAccentColor === i && (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    )}
                                  </button>
                                ))}
                              </div>
                              
                              <div className="mt-5">
                                <label className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={useAccentForHighlights}
                                    onChange={() => setUseAccentForHighlights(!useAccentForHighlights)}
                                    className="w-4 h-4 rounded bg-[#303030] border-none focus:ring-[#0066FF] text-[#0066FF]"
                                  />
                                  <span className="text-sm text-[#E0E0E0]">Use accent color for buttons, menus, and controls</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeSettingsPanel === "desktop" && (
                      <div className="max-w-3xl mx-auto">
                        <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Desktop & Dock</h1>
                        
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Dock</h2>
                            <div className="bg-[#232323] rounded-xl p-5 space-y-5">
                              <div>
                                <div className="font-medium text-[#E0E0E0] mb-2">Size</div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-[#999]">Small</span>
                                  <input 
                                    type="range" 
                                    min="30" 
                                    max="80" 
                                    value={dockSize}
                                    onChange={(e) => setDockSize(parseInt(e.target.value))}
                                    className="flex-1 h-1 bg-[#424242] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                  />
                                  <span className="text-xs text-[#999]">Large</span>
                                </div>
                              </div>
                              
                              <div>
                                <div className="font-medium text-[#E0E0E0] mb-2">Magnification</div>
                                <div className="flex items-center mb-2">
                                  <input
                                    type="checkbox"
                                    checked={dockMagnification}
                                    onChange={() => setDockMagnification(!dockMagnification)}
                                    className="w-4 h-4 rounded bg-[#303030] border-none focus:ring-[#0066FF] text-[#0066FF]"
                                  />
                                  <span className="text-sm text-[#E0E0E0] ml-2">Magnify icons when cursor hovers over them</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-[#999]">Small</span>
                                  <input 
                                    type="range" 
                                    min="30" 
                                    max="80" 
                                    value={dockSize}
                                    onChange={(e) => setDockSize(parseInt(e.target.value))}
                                    disabled={!dockMagnification}
                                    className="flex-1 h-1 bg-[#424242] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white disabled:opacity-50"
                                  />
                                  <span className="text-xs text-[#999]">Large</span>
                                </div>
                              </div>
                              
                              <div>
                                <div className="font-medium text-[#E0E0E0] mb-2">Position on screen</div>
                                <div className="flex items-center justify-between gap-3">
                                  <button 
                                    className={`px-3 py-1.5 rounded-md text-sm ${dockPosition === 'left' ? 'bg-[#0066FF] text-white' : 'bg-[#303030] text-[#E0E0E0] hover:bg-[#3A3A3A]'}`}
                                    onClick={() => setDockPosition('left')}
                                  >
                                    Left
                                  </button>
                                  <button 
                                    className={`px-3 py-1.5 rounded-md text-sm ${dockPosition === 'bottom' ? 'bg-[#0066FF] text-white' : 'bg-[#303030] text-[#E0E0E0] hover:bg-[#3A3A3A]'}`}
                                    onClick={() => setDockPosition('bottom')}
                                  >
                                    Bottom
                                  </button>
                                  <button 
                                    className={`px-3 py-1.5 rounded-md text-sm ${dockPosition === 'right' ? 'bg-[#0066FF] text-white' : 'bg-[#303030] text-[#E0E0E0] hover:bg-[#3A3A3A]'}`}
                                    onClick={() => setDockPosition('right')}
                                  >
                                    Right
                                  </button>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-[#E0E0E0]">Automatically hide and show the Dock</span>
                                  <div className="relative">
                                    <input type="checkbox" id="auto-hide" className="peer sr-only" checked={autoHideDock} onChange={() => setAutoHideDock(!autoHideDock)} />
                                    <label htmlFor="auto-hide" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                                  </div>
                                </label>
                                
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-[#E0E0E0]">Animate opening applications</span>
                                  <div className="relative">
                                    <input type="checkbox" id="animate-apps" className="peer sr-only" checked={animateAppOpening} onChange={() => setAnimateAppOpening(!animateAppOpening)} />
                                    <label htmlFor="animate-apps" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                                  </div>
                                </label>
                                
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-[#E0E0E0]">Show indicators for open applications</span>
                                  <div className="relative">
                                    <input type="checkbox" id="app-indicators" className="peer sr-only" defaultChecked />
                                    <label htmlFor="app-indicators" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                                  </div>
                                </label>
                                
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-[#E0E0E0]">Show recent applications in Dock</span>
                                  <div className="relative">
                                    <input type="checkbox" id="recent-apps" className="peer sr-only" defaultChecked />
                                    <label htmlFor="recent-apps" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeSettingsPanel === "control-center" && (
                      <div className="max-w-3xl mx-auto">
                        <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Control Center</h1>
                        
                        <div className="bg-[#232323] rounded-xl p-5">
                          <div className="text-sm text-[#E0E0E0] mb-4">Control Center modules show in the menu bar</div>
                          
                          <div className="space-y-3">
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Wi-Fi</span>
                              <div className="relative">
                                <input type="checkbox" id="wifi-cc" className="peer sr-only" defaultChecked />
                                <label htmlFor="wifi-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Bluetooth</span>
                              <div className="relative">
                                <input type="checkbox" id="bluetooth-cc" className="peer sr-only" defaultChecked />
                                <label htmlFor="bluetooth-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">AirDrop</span>
                              <div className="relative">
                                <input type="checkbox" id="airdrop-cc" className="peer sr-only" />
                                <label htmlFor="airdrop-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Focus</span>
                              <div className="relative">
                                <input type="checkbox" id="focus-cc" className="peer sr-only" />
                                <label htmlFor="focus-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Keyboard Brightness</span>
                              <div className="relative">
                                <input type="checkbox" id="keyboard-cc" className="peer sr-only" defaultChecked />
                                <label htmlFor="keyboard-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Screen Mirroring</span>
                              <div className="relative">
                                <input type="checkbox" id="screen-cc" className="peer sr-only" />
                                <label htmlFor="screen-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Display</span>
                              <div className="relative">
                                <input type="checkbox" id="display-cc" className="peer sr-only" defaultChecked />
                                <label htmlFor="display-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Sound</span>
                              <div className="relative">
                                <input type="checkbox" id="sound-cc" className="peer sr-only" defaultChecked />
                                <label htmlFor="sound-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-[#E0E0E0]">Now Playing</span>
                              <div className="relative">
                                <input type="checkbox" id="now-playing-cc" className="peer sr-only" defaultChecked />
                                <label htmlFor="now-playing-cc" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Integrated settings components */}
                    {activeSettingsPanel === "cherry-id" && <CherryIDSettings />}
                    {activeSettingsPanel === "family" && <FamilySettings />}
                    {activeSettingsPanel === "notifications" && <NotificationsSettings />}
                    {activeSettingsPanel === "battery" && <BatterySettings />}
                    {activeSettingsPanel === "network" && <NetworkSettings />}
                    {activeSettingsPanel === "keyboard" && <KeyboardSettings />}
                    {activeSettingsPanel === "security-privacy" && <SecurityPrivacySettings />}
                    {activeSettingsPanel === "bluetooth" && <BluetoothSettings />}
                    {activeSettingsPanel === "trackpad" && <TrackpadSettings />}
                    {activeSettingsPanel === "sound" && <SoundSettings />}
                    {activeSettingsPanel === "appearance" && <AppearanceSettings />}
                    {activeSettingsPanel === "displays" && <DisplaysSettings />}
                    {activeSettingsPanel === "passwords" && <PasswordsSettings />}
                    {activeSettingsPanel === "internet-accounts" && <InternetAccountsSettings />}
                    {activeSettingsPanel === "users-groups" && <UsersGroupsSettings />}
                    {activeSettingsPanel === "spotlight" && <SpotlightSettings />}
                    {activeSettingsPanel === "screen-time" && <ScreenTimeSettings />}
                    {activeSettingsPanel === "mouse" && <MouseSettings />}
                    {activeSettingsPanel === "software-update" && <SoftwareUpdateSettings />}
                    {activeSettingsPanel === "siri" && <SiriSettings />}
                    {activeSettingsPanel === "accessibility" && <AccessibilitySettings />}
                    {activeSettingsPanel === "time-machine" && <TimeMachineSettings />}
                    {activeSettingsPanel === "printers-scanners" && <PrintersScanners />}
                    {activeSettingsPanel === "extensions" && <Extensions />}
                    {activeSettingsPanel === "sharing" && <Sharing />}
                    {activeSettingsPanel === "storage" && <Storage />}
                    {activeSettingsPanel === "date-time" && <DateTimeSettings />}
                    {activeSettingsPanel === "language-region" && <LanguageRegion />}
                    {activeSettingsPanel === "wallet-apple-pay" && <WalletApplePaySettings />}
                    {activeSettingsPanel === "screen-time" && <ScreenTimeSettings />}
                  </div>
                </div>
              )}

              {activeWindow === "about" && (
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-gradient-to-b from-[#232323] to-[#1A1A1A] h-full">
                    {/* Cherry Logo */}
                    <svg className="w-24 h-24 text-[#E84C3D]" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                      <path d="M7 10.3c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l.2.2c.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0l-.2-.2z" fill="#4CAF50" stroke="#4CAF50" />
                      <path d="M14.5 11c2 2 2 3.5 1 5.5-1.5 3-4.5 3.5-7 1" fill="#E84C3D" stroke="#E84C3D" />
                      <path d="M13 8c0-1 1-3 3-3 1 0 2 1 2 2 0 1.5-2 2.5-2 2.5" fill="#4CAF50" stroke="#4CAF50" />
                      <path d="M9.1 16.5c.3.8.8 1.5 1.4 1.5.7 0 1.2-.8 1.5-1.5" fill="#E84C3D" stroke="#E84C3D" />
                    </svg>
                          
                    {/* Mac Model and OS Version */}
                    <h2 className="text-2xl font-medium text-white">MackBook Pros</h2>
                    <div className="text-center text-gray-400 text-sm space-y-1">
                      <p className="text-base">14-inch, 2023</p>
                      <p className="text-base">CherryOS Blossom 1.0</p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex space-x-1 mt-3 bg-[#2A2A2A] rounded-lg p-1">
                      <button className="bg-[#3A3A3A] text-white px-4 py-1.5 rounded text-sm">Overview</button>
                      <button className="text-gray-400 hover:text-white px-4 py-1.5 rounded text-sm">Displays</button>
                      <button className="text-gray-400 hover:text-white px-4 py-1.5 rounded text-sm">Storage</button>
                      <button className="text-gray-400 hover:text-white px-4 py-1.5 rounded text-sm">Support</button>
                      <button className="text-gray-400 hover:text-white px-4 py-1.5 rounded text-sm">Service</button>
                    </div>
                          
                    {/* System Specs */}
                    <div className="w-full max-w-md bg-[#262626] rounded-lg mt-4 divide-y divide-gray-700/50 overflow-hidden shadow-lg border border-[#333]/50">
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm text-gray-400">Chip</span>
                        <span className="text-sm text-white font-medium">Cherry C2 Pro</span>
                      </div>
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm text-gray-400">Memory</span>
                        <span className="text-sm text-white font-medium">16 GB</span>
                      </div>
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm text-gray-400">Startup Disk</span>
                        <span className="text-sm text-white font-medium">CherryDrive</span>
                      </div>
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm text-gray-400">Serial Number</span>
                        <span className="text-sm text-white font-medium">C02ZR0PQPGNG</span>
                      </div>
                    </div>
                          
                    {/* OS Version History */}
                    <div className="w-full max-w-md bg-[#262626] rounded-lg mt-4 px-5 py-3 shadow-lg border border-[#333]/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">CherryOS Blossom</span>
                        <span className="text-xs bg-[#333] px-2 py-0.5 rounded text-gray-300">1.0</span>
                      </div>
                    </div>
                          
                    {/* Buttons */}
                    <div className="flex space-x-3 mt-6">
                      <button className="bg-gradient-to-b from-[#363636] to-[#2A2A2A] hover:from-[#3A3A3A] hover:to-[#303030] text-white px-4 py-1.5 rounded-md text-sm font-medium border border-[#444]/30 shadow-sm">
                        System Report...
                      </button>
                      <button className="bg-gradient-to-b from-[#363636] to-[#2A2A2A] hover:from-[#3A3A3A] hover:to-[#303030] text-white px-4 py-1.5 rounded-md text-sm font-medium border border-[#444]/30 shadow-sm">
                        Software Update...
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeWindow === "photos" && (
                <div
                  className="h-full flex flex-col"
                  style={{
                    width: Math.min(Math.max(windowPositions.photos.width, 800), 1200),
                    height: Math.min(Math.max(windowPositions.photos.height, 600), 800),
                  }}
                >
                  <PhotosApp />
                </div>
              )}

              {activeWindow === "messages" && (
                <div
                  className="h-full flex flex-col"
                  style={{
                    width: Math.min(Math.max(windowPositions.messages.width, 800), 1200),
                    height: Math.min(Math.max(windowPositions.messages.height, 600), 800),
                  }}
                >
                  <MessagesApp />
                </div>
              )}

              {activeWindow === "music" && (
                <div 
                  className="h-full flex flex-col"
                  style={{
                    width: Math.min(Math.max(windowPositions.music.width, 800), 1200),
                    height: Math.min(Math.max(windowPositions.music.height, 600), 800),
                  }}
                >
                  <MusicApp />
                </div>
              )}

              {activeWindow === "cherstore" && (
                <div
                  className="h-full flex flex-col"
                  style={isFullscreen ? 
                    { width: "100%", height: "100%" } : 
                    {
                      width: Math.min(Math.max(windowPositions.cherstore?.width || 950, 950), 1400),
                      height: Math.min(Math.max(windowPositions.cherstore?.height || 700, 700), 900),
                    }
                  }
                >
                  <AppStoreApp />
                </div>
              )}

              {activeWindow === "trash" && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <button className="px-2 py-1 bg-[#323232] text-gray-300 rounded-l-md border border-[#3A3A3A]/50 hover:bg-[#424242]">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="px-2 py-1 bg-[#323232] text-gray-300 rounded-r-md border-t border-r border-b border-[#3A3A3A]/50 hover:bg-[#424242]">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 px-2 py-1 bg-[#323232] text-gray-400 rounded-md border border-[#3A3A3A]/50 text-xs">
                      Search
                    </div>
                    {!isTrashEmpty && (
                      <button
                        className="px-2 py-1 bg-[#323232] text-gray-300 rounded-md border border-[#3A3A3A]/50 hover:bg-[#424242] text-xs"
                        onClick={() => setIsTrashEmpty(true)}
                      >
                        Empty Trash
                      </button>
                    )}
                  </div>

                  <div className="flex-1 bg-[#1A1A1A] rounded-lg border border-[#3A3A3A]/30 flex items-center justify-center">
                    {isTrashEmpty ? (
                      <div className="text-center text-gray-400">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-12 h-12 mx-auto mb-2 opacity-50"
                        >
                          <path
                            fill="currentColor"
                            d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"
                          />
                        </svg>
                        <p className="text-sm">Trash is Empty</p>
                      </div>
                    ) : (
                      <div className="w-full h-full p-4 grid grid-cols-4 gap-4 content-start">
          <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-[#323232] rounded-xl flex items-center justify-center mb-1.5 shadow-md">
                            <svg
                              className="w-10 h-10 text-blue-400"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-0.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                              />
              </svg>
            </div>
                          <span className="text-[11px] text-gray-300">
                            Macintosh HD
                          </span>
          </div>
        </div>
                    )}
                  </div>
                </div>
              )}

              {activeWindow === "weather" && (
                <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-900 text-white p-6">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-10 h-10 border-3 border-white rounded-full border-t-transparent animate-spin mb-4"></div>
                      <div className="text-xl">Loading weather data...</div>
                    </div>
                  ) : weatherError ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-5xl mb-4">⚠️</div>
                      <div className="text-xl text-center">{weatherError}</div>
                      <div className="mt-4 text-sm text-center max-w-md">
                        Please enable location services in your browser to see weather information for your current location.
                      </div>
                    </div>
                  ) : weatherData && (
                    <>
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h2 className="text-2xl font-semibold mb-1">{weatherData.location}</h2>
                          <div className="text-5xl font-bold">{weatherData.temperature}°C</div>
                          <div className="text-sm mt-2">{weatherData.condition}</div>
                          <div className="text-sm mt-1">H:{weatherData.high}°C L:{weatherData.low}°C</div>
                        </div>
                        <div className="text-5xl">{weatherData.icon}</div>
                      </div>
                      
                      <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 mb-6">
                        <h3 className="text-sm font-medium mb-2">Hourly Forecast</h3>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                          {weatherData.hourlyForecast.map((hour: {time: string; icon: string; temp: number}, i: number) => (
                            <div key={i} className="flex flex-col items-center">
                              <div className="text-sm">{hour.time}</div>
                              <div className="my-2 text-xl">{hour.icon}</div>
                              <div className="text-sm">{hour.temp}°C</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4">
                        <h3 className="text-sm font-medium mb-2">5-Day Forecast</h3>
                        <div className="space-y-3">
                          {weatherData.dailyForecast.map((day: {day: string; icon: string; high: number; low: number}, i: number) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="w-16 text-sm">{day.day}</div>
                              <div className="text-xl">{day.icon}</div>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-white/20 rounded-full h-1">
                                  <div 
                                    className="bg-white h-1 rounded-full" 
                                    style={{ width: `${Math.min(100, Math.max(0, ((day.high - day.low) / 30) * 100))}%` }}
                                  ></div>
                                </div>
                                <div className="text-sm w-16 flex justify-between">
                                  <span>{day.low}°</span>
                                  <span>{day.high}°</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeWindow === "maps" && (
                <div className="h-full flex flex-col">
                  <div className="p-3 flex items-center justify-between bg-[#252525] border-b border-[#333]">
                    <div className="flex-1 flex items-center">
                      <div className="bg-[#323232] rounded-md px-3 py-1.5 text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        Search for a place or address
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-[#1A1A1A] overflow-hidden">
                    <MacOSMap />
                  </div>
                </div>
              )}

              {activeWindow === "netscape" && (
                <NetscapeBrowser />
              )}

              {activeWindow === "mail" && (
                <div className="h-full flex flex-col">
                   {/* Mail Toolbar */}
                   <div className="flex h-10 items-center px-4 py-2 justify-between bg-[#252525] border-b border-[#333]">
                     <div className="flex space-x-2">
                       <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                       </svg>
                       <span className="text-sm text-gray-400">Search Mail</span>
                  </div>
                     <div className="flex items-center space-x-3">
                       <button className="p-1 rounded hover:bg-[#3A3A3A]">
                         <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                           <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                         </svg>
                       </button>
                       <button className="p-1 rounded hover:bg-[#3A3A3A]">
                         <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                         </svg>
                       </button>
                      </div>
                    </div>
                   <div className="flex-1 flex bg-[#1A1A1A]">
                     {/* Sidebar */}
                     <div className="w-64 bg-[#232323] overflow-y-auto border-r border-[#3A3A3A] macos-scrollbar" style={{ maxHeight: "calc(100% - 40px)" }}>
                       <div className="p-2" style={{ minHeight: "130%" }}>
                         <div className="mb-2">
                           <div className="text-[11px] text-gray-500 font-medium px-3 py-1 uppercase">Folders</div>
                           <div className="space-y-1 mt-1">
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                              </svg>
                               <span className="text-sm text-gray-300">Inbox</span>
                            </div>
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.41 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z" />
                               </svg>
                               <span className="text-sm text-gray-300">Sent</span>
                          </div>
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.41 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z" />
                               </svg>
                               <span className="text-sm text-gray-300">Drafts</span>
                      </div>
                             <div className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                               <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.41 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z" />
                               </svg>
                               <span className="text-sm text-gray-300">Junk</span>
                    </div>
                  </div>
                </div>
                         
                         <div>
                           <div className="text-[11px] text-gray-500 font-medium px-3 py-1 uppercase">Mailboxes</div>
                           <div className="space-y-1 mt-1">
                             {[
                               { 
                                 name: "Family Group", 
                                 avatar: "F",
                                 avatarColor: "bg-green-500",
                                 lastMessage: "What time should we meet?",
                                 time: "Yesterday" 
                               },
                               { 
                                 name: "Alex Taylor", 
                                 avatar: "A",
                                 avatarColor: "bg-purple-500",
                                 lastMessage: "Did you see the new update?",
                                 time: "Yesterday" 
                               },
                               { 
                                 name: "Sarah Johnson", 
                                 avatar: "S",
                                 avatarColor: "bg-red-500",
                                 lastMessage: "Thanks for sending that!",
                                 time: "Friday" 
                               },
                               { 
                                 name: "Work Team", 
                                 avatar: "W",
                                 avatarColor: "bg-orange-500",
                                 lastMessage: "Meeting moved to 3pm",
                                 time: "Friday" 
                               }
                             ].map((contact, i) => (
                               <div key={i} className="flex items-center p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                                 <div className={`w-8 h-8 ${contact.avatarColor} rounded-full flex items-center justify-center text-white font-semibold mr-2`}>
                                   {contact.avatar}
                      </div>
                                 <div className="flex-1 min-w-0">
                                   <div className="flex justify-between items-center">
                                     <p className="text-sm font-medium text-gray-300 truncate">{contact.name}</p>
                                     <p className="text-xs text-gray-500">{contact.time}</p>
                    </div>
                                   <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                    </div>
                    </div>
                             ))}
                  </div>
                         </div>
                       </div>
                  </div>
                  
                     {/* Main conversation area */}
                     <div className="flex-1 flex flex-col">
                       {/* Conversation header */}
                       <div className="p-3 bg-[#252525] border-b border-[#333] flex items-center justify-between">
                         <div className="flex items-center">
                           <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                             J
                           </div>
                           <div className="font-medium text-white">John Appleseed</div>
                         </div>
                         <div className="flex space-x-2">
                           <button className="p-1 rounded hover:bg-[#3A3A3A]">
                             <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                               <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                             </svg>
                            </button>
                           <button className="p-1 rounded hover:bg-[#3A3A3A]">
                             <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                               <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                             </svg>
                            </button>
                          </div>
                        </div>
                       
                       {/* Messages */}
                       <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-[#1A1A1A] macos-scrollbar" style={{ maxHeight: "calc(100% - 85px)" }}>
                         <div className="flex justify-center">
                           <div className="text-xs text-gray-500 bg-[#252525] px-3 py-1 rounded-full">
                             Today, 9:41 AM
                      </div>
                    </div>
                    
                         <div className="flex justify-end">
                           <div className="bg-[#0066FF] text-white p-2 rounded-2xl rounded-tr-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">Hey there! How's it going?</p>
                             <div className="text-right mt-1">
                               <span className="text-xs opacity-70">9:41 AM</span>
                      </div>
                              </div>
                            </div>
                         
                         <div className="flex justify-start">
                           <div className="bg-[#252525] text-white p-2 rounded-2xl rounded-tl-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">Not bad, just working on this macOS simulator.</p>
                             <div className="text-right mt-1">
                               <span className="text-xs text-gray-400">9:42 AM</span>
                          </div>
                      </div>
                    </div>
                    
                         <div className="flex justify-end">
                           <div className="bg-[#0066FF] text-white p-2 rounded-2xl rounded-tr-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">That's cool! It looks great so far.</p>
                             <div className="text-right mt-1">
                               <span className="text-xs opacity-70">9:43 AM</span>
                      </div>
                              </div>
                              </div>
                         
                         <div className="flex justify-start">
                           <div className="bg-[#252525] text-white p-2 rounded-2xl rounded-tl-sm max-w-[65%] shadow-sm">
                             <p className="text-sm">Thanks! I just added Maps with real location tracking!</p>
                             <div className="text-right mt-1">
                               <span className="text-xs text-gray-400">9:45 AM</span>
                            </div>
                          </div>
                      </div>
                    </div>
                    
                       {/* Message input */}
                       <div className="p-3 bg-[#252525] border-t border-[#333]">
                         <div className="flex items-center bg-[#1E1E1E] rounded-full px-3 py-1.5">
                           <button className="p-1 mr-2 text-gray-400 hover:text-gray-300">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                              </svg>
                           </button>
                           <input 
                             type="text" 
                             placeholder="iMessage" 
                             className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm" 
                           />
                           <button className="p-1 ml-2 text-blue-400 hover:text-blue-300">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                               <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                             </svg>
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AppStore */}
              {activeWindow === "cherstore" && (
                <div className="h-full flex flex-col">
                  <AppStoreApp />
                </div>
              )}

              {activeWindow === "finder-prefs" && (
                <div
                  className="h-full flex flex-col"
                  style={isFullscreen ?
                    { width: "100%", height: "100%" } :
                    {
                      width: Math.min(Math.max(windowPositions["finder-prefs"]?.width || 600, 600), 800),
                      height: Math.min(Math.max(windowPositions["finder-prefs"]?.height || 450, 450), 600),
                    }
                  }
                >
                  <FinderPREF />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dock */}
        <div
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1 px-2 py-1 rounded-t-xl bg-[#FFFFFF08] backdrop-blur-2xl border border-white/10 transition-all duration-300 ease-in-out ${
            isDockVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
          onMouseEnter={handleDockHover}
          onMouseLeave={handleDockLeave}
          style={{
            zIndex: 50,
          }}
        >
          {dockApps.map((app, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center justify-end mb-1 relative"
            >
              <div
                className="absolute bottom-full mb-2 px-2 py-1 bg-[#333]/80 backdrop-blur-md rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {app}
              </div>
              
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-b cursor-pointer relative group-hover:scale-110 transition-transform duration-200"
                onClick={() => {
                  // Make sure dock is visible when opening apps
                  setIsDockVisible(true);
                  openWindow(app);
                }}
                style={{
                  background: 
                    app === "Finder" ? "linear-gradient(to bottom, #1091FF, #0062E3)" :
                    app === "Netscape" ? "linear-gradient(to bottom, #4B0082, #1E3B8C)" :
                    app === "Mail" ? "linear-gradient(to bottom, #53B4FF, #0062E3)" :
                    app === "Photos" ? "linear-gradient(to bottom, #FC5CA8, #FF1C55)" :
                    app === "Messages" ? "linear-gradient(to bottom, #5BF153, #00C933)" :
                    app === "Maps" ? "linear-gradient(to bottom, #73D0B0, #11AA70)" :
                    app === "Music" ? "linear-gradient(to bottom, #FC3365, #BC185B)" :
                    app === "CherStore" ? "linear-gradient(to bottom, #29CCF9, #007AFF)" :
                    "linear-gradient(to bottom, #7D7D7D, #3A3A3A)"
                }}
              >
                {app === "Finder" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="5.5" fill="none" />
                    <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" fill="currentColor" fillOpacity="0.1"/>
                    <path d="M12 5.5C10.7574 5.5 9.75 6.50736 9.75 7.75C9.75 8.99264 10.7574 10 12 10C13.2426 10 14.25 8.99264 14.25 7.75C14.25 6.50736 13.2426 5.5 12 5.5Z" fill="currentColor"/>
                    <path d="M3.5 9.5V19C3.5 19.8284 4.17157 20.5 5 20.5H19C19.8284 20.5 20.5 19.8284 20.5 19V9.5M3.5 9.5V5C3.5 4.17157 4.17157 3.5 5 3.5H19C19.8284 3.5 20.5 4.17157 20.5 5V9.5M3.5 9.5H20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
                {app === "Netscape" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#1E3B8C" stroke="currentColor" strokeWidth="1"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z" fill="#000066" fillOpacity="0.3"/>
                    <path d="M8 9C8 8.44772 8.44772 8 9 8H15C15.5523 8 16 8.44772 16 9V15C16 15.5523 15.5523 16 15 16H9C8.44772 16 8 15.5523 8 15V9Z" fill="#4B0082"/>
                    <path d="M12 7L17 12L12 17L7 12L12 7Z" fill="#FFFFFF"/>
                    <path d="M9.5 11.5H14.5V14.5H9.5V11.5Z" fill="#FF0000"/>
                  </svg>
                )}
                {app === "Mail" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="16" rx="2" fill="#0062E3"/>
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M3 8L10.2 13C10.6944 13.3056 11.3056 13.3056 11.8 13L19 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="7" y="6.5" width="10" height="1" rx="0.5" fill="white"/>
                  </svg>
                )}
                {app === "Photos" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="2.5" fill="currentColor"/>
                    <path d="M3 15L7 11L12 16L17 11L21 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {app === "Messages" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 18.5L5.5 15C5.16667 14.6667 3 12.5 3 9C3 5.5 7 3 12 3C17 3 21 5.5 21 9C21 12.5 17 15 12 15C10.5 15 9.16667 14.6667 8 14L4.5 18.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                )}
                {app === "Maps" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C10.8954 21 10 20.1046 10 19V15C10 13.8954 10.8954 13 12 13V13C13.1046 13 14 13.8954 14 15V19C14 20.1046 13.1046 21 12 21V21Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 13V13C8.13401 13 5 9.86599 5 6V6C5 4.34315 6.34315 3 8 3H16C17.6569 3 19 4.34315 19 6V6C19 9.86599 15.866 13 12 13V13Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="8" r="2" fill="currentColor"/>
                  </svg>
                )}
                {app === "Music" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="17" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 17V7L20 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
                {app === "CherStore" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="#9B111E" />
                    <circle cx="12" cy="7" r="2.5" fill="#D2142D" stroke="white" strokeWidth="0.5" />
                    <path d="M12 7C11 7 7.5 7.5 6 11C5.8 11.5 6.5 12 7 11.5C8.5 10 10.5 8.5 12 8.5C13.5 8.5 15.5 10 17 11.5C17.5 12 18.2 11.5 18 11C16.5 7.5 13 7 12 7Z" fill="#4C060F" />
                    <path d="M8.5 13.5L12 17L15.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="17" r="1.5" fill="white" />
                    <path d="M8.5 10.5C8.5 10.5 9 14 12 14C15 14 15.5 10.5 15.5 10.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                )}
                {app === "System Settings" && (
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19.7942 15.75C19.5 16.0833 19.4058 16.4167 19.5 17C19.5941 17.5833 20 18 20.5 18C21 18 21.2942 18.3333 21.5 19L22 20.5C22.2058 21.1667 22 21.6667 21.5 22C21 22.3333 20.1 22.5 19.5 22.5C19 22.5 18.5 22.5 18 22C17.5 21.5 17.2058 21.1667 17 20.5L15.5 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M15 8.5L17 4.5C17.2058 3.83333 17.5 3.5 18 3C18.5 2.5 19 2.5 19.5 2.5C20.1 2.5 21 2.66667 21.5 3C22 3.33333 22.2058 3.83333 22 4.5L21.5 6C21.2942 6.66667 21 7 20.5 7C20 7 19.5941 7.41667 19.5 8C19.4058 8.58333 19.5 8.91667 19.7942 9.25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M8.5 15L4.5 17C3.83333 17.2058 3.5 17.5 3 18C2.5 18.5 2.5 19 2.5 19.5C2.5 20.1 2.66667 21 3 21.5C3.33333 22 3.83333 22.2058 4.5 22L6 21.5C6.66667 21.2942 7 21 7 20.5C7 20 7.41667 19.5941 8 19.5C8.58333 19.4058 8.91667 19.5 9.25 19.7942" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M9.25 4.20577C8.91667 4.5 8.58333 4.59423 8 4.5C7.41667 4.40577 7 4 7 3.5C7 3 6.66667 2.70577 6 2.5L4.5 2C3.83333 1.79423 3.33333 2 3 2.5C2.66667 3 2.5 3.9 2.5 4.5C2.5 5 2.5 5.5 3 6C3.5 6.5 3.83333 6.79423 4.5 7L8.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                )}

                {activeWindow === app.toLowerCase() && (
                  <div className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          ))}
          
          {/* Separator before trash */}
          <div className="mx-1 h-10 w-px bg-white/20 self-center"></div>
          
          {/* Trash icon */}
          <div 
            className="relative group cursor-pointer transition-transform hover:scale-125 hover:-translate-y-2 duration-200"
            onClick={handleTrashClick}
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
                {isTrashEmpty ? (
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-600">
                    <path fill="currentColor" d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-600">
                    <path fill="currentColor" d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5z" />
                    <path fill="currentColor" d="M8 8h2v9H8zm3 0h2v9h-2zm3 0h2v9h-2z" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* App indicator dot */}
            {activeWindow === "trash" && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
            )}
            
            {/* App name tooltip */}
            <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A]/80 backdrop-blur-xl text-white text-xs rounded-lg px-2 py-0.5 transition-opacity duration-300 whitespace-nowrap shadow-lg border border-white/10">
              Trash
            </div>
          </div>
        </div>

        {/* Power on animation */}
        {isPoweredOn && (
          <div className="absolute inset-0 bg-white animate-fade-out pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}