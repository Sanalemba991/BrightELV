'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}


export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Bright ELV AI Assistant. I can help you with information about our CCTV Brackets, CCTV Poles, and CCTV Accessories. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Product-related responses
    if (message.includes('cctv bracket') || message.includes('cctv pole') || message.includes('cctv accessory')) {
      return "BrightELV provides a wide product line focused on ELV and AV solutions. Our catalogue includes CCTV brackets, poles, racks/cabinets, AV and network cables, pop-up boxes and customised solutions tailored for education, hospitality and corporate projects. Tell me which product or category you want to know about and I can share details.";
    }

    if (message.includes('power supply')) {
      return "BrightELV is a supplier of ELV, AV and networking products across the Middle East and beyond. For specific power supplies or electrical accessories, please tell me the model or application and I will get the relevant details or connect you with sales for technical specs.";
    }

    if (message.includes('cctv') || message.includes('oscilloscope') || message.includes('dso')) {
      return "BrightELV's core offerings emphasise surveillance, AV and cabling solutions (CCTV brackets, poles, racks, cabinets, AV racks and network accessories). For specialised test instruments, contact sales and they can advise on compatible products and suppliers.";
    }

    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return "Contact BrightELV:\n• Email: sales@brightelv.com\n• Phone: +971 4 665 2233\n• WhatsApp: +971 56 5022960 or +971 50 8813601\n• PO Box: 381108, Dubai, UAE\nYou can also visit their Contact page at https://brightelv.com/contact-us/";
    }

    if (message.includes('warranty') || message.includes('guarantee')) {
      return "For warranty, service and support details please contact BrightELV sales at sales@brightelv.com — they can provide product-specific warranty and after-sales information.";
    }

    if (message.includes('delivery') || message.includes('shipping')) {
      return "BrightELV operates across the Middle East and exports internationally. They provide supply and installation services — contact sales for delivery timelines, shipping options and installation support for your region.";
    }

    if (message.includes('custom') || message.includes('design')) {
      return "Yes — BrightELV specialises in customised solutions including CCTV poles, light poles, solar poles, bespoke brackets and custom fabrication. Their team designs and manufactures solutions to meet specific project requirements.";
    }

    if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
      return "Pricing is project- and product-dependent. Please email sales@brightelv.com or use the contact form to request a detailed quote; mention quantities, specifications and delivery location for an accurate response.";
    }

    // Default response
    return "Thank you for your interest in Bright ELV! I'm here to help with information about our CCTV Brackets, CCTV Poles, and CCTV Accessories. Could you please provide more details about what you're looking for?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open AI Chat Assistant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-semibold">Bright ELV AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about our products..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}