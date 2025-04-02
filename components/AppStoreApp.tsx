import React, { useState, useEffect } from 'react';

interface App {
  id: string;
  name: string;
  developer: string;
  icon: string;
  price: string;
  rating: number;
  category: string;
  description: string;
  screenshots: string[];
  featured?: boolean;
  isFree?: boolean;
  isEditorChoice?: boolean;
}

interface Collection {
  id: string;
  title: string;
  apps: App[];
}

const AppStoreApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add scrollbar styles to the component
  useEffect(() => {
    // Add CSS to the document
    const style = document.createElement('style');
    style.innerHTML = `
      .scrollbar-thin::-webkit-scrollbar {
        width: 8px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: rgba(200, 200, 200, 0.1);
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: rgba(150, 150, 150, 0.5);
        border-radius: 20px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background-color: rgba(150, 150, 150, 0.8);
      }
    `;
    document.head.appendChild(style);
    
    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Mock data
  const featuredApps: App[] = [
    {
      id: '2',
      name: 'VideoEdit Pro',
      developer: 'EditSoft Inc.',
      icon: 'https://placehold.co/200x200/0e84e0/ffffff?text=VE',
      price: '$199.99',
      rating: 4.7,
      category: 'Video',
      description: 'VideoEdit Pro revolutionizes post-production with magnetic timeline, automated metadata, and time-saving tools for editing, effects, audio, and delivery.',
      screenshots: [
        'https://placehold.co/800x500/0e75d0/ffffff?text=VideoEdit+Pro+Timeline',
        'https://placehold.co/800x500/0e75d0/ffffff?text=VideoEdit+Pro+Effects',
      ],
      featured: true,
      isEditorChoice: true,
    },
    {
      id: '3',
      name: 'Affinity Designer',
      developer: 'Serif Labs',
      icon: 'https://placehold.co/200x200/0f9ff0/ffffff?text=AD',
      price: '$49.99',
      rating: 4.9,
      category: 'Graphics & Design',
      description: 'Professional graphic design software with precision, speed, and seamless integration for all your creative projects.',
      screenshots: [
        'https://placehold.co/800x500/0f8fe0/ffffff?text=Affinity+Designer+Workspace',
        'https://placehold.co/800x500/0f8fe0/ffffff?text=Affinity+Designer+Tools',
      ],
      featured: true,
      isEditorChoice: true,
    },
    {
      id: '10',
      name: 'Procreate',
      developer: 'Savage Interactive',
      icon: 'https://placehold.co/200x200/222222/ffffff?text=P',
      price: '$9.99',
      rating: 4.9,
      category: 'Graphics & Design',
      description: 'Powerful creative tool for artists and illustrators, with advanced brush engine and intuitive interface.',
      screenshots: [
        'https://placehold.co/800x500/222222/ffffff?text=Procreate+Canvas',
      ],
      featured: true,
      isEditorChoice: true,
    },
  ];

  const collections: Collection[] = [
    {
      id: '1',
      title: 'Essential Productivity Apps',
      apps: [
        {
          id: '4',
          name: 'Notion',
          developer: 'Notion Labs, Inc.',
          icon: 'https://placehold.co/200x200/000000/ffffff?text=N',
          price: 'Free',
          rating: 4.8,
          category: 'Productivity',
          description: 'All-in-one workspace for notes, tasks, wikis, and databases.',
          screenshots: [
            'https://placehold.co/800x500/222222/ffffff?text=Notion+Workspace',
          ],
          isFree: true,
        },
        {
          id: '5',
          name: 'Slack',
          developer: 'Slack Technologies, Inc.',
          icon: 'https://placehold.co/200x200/4a154b/ffffff?text=S',
          price: 'Free',
          rating: 4.7,
          category: 'Business',
          description: 'Connect your team with the collaboration hub that brings together conversations, files, and tools.',
          screenshots: [
            'https://placehold.co/800x500/4a154b/ffffff?text=Slack+Messaging',
          ],
          isFree: true,
        },
        {
          id: '6',
          name: 'Evernote',
          developer: 'Evernote Corporation',
          icon: 'https://placehold.co/200x200/00a82d/ffffff?text=E',
          price: 'Free',
          rating: 4.6,
          category: 'Productivity',
          description: 'Organize your work and declutter your life. Collect everything, find what you need easily.',
          screenshots: [
            'https://placehold.co/800x500/00a82d/ffffff?text=Evernote+Notes',
          ],
          isFree: true,
        },
      ],
    },
    {
      id: '2',
      title: 'Top-Rated Games',
      apps: [
        {
          id: '7',
          name: 'Civilization VI',
          developer: 'Aspyr Media, Inc.',
          icon: 'https://placehold.co/200x200/cd4851/ffffff?text=CIV',
          price: '$59.99',
          rating: 4.5,
          category: 'Games',
          description: 'Create, explore, and conquer in the newest entry in the acclaimed Civilization franchise.',
          screenshots: [
            'https://placehold.co/800x500/cd4851/ffffff?text=Civilization+VI+Gameplay',
          ],
        },
        {
          id: '8',
          name: 'Mini Metro',
          developer: 'Dinosaur Polo Club',
          icon: 'https://placehold.co/200x200/000000/ff2c55?text=MM',
          price: '$9.99',
          rating: 4.8,
          category: 'Games',
          description: 'A subway layout game with simple gameplay and endless depth to master.',
          screenshots: [
            'https://placehold.co/800x500/101010/ff2c55?text=Mini+Metro+Map',
          ],
        },
        {
          id: '9',
          name: 'Stardew Valley',
          developer: 'ConcernedApe',
          icon: 'https://placehold.co/200x200/689f38/ffffff?text=SV',
          price: '$14.99',
          rating: 4.9,
          category: 'Games',
          description: 'Build the farm of your dreams and cultivate a new life in this award-winning open-ended farming RPG.',
          screenshots: [
            'https://placehold.co/800x500/689f38/ffffff?text=Stardew+Valley+Farm',
          ],
          isEditorChoice: true,
        },
      ],
    },
    {
      id: '3',
      title: 'Editor\'s Choice',
      apps: [
        {
          id: '11',
          name: 'Lightroom',
          developer: 'Adobe Inc.',
          icon: 'https://placehold.co/200x200/001935/31a8ff?text=Lr',
          price: '$9.99/mo',
          rating: 4.7,
          category: 'Photo & Video',
          description: 'Professional photo editing and organization software with powerful tools and cloud sync.',
          screenshots: [
            'https://placehold.co/800x500/001935/31a8ff?text=Lightroom+Photo+Editing',
          ],
          isEditorChoice: true,
        },
        {
          id: '12',
          name: 'Final Draft',
          developer: 'Final Draft Inc.',
          icon: 'https://placehold.co/200x200/264563/ffffff?text=FD',
          price: '$249.99',
          rating: 4.6,
          category: 'Productivity',
          description: 'Industry-standard screenwriting software used by professional screenwriters and filmmakers.',
          screenshots: [
            'https://placehold.co/800x500/264563/ffffff?text=Final+Draft+Script',
          ],
          isEditorChoice: true,
        },
      ],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'design', name: 'Graphics & Design' },
    { id: 'video', name: 'Photo & Video' },
    { id: 'games', name: 'Games' },
    { id: 'education', name: 'Education' },
    { id: 'business', name: 'Business' },
    { id: 'developer', name: 'Developer Tools' },
    { id: 'entertainment', name: 'Entertainment' },
  ];

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-3 h-3 text-gray-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          </svg>
        );
      }
    }
    return <div className="flex">{stars}</div>;
  };

  const handleAppClick = (app: App) => {
    setSelectedApp(app);
  };

  const handleBackClick = () => {
    setSelectedApp(null);
  };

  const renderAppDetail = () => {
    if (!selectedApp) return null;

    return (
      <div className="flex-1 bg-[#f9f9f9] dark:bg-[#1e1e1e] overflow-y-auto scrollbar-thin">
        <div className="max-w-5xl mx-auto p-8">
          {/* Back button */}
          <button 
            onClick={handleBackClick}
            className="flex items-center mb-6 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Store
          </button>

          {/* App Header */}
          <div className="flex items-start">
            <div className="w-32 h-32 rounded-xl overflow-hidden shadow-md mr-8 flex-shrink-0">
              <img src={selectedApp.icon} alt={selectedApp.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-semibold mb-1">{selectedApp.name}</h1>
                  <p className="text-md text-gray-600 dark:text-gray-400 mb-1">{selectedApp.developer}</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-0.5">
                      {selectedApp.category}
                    </span>
                    {selectedApp.isEditorChoice && (
                      <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-0.5 flex items-center">
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        Editor's Choice
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStarRating(selectedApp.rating)}
                    <span className="text-sm text-gray-500 dark:text-gray-400">{selectedApp.rating.toFixed(1)}</span>
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-6 py-2 text-md font-medium">
                  {selectedApp.isFree ? 'Get' : selectedApp.price}
                </button>
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div className="mt-12 mb-12">
            <h2 className="text-xl font-medium mb-6">Screenshots</h2>
            <div className="grid grid-cols-2 gap-6">
              {selectedApp.screenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="rounded-md overflow-hidden shadow-md bg-white dark:bg-[#252525] h-64"
                >
                  <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-xl font-medium mb-4">Description</h2>
            <div className="bg-white dark:bg-[#252525] rounded-lg p-6 shadow-sm">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                {selectedApp.description}
              </p>
            </div>
          </div>

          {/* Information */}
          <div>
            <h2 className="text-xl font-medium mb-4">Information</h2>
            <div className="bg-white dark:bg-[#252525] rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Developer</h3>
                  <p className="text-gray-800 dark:text-gray-200">{selectedApp.developer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</h3>
                  <p className="text-gray-800 dark:text-gray-200">{selectedApp.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Price</h3>
                  <p className="text-gray-800 dark:text-gray-200">{selectedApp.isFree ? 'Free' : selectedApp.price}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rating</h3>
                  <div className="flex items-center">
                    {renderStarRating(selectedApp.rating)}
                    <span className="ml-2 text-gray-800 dark:text-gray-200">{selectedApp.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#f6f6f6] dark:bg-[#1c1c1e] text-black dark:text-white">
      {/* Top Bar */}
      <div className="h-12 flex items-center px-4 justify-between bg-[#f2f2f2] dark:bg-[#232323] border-b border-[#dcdcdc] dark:border-[#383838]">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center text-sm font-medium space-x-5">
            <button
              className={`py-1 ${activeTab === 'discover' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveTab('discover')}
            >
              Discover
            </button>
            <button
              className={`py-1 ${activeTab === 'create' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveTab('create')}
            >
              Create
            </button>
            <button
              className={`py-1 ${activeTab === 'work' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveTab('work')}
            >
              Work
            </button>
            <button
              className={`py-1 ${activeTab === 'play' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveTab('play')}
            >
              Play
            </button>
            <button
              className={`py-1 ${activeTab === 'categories' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-64 px-8 py-1.5 rounded-md bg-[#e8e8e8] dark:bg-[#3a3a3c] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-2 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              className="absolute right-2.5 top-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setSearchQuery('')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 bg-[#f2f2f2] dark:bg-[#232323] border-r border-[#dcdcdc] dark:border-[#383838] flex-shrink-0 hidden md:block">
          <div className="py-4">
            <div className="px-4 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Discover
              </h3>
            </div>
            <div className="space-y-0.5">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                    selectedCategory === category.id
                      ? 'bg-[#e1e1e1] dark:bg-[#3a3a3c] font-medium'
                      : 'hover:bg-[#e8e8e8] dark:hover:bg-[#333333]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="mt-6 px-4 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Account
              </h3>
            </div>
            <div className="space-y-0.5">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-[#e8e8e8] dark:hover:bg-[#333333] rounded-md">
                Updates
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-[#e8e8e8] dark:hover:bg-[#333333] rounded-md flex items-center justify-between">
                <span>Purchased</span>
                <span className="bg-blue-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {selectedApp ? (
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {renderAppDetail()}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
            {/* Main content headline */}
            <div className="max-w-5xl mx-auto mb-8">
              <h1 className="text-3xl font-bold mb-1">Discover New Apps</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Find the best apps and games for your Mac
              </p>
            </div>

            {/* Hero Feature */}
            <div className="max-w-5xl mx-auto mb-12">
              <div 
                className="relative rounded-xl overflow-hidden shadow-lg h-80 bg-[#0a84ff] dark:bg-[#0a64c5]"
                onClick={() => handleAppClick(featuredApps[0])}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 shadow-md">
                      <img src={featuredApps[0].icon} alt={featuredApps[0].name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-blue-200 mb-1">
                        Editor's Choice
                      </div>
                      <h2 className="text-2xl font-bold">{featuredApps[0].name}</h2>
                      <p className="text-sm text-gray-200">{featuredApps[0].developer}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-200 max-w-2xl">
                    {featuredApps[0].description.substring(0, 160)}...
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Apps Grid */}
            <div className="max-w-5xl mx-auto mb-16">
              <h2 className="text-2xl font-semibold mb-6">Featured Apps</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white dark:bg-[#252525] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleAppClick(app)}
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={app.screenshots[0]} 
                        alt={app.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl overflow-hidden mr-3 shadow-sm">
                          <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium text-md">{app.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{app.category}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex">
                              {renderStarRating(app.rating)}
                            </div>
                            <span className="text-sm font-medium">{app.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collections */}
            {collections.map((collection) => (
              <div key={collection.id} className="max-w-5xl mx-auto mb-16">
                <h2 className="text-2xl font-semibold mb-6">{collection.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {collection.apps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white dark:bg-[#252525] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                      onClick={() => handleAppClick(app)}
                    >
                      <div className="flex items-center p-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 shadow-sm">
                          <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">{app.name}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{app.category}</p>
                              <div className="flex">
                                {renderStarRating(app.rating)}
                              </div>
                            </div>
                            <button className="bg-[#f2f2f2] dark:bg-[#333333] hover:bg-[#e8e8e8] dark:hover:bg-[#3d3d3d] rounded-md px-3 py-1 text-xs font-medium">
                              {app.isFree ? 'Get' : app.price}
                            </button>
                          </div>
                        </div>
                      </div>
                      {app.isEditorChoice && (
                        <div className="mt-auto border-t border-gray-100 dark:border-gray-700 px-4 py-2 flex items-center">
                          <svg className="w-3 h-3 text-blue-500 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="text-xs text-blue-500 font-medium">Editor's Choice</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppStoreApp; 