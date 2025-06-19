import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Globe, 
  Play, 
  Music, 
  Type,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Source } from '../../types';
import { SOURCE_TYPES } from '@utils/constants';

interface SourceCardProps {
  source: Source;
  onRemove: () => void;
}

const getSourceIcon = (type: Source['type']) => {
  switch (type) {
    case 'pdf':
    case 'document':
      return FileText;
    case 'url':
      return Globe;
    case 'youtube':
      return Play;
    case 'audio':
      return Music;
    case 'text':
      return Type;
    default:
      return FileText;
  }
};

const getStatusIcon = (status: Source['status']) => {
  switch (status) {
    case 'ready':
      return CheckCircle;
    case 'processing':
      return Clock;
    case 'error':
      return AlertCircle;
    default:
      return Clock;
  }
};

const getStatusColor = (status: Source['status']) => {
  switch (status) {
    case 'ready':
      return 'text-green-400';
    case 'processing':
      return 'text-yellow-400';
    case 'error':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return '';
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const formatWordCount = (count?: number) => {
  if (!count) return '';
  
  if (count < 1000) return `${count} words`;
  return `${(count / 1000).toFixed(1)}k words`;
};

export const SourceCard: React.FC<SourceCardProps> = ({ source, onRemove }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const IconComponent = getSourceIcon(source.type);
  const StatusIcon = getStatusIcon(source.status);
  const sourceTypeConfig = SOURCE_TYPES[source.type];

  const handleView = () => {
    // TODO: Open source viewer
    console.log('View source:', source.id);
  };

  const handleDownload = () => {
    // TODO: Download source
    console.log('Download source:', source.id);
  };

  return (
    <motion.div
      className="card hover:border-gray-600 transition-all duration-200"
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex items-start space-x-3">
        {/* Source icon */}
        <div 
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${sourceTypeConfig?.color}20` }}
        >
          <IconComponent 
            className="w-5 h-5" 
            style={{ color: sourceTypeConfig?.color }}
          />
        </div>

        {/* Source info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary truncate">
                {source.title}
              </h3>
              
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-text-secondary capitalize">
                  {sourceTypeConfig?.label || source.type}
                </span>
                
                {/* Status indicator */}
                <div className={`flex items-center space-x-1 ${getStatusColor(source.status)}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="text-xs capitalize">{source.status}</span>
                </div>
              </div>

              {/* File details */}
              <div className="flex items-center space-x-3 mt-2 text-xs text-text-muted">
                {source.size && (
                  <span>{formatFileSize(source.size)}</span>
                )}
                {source.word_count && (
                  <span>{formatWordCount(source.word_count)}</span>
                )}
                <span>
                  {new Date(source.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Menu button */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-background-surface rounded transition-colors"
                aria-label="Source options"
              >
                <MoreVertical className="w-4 h-4 text-text-secondary" />
              </button>

              {/* Dropdown menu */}
              {showMenu && (
                <motion.div
                  className="absolute right-0 top-8 bg-background-surface border border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <button
                    onClick={() => {
                      handleView();
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-background-primary flex items-center space-x-2 rounded-t-lg"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      handleDownload();
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-background-primary flex items-center space-x-2"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                  
                  <hr className="border-gray-600" />
                  
                  <button
                    onClick={() => {
                      onRemove();
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center space-x-2 rounded-b-lg"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Processing indicator */}
          {source.status === 'processing' && (
            <motion.div
              className="mt-3 w-full bg-gray-700 rounded-full h-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="bg-primary-blue h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}

          {/* Error message */}
          {source.status === 'error' && (
            <motion.p
              className="mt-2 text-xs text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Failed to process this source
            </motion.p>
          )}
        </div>
      </div>

      {/* Click overlay for mobile */}
      <div
        className="absolute inset-0 cursor-pointer sm:hidden"
        onClick={handleView}
      />
    </motion.div>
  );
};