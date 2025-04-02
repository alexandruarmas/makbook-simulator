import React, { useState } from "react";

interface StorageData {
  total: number;
  available: number;
  used: {
    system: number;
    apps: number;
    photos: number;
    documents: number;
    mail: number;
    messages: number;
    other: number;
    [key: string]: number; // Index signature to allow string access
  };
}

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function Storage() {
  const [storageUsage, setStorageUsage] = useState<StorageData>({
    total: 1000, // GB
    available: 423.5,
    used: {
      system: 15,
      apps: 128.2,
      photos: 235.4,
      documents: 98.3,
      mail: 12.7,
      messages: 5.8,
      other: 81.1
    }
  });

  const calculatePercentage = (value: number): number => {
    return Math.round((value / storageUsage.total) * 100);
  };

  const formatSize = (size: number): string => {
    if (size < 1) {
      return `${Math.round(size * 1000)} MB`;
    }
    return `${size.toFixed(1)} GB`;
  };

  const categories: Category[] = [
    { id: 'system', name: 'System', color: '#8E8E93' },
    { id: 'apps', name: 'Applications', color: '#5AC8FA' },
    { id: 'photos', name: 'Photos', color: '#34C759' },
    { id: 'documents', name: 'Documents', color: '#FF9500' },
    { id: 'mail', name: 'Mail', color: '#FF3B30' },
    { id: 'messages', name: 'Messages', color: '#007AFF' },
    { id: 'other', name: 'Other', color: '#AF52DE' }
  ];
  
  const usedTotal = Object.values(storageUsage.used).reduce((sum, curr) => sum + curr, 0);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Storage</h1>
      
      <div className="space-y-6">
        {/* Storage Overview */}
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-lg font-medium text-[#E0E0E0]">Macintosh HD</h2>
              <div className="text-sm text-[#999] mt-1">
                {formatSize(storageUsage.available)} available of {formatSize(storageUsage.total)}
              </div>
            </div>
            <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
              Manage...
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="h-6 bg-[#1D1D1D] rounded-full overflow-hidden mb-4">
            <div className="flex h-full">
              {categories.map((category, index) => (
                <div 
                  key={category.id}
                  className="h-full" 
                  style={{ 
                    width: `${calculatePercentage(storageUsage.used[category.id])}%`, 
                    backgroundColor: category.color 
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <div className="text-sm text-[#E0E0E0]">{category.name}</div>
                <div className="flex-1"></div>
                <div className="text-sm text-[#999]">{formatSize(storageUsage.used[category.id])}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommendations */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Recommendations</h2>
          <div className="bg-[#232323] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#303030] flex items-center justify-center mr-3 text-[#E0E0E0]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#E0E0E0]">Store in iCloud</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    Automatically store all files, photos, and messages in iCloud and save space
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
                Store in iCloud...
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-[#333]">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#303030] flex items-center justify-center mr-3 text-[#E0E0E0]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#E0E0E0]">Optimize Storage</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    Save space by automatically removing watched movies and TV shows
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
                Optimize...
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-[#333]">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#303030] flex items-center justify-center mr-3 text-[#E0E0E0]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#E0E0E0]">Empty Trash Automatically</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    Remove items that have been in the Trash for more than 30 days
                  </div>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="empty-trash" 
                  className="peer sr-only" 
                  defaultChecked={true}
                />
                <label htmlFor="empty-trash" className="block w-10 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4 peer-checked:bg-[#0066FF]"></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-[#333]">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#303030] flex items-center justify-center mr-3 text-[#E0E0E0]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#E0E0E0]">Reduce Clutter</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    Sort through documents and delete the ones you no longer need
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
                Review Files...
              </button>
            </div>
          </div>
        </div>
        
        {/* External Disks */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">External Disks</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 bg-[#303030] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">No External Disks</h3>
              <p className="text-sm text-[#999] text-center max-w-md">
                Connect an external disk to view its information here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 