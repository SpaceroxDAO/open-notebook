import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Notebook, Source } from '../../types';
import { SourceCard } from './SourceCard';
import { SourceUploader } from './SourceUploader';
import { EmptySourceState } from './EmptySourceState';

interface SourceManagerProps {
  notebook: Notebook;
  onNotebookUpdate: (notebook: Notebook) => void;
}

export const SourceManager: React.FC<SourceManagerProps> = ({
  notebook,
  onNotebookUpdate
}) => {
  const [showUploader, setShowUploader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const sources = notebook.sources || [];
  
  // Filter sources based on search and filter
  const filteredSources = sources.filter(source => {
    const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || source.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSourceAdded = (newSource: Source) => {
    const updatedNotebook = {
      ...notebook,
      sources: [...sources, newSource]
    };
    onNotebookUpdate(updatedNotebook);
    setShowUploader(false);
  };

  const handleSourceRemoved = (sourceId: string) => {
    const updatedNotebook = {
      ...notebook,
      sources: sources.filter(s => s.id !== sourceId)
    };
    onNotebookUpdate(updatedNotebook);
  };

  const sourceTypes = ['all', ...new Set(sources.map(s => s.type))];

  if (sources.length === 0) {
    return (
      <div className="h-full">
        <EmptySourceState onAddSource={() => setShowUploader(true)} />
        
        {showUploader && (
          <SourceUploader
            notebook={notebook}
            onSourceAdded={handleSourceAdded}
            onClose={() => setShowUploader(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background-primary">
      {/* Header with search and filter */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Sources ({sources.length})
          </h2>
          
          <motion.button
            onClick={() => setShowUploader(true)}
            className="p-2 bg-primary-blue rounded-full text-white shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add source"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Search bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background-surface border border-gray-600 rounded-lg text-text-primary placeholder:text-text-secondary focus:border-primary-blue focus:outline-none"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {sourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedFilter(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === type
                  ? 'bg-primary-blue text-white'
                  : 'bg-background-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              {type === 'all' ? 'All' : type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sources grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredSources.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-background-surface rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No sources found
                </h3>
                <p className="text-text-secondary">
                  Try adjusting your search or filter criteria
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="btn-secondary"
              >
                Clear filters
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {filteredSources.map((source, index) => (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <SourceCard
                    source={source}
                    onRemove={() => handleSourceRemoved(source.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Source uploader modal */}
      {showUploader && (
        <SourceUploader
          notebook={notebook}
          onSourceAdded={handleSourceAdded}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  );
};