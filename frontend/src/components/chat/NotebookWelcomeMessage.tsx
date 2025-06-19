import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, MessageCircle } from 'lucide-react';
import { Notebook, Source } from '../../types';

interface NotebookWelcomeMessageProps {
  notebook: Notebook;
  sources: Source[];
}

export const NotebookWelcomeMessage: React.FC<NotebookWelcomeMessageProps> = ({
  notebook,
  sources
}) => {
  const readySources = sources.filter(s => s.status === 'ready');
  
  const welcomeMessage = useMemo(() => {
    if (readySources.length === 0) {
      return "Upload sources to start getting AI-powered insights from your documents.";
    }
    
    const sourceTypes = [...new Set(readySources.map(s => s.type))];
    const typeDescriptions = sourceTypes.map(type => {
      switch (type) {
        case 'pdf': return 'PDFs';
        case 'url': return 'websites';
        case 'youtube': return 'videos';
        case 'audio': return 'audio files';
        case 'document': return 'documents';
        default: return 'sources';
      }
    }).join(', ');
    
    return `I can help you analyze your ${readySources.length} source${readySources.length !== 1 ? 's' : ''} (${typeDescriptions}). Ask me anything about your research!`;
  }, [readySources]);

  const suggestedQuestions = useMemo(() => {
    if (readySources.length === 0) return [];
    
    return [
      "What are the main themes across all sources?",
      "Can you summarize the key findings?",
      "What questions do these sources answer?",
      "Are there any conflicting viewpoints?"
    ];
  }, [readySources]);

  return (
    <motion.div 
      className="flex flex-col items-center text-center px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* AI avatar */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-dark rounded-full flex items-center justify-center mb-6 shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <MessageCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
          <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
        </div>
      </motion.div>

      {/* Welcome content */}
      <motion.div
        className="space-y-4 max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-text-primary">
          Welcome to {notebook.name}!
        </h2>
        
        <p className="text-text-secondary leading-relaxed">
          {welcomeMessage}
        </p>

        {/* Source count indicator */}
        {readySources.length > 0 && (
          <div className="flex items-center justify-center space-x-2 text-sm text-text-muted">
            <FileText className="w-4 h-4" />
            <span>{readySources.length} source{readySources.length !== 1 ? 's' : ''} ready</span>
          </div>
        )}
      </motion.div>

      {/* Suggested questions */}
      {suggestedQuestions.length > 0 && (
        <motion.div
          className="mt-8 w-full max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-sm font-medium text-text-secondary mb-3">
            Try asking:
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={index}
                className="w-full text-left p-3 bg-background-surface rounded-lg border border-gray-700 text-sm text-text-secondary hover:text-text-primary hover:border-primary-blue/50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                onClick={() => {
                  // TODO: Send this question to the chat
                  console.log('Suggested question clicked:', question);
                }}
              >
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty state for no sources */}
      {readySources.length === 0 && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            className="btn-primary"
            onClick={() => {
              // TODO: Navigate to sources tab
              console.log('Add sources clicked');
            }}
          >
            Add Your First Source
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};