
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Star,
  Reply,
  Forward,
  Tag,
  FileX,
  Mail
} from 'lucide-react';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

interface Email {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  preview: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  date: Date;
}

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onBack }) => {
  const { toast } = useToast();

  const handleReply = () => {
    toast({
      title: "Reply",
      description: "Replying to this email",
      duration: 2000,
    });
  };

  const handleForward = () => {
    toast({
      title: "Forward",
      description: "Forwarding this email",
      duration: 2000,
    });
  };

  const applyLabel = (label: string) => {
    toast({
      title: "Label Applied",
      description: `Email labeled as ${label}`,
      duration: 2000,
    });
  };

  return (
    <div className="bg-white rounded-md shadow p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-xl font-semibold flex-1">{email.subject}</h2>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReply} className="text-gmail-gray">
            <Reply size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleForward} className="text-gmail-gray">
            <Forward size={18} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gmail-gray">
                <Tag size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => applyLabel('work')}>
                <div className="w-3 h-3 rounded-full bg-gmail-red mr-2"></div>
                Work
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyLabel('personal')}>
                <div className="w-3 h-3 rounded-full bg-gmail-green mr-2"></div>
                Personal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyLabel('finance')}>
                <div className="w-3 h-3 rounded-full bg-gmail-yellow mr-2"></div>
                Finance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyLabel('social')}>
                <div className="w-3 h-3 rounded-full bg-gmail-blue mr-2"></div>
                Social
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" className="text-gmail-gray">
            <FileX size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex items-start mb-6">
        <Avatar className="mr-4">
          <div className="bg-gmail-blue text-white w-full h-full flex items-center justify-center font-medium">
            {email.sender.name.charAt(0).toUpperCase()}
          </div>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{email.sender.name}</h3>
              <p className="text-sm text-gray-500">{'<' + email.sender.email + '>'}</p>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              {format(email.date, 'MMM d, yyyy h:mm a')}
              <Button variant="ghost" size="sm" className="ml-2 text-yellow-500 h-auto p-1">
                <Star size={18} fill={email.isStarred ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>
          
          <div className="mt-1 text-sm text-gray-500">
            to me
          </div>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: email.body || email.preview }} />
      </div>
      
      <div className="mt-8 pt-4 border-t">
        <Button className="bg-gmail-blue hover:bg-blue-700" onClick={handleReply}>
          <Reply size={16} className="mr-2" />
          Reply
        </Button>
        <Button variant="outline" className="ml-2" onClick={handleForward}>
          <Forward size={16} className="mr-2" />
          Forward
        </Button>
      </div>
    </div>
  );
};

export default EmailDetail;
