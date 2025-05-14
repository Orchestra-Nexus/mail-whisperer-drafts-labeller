
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EmailSidebar from '@/components/EmailSidebar';
import EmailList from '@/components/EmailList';
import EmailDetail from '@/components/EmailDetail';
import ComposeEmail from '@/components/ComposeEmail';
import ChatWindow from '@/components/ChatWindow';

const Index = () => {
  const [activeView, setActiveView] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(true);

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
      // Keep showing the inbox but also show the compose modal
      setIsComposing(true);
      return <EmailList view={activeView} onEmailClick={handleEmailClick} />;
    }

    return <EmailList view={activeView} onEmailClick={handleEmailClick} />;
  };

  // Effect to show compose modal when activeView is 'compose'
  React.useEffect(() => {
    if (activeView === 'compose') {
      setIsComposing(true);
      // Reset active view to inbox after opening compose
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

export default Index;
