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
      text: "Hello! I'm your Gmail assistant. How can I help you manage your emails today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connecting, setConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Open WebSocket connection on mount
  useEffect(() => {
    if (isMinimized) return;
    setConnecting(true);
    const socket = new WebSocket('ws://localhost:8001/ws/agent');
    setWs(socket);

    socket.onopen = () => {
      setConnecting(false);
    };
    socket.onmessage = (event) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: event.data,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev: any) => [...prev, aiMessage]);
      toast({ title: 'New message', description: 'Your assistant has replied' });
    };
    socket.onerror = () => {
      toast({ title: 'Connection error', description: 'Could not connect to assistant.' });
    };
    socket.onclose = () => {
      setWs(null);
      setConnecting(false);
    };
    return () => {
      socket.close();
    };
  }, [isMinimized]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev: any) => [...prev, userMessage]);
    ws.send(inputValue);
    setInputValue('');
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
        {messages.map((message: { id: any; sender: string; text: any; timestamp: { toLocaleTimeString: (arg0: any[], arg1: { hour: string; minute: string; }) => any; }; }) => (
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
            placeholder={connecting ? 'Connecting...' : 'Type a message...'}
            value={inputValue}
            onChange={(e: { target: { value: any; }; }) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 mr-2"
            disabled={connecting || !ws || ws.readyState !== WebSocket.OPEN}
          />
          <Button 
            size="icon" 
            className="bg-gmail-blue hover:bg-blue-700"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || connecting || !ws || ws.readyState !== WebSocket.OPEN}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
