
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Minimize, Maximize, SendHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ComposeEmailProps {
  onClose: () => void;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({ onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const { toast } = useToast();
  
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsMaximized(false);
  };
  
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };
  
  const handleSend = () => {
    if (!recipient) {
      toast({
        title: "Error",
        description: "Please specify at least one recipient",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Email Sent!",
      description: "Your message has been sent successfully",
      duration: 3000,
    });
    
    onClose();
  };
  
  const handleSaveAsDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your draft has been saved",
      duration: 3000,
    });
    onClose();
  };
  
  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-5 z-50 shadow-lg w-80 bg-white rounded-t-md">
        <div className="flex items-center justify-between bg-gmail-blue text-white p-2 rounded-t-md">
          <span className="font-medium">New Message</span>
          <div className="flex items-center space-x-2">
            <button onClick={handleMinimize}>
              <Minimize size={16} />
            </button>
            <button onClick={handleMaximize}>
              <Maximize size={16} />
            </button>
            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`fixed ${isMaximized ? 'inset-0' : 'bottom-0 right-5 w-[32rem] h-[32rem]'} z-50 flex flex-col bg-white rounded-t-md shadow-xl`}
    >
      <div className="flex items-center justify-between bg-gmail-blue text-white p-2 rounded-t-md">
        <span className="font-medium">New Message</span>
        <div className="flex items-center space-x-2">
          <button onClick={handleMinimize}>
            <Minimize size={16} />
          </button>
          <button onClick={handleMaximize}>
            <Maximize size={16} />
          </button>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-auto">
        <div>
          <Label htmlFor="to">To</Label>
          <Input 
            id="to" 
            type="text" 
            placeholder="Recipients" 
            className="mt-1"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input 
            id="subject" 
            type="text" 
            placeholder="Subject" 
            className="mt-1"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        
        <div className="flex-1">
          <Textarea 
            className="h-full resize-none"
            placeholder="Compose your email here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4 border-t flex justify-between">
        <Button 
          className="bg-gmail-blue hover:bg-blue-700"
          onClick={handleSend}
        >
          <SendHorizontal size={16} className="mr-2" />
          Send
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleSaveAsDraft}
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default ComposeEmail;
