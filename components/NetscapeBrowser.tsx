import React from 'react';

interface NetscapeBrowserProps {
  // Any props the Netscape browser component might need
}

const NetscapeBrowser: React.FC<NetscapeBrowserProps> = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Netscape Navigator classic menu bar */}
      <div className="bg-[#303860] px-2 py-1 border-b border-[#000033] flex items-center">
        <div className="flex space-x-2 text-white text-xs">
          <span className="px-2 py-1 hover:bg-[#4B0082]/30 cursor-pointer">File</span>
          <span className="px-2 py-1 hover:bg-[#4B0082]/30 cursor-pointer">Edit</span>
          <span className="px-2 py-1 hover:bg-[#4B0082]/30 cursor-pointer">View</span>
          <span className="px-2 py-1 hover:bg-[#4B0082]/30 cursor-pointer">Go</span>
          <span className="px-2 py-1 hover:bg-[#4B0082]/30 cursor-pointer">Bookmarks</span>
          <span className="px-2 py-1 hover:bg-[#4B0082]/30 cursor-pointer">Tools</span>
          <span className="px-2 py-1 hover:bg-[#4B0082]/30 cursor-pointer">Help</span>
        </div>
      </div>
      
      {/* Netscape toolbar */}
      <div className="bg-[#202850] border-b border-[#000033] py-2 px-2 flex items-center space-x-2">
        <button className="bg-[#A0A0C0] text-[#000044] px-2 py-1 rounded text-xs font-bold border border-[#000033]">Back</button>
        <button className="bg-[#A0A0C0] text-[#000044] px-2 py-1 rounded text-xs font-bold border border-[#000033]">Forward</button>
        <button className="bg-[#A0A0C0] text-[#000044] px-2 py-1 rounded text-xs font-bold border border-[#000033]">Reload</button>
        <button className="bg-[#A0A0C0] text-[#000044] px-2 py-1 rounded text-xs font-bold border border-[#000033]">Home</button>
        <button className="bg-[#A0A0C0] text-[#000044] px-2 py-1 rounded text-xs font-bold border border-[#000033]">Search</button>
        <button className="bg-[#A0A0C0] text-[#000044] px-2 py-1 rounded text-xs font-bold border border-[#000033]">Bookmarks</button>
      </div>
      
      {/* Address bar */}
      <div className="bg-[#202850] border-b border-[#000033] py-2 px-2 flex items-center">
        <div className="text-xs text-white mr-2">Location:</div>
        <div className="flex-1 bg-white text-sm px-2 py-1 text-[#000033] rounded-sm border border-[#000033]">
          http://www.geocities.com/SiliconValley/Heights/5653/
        </div>
      </div>
      
      {/* Browser content - 90's GeoCities-style website */}
      <div className="flex-1 bg-[#ffffcc] overflow-auto macos-scrollbar">
        <div className="p-4 max-w-4xl mx-auto">
          {/* Page header with under construction gif */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="text-center mb-2 font-bold text-3xl text-[#FF00FF] font-serif animate-pulse">
                <span className="text-[#0000FF]">W</span>
                <span className="text-[#FF0000]">e</span>
                <span className="text-[#008000]">l</span>
                <span className="text-[#FFA500]">c</span>
                <span className="text-[#800080]">o</span>
                <span className="text-[#0000FF]">m</span>
                <span className="text-[#FF0000]">e</span>
                <span className="mx-2">to</span>
                <span className="text-[#008000]">M</span>
                <span className="text-[#FFA500]">y</span>
                <span className="mx-2">GeoCities</span>
                <span className="text-[#800080]">P</span>
                <span className="text-[#0000FF]">a</span>
                <span className="text-[#FF0000]">g</span>
                <span className="text-[#008000]">e</span>
                <span className="text-[#FFA500]">!</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative animate-bounce-slow">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-yellow-600">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
                    </div>
                    <div className="absolute top-1 left-2 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="border-2 border-red-500 px-4 py-2 bg-yellow-200 animate-pulse shadow-lg text-center">
                  <span className="text-lg font-bold text-red-600">UNDER CONSTRUCTION</span>
                  <div className="flex justify-center mt-1">
                    <div className="w-6 h-6 bg-yellow-500 border border-black"></div>
                    <div className="w-6 h-6 bg-black border border-black"></div>
                    <div className="w-6 h-6 bg-yellow-500 border border-black"></div>
                  </div>
                </div>
                <div className="w-16 h-16 relative animate-bounce-slow">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-yellow-600">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
                    </div>
                    <div className="absolute top-1 left-2 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area with visitor counter */}
          <div className="flex gap-6">
            {/* Left sidebar with gifs and visitor counter */}
            <div className="w-48 flex flex-col gap-4 items-center">
              <div className="border-2 border-blue-700 p-2 bg-blue-100 w-full text-center">
                <div className="text-sm font-bold text-blue-800 mb-2">VISITOR COUNT</div>
                <div className="bg-black px-2 py-1 flex justify-center">
                  <span className="inline-block w-6 h-10 bg-[#333333] text-green-400 text-2xl font-bold text-center">0</span>
                  <span className="inline-block w-6 h-10 bg-[#333333] text-green-400 text-2xl font-bold text-center">0</span>
                  <span className="inline-block w-6 h-10 bg-[#333333] text-green-400 text-2xl font-bold text-center">4</span>
                  <span className="inline-block w-6 h-10 bg-[#333333] text-green-400 text-2xl font-bold text-center">2</span>
                </div>
              </div>
              
              <div className="border-2 border-red-700 p-2 bg-red-100 w-full flex flex-col items-center">
                <div className="text-sm font-bold text-red-800 mb-2">COOL LINKS</div>
                <div className="w-full text-blue-700 underline text-sm space-y-2">
                  <div className="hover:text-blue-500 cursor-pointer">My Friend's Page</div>
                  <div className="hover:text-blue-500 cursor-pointer">Yahoo! Search</div>
                  <div className="hover:text-blue-500 cursor-pointer">Netscape Home</div>
                  <div className="hover:text-blue-500 cursor-pointer">Free Gifs!</div>
                  <div className="hover:text-blue-500 cursor-pointer">WebRing</div>
                </div>
              </div>
              
              <div className="border-2 border-purple-700 p-2 bg-purple-100 w-full flex flex-col items-center">
                <div className="text-sm font-bold text-purple-800 mb-2">SIGN MY GUESTBOOK</div>
                <div className="w-full flex justify-center">
                  <div className="bg-yellow-200 px-3 py-1 border border-yellow-600 cursor-pointer hover:bg-yellow-300 text-sm">
                    Click here!
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1 bg-white border-2 border-blue-500 p-4 relative">
              <div className="absolute -top-3 left-4 bg-blue-500 px-2 py-0.5 text-white text-sm font-bold">
                About Me
              </div>
              
              <h2 className="text-xl font-bold text-blue-700 mb-4 mt-2">Hello Internet Surfers!</h2>
              
              <div className="float-right ml-4 mb-4 border-4 border-[#FFA500] p-1 bg-white">
                <div className="w-32 h-32 bg-gray-300 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-gray-500" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </div>
                <div className="text-center text-sm mt-1">This is me!</div>
              </div>
              
              <p className="mb-3 text-sm">
                Welcome to my corner of the internet! My name is <span className="font-bold text-green-600">WebMaster2000</span> and 
                this is my personal homepage. I created this site using Netscape Composer on my Pentium 90.
              </p>
              
              <p className="mb-3 text-sm">
                I'm interested in <span className="text-red-600 font-bold">COMPUTERS</span>, 
                <span className="text-blue-600 font-bold">SCI-FI MOVIES</span>, and 
                <span className="text-purple-600 font-bold">COLLECTING ACTION FIGURES</span>. 
                This website will showcase all my cool hobbies and interests!
              </p>
              
              <div className="text-center my-4">
                <div className="inline-block animate-marquee-slow whitespace-nowrap bg-black text-white px-4 py-1">
                  <span className="text-yellow-400 font-bold">★</span> 
                  <span className="text-green-400 font-bold">NEW!</span> Check out my Star Wars collection page! 
                  <span className="text-yellow-400 font-bold">★</span>
                </div>
              </div>
              
              <p className="mb-3 text-sm">
                Feel free to look around! I update this page every weekend with new content.
                Don't forget to sign my guestbook before you leave!
              </p>
              
              <h3 className="font-bold text-lg text-red-600 mb-2 mt-4">My Computer Specs:</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Pentium 90MHz Processor</li>
                <li>16MB RAM</li>
                <li>1.2GB Hard Drive</li>
                <li>Windows 95</li>
                <li>56K Modem</li>
                <li>Sound Blaster 16 Sound Card</li>
              </ul>
              
              <div className="border-t-2 border-blue-400 mt-8 pt-2 text-center text-xs text-gray-600">
                This page looks best in Netscape Navigator 3.0 at 800x600 resolution
                <br />
                <span className="text-blue-600 underline cursor-pointer">Email me</span> | 
                Last updated: 07/14/1997
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="bg-[#202850] border-t border-[#000033] py-1 px-2 flex items-center justify-between text-xs text-[#E0E0E0]">
        <div>Document: Done (1.24 secs)</div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 bg-[#A0A0C0] border border-[#000033] rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
};

export default NetscapeBrowser; 