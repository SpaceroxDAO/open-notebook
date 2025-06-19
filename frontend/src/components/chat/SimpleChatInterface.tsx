import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Notebook, Source, ChatMessage } from '../../types';
import { NotebookWelcomeMessage } from './NotebookWelcomeMessage';
import { VoiceInputButton } from './VoiceInputButton';

interface SimpleChatInterfaceProps {
  notebook: Notebook;
  sources: Source[];
}

export const SimpleChatInterface: React.FC<SimpleChatInterfaceProps> = ({ 
  notebook, 
  sources 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: inputValue,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        content: `Based on your ${sources.filter(s => s.status === 'ready').length} sources, here's what I found: This is a simulated AI response with citations [1] [2]. The information shows interesting patterns across your research materials.`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        citations: [
          {
            number: 1,
            source_id: sources[0]?.id || 'source-1',
            source_title: sources[0]?.title || 'First Source',
            quote: 'This is a relevant quote from the first source that supports the AI response.',
            relevance_score: 0.95,
            position: { start: 65, end: 78 }
          },
          {
            number: 2,
            source_id: sources[1]?.id || 'source-2',
            source_title: sources[1]?.title || 'Second Source',
            quote: 'Another important quote that adds context to the discussion.',
            relevance_score: 0.87,
            position: { start: 79, end: 82 }
          }
        ],
        processing_time: 1.2,
        confidence_score: 0.89
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = async () => {
    setIsVoiceRecording(true);
    // Simulate voice input
    setTimeout(() => {
      setInputValue('What are the main themes in my research?');
      setIsVoiceRecording(false);
    }, 2000);
  };

  const readySources = sources.filter(s => s.status === 'ready');
  const placeholder = `Ask ${readySources.length} source${readySources.length !== 1 ? 's' : ''}...`;

  return (
    <div className="flex flex-col h-full bg-background-primary">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <NotebookWelcomeMessage notebook={notebook} sources={sources} />
        )}
        
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${
              message.role === 'user' 
                ? 'chat-bubble-user' 
                : 'chat-bubble-assistant'
            }`}>
              <div className="whitespace-pre-wrap">
                {message.role === 'assistant' ? (
                  <CitationText content={message.content} citations={message.citations} />
                ) : (
                  message.content
                )}
              </div>
              
              {message.processing_time && (
                <div className="text-xs opacity-60 mt-2">
                  {message.processing_time}s • {Math.round((message.confidence_score || 0) * 100)}% confidence
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="chat-bubble-assistant">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm opacity-60">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <motion.div 
        className="p-4 border-t border-gray-700 bg-background-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-end space-x-2">
          <VoiceInputButton
            isRecording={isVoiceRecording}
            onToggle={handleVoiceInput}
            className="flex-shrink-0"
          />

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full input-primary pr-12 resize-none min-h-[44px] max-h-32"
              rows={1}
              style={{
                height: 'auto',
                minHeight: '44px'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
              }}
            />
            
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Simple citation text component
const CitationText: React.FC<{ content: string; citations?: any[] }> = ({ content, citations = [] }) => {
  // Replace [1], [2] etc with clickable citations
  const parts = content.split(/(\[\d+\])/);
  
  return (
    <span>
      {parts.map((part, index) => {
        const match = part.match(/\[(\d+)\]/);
        if (match) {
          const citationNumber = parseInt(match[1]);
          const citation = citations.find(c => c.number === citationNumber);
          
          return (
            <button
              key={index}
              className="inline-flex items-center justify-center min-w-[20px] h-[20px] mx-0.5 text-xs font-semibold rounded-full bg-primary-blue text-white hover:bg-primary-dark hover:scale-110 transition-all duration-200"
              onClick={() => {
                if (citation) {
                  alert(`Citation ${citationNumber}: ${citation.quote}`);
                }
              }}
              title={citation ? citation.quote : `Citation ${citationNumber}`}
            >
              {citationNumber}
            </button>
          );
        }
        return part;
      })}
    </span>
  );
};