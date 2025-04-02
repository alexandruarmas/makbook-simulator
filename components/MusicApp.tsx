import React, { useState, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  artwork: string;
  isExplicit: boolean;
  dateAdded?: string;
  plays?: number;
}

interface Playlist {
  id: string;
  name: string;
  songCount: number;
  artwork: string;
  isDefault?: boolean;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  year: string;
  artwork: string;
}

const MusicApp: React.FC = () => {
  const [selectedView, setSelectedView] = useState('library');
  const [selectedLibrarySection, setSelectedLibrarySection] = useState('songs');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('3:45');
  const [volume, setVolume] = useState(0.7);
  const [showSidebarSettings, setShowSidebarSettings] = useState(false);
  const [repeat, setRepeat] = useState('off'); // off, all, one
  const [shuffle, setShuffle] = useState(false);
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({
    'library': true,
    'playlists': true,
  });

  // Realistic mock albums
  const albums: Album[] = [
    { id: '1', title: 'Midnight Waves', artist: 'Ocean Echo', year: '2023', artwork: 'https://placehold.co/300x300/232323/ff9370?text=Midnight+Waves' },
    { id: '2', title: 'Electric Dreams', artist: 'Neon Pulse', year: '2022', artwork: 'https://placehold.co/300x300/232323/70b8ff?text=Electric+Dreams' },
    { id: '3', title: 'Mountain High', artist: 'Valley Low', year: '2023', artwork: 'https://placehold.co/300x300/232323/70ffb0?text=Mountain+High' },
    { id: '4', title: 'Urban Echoes', artist: 'City Sounds', year: '2022', artwork: 'https://placehold.co/300x300/232323/d470ff?text=Urban+Echoes' },
    { id: '5', title: 'Sunset Boulevard', artist: 'Golden Hour', year: '2023', artwork: 'https://placehold.co/300x300/232323/fff970?text=Sunset+Boulevard' },
    { id: '6', title: 'Digital Horizons', artist: 'Binary Sunset', year: '2022', artwork: 'https://placehold.co/300x300/232323/70f0ff?text=Digital+Horizons' },
  ];

  // Mock data with realistic playlists
  const playlists: Playlist[] = [
    { id: '1', name: 'Recently Added', songCount: 25, artwork: 'https://placehold.co/100x100/1a1a1a/ffffff?text=Recent', isDefault: true },
    { id: '2', name: 'Favorites', songCount: 50, artwork: 'https://placehold.co/100x100/1a1a1a/ff5555?text=Favs', isDefault: true },
    { id: '3', name: 'Recently Played', songCount: 30, artwork: 'https://placehold.co/100x100/1a1a1a/5555ff?text=Played', isDefault: true },
    { id: '4', name: 'Top 25 Most Played', songCount: 25, artwork: 'https://placehold.co/100x100/1a1a1a/55ff55?text=Top25', isDefault: true },
    { id: '5', name: 'Dance Mix', songCount: 18, artwork: 'https://placehold.co/100x100/1a1a1a/ff55ff?text=Dance' },
    { id: '6', name: 'Chill Vibes', songCount: 22, artwork: 'https://placehold.co/100x100/1a1a1a/55ffff?text=Chill' },
    { id: '7', name: 'Workout Beats', songCount: 15, artwork: 'https://placehold.co/100x100/1a1a1a/ffff55?text=Workout' },
    { id: '8', name: 'Focus Flow', songCount: 20, artwork: 'https://placehold.co/100x100/1a1a1a/ff9955?text=Focus' },
  ];

  // More comprehensive song list
  const songs: Song[] = [
    {
      id: '1',
      title: 'Neon Nights',
      artist: 'Neon Pulse',
      album: 'Electric Dreams',
      duration: '3:21',
      artwork: 'https://placehold.co/300x300/232323/70b8ff?text=Electric+Dreams',
      isExplicit: false,
      dateAdded: '2 days ago',
      plays: 12
    },
    {
      id: '2',
      title: 'Digital Rain',
      artist: 'Neon Pulse',
      album: 'Electric Dreams',
      duration: '4:05',
      artwork: 'https://placehold.co/300x300/232323/70b8ff?text=Electric+Dreams',
      isExplicit: false,
      dateAdded: '2 days ago',
      plays: 8
    },
    {
      id: '3',
      title: 'Coastal Dawn',
      artist: 'Ocean Echo',
      album: 'Midnight Waves',
      duration: '3:45',
      artwork: 'https://placehold.co/300x300/232323/ff9370?text=Midnight+Waves',
      isExplicit: true,
      dateAdded: '1 week ago',
      plays: 23
    },
    {
      id: '4',
      title: 'Deep Waters',
      artist: 'Ocean Echo',
      album: 'Midnight Waves',
      duration: '2:59',
      artwork: 'https://placehold.co/300x300/232323/ff9370?text=Midnight+Waves',
      isExplicit: false,
      dateAdded: '1 week ago',
      plays: 16
    },
    {
      id: '5',
      title: 'Summit',
      artist: 'Valley Low',
      album: 'Mountain High',
      duration: '3:12',
      artwork: 'https://placehold.co/300x300/232323/70ffb0?text=Mountain+High',
      isExplicit: false,
      dateAdded: '3 days ago',
      plays: 5
    },
    {
      id: '6',
      title: 'Urban Jungle',
      artist: 'City Sounds',
      album: 'Urban Echoes',
      duration: '4:22',
      artwork: 'https://placehold.co/300x300/232323/d470ff?text=Urban+Echoes',
      isExplicit: true,
      dateAdded: '5 days ago',
      plays: 19
    },
    {
      id: '7',
      title: 'Golden Ray',
      artist: 'Golden Hour',
      album: 'Sunset Boulevard',
      duration: '3:56',
      artwork: 'https://placehold.co/300x300/232323/fff970?text=Sunset+Boulevard',
      isExplicit: false,
      dateAdded: '1 day ago',
      plays: 7
    },
    {
      id: '8',
      title: 'Pixel Stars',
      artist: 'Binary Sunset',
      album: 'Digital Horizons',
      duration: '3:33',
      artwork: 'https://placehold.co/300x300/232323/70f0ff?text=Digital+Horizons',
      isExplicit: false,
      dateAdded: '4 days ago',
      plays: 11
    },
  ];

  useEffect(() => {
    // Mock time update effect when playing
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime(prev => {
          const [mins, secs] = prev.split(':').map(Number);
          let newSecs = secs + 1;
          let newMins = mins;
          
          if (newSecs >= 60) {
            newSecs = 0;
            newMins += 1;
          }
          
          return `${newMins}:${newSecs.toString().padStart(2, '0')}`;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const toggleSectionExpand = (section: string) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleRepeat = () => {
    if (repeat === 'off') setRepeat('all');
    else if (repeat === 'all') setRepeat('one');
    else setRepeat('off');
  };

  return (
    <div className="h-full flex flex-col bg-[#1c1c1e] text-white">
      {/* App Bar with Toolbar & Search */}
      <div className="h-12 bg-[#2c2c2e] flex items-center px-4 justify-between border-b border-[#3a3a3c]">
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-1 rounded-md bg-[#3a3a3c] text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <svg className="w-4 h-4 absolute left-2.5 top-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button 
                className="absolute right-2.5 top-1.5 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white text-xs">•••</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#2c2c2e] flex flex-col">
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {/* Library Section */}
            <div className="py-2">
              <div 
                className="flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-[#3a3a3c]"
                onClick={() => toggleSectionExpand('library')}
              >
                <span className="text-xs font-semibold text-gray-400">LIBRARY</span>
                <svg 
                  className={`w-3 h-3 text-gray-400 transition-transform ${expanded.library ? 'transform rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {expanded.library && (
                <div className="mt-1">
                  <button
                    onClick={() => setSelectedLibrarySection('songs')}
                    className={`w-full text-left px-4 py-1 text-sm ${
                      selectedLibrarySection === 'songs' ? 'bg-[#3a3a3c]' : 'hover:bg-[#3a3a3c]'
                    }`}
                  >
                    Songs
                  </button>
                  <button
                    onClick={() => setSelectedLibrarySection('albums')}
                    className={`w-full text-left px-4 py-1 text-sm ${
                      selectedLibrarySection === 'albums' ? 'bg-[#3a3a3c]' : 'hover:bg-[#3a3a3c]'
                    }`}
                  >
                    Albums
                  </button>
                  <button
                    onClick={() => setSelectedLibrarySection('artists')}
                    className={`w-full text-left px-4 py-1 text-sm ${
                      selectedLibrarySection === 'artists' ? 'bg-[#3a3a3c]' : 'hover:bg-[#3a3a3c]'
                    }`}
                  >
                    Artists
                  </button>
                  <button
                    onClick={() => setSelectedLibrarySection('genres')}
                    className={`w-full text-left px-4 py-1 text-sm ${
                      selectedLibrarySection === 'genres' ? 'bg-[#3a3a3c]' : 'hover:bg-[#3a3a3c]'
                    }`}
                  >
                    Genres
                  </button>
                  <button
                    onClick={() => setSelectedLibrarySection('composers')}
                    className={`w-full text-left px-4 py-1 text-sm ${
                      selectedLibrarySection === 'composers' ? 'bg-[#3a3a3c]' : 'hover:bg-[#3a3a3c]'
                    }`}
                  >
                    Composers
                  </button>
                </div>
              )}
            </div>
            
            {/* Playlists Section */}
            <div className="py-2 border-t border-[#3a3a3c]">
              <div 
                className="flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-[#3a3a3c]"
                onClick={() => toggleSectionExpand('playlists')}
              >
                <span className="text-xs font-semibold text-gray-400">PLAYLISTS</span>
                <svg 
                  className={`w-3 h-3 text-gray-400 transition-transform ${expanded.playlists ? 'transform rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {expanded.playlists && (
                <div className="mt-1">
                  {/* Default System Playlists */}
                  {playlists.filter(p => p.isDefault).map((playlist) => (
                    <button
                      key={playlist.id}
                      className="w-full text-left px-4 py-1 hover:bg-[#3a3a3c] flex items-center text-sm"
                    >
                      {playlist.name}
                    </button>
                  ))}
                  
                  {/* User Playlists with artwork */}
                  <div className="pt-1 mt-1 border-t border-[#3a3a3c]">
                    {playlists.filter(p => !p.isDefault).map((playlist) => (
                      <button
                        key={playlist.id}
                        className="w-full text-left px-4 py-1.5 hover:bg-[#3a3a3c] flex items-center"
                      >
                        <div
                          className="w-6 h-6 rounded mr-3 bg-[#3a3a3c] flex items-center justify-center text-xs flex-shrink-0"
                          style={{ backgroundImage: `url(${playlist.artwork})`, backgroundSize: 'cover' }}
                        >
                          {!playlist.artwork && playlist.name.charAt(0)}
                        </div>
                        <div className="text-sm truncate">{playlist.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[#3a3a3c] flex justify-between">
            <button 
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#3a3a3c]"
              onClick={() => setShowSidebarSettings(!showSidebarSettings)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#3a3a3c]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Header for selected section */}
          <div className="p-4 bg-[#1c1c1e]">
            <h1 className="text-2xl font-semibold capitalize">{selectedLibrarySection}</h1>
          </div>
          
          {/* Content based on selected section */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            {selectedLibrarySection === 'songs' && (
              <div className="p-4">
                {/* Table header */}
                <div className="flex items-center py-2 border-b border-[#3a3a3c] text-xs text-gray-400 font-medium">
                  <div className="w-10">#</div>
                  <div className="w-12"></div> {/* Album art */}
                  <div className="flex-1">TITLE</div>
                  <div className="w-48">ARTIST</div>
                  <div className="w-48">ALBUM</div>
                  <div className="w-24 text-right">DATE ADDED</div>
                  <div className="w-16 text-right">TIME</div>
                  <div className="w-16 text-right">PLAYS</div>
                </div>
                
                {/* Songs list */}
                <div>
                  {songs.map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-center py-2 border-b border-[#3a3a3c]/50 hover:bg-[#2c2c2e] group"
                    >
                      <div className="w-10 text-gray-400 text-sm">{index + 1}</div>
                      <div className="w-12 pr-2">
                        <div
                          className="w-9 h-9 rounded bg-[#3a3a3c] flex items-center justify-center"
                          style={{ backgroundImage: `url(${song.artwork})`, backgroundSize: 'cover' }}
                        >
                          <div className="hidden group-hover:flex">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium text-sm">{song.title}</span>
                          {song.isExplicit && (
                            <span className="ml-2 text-xs bg-[#3a3a3c] px-1 py-0.5 rounded">
                              E
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-48 text-gray-400 text-sm truncate">{song.artist}</div>
                      <div className="w-48 text-gray-400 text-sm truncate">{song.album}</div>
                      <div className="w-24 text-right text-gray-400 text-sm">{song.dateAdded}</div>
                      <div className="w-16 text-right text-gray-400 text-sm">{song.duration}</div>
                      <div className="w-16 text-right text-gray-400 text-sm">{song.plays}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedLibrarySection === 'albums' && (
              <div className="p-4">
                <div className="grid grid-cols-5 gap-6">
                  {albums.map(album => (
                    <div key={album.id} className="hover:bg-[#2c2c2e] p-3 rounded-md cursor-pointer">
                      <div
                        className="aspect-square rounded shadow-lg mb-3"
                        style={{ backgroundImage: `url(${album.artwork})`, backgroundSize: 'cover' }}
                      ></div>
                      <div className="text-sm font-medium truncate">{album.title}</div>
                      <div className="text-xs text-gray-400 truncate">{album.artist}</div>
                      <div className="text-xs text-gray-500">{album.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(selectedLibrarySection === 'artists' || 
              selectedLibrarySection === 'genres' || 
              selectedLibrarySection === 'composers') && (
              <div className="p-8 text-center text-gray-400">
                No {selectedLibrarySection} found in your library.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Controls - Mini Player */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black border-t border-[#2a2a2a] flex flex-col z-10">
        {/* Timeline/scrubber */}
        <div className="h-[2px] bg-[#333333] relative">
          <div className="absolute left-0 top-0 h-full bg-[#ffffff]" style={{ width: isPlaying ? '35%' : '0%' }}></div>
        </div>
        {/* Controls and info */}
        <div className="flex items-center justify-between h-[calc(100%-2px)] px-5">
          {/* Left - Track Info */}
          <div className="flex items-center w-1/4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 bg-[#3a3a3c] rounded"
                style={{ backgroundImage: `url(${songs[0].artwork})`, backgroundSize: 'cover' }}
              ></div>
              <div className="truncate max-w-[140px]">
                <div className="text-sm font-medium truncate">Neon Nights</div>
                <div className="text-xs text-gray-400 truncate">Neon Pulse</div>
              </div>
            </div>
          </div>
          
          {/* Center - Controls */}
          <div className="flex items-center space-x-7 justify-center">
            <button className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Right - Volume */}
          <div className="flex items-center justify-end space-x-3 w-1/4">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828 2.828" />
              </svg>
              <div className="w-20 h-1.5 bg-[#3a3a3c] rounded-full">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp; 