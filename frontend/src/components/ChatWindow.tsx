
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Minimize } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatWindowProps {
  isMinimized: boolean;
  onMinimize: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isMinimized, onMinimize }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Gmail assistant. How can I help you manage your emails today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "I can help you draft a reply to that email.",
        "Would you like me to categorize your unread emails?",
        "I can set up a filter for those promotional emails.",
        "Let me find all emails from that sender for you.",
        "I can summarize the long email thread for you.",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      toast({
        title: "New message",
        description: "Your assistant has replied",
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (isMinimized) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col border border-gray-200 z-50">
      <div className="flex items-center justify-between bg-gmail-blue text-white p-3 rounded-t-lg">
        <h3 className="font-medium">Gmail Assistant</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-white hover:bg-blue-700" 
          onClick={onMinimize}
        >
          <Minimize size={16} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 rounded-lg max-w-[80%] ${
              message.sender === 'user'
                ? 'bg-blue-100 ml-auto'
                : 'bg-gray-100 mr-auto'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <span className="text-xs text-gray-500 block mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t">
        <div className="flex items-center">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 mr-2"
          />
          <Button 
            size="icon" 
            className="bg-gmail-blue hover:bg-blue-700"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
