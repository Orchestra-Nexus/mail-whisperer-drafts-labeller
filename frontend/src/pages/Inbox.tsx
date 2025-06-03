import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EmailSidebar from '@/components/EmailSidebar';
import EmailList from '@/components/EmailList';
import EmailDetail from '@/components/EmailDetail';
import ComposeEmail from '@/components/ComposeEmail';
import ChatWindow from '@/components/ChatWindow';
import { fetchEmails, Email } from '@/data/emails';

const InboxPage = () => {
  const [activeView, setActiveView] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Load emails after login (on mount)
  useEffect(() => {
    const loadEmails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedEmails = await fetchEmails();
        setEmails(fetchedEmails);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch emails'));
      } finally {
        setIsLoading(false);
      }
    };
    loadEmails();
  }, []);

  const handleEmailClick = (email: any) => {
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleToggleChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const renderMainContent = () => {
    if (selectedEmail) {
      return <EmailDetail email={selectedEmail} onBack={handleBackToList} />;
    }
    if (activeView === 'compose') {
      setIsComposing(true);
      return <EmailList view={activeView} onEmailClick={handleEmailClick} emails={emails} isLoading={isLoading} error={error} />;
    }
    return <EmailList view={activeView} onEmailClick={handleEmailClick} emails={emails} isLoading={isLoading} error={error} />;
  };

  // Effect to show compose modal when activeView is 'compose'
  React.useEffect(() => {
    if (activeView === 'compose') {
      setIsComposing(true);
      setActiveView('inbox');
    }
  }, [activeView]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gmail-lightgray">
        <EmailSidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          onToggleChat={handleToggleChat}
        />
        <main className="flex-1 p-4">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-2xl font-bold text-gmail-gray">Gmail Agent</h1>
            </div>
          </header>
          {renderMainContent()}
          {isComposing && (
            <ComposeEmail onClose={() => setIsComposing(false)} />
          )}
        </main>
        <ChatWindow 
          isMinimized={isChatMinimized} 
          onMinimize={handleToggleChat} 
        />
      </div>
    </SidebarProvider>
  );
};

export default InboxPage;
