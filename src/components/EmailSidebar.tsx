
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Inbox, 
  Send, 
  FileX, 
  Tag, 
  Edit, 
  FilePlus,
  FileX as Trash
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const EmailSidebar = ({
  activeView,
  setActiveView
}: {
  activeView: string;
  setActiveView: (view: string) => void;
}) => {
  // Main menu items
  const mainItems = [
    {
      title: "Inbox",
      id: "inbox",
      icon: Inbox,
      count: 12,
    },
    {
      title: "Sent",
      id: "sent",
      icon: Send,
    },
    {
      title: "Drafts",
      id: "drafts",
      icon: Edit,
      count: 2,
    },
    {
      title: "Trash",
      id: "trash",
      icon: Trash,
    },
  ];

  // Label items
  const labelItems = [
    {
      title: "Work",
      id: "label-work",
      color: "#EA4335", // Red
    },
    {
      title: "Personal",
      id: "label-personal",
      color: "#34A853", // Green
    },
    {
      title: "Finance",
      id: "label-finance",
      color: "#FBBC04", // Yellow
    },
    {
      title: "Social",
      id: "label-social",
      color: "#1A73E8", // Blue
    },
  ];

  const handleMenuClick = (id: string) => {
    setActiveView(id);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-3 py-4">
          <Button 
            className="w-full bg-gmail-blue hover:bg-blue-700 flex items-center gap-2 mb-4"
            onClick={() => setActiveView("compose")}  
          >
            <FilePlus size={16} />
            <span>Compose</span>
          </Button>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    className={`w-full flex justify-between ${activeView === item.id ? 'bg-blue-50 text-gmail-blue font-medium' : ''}`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </div>
                    {item.count && (
                      <span className="text-xs bg-gmail-blue text-white rounded-full px-2 py-0.5">
                        {item.count}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 px-3 py-2">
            <Tag size={16} />
            <span>Labels</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {labelItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    className={`w-full flex items-center gap-3 ${activeView === item.id ? 'bg-blue-50 text-gmail-blue font-medium' : ''}`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default EmailSidebar;
