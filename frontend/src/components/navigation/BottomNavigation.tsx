import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, Mic } from 'lucide-react';
import { cn } from '@utils/cn';
import { NAVIGATION_TABS } from '@utils/constants';

interface BottomNavigationProps {
  activeTab: string;
}

const getTabIcon = (tabId: string) => {
  switch (tabId) {
    case 'sources':
      return FileText;
    case 'chat':
      return MessageCircle;
    case 'studio':
      return Mic;
    default:
      return FileText;
  }
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (tabId: string) => {
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    navigate(`${basePath}/${tabId}`);
  };

  return (
    <nav className="bg-background-primary border-t border-gray-700 safe-bottom">
      <div className="flex items-center justify-around px-4 py-2">
        {NAVIGATION_TABS.map((tab) => {
          const IconComponent = getTabIcon(tab.id);
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "nav-tab relative py-2 px-4 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary-blue" 
                  : "text-text-secondary hover:text-text-primary"
              )}
              aria-label={tab.label}
              role="tab"
              aria-selected={isActive}
            >
              {/* Active tab background */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-primary-blue/10 rounded-lg"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <div className="relative flex flex-col items-center space-y-1">
                <IconComponent 
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    isActive ? "scale-110" : "scale-100"
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span 
                  className={cn(
                    "text-xs font-medium transition-all duration-200",
                    isActive ? "opacity-100" : "opacity-80"
                  )}
                >
                  {tab.label}
                </span>
              </div>

              {/* Tab indicator dot */}
              {isActive && (
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-blue rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};