import React, { useState } from "react";

interface Card {
  id: string;
  type: "credit" | "debit" | "transit" | "other";
  name: string;
  lastFour: string;
  expiry: string;
  network: string;
  isDefault: boolean;
  icon: string;
}

export default function WalletApplePaySettings() {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [enabledForMac, setEnabledForMac] = useState(true);
  const [allowFromApps, setAllowFromApps] = useState(true);
  const [allowFromWebsites, setAllowFromWebsites] = useState(true);
  const [defaultPaymentCard, setDefaultPaymentCard] = useState<string>("card1");
  const [defaultShippingAddress, setDefaultShippingAddress] = useState<string>("address1");
  const [defaultEmail, setDefaultEmail] = useState<string>("johndoe@example.com");
  const [defaultPhone, setDefaultPhone] = useState<string>("phone1");
  
  const [cards, setCards] = useState<Card[]>([
    {
      id: "card1",
      type: "credit",
      name: "Apple Card",
      lastFour: "5678",
      expiry: "05/24",
      network: "Mastercard",
      isDefault: true,
      icon: "💳"
    },
    {
      id: "card2",
      type: "credit",
      name: "Chase Sapphire",
      lastFour: "1234",
      expiry: "09/25",
      network: "Visa",
      isDefault: false,
      icon: "💳"
    },
    {
      id: "card3",
      type: "transit",
      name: "Transit Card",
      lastFour: "3456",
      expiry: "N/A",
      network: "Transit",
      isDefault: false,
      icon: "🚇"
    }
  ]);
  
  const addresses = [
    { id: "address1", label: "Home", street: "123 Apple St", city: "Cupertino, CA 95014" },
    { id: "address2", label: "Work", street: "1 Infinite Loop", city: "Cupertino, CA 95014" }
  ];
  
  const phones = [
    { id: "phone1", label: "Mobile", number: "+1 (555) 123-4567" },
    { id: "phone2", label: "Work", number: "+1 (555) 987-6543" }
  ];
  
  const setDefaultCard = (cardId: string) => {
    setDefaultPaymentCard(cardId);
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#E0E0E0] mb-6">Wallet & Apple Pay</h1>
      
      <div className="space-y-6">
        {/* Apple Pay Status */}
        <div className="bg-[#232323] rounded-xl p-5">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 15H7.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 15H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#E0E0E0]">Apple Pay</h2>
              <p className="text-sm text-[#999] mt-1">
                {enabledForMac 
                  ? "Set up and ready to use on this Mac" 
                  : "Not set up on this Mac"}
              </p>
            </div>
            <div className="ml-auto">
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="toggle-apple-pay" 
                  className="peer sr-only" 
                  checked={enabledForMac}
                  onChange={() => setEnabledForMac(!enabledForMac)}
                />
                <label 
                  htmlFor="toggle-apple-pay" 
                  className="block w-12 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6 peer-checked:bg-[#0066FF]"
                ></label>
              </div>
            </div>
          </div>
          
          {enabledForMac && (
            <div className="mt-4 space-y-3 border-t border-[#333] pt-4">
              <label className="flex items-center justify-between">
                <span className="text-[#E0E0E0]">Allow payments on apps on this Mac</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="toggle-apps" 
                    className="peer sr-only" 
                    checked={allowFromApps}
                    onChange={() => setAllowFromApps(!allowFromApps)}
                  />
                  <label 
                    htmlFor="toggle-apps" 
                    className="block w-12 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6 peer-checked:bg-[#0066FF]"
                  ></label>
                </div>
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-[#E0E0E0]">Allow payments on websites in Safari</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="toggle-websites" 
                    className="peer sr-only" 
                    checked={allowFromWebsites}
                    onChange={() => setAllowFromWebsites(!allowFromWebsites)}
                  />
                  <label 
                    htmlFor="toggle-websites" 
                    className="block w-12 h-6 bg-[#333] rounded-full cursor-pointer before:content-[''] before:block before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6 peer-checked:bg-[#0066FF]"
                  ></label>
                </div>
              </label>
            </div>
          )}
        </div>
        
        {/* Payment Cards */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Payment Cards</h2>
          <div className="bg-[#232323] rounded-xl overflow-hidden">
            <div className="divide-y divide-[#333]">
              {cards.map(card => (
                <div key={card.id} className="p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#303030] rounded-lg flex items-center justify-center text-xl mr-4">
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-[#E0E0E0] font-medium">{card.name}</h3>
                        {card.isDefault && (
                          <span className="ml-2 text-xs bg-[#3578F6] text-white px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-[#999] mt-0.5">
                        {card.network} •••• {card.lastFour}
                        {card.expiry !== "N/A" && ` • Expires ${card.expiry}`}
                      </div>
                    </div>
                    <div>
                      {!card.isDefault && (
                        <button 
                          className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm mr-2"
                          onClick={() => setDefaultCard(card.id)}
                        >
                          Set as Default
                        </button>
                      )}
                      <button className="text-[#999] hover:text-[#E0E0E0]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-[#333]">
              {!showAddCardForm ? (
                <button 
                  className="flex items-center text-[#0066FF] hover:text-[#4D94FF]"
                  onClick={() => setShowAddCardForm(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Card
                </button>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-[#E0E0E0] font-medium">Add Payment Card</h3>
                  <p className="text-sm text-[#999]">
                    To add a card, open Wallet on your iPhone and add your card there.
                    It will automatically appear on all your devices.
                  </p>
                  <div className="flex space-x-3">
                    <button 
                      className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm"
                      onClick={() => setShowAddCardForm(false)}
                    >
                      Cancel
                    </button>
                    <button className="px-3 py-1.5 bg-[#3578F6] hover:bg-[#2E6AD6] text-white rounded-md text-sm">
                      Open Wallet on iPhone
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Shipping */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Shipping</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Default Shipping Address</h3>
              <select 
                value={defaultShippingAddress}
                onChange={(e) => setDefaultShippingAddress(e.target.value)}
                className="w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]"
              >
                {addresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {address.label}: {address.street}, {address.city}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Default Email</h3>
              <select 
                value={defaultEmail}
                onChange={(e) => setDefaultEmail(e.target.value)}
                className="w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]"
              >
                <option value="johndoe@example.com">johndoe@example.com</option>
                <option value="john.work@example.com">john.work@example.com</option>
              </select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Default Phone Number</h3>
              <select 
                value={defaultPhone}
                onChange={(e) => setDefaultPhone(e.target.value)}
                className="w-full bg-[#1D1D1D] text-[#E0E0E0] rounded-md px-3 py-2 border border-[#333] focus:outline-none focus:border-[#0066FF]"
              >
                {phones.map(phone => (
                  <option key={phone.id} value={phone.id}>
                    {phone.label}: {phone.number}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div>
          <h2 className="text-xs text-[#999] font-medium mb-3 uppercase tracking-wide">Transaction History</h2>
          <div className="bg-[#232323] rounded-xl p-5">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-[#303030] rounded-full flex items-center justify-center mb-4 text-[#999]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">No Recent Transactions</h3>
              <p className="text-sm text-[#999] text-center max-w-md">
                Your recent Apple Pay transactions will appear here.
                Transaction history is stored only on the device where each purchase was made.
              </p>
            </div>
          </div>
        </div>
        
        {/* Privacy */}
        <div className="bg-[#232323] rounded-xl p-5">
          <h2 className="text-lg font-medium text-[#E0E0E0] mb-4">Privacy</h2>
          <p className="text-sm text-[#999] mb-4">
            Apple doesn't keep transaction information that can be tied back to you. Your card 
            number is never stored on your device or on Apple servers, and when you pay, your 
            card number is never shared with merchants.
          </p>
          <button className="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-[#E0E0E0] rounded-md text-sm">
            Learn More About Apple Pay & Privacy...
          </button>
        </div>
      </div>
    </div>
  );
} 