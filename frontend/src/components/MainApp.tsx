import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleChatInterface } from '@components/chat/SimpleChatInterface';
import { SourceManager } from '@components/sources/SourceManager';
import { AudioStudio } from '@components/audio/AudioStudio';
import { BottomNavigation } from '@components/navigation/BottomNavigation';
import { NotebookHeader } from '@components/layout/NotebookHeader';
import { NAVIGATION_TABS } from '@utils/constants';
import { Notebook } from '../types';

export const MainApp: React.FC = () => {
  const location = useLocation();
  const [currentNotebook, setCurrentNotebook] = useState<Notebook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get current tab from URL
  const getCurrentTab = () => {
    const path = location.pathname.split('/').pop();
    return NAVIGATION_TABS.find(tab => tab.id === path)?.id || 'chat';
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());

  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);

  useEffect(() => {
    // Load or create default notebook
    const initializeNotebook = async () => {
      try {
        // TODO: Replace with actual API call
        const mockNotebook: Notebook = {
          id: 'default-notebook',
          name: 'My Research',
          description: 'AI and Machine Learning Research',
          sources: [
            {
              id: 'source-1',
              title: 'Free to Attach: Assistant Advancement Explained',
              type: 'pdf',
              status: 'ready',
              created_at: new Date().toISOString(),
              size: 2048000,
              word_count: 15000
            },
            {
              id: 'source-2',
              title: 'AI Research Paper',
              type: 'url',
              status: 'ready',
              created_at: new Date().toISOString(),
              size: 1024000,
              word_count: 8000
            },
            {
              id: 'source-3',
              title: 'Machine Learning Tutorial',
              type: 'youtube',
              status: 'ready',
              created_at: new Date().toISOString(),
              size: 512000,
              word_count: 5000
            }
          ],
          notes: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          archived: false,
          tags: ['AI', 'Research']
        };

        setCurrentNotebook(mockNotebook);
      } catch (error) {
        console.error('Error initializing notebook:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeNotebook();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-primary">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary">Loading notebook...</p>
        </div>
      </div>
    );
  }

  if (!currentNotebook) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-primary">
        <div className="text-center">
          <p className="text-text-primary mb-4">No notebook found</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary flex flex-col safe-top safe-bottom">
      {/* Header */}
      <NotebookHeader 
        notebook={currentNotebook} 
        sourceCount={currentNotebook.sources.length}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 overflow-hidden"
          >
            <Routes>
              <Route 
                path="sources" 
                element={
                  <SourceManager 
                    notebook={currentNotebook}
                    onNotebookUpdate={setCurrentNotebook}
                  />
                } 
              />
              <Route 
                path="chat" 
                element={
                  <SimpleChatInterface 
                    notebook={currentNotebook}
                    sources={currentNotebook.sources}
                  />
                } 
              />
              <Route 
                path="studio" 
                element={
                  <AudioStudio 
                    notebook={currentNotebook}
                  />
                } 
              />
              <Route 
                path="/" 
                element={<Navigate to="chat" replace />} 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation activeTab={activeTab} />
    </div>
  );
};