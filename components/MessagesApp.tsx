import React, { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isDelivered: boolean;
  isRead: boolean;
  reactions?: {
    type: string;
    userId: string;
  }[];
  attachments?: {
    type: 'image' | 'file' | 'link';
    url: string;
    preview?: string;
    name?: string;
  }[];
}

const MessagesApp: React.FC = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  
  // Mock contacts data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      status: 'online',
      lastMessage: "Hey! Are we still meeting at the coffee shop tomorrow?",
      lastMessageTime: '2:34 PM',
      unreadCount: 0,
      isMuted: false,
      isPinned: true
    },
    {
      id: '2',
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'away',
      lastMessage: "I sent you the project files via email.",
      lastMessageTime: '11:20 AM',
      unreadCount: 2,
      isMuted: false,
      isPinned: true
    },
    {
      id: '3',
      name: 'Emily Chen',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      status: 'online',
      lastMessage: "Did you see the latest episode?",
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isMuted: true,
      isPinned: false
    },
    {
      id: '4',
      name: 'Michael Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      status: 'offline',
      lastMessage: "Thanks for the help with that coding problem.",
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isMuted: false,
      isPinned: false
    },
    {
      id: '5',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      status: 'offline',
      lastMessage: "Let me know when you're available for a call.",
      lastMessageTime: 'Aug 12',
      unreadCount: 0,
      isMuted: false,
      isPinned: false
    },
    {
      id: '6',
      name: 'Sophia Kim',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
      status: 'online',
      lastMessage: "Just sent you the invite for the party!",
      lastMessageTime: 'Aug 10',
      unreadCount: 0,
      isMuted: false,
      isPinned: false
    },
    {
      id: '7',
      name: 'Alex Taylor',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      status: 'away',
      lastMessage: "Movie night this weekend?",
      lastMessageTime: 'Aug 8',
      unreadCount: 0,
      isMuted: false,
      isPinned: false
    },
    {
      id: '8',
      name: 'Lisa Wong',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
      status: 'offline',
      lastMessage: "Happy birthday! 🎂🎉",
      lastMessageTime: 'Aug 5',
      unreadCount: 0,
      isMuted: false,
      isPinned: false
    }
  ];

  // Mock messages
  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1a',
        senderId: '1',
        content: 'Hey! How are you doing?',
        timestamp: 'Yesterday, 4:30 PM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '1b',
        senderId: 'me',
        content: 'Hi Sarah! I\'m doing good, thanks for asking. How about you?',
        timestamp: 'Yesterday, 4:35 PM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '1c',
        senderId: '1',
        content: 'I\'m great! Just finishing up some work before the weekend.',
        timestamp: 'Yesterday, 4:40 PM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '1d',
        senderId: '1',
        content: 'Do you want to grab coffee tomorrow?',
        timestamp: 'Yesterday, 4:42 PM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '1e',
        senderId: 'me',
        content: 'Sure! That sounds perfect. How about around 10am at that new place downtown?',
        timestamp: 'Yesterday, 5:01 PM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '1f',
        senderId: '1',
        content: 'Perfect! See you there at 10.',
        timestamp: 'Yesterday, 5:05 PM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '1g',
        senderId: '1',
        content: 'Hey! Are we still meeting at the coffee shop tomorrow?',
        timestamp: 'Today, 2:34 PM',
        isDelivered: true,
        isRead: true
      }
    ],
    '2': [
      {
        id: '2a',
        senderId: '2',
        content: 'Hey, can you take a look at these project files when you get a chance?',
        timestamp: 'Yesterday, 10:15 AM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '2b',
        senderId: 'me',
        content: 'Sure thing. Send them over and I\'ll review them.',
        timestamp: 'Yesterday, 10:30 AM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '2c',
        senderId: '2',
        content: 'Thanks! I just emailed them to you.',
        timestamp: 'Yesterday, 10:45 AM',
        isDelivered: true,
        isRead: true
      },
      {
        id: '2d',
        senderId: '2',
        content: 'I sent you the project files via email.',
        timestamp: 'Today, 11:20 AM',
        isDelivered: true,
        isRead: false
      },
      {
        id: '2e',
        senderId: '2',
        content: 'Let me know if you need anything else!',
        timestamp: 'Today, 11:22 AM',
        isDelivered: true,
        isRead: false
      }
    ]
  };

  // Get selected contact
  const selectedContact = selectedConversation ? contacts.find(c => c.id === selectedConversation) : null;
  
  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort contacts with pinned at top
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  // Handle sending new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, you'd send this to a server
    setNewMessage('');
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
      {/* Header */}
      <div className="h-11 flex items-center px-4 bg-[#f5f5f7] dark:bg-[#2c2c2c] border-b border-[#d1d1d6] dark:border-[#3d3d3d]">
        <div className="flex-1 flex items-center">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              className="w-full h-7 pl-7 pr-3 bg-[#e5e5e5] dark:bg-[#3d3d3d] rounded-md text-sm focus:outline-none"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8e8e93] dark:text-[#98989d]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center ml-2 space-x-1">
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#007aff] hover:bg-[#e5e5e5] dark:hover:bg-[#3d3d3d]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Split view */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation list */}
        <div className="w-72 border-r border-[#d1d1d6] dark:border-[#3d3d3d] flex flex-col bg-[#ffffff] dark:bg-[#252525] overflow-hidden">
          <div className="overflow-y-auto flex-1">
            {sortedContacts.map(contact => (
              <div 
                key={contact.id}
                className={`px-3 py-2 cursor-pointer flex items-center ${
                  selectedConversation === contact.id 
                    ? 'bg-[#007aff1a] dark:bg-[#0a84ff33]' 
                    : 'hover:bg-[#f5f5f7] dark:hover:bg-[#323232]'
                }`}
                onClick={() => setSelectedConversation(contact.id)}
              >
                <div className="relative mr-3">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white dark:border-[#252525] rounded-full ${
                    contact.status === 'online' ? 'bg-green-500' :
                    contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium text-sm truncate ${
                      contact.unreadCount > 0 ? 'text-black dark:text-white' : ''
                    }`}>
                      {contact.name}
                    </span>
                    <span className="text-xs text-[#8e8e93] dark:text-[#98989d] whitespace-nowrap ml-1">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-xs truncate ${
                      contact.unreadCount > 0 
                        ? 'text-black dark:text-white font-medium' 
                        : 'text-[#8e8e93] dark:text-[#98989d]'
                    }`}>
                      {contact.lastMessage}
                    </span>
                    
                    {contact.unreadCount > 0 && (
                      <span className="ml-1 flex-shrink-0 w-5 h-5 bg-[#007aff] dark:bg-[#0a84ff] text-white rounded-full flex items-center justify-center text-xs">
                        {contact.unreadCount}
                      </span>
                    )}
                    
                    {contact.isMuted && (
                      <svg className="w-3.5 h-3.5 ml-1 text-[#8e8e93] dark:text-[#98989d]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.586 20.414L3.586 5.414C3.195 5.024 3.195 4.39 3.586 4C3.976 3.609 4.61 3.609 5 4L20 19C20.391 19.39 20.391 20.024 20 20.414C19.61 20.805 18.976 20.805 18.586 20.414Z" />
                        <path d="M15.55 16.55L14.13 15.13C13.46 15.46 12.74 15.64 12 15.64C9.27 15.64 7.21 13.34 7.10005 13.22C7.45005 12.82 8.14005 12.07 9.05005 11.51L7.89005 10.35C6.70005 11.06 5.74005 12.06 5.51005 12.35C5.49005 12.38 5.47005 12.4 5.44005 12.43C5.15005 12.82 5.15005 13.38 5.44005 13.77C5.56005 13.92 7.94005 16.64 12 16.64C13.15 16.64 14.19 16.32 15.11 15.84L15.55 16.55Z" />
                        <path d="M12 9.37C12.18 9.37 12.35 9.39 12.53 9.43L9.58005 6.48C7.11005 7.01 5.46005 9.06 5.44005 9.09C5.15005 9.48 5.15005 10.05 5.44005 10.43C5.56005 10.58 7.94005 13.3 12 13.3C12.21 13.3 12.41 13.29 12.61 13.28L11.59 12.26C11.4 12.27 11.2 12.28 11 12.28C9.83005 12.28 8.83005 11.75 8.17005 11.32C7.63005 10.97 7.23005 10.6 6.98005 10.35C7.21005 10.08 7.53005 9.81 7.92005 9.58C8.88005 9.05 9.97005 8.74 11 8.74C11.1 8.74 11.2 8.75 11.3 8.75L9.65005 7.1C8.76005 7.46 8.01005 8.21 7.64005 9.13L6.79005 8.28C7.22005 7.44 7.87005 6.78 8.64005 6.35L8.77005 6.29L12 9.52C12 9.47 12 9.42 12 9.37Z" />
                        <path d="M18.56 17.56L18.14 17.14L17.35 16.35L16.56 15.56L15.56 14.56L13.66 12.66L11.66 10.66L10.66 9.66L9.66005 8.66L7.56005 6.56L6.56005 5.56L5.91005 4.91C5.79005 4.79 5.62005 4.74 5.46005 4.77C5.30005 4.8 5.16005 4.9 5.09005 5.05C5.01005 5.21 5.00005 5.39 5.08005 5.55L5.20005 5.74L5.91005 6.45L6.91005 7.45L8.91005 9.45L9.91005 10.45L10.91 11.45L12.81 13.35L14.81 15.35L15.81 16.35L16.61 17.15L17.26 17.8C17.39 17.93 17.56 18 17.74 18C17.92 18 18.09 17.93 18.21 17.8C18.34 17.68 18.41 17.51 18.41 17.33C18.4 17.15 18.34 16.98 18.22 16.86L18.56 17.56Z" />
                        <path d="M12 5.7L13.38 7.08C15.3 7.34 16.65 8.8 16.66 8.81C16.9 9.11 17.01 9.5 16.96 9.89C16.92 10.27 16.71 10.61 16.39 10.83L17.2 11.64C17.85 11.15 18.22 10.38 18.22 9.58C18.22 8.78 17.85 8.01 17.2 7.53C17.05 7.35 14.54 5.04 11.23 5.04C11 5.04 10.77 5.06 10.54 5.08L12 5.7Z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-[#ffffff] dark:bg-[#1e1e1e] overflow-hidden">
            {/* Conversation header */}
            <div className="h-11 flex items-center justify-between px-4 bg-[#f5f5f7] dark:bg-[#2c2c2c] border-b border-[#d1d1d6] dark:border-[#3d3d3d]">
              <div className="flex items-center">
                <img 
                  src={selectedContact?.avatar} 
                  alt={selectedContact?.name} 
                  className="w-7 h-7 rounded-full object-cover mr-2"
                />
                <span className="font-medium text-sm">{selectedContact?.name}</span>
                <div className={`ml-2 w-2 h-2 rounded-full ${
                  selectedContact?.status === 'online' ? 'bg-green-500' :
                  selectedContact?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              </div>
              
              <div className="flex items-center space-x-1">
                <button 
                  className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#e5e5e5] dark:hover:bg-[#3d3d3d] ${
                    showDetails ? 'text-[#007aff]' : 'text-[#8e8e93] dark:text-[#98989d]'
                  }`}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Message thread */}
              <div className={`${showDetails ? 'w-2/3' : 'w-full'} flex flex-col overflow-hidden`}>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="flex flex-col space-y-4">
                    {selectedConversation && messages[selectedConversation]?.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.senderId !== 'me' && (
                          <img 
                            src={selectedContact?.avatar} 
                            alt={selectedContact?.name} 
                            className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                          />
                        )}
                        
                        <div>
                          <div 
                            className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                              message.senderId === 'me' 
                                ? 'bg-[#007aff] dark:bg-[#0a84ff] text-white' 
                                : 'bg-[#e5e5ea] dark:bg-[#3d3d3d] text-black dark:text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          
                          <div className={`text-xs mt-1 text-[#8e8e93] dark:text-[#98989d] ${
                            message.senderId === 'me' ? 'text-right' : 'text-left'
                          }`}>
                            {message.timestamp}
                            {message.senderId === 'me' && (
                              <span className="ml-1">
                                {message.isRead ? 'Read' : message.isDelivered ? 'Delivered' : 'Sent'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message input */}
                <div className="p-3 bg-[#f5f5f7] dark:bg-[#2c2c2c] border-t border-[#d1d1d6] dark:border-[#3d3d3d]">
                  <div className="flex items-end bg-white dark:bg-[#3d3d3d] rounded-2xl p-1 pl-3">
                    <input
                      type="text"
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
                      placeholder="Message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    
                    <div className="flex items-center">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#8e8e93] dark:text-[#98989d] hover:text-[#007aff] dark:hover:text-[#0a84ff]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </button>
                      
                      <button 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        onClick={handleSendMessage}
                      >
                        <div className="w-7 h-7 rounded-full bg-[#007aff] dark:bg-[#0a84ff] text-white flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 12h20M12 2v20" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Details pane */}
              {showDetails && (
                <div className="w-1/3 bg-[#f5f5f7] dark:bg-[#252525] border-l border-[#d1d1d6] dark:border-[#3d3d3d] flex flex-col overflow-hidden">
                  <div className="py-6 flex flex-col items-center">
                    <img 
                      src={selectedContact?.avatar} 
                      alt={selectedContact?.name} 
                      className="w-24 h-24 rounded-full object-cover mb-3"
                    />
                    <h3 className="text-base font-semibold">{selectedContact?.name}</h3>
                    <p className="text-sm text-[#8e8e93] dark:text-[#98989d] mt-1">
                      {selectedContact?.status === 'online' ? 'Active Now' : 
                       selectedContact?.status === 'away' ? 'Away' : 'Offline'}
                    </p>
                    
                    <div className="flex mt-4 space-x-6">
                      <button className="flex flex-col items-center text-[#007aff] dark:text-[#0a84ff]">
                        <div className="w-10 h-10 rounded-full bg-[#e5e5ea] dark:bg-[#3d3d3d] flex items-center justify-center mb-1">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                            <path d="M12 12m-3 0a3 3 0 106 0a3 3 0 10-6 0" />
                            <path d="M16.5 7.5L16.5 7.511" />
                          </svg>
                        </div>
                        <span className="text-xs">FaceTime</span>
                      </button>
                      
                      <button className="flex flex-col items-center text-[#007aff] dark:text-[#0a84ff]">
                        <div className="w-10 h-10 rounded-full bg-[#e5e5ea] dark:bg-[#3d3d3d] flex items-center justify-center mb-1">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V5C23 3.89543 22.1046 3 21 3Z" />
                            <path d="M9.5 11C10.3284 11 11 10.3284 11 9.5C11 8.67157 10.3284 8 9.5 8C8.67157 8 8 8.67157 8 9.5C8 10.3284 8.67157 11 9.5 11Z" />
                            <path d="M5.5 17H14.5L18 14L14 10L8 16L6 14" />
                          </svg>
                        </div>
                        <span className="text-xs">Photos</span>
                      </button>
                      
                      <button className="flex flex-col items-center text-[#007aff] dark:text-[#0a84ff]">
                        <div className="w-10 h-10 rounded-full bg-[#e5e5ea] dark:bg-[#3d3d3d] flex items-center justify-center mb-1">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" />
                          </svg>
                        </div>
                        <span className="text-xs">Mail</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {/* General info */}
                    <div className="border-t border-[#d1d1d6] dark:border-[#3d3d3d] py-3">
                      <h4 className="text-xs font-semibold text-[#8e8e93] dark:text-[#98989d] uppercase mb-2">Info</h4>
                      
                      <button className="flex items-center justify-between w-full py-2">
                        <span className="text-sm">Do Not Disturb</span>
                        <div className={`w-10 h-6 rounded-full flex items-center ${selectedContact?.isMuted ? 'bg-[#34c759] justify-end' : 'bg-[#e5e5ea] dark:bg-[#3d3d3d] justify-start'}`}>
                          <div className="w-5 h-5 rounded-full bg-white shadow m-0.5"></div>
                        </div>
                      </button>
                      
                      <button className="flex items-center justify-between w-full py-2">
                        <span className="text-sm">Block this Contact</span>
                        <svg className="w-5 h-5 text-[#8e8e93] dark:text-[#98989d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Shared content */}
                    <div className="border-t border-[#d1d1d6] dark:border-[#3d3d3d] py-3">
                      <h4 className="text-xs font-semibold text-[#8e8e93] dark:text-[#98989d] uppercase mb-2">Shared Content</h4>
                      
                      <button className="flex items-center justify-between w-full py-2">
                        <span className="text-sm">Photos</span>
                        <div className="flex items-center">
                          <span className="text-sm text-[#8e8e93] dark:text-[#98989d] mr-2">8 Photos</span>
                          <svg className="w-5 h-5 text-[#8e8e93] dark:text-[#98989d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </button>
                      
                      <button className="flex items-center justify-between w-full py-2">
                        <span className="text-sm">Links</span>
                        <div className="flex items-center">
                          <span className="text-sm text-[#8e8e93] dark:text-[#98989d] mr-2">12 Links</span>
                          <svg className="w-5 h-5 text-[#8e8e93] dark:text-[#98989d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </button>
                      
                      <button className="flex items-center justify-between w-full py-2">
                        <span className="text-sm">Locations</span>
                        <div className="flex items-center">
                          <span className="text-sm text-[#8e8e93] dark:text-[#98989d] mr-2">3 Locations</span>
                          <svg className="w-5 h-5 text-[#8e8e93] dark:text-[#98989d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#ffffff] dark:bg-[#1e1e1e]">
            <div className="text-center">
              <svg className="w-16 h-16 text-[#d1d1d6] dark:text-[#4d4d4d] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M4.5 19.5l2-2C7.97 16.54 9.14 16 10.36 16h3.28c1.22 0 2.39.54 3.86 1.5l2 2" />
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
              </svg>
              <p className="text-lg font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">No Conversation Selected</p>
              <p className="text-sm text-[#8e8e93] dark:text-[#98989d] mt-1">Choose a conversation from the list</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesApp; 