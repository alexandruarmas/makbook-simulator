import React, { useState } from 'react';

interface Photo {
  id: string;
  src: string;
  date: string;
  favorite: boolean;
  location?: string;
  width: number;
  height: number;
}

const PhotosApp: React.FC = () => {
  const [activeView, setActiveView] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  const [zoomLevel, setZoomLevel] = useState<number>(2); // 0: small, 1: medium, 2: large

  // Sample photo data
  const photos: Photo[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      date: "June 12, 2023",
      favorite: true,
      location: "Yosemite National Park",
      width: 4000,
      height: 3000
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      date: "July 18, 2023",
      favorite: false,
      location: "Big Sur",
      width: 3500,
      height: 2800
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      date: "August 5, 2023",
      favorite: true,
      location: "Redwood Forest",
      width: 4200,
      height: 3100
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
      date: "September 20, 2023",
      favorite: false,
      width: 3900,
      height: 2900
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      date: "October 15, 2023",
      favorite: true,
      location: "Golden Gate Park",
      width: 4100,
      height: 3000
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      date: "November 2, 2023",
      favorite: false,
      location: "Mount Tamalpais",
      width: 3800,
      height: 2800
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      date: "November 30, 2023",
      favorite: true,
      width: 3600,
      height: 2700
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
      date: "December 18, 2023",
      favorite: false,
      location: "Lake Tahoe",
      width: 4000,
      height: 3000
    },
    {
      id: "9",
      src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
      date: "January 5, 2024",
      favorite: true,
      width: 3700,
      height: 2800
    },
    {
      id: "10",
      src: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054",
      date: "February 12, 2024",
      favorite: false,
      location: "Muir Woods",
      width: 4100,
      height: 3000
    },
    {
      id: "11",
      src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699",
      date: "March 8, 2024",
      favorite: true,
      width: 3900,
      height: 2900
    },
    {
      id: "12",
      src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      date: "April 20, 2024",
      favorite: false,
      location: "Point Reyes",
      width: 4000,
      height: 3000
    },
  ];

  // Get years for sidebar
  const years = [...new Set(photos.map(photo => new Date(photo.date).getFullYear()))].sort((a, b) => b - a);

  // Function to handle zoom level changes
  const handleZoomChange = (newLevel: number) => {
    if (newLevel >= 0 && newLevel <= 4) {
      setZoomLevel(newLevel);
    }
  };

  // Calculate thumbnail size based on zoom level
  const getThumbnailSize = () => {
    const sizes = ["h-24 w-32", "h-32 w-44", "h-40 w-56", "h-48 w-64", "h-56 w-80"];
    return sizes[zoomLevel];
  };

  // Format proper Unsplash URL with size parameters
  const getImageUrl = (photoSrc: string, width: number, height: number) => {
    return `${photoSrc}?w=${width}&h=${height}&fit=crop&auto=format`;
  };

  // Format date for display in the interface
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Filter photos based on active view
  const filteredPhotos = () => {
    if (activeView === "favorites") {
      return photos.filter(photo => photo.favorite);
    } else if (activeView.includes("year-")) {
      const year = activeView.split("-")[1];
      return photos.filter(photo => new Date(photo.date).getFullYear().toString() === year);
    } else if (activeView === "all") {
      return photos;
    } else {
      return photos;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
      {/* Photos Toolbar */}
      <div className="h-12 flex items-center px-4 bg-[#f5f5f7] dark:bg-[#2c2c2c] border-b border-[#d1d1d6] dark:border-[#3d3d3d] select-none">
        <div className="flex space-x-2 mr-6">
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#666] dark:text-[#aaa] hover:bg-[#e5e5e5] dark:hover:bg-[#3d3d3d]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#666] dark:text-[#aaa] hover:bg-[#e5e5e5] dark:hover:bg-[#3d3d3d]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            className="w-full h-7 px-8 bg-[#e5e5e5] dark:bg-[#3d3d3d] rounded-md text-sm focus:outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#666] dark:text-[#aaa]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="ml-auto flex items-center space-x-3">
          {/* Zoom slider */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleZoomChange(zoomLevel - 1)}
              className="text-[#666] dark:text-[#aaa] hover:text-[#444] dark:hover:text-white"
              disabled={zoomLevel === 0}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12H4" />
              </svg>
            </button>
            
            <div className="w-20 h-1 bg-[#d1d1d6] dark:bg-[#4d4d4d] rounded-full relative">
              <div 
                className="absolute h-3 w-3 bg-[#0066ff] rounded-full top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ 
                  left: `${(zoomLevel / 4) * 100}%`,
                  transform: `translateX(-50%) translateY(-50%)`
                }}
              />
            </div>
            
            <button 
              onClick={() => handleZoomChange(zoomLevel + 1)}
              className="text-[#666] dark:text-[#aaa] hover:text-[#444] dark:hover:text-white"
              disabled={zoomLevel === 4}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* View options */}
          <div className="flex bg-[#e5e5e5] dark:bg-[#3d3d3d] rounded-md overflow-hidden">
            <button 
              className={`px-3 py-1.5 text-xs ${viewMode === 'grid' ? 'bg-[#0066ff] text-white' : 'text-[#666] dark:text-[#aaa]'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button 
              className={`px-3 py-1.5 text-xs ${viewMode === 'detail' ? 'bg-[#0066ff] text-white' : 'text-[#666] dark:text-[#aaa]'}`}
              onClick={() => setViewMode('detail')}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </button>
          </div>
          
          {/* More options */}
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#666] dark:text-[#aaa] hover:bg-[#e5e5e5] dark:hover:bg-[#3d3d3d]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 h-full bg-[#f5f5f7] dark:bg-[#252525] border-r border-[#d1d1d6] dark:border-[#3d3d3d] flex flex-col overflow-y-auto select-none">
          {/* Library section */}
          <div className="px-4 py-3">
            <h3 className="text-xs text-[#888] dark:text-[#888] font-medium mb-2">Library</h3>
            <ul className="space-y-0.5">
              <li 
                className={`px-2 py-1 rounded-md text-sm cursor-pointer ${activeView === 'all' ? 'bg-[#dcdce0] dark:bg-[#3d3d3d] font-medium' : 'hover:bg-[#eaeaea] dark:hover:bg-[#323232]'}`}
                onClick={() => setActiveView('all')}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0066ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                  All Photos
                </div>
              </li>
              <li 
                className={`px-2 py-1 rounded-md text-sm cursor-pointer ${activeView === 'favorites' ? 'bg-[#dcdce0] dark:bg-[#3d3d3d] font-medium' : 'hover:bg-[#eaeaea] dark:hover:bg-[#323232]'}`}
                onClick={() => setActiveView('favorites')}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#ff3b30]" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Favorites
                </div>
              </li>
              <li 
                className={`px-2 py-1 rounded-md text-sm cursor-pointer ${activeView === 'recents' ? 'bg-[#dcdce0] dark:bg-[#3d3d3d] font-medium' : 'hover:bg-[#eaeaea] dark:hover:bg-[#323232]'}`}
                onClick={() => setActiveView('recents')}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0066ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                  Recents
                </div>
              </li>
            </ul>
          </div>
          
          {/* Years section */}
          <div className="px-4 py-3">
            <h3 className="text-xs text-[#888] dark:text-[#888] font-medium mb-2">Years</h3>
            <ul className="space-y-0.5">
              {years.map(year => (
                <li 
                  key={year}
                  className={`px-2 py-1 rounded-md text-sm cursor-pointer ${activeView === `year-${year}` ? 'bg-[#dcdce0] dark:bg-[#3d3d3d] font-medium' : 'hover:bg-[#eaeaea] dark:hover:bg-[#323232]'}`}
                  onClick={() => setActiveView(`year-${year}`)}
                >
                  {year}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Media Types section */}
          <div className="px-4 py-3">
            <h3 className="text-xs text-[#888] dark:text-[#888] font-medium mb-2">Media Types</h3>
            <ul className="space-y-0.5">
              <li 
                className={`px-2 py-1 rounded-md text-sm cursor-pointer ${activeView === 'videos' ? 'bg-[#dcdce0] dark:bg-[#3d3d3d] font-medium' : 'hover:bg-[#eaeaea] dark:hover:bg-[#323232]'}`}
                onClick={() => setActiveView('videos')}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0066ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Videos
                </div>
              </li>
              <li 
                className={`px-2 py-1 rounded-md text-sm cursor-pointer ${activeView === 'selfies' ? 'bg-[#dcdce0] dark:bg-[#3d3d3d] font-medium' : 'hover:bg-[#eaeaea] dark:hover:bg-[#323232]'}`}
                onClick={() => setActiveView('selfies')}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0066ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Selfies
                </div>
              </li>
              <li 
                className={`px-2 py-1 rounded-md text-sm cursor-pointer ${activeView === 'panoramas' ? 'bg-[#dcdce0] dark:bg-[#3d3d3d] font-medium' : 'hover:bg-[#eaeaea] dark:hover:bg-[#323232]'}`}
                onClick={() => setActiveView('panoramas')}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0066ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 12h18" />
                  </svg>
                  Panoramas
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Photo display area */}
        <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-[#1e1e1e]">
          {filteredPhotos().length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredPhotos().map(photo => (
                    <div 
                      key={photo.id} 
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedPhoto(photo.id)}
                    >
                      <div className={`${getThumbnailSize()} overflow-hidden rounded-md bg-[#f0f0f0] dark:bg-[#2a2a2a]`}>
                        <img 
                          src={getImageUrl(photo.src, 400, 300)} 
                          alt="" 
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className="text-white text-xs truncate">{formatDate(photo.date)}</p>
                        {photo.location && (
                          <p className="text-white/80 text-xs truncate">{photo.location}</p>
                        )}
                      </div>
                      
                      {photo.favorite && (
                        <div className="absolute top-2 right-2 text-white">
                          <svg className="w-4 h-4 text-[#ff3b30] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredPhotos().map(photo => (
                    <div 
                      key={photo.id} 
                      className="cursor-pointer"
                      onClick={() => setSelectedPhoto(photo.id)}
                    >
                      <div className="overflow-hidden rounded-md">
                        <img 
                          src={getImageUrl(photo.src, 800, 600)} 
                          alt="" 
                          className="w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
                        />
                      </div>
                      
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{formatDate(photo.date)}</p>
                          {photo.location && (
                            <p className="text-xs text-[#666] dark:text-[#aaa]">{photo.location}</p>
                          )}
                        </div>
                        
                        {photo.favorite && (
                          <div className="text-[#ff3b30]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#d1d1d6] dark:text-[#4d4d4d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M20.4 14.5L16 10 4 20" />
                </svg>
                <p className="text-lg font-medium text-[#666] dark:text-[#aaa]">No Photos Found</p>
                <p className="text-sm text-[#888] dark:text-[#777]">Try a different filter or view</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Selected photo modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-4xl max-h-screen p-4" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={getImageUrl(photos.find(p => p.id === selectedPhoto)?.src || "", 1200, 900)} 
                alt="" 
                className="max-w-full max-h-[80vh] rounded-md"
              />
              
              <button 
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
                onClick={() => setSelectedPhoto(null)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white text-sm">{formatDate(photos.find(p => p.id === selectedPhoto)?.date || "")}</p>
                    {photos.find(p => p.id === selectedPhoto)?.location && (
                      <p className="text-white/80 text-xs">{photos.find(p => p.id === selectedPhoto)?.location}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60">
                      <svg 
                        className={`w-5 h-5 ${photos.find(p => p.id === selectedPhoto)?.favorite ? 'text-[#ff3b30] fill-current' : ''}`} 
                        viewBox="0 0 24 24" 
                        fill={photos.find(p => p.id === selectedPhoto)?.favorite ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosApp; 