
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Tag } from 'lucide-react';
import { fetchEmails, Email } from '@/data/emails'; // Import fetchEmails and Email interface
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

// Removed local Email interface, using the imported one from ../data/emails

interface EmailListProps {
  view: string;
  onEmailClick: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ view, onEmailClick }) => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEmails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedEmails = await fetchEmails();
        setEmails(fetchedEmails);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch emails'));
        console.error('Error fetching emails in EmailList:', err); // Log the actual error
      } finally {
        setIsLoading(false);
      }
    };

    loadEmails();
  }, []); // Fetch emails only on component mount

  // Filter emails based on the current view and emails state
  const getFilteredEmails = () => {
    let filtered = [...emails]; // Use the emails state
    
    if (view === 'inbox') {
      return filtered;
    } else if (view.startsWith('label-')) {
      const labelName = view.replace('label-', '');
      return filtered.filter(email => email.labels.includes(labelName));
    }
    // Add other potential views if necessary
    // e.g., starred, unread - this filtering is client-side
    // else if (view === 'starred') {
    //   return filtered.filter(email => email.isStarred);
    // }
    return filtered;
  };

  const toggleStar = (e: React.MouseEvent, emailId: string) => {
    e.stopPropagation();
    // This is a UI-only toast. Actual starring would require updating state and possibly a backend call.
    toast({
      title: "Starred",
      description: "Email star status toggled (UI only)",
      duration: 2000,
    });
    // Example of how to toggle star state locally:
    // setEmails(currentEmails =>
    //   currentEmails.map(email =>
    //     email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    //   )
    // );
  };

  const filteredEmails = getFilteredEmails();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p className="text-lg">Loading emails...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <p className="text-lg">Error loading emails.</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (filteredEmails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p className="text-lg">No emails to display</p>
        <p className="text-sm">{view === 'inbox' && emails.length > 0 ? 'No emails match your current filter.' : 'This folder is empty.'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow">
      <div className="border-b border-gray-200 px-4 py-3 flex items-center gap-3 bg-gmail-lightgray">
        <Checkbox id="select-all" />
        <span className="text-sm font-medium">Select All</span>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {filteredEmails.map((email) => (
          <li 
            key={email.id} 
            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3 ${!email.isRead ? 'font-semibold bg-blue-50' : ''}`}
            onClick={() => onEmailClick(email)}
          >
            <div className="pt-1">
              <Checkbox checked={false} />
            </div>
            
            <div 
              className="pt-1 text-yellow-500 cursor-pointer"
              onClick={(e) => toggleStar(e, email.id)}
            >
              <Star 
                size={18} 
                fill={email.isStarred ? "currentColor" : "none"}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm truncate">{email.sender.name}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(email.date, { addSuffix: true })}
                </p>
              </div>
              
              <p className="text-sm truncate">{email.subject}</p>
              
              <div className="flex items-center">
                <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                
                {email.labels.length > 0 && (
                  <div className="flex ml-2 space-x-1">
                    {email.labels.map(label => {
                      let color = '#1A73E8'; // Default color
                      
                      switch(label) {
                        case 'work':
                          color = '#EA4335';
                          break;
                        case 'personal':
                          color = '#34A853';
                          break;
                        case 'finance':
                          color = '#FBBC04';
                          break;
                        case 'social':
                          color = '#1A73E8';
                          break;
                      }
                      
                      return (
                        <div 
                          key={label} 
                          className="flex items-center text-xs rounded px-1.5 text-white"
                          style={{ backgroundColor: color }}
                        >
                          <Tag size={10} className="mr-1" />
                          {label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
