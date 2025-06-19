import React from 'react';
import { MoreVertical, Settings } from 'lucide-react';
import { Notebook } from '../../types';
import { motion } from 'framer-motion';

interface NotebookHeaderProps {
  notebook: Notebook;
  sourceCount: number;
}

export const NotebookHeader: React.FC<NotebookHeaderProps> = ({ 
  notebook, 
  sourceCount 
}) => {
  return (
    <motion.header 
      className="bg-background-primary border-b border-gray-700 px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Notebook info */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-text-primary truncate">
            {notebook.name}
          </h1>
          <p className="text-sm text-text-secondary">
            Ask {sourceCount} source{sourceCount !== 1 ? 's' : ''}...
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-full hover:bg-background-surface transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-text-secondary" />
          </button>
          
          <button
            className="p-2 rounded-full hover:bg-background-surface transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Notebook description (if present) */}
      {notebook.description && (
        <motion.p 
          className="text-xs text-text-muted mt-2 truncate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {notebook.description}
        </motion.p>
      )}
    </motion.header>
  );
};