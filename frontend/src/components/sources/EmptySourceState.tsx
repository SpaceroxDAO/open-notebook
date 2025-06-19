import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Globe, Play, Music, Type, Camera } from 'lucide-react';

interface EmptySourceStateProps {
  onAddSource: () => void;
}

const SUPPORTED_FORMATS = [
  { icon: FileText, label: 'PDFs', description: 'Research papers, reports' },
  { icon: Globe, label: 'Websites', description: 'Articles, blog posts' },
  { icon: Play, label: 'YouTube', description: 'Video transcripts' },
  { icon: Music, label: 'Audio', description: 'Podcasts, recordings' },
  { icon: Type, label: 'Text', description: 'Copy and paste' },
  { icon: Camera, label: 'Photos', description: 'Document photos' }
];

export const EmptySourceState: React.FC<EmptySourceStateProps> = ({ onAddSource }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <motion.div
        className="space-y-8 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Upload icon */}
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-primary-blue to-primary-dark rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Upload className="w-12 h-12 text-white" strokeWidth={1.5} />
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            Add Your First Source
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Upload documents, paste URLs, or add content to start getting AI-powered insights from your sources.
          </p>
        </motion.div>

        {/* Supported formats */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-sm font-medium text-text-secondary">
            Supported formats:
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            {SUPPORTED_FORMATS.map((format, index) => (
              <motion.div
                key={format.label}
                className="flex flex-col items-center p-3 bg-background-surface rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <format.icon className="w-6 h-6 text-primary-blue mb-2" />
                <span className="text-xs font-medium text-text-primary">
                  {format.label}
                </span>
                <span className="text-xs text-text-muted text-center">
                  {format.description}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <button
            onClick={onAddSource}
            className="btn-primary text-lg py-4 px-8 shadow-glow"
          >
            Upload Sources
          </button>
        </motion.div>

        {/* Help text */}
        <motion.p
          className="text-xs text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Files up to 200MB • Multiple formats supported
        </motion.p>
      </motion.div>
    </div>
  );
};