'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Headset, User } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToAgent, checkAgentReplies } from '../services/aiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastOffset, setLastOffset] = useState(0);
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingInterval = useRef<any>(null);

  // Helper to generate a unique ID for the session
  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Load chat history and User ID from local storage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('hackoria_chat_messages');
    const savedOffset = localStorage.getItem('hackoria_chat_offset');
    let savedUserId = localStorage.getItem('hackoria_user_id');
    
    if (!savedUserId) {
      savedUserId = generateId();
      localStorage.setItem('hackoria_user_id', savedUserId);
    }
    setUserId(savedUserId);

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        { 
          role: 'assistant', 
          content: 'Hello! You are connected with a live HACKORIA agent. How can we help you securely today?',
          timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })
        }
      ]);
    }

    if (savedOffset) {
      setLastOffset(parseInt(savedOffset));
    }
  }, []);

  // Save to local storage whenever messages change
  useEffect(() => {
    localStorage.setItem('hackoria_chat_messages', JSON.stringify(messages));
    localStorage.setItem('hackoria_chat_offset', lastOffset.toString());
    scrollToBottom();
  }, [messages, lastOffset]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Polling for new messages from Telegram
  useEffect(() => {
    if (pollingInterval.current) clearInterval(pollingInterval.current);

    // Only start polling if we have a UserId
    if (!userId) return;

    pollingInterval.current = setInterval(async () => {
      // Poll with the specific UserId
      const result = await checkAgentReplies(lastOffset, userId);
      
      if (result.messages.length > 0) {
        const newMessages: Message[] = result.messages.map(msg => ({
          role: 'assistant',
          content: msg.text,
          // Format the Server ISO timestamp to the User's Local Browser Time
          timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })
        }));
        
        setMessages(prev => [...prev, ...newMessages]);
      }
      
      // Always update offset to avoid stuck loops, even if message wasn't for this user
      if (result.nextOffset > lastOffset) {
        setLastOffset(result.nextOffset);
      }
    }, 3000); // Check every 3 seconds

    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    };
  }, [lastOffset, userId]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading || !userId) return;

    // Use User's Local Time for their own message
    const currentTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
    
    const userMessage: Message = { 
      role: 'user', 
      content: inputValue.trim(),
      timestamp: currentTime
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send message with the unique UserId
      const success = await sendMessageToAgent(userMessage.content, userId);
      if (!success) {
        console.error("Failed to send to Telegram");
      }
    } catch (error) {
      console.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-96 h-[500px] bg-brand-dark/95 backdrop-blur-md border border-brand-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-dark to-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/50 relative">
                <Headset size={20} className="text-brand-primary" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-brand-dark rounded-full"></span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Live Support</h3>
                <p className="text-xs text-brand-primary">Agent Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-black rounded-tr-none shadow-[0_0_10px_rgba(0,255,157,0.2)]' 
                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
                {msg.timestamp && (
                  <span className={`text-[10px] text-gray-500 mt-1 px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                )}
              </div>
            ))}
            
            {/* Loading / Sending Indicator */}
            {isLoading && (
               <div className="flex justify-end">
                <span className="text-[10px] text-gray-500 mr-2">Sending...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-gray-600"
              />
              <button 
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-brand-primary hover:bg-white text-black px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105 active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="text-[10px] text-center text-gray-600 mt-2">
              Replies are sent directly to the agent's secure device.
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isOpen ? 'bg-gray-800 text-white' : 'bg-brand-primary text-black neon-glow animate-pulse-scale'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} fill="currentColor" />}
      </button>
    </div>
  );
};

export default ChatWidget;