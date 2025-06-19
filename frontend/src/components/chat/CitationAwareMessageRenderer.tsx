import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Citation } from '../../types';

// Citation link component
interface CitationLinkProps {
  number: number;
  citation?: Citation;
  onClick?: () => void;
}

const CitationLink: React.FC<CitationLinkProps> = ({ number, citation, onClick }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleClick = () => {
    if (citation) {
      setShowPreview(true);
    }
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <button
        className={`
          inline-flex items-center justify-center min-w-[20px] h-[20px] mx-0.5 
          text-xs font-semibold rounded-full transition-all duration-200
          ${citation 
            ? 'bg-primary-blue text-white hover:bg-primary-dark hover:scale-110' 
            : 'bg-gray-500 text-white cursor-not-allowed'
          }
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={
          citation 
            ? `Citation ${number}: ${citation.source_title}` 
            : `Citation ${number}: Source not found`
        }
        role="button"
        tabIndex={0}
        disabled={!citation}
      >
        {number}
      </button>
      
      <CitationPreview
        citation={citation}
        isVisible={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
};

// Citation preview modal
interface CitationPreviewProps {
  citation?: Citation;
  isVisible: boolean;
  onClose: () => void;
}

const CitationPreview: React.FC<CitationPreviewProps> = ({ 
  citation, 
  isVisible, 
  onClose 
}) => {
  if (!citation || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background-surface rounded-2xl p-6 max-w-sm w-full border border-gray-700"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-text-primary text-sm">
                {citation.source_title}
              </h3>
              {citation.page_number && (
                <p className="text-xs text-text-secondary">
                  Page {citation.page_number}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          <blockquote className="border-l-4 border-primary-blue pl-3 py-2 mb-4 text-sm text-text-secondary italic">
            "{citation.quote}"
          </blockquote>
          
          <div className="flex justify-between items-center text-xs text-text-muted">
            <span>Relevance: {Math.round(citation.relevance_score * 100)}%</span>
            <button
              className="text-primary-blue hover:text-primary-dark"
              onClick={() => {
                // TODO: Navigate to full source
                console.log('View source:', citation.source_id);
              }}
            >
              View source
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Text processor for citations
const CitationProcessedText: React.FC<{
  children: React.ReactNode;
  citations?: Citation[];
}> = ({ children, citations = [] }) => {
  const processedContent = useMemo(() => {
    if (typeof children !== 'string') return children;
    
    // Find citation patterns like [1], [2], etc.
    const citationPattern = /\[(\d+)\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    
    while ((match = citationPattern.exec(children)) !== null) {
      // Add text before citation
      if (match.index > lastIndex) {
        parts.push(children.slice(lastIndex, match.index));
      }
      
      // Add citation component
      const citationNumber = parseInt(match[1]);
      const citation = citations.find(c => c.number === citationNumber);
      
      parts.push(
        <CitationLink
          key={`citation-${citationNumber}-${match.index}`}
          number={citationNumber}
          citation={citation}
        />
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < children.length) {
      parts.push(children.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : children;
  }, [children, citations]);
  
  return <span className="citation-processed-text">{processedContent}</span>;
};

// Simple text renderer with citations (Assistant-UI replacement)
export const CitationAwareMessageRenderer: React.FC<{ content: string; citations?: Citation[] }> = ({ content, citations = [] }) => {
  return (
    <div className="citation-aware-message">
      <CitationProcessedText citations={citations}>
        {content}
      </CitationProcessedText>
    </div>
  );
};