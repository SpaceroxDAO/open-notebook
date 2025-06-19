import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Upload, 
  FileText, 
  Globe, 
  Play, 
  Music, 
  Type, 
  Camera,
  Link,
  Loader2
} from 'lucide-react';
import { Notebook, Source } from '../../types';

interface SourceUploaderProps {
  notebook: Notebook;
  onSourceAdded: (source: Source) => void;
  onClose: () => void;
}

const UPLOAD_OPTIONS = [
  {
    id: 'file',
    icon: FileText,
    title: 'Upload Files',
    description: 'PDFs, Word docs, PowerPoint, Excel',
    accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md'
  },
  {
    id: 'url',
    icon: Globe,
    title: 'Add Website',
    description: 'Paste any public URL',
    accept: null
  },
  {
    id: 'youtube',
    icon: Play,
    title: 'YouTube Video',
    description: 'Extract transcript from video',
    accept: null
  },
  {
    id: 'audio',
    icon: Music,
    title: 'Audio File',
    description: 'MP3, WAV, M4A recordings',
    accept: '.mp3,.wav,.m4a,.aac'
  },
  {
    id: 'text',
    icon: Type,
    title: 'Paste Text',
    description: 'Copy and paste any text content',
    accept: null
  },
  {
    id: 'camera',
    icon: Camera,
    title: 'Take Photo',
    description: 'Capture document with camera',
    accept: 'image/*'
  }
];

export const SourceUploader: React.FC<SourceUploaderProps> = ({
  notebook,
  onSourceAdded,
  onClose
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Suppress unused variable warning - notebook will be used for API calls
  void notebook;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    if (optionId === 'file' || optionId === 'audio' || optionId === 'camera') {
      // Trigger file input
      const option = UPLOAD_OPTIONS.find(opt => opt.id === optionId);
      if (option && fileInputRef.current) {
        fileInputRef.current.accept = option.accept || '';
        fileInputRef.current.click();
      }
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        await uploadFile(file);
      }
    } finally {
      setIsUploading(false);
      setSelectedOption(null);
    }
  };

  const uploadFile = async (file: File) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newSource: Source = {
      id: `source-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      type: getFileType(file),
      status: 'processing',
      created_at: new Date().toISOString(),
      size: file.size,
      metadata: {
        filename: file.name
      }
    };

    onSourceAdded(newSource);

    // Simulate processing completion
    setTimeout(() => {
      onSourceAdded({
        ...newSource,
        status: 'ready',
        word_count: Math.floor(Math.random() * 10000) + 1000
      });
    }, 3000);
  };

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;

    setIsUploading(true);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newSource: Source = {
        id: `source-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: extractTitleFromUrl(urlInput),
        type: urlInput.includes('youtube.com') || urlInput.includes('youtu.be') ? 'youtube' : 'url',
        status: 'ready',
        created_at: new Date().toISOString(),
        metadata: {
          url: urlInput
        },
        word_count: Math.floor(Math.random() * 5000) + 500
      };

      onSourceAdded(newSource);
      setUrlInput('');
    } finally {
      setIsUploading(false);
      setSelectedOption(null);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;

    setIsUploading(true);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newSource: Source = {
        id: `source-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: textInput.split('\n')[0].substring(0, 50) + '...',
        type: 'text',
        status: 'ready',
        created_at: new Date().toISOString(),
        content: textInput,
        word_count: textInput.split(/\s+/).length
      };

      onSourceAdded(newSource);
      setTextInput('');
    } finally {
      setIsUploading(false);
      setSelectedOption(null);
    }
  };

  const getFileType = (file: File): Source['type'] => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(extension || '')) {
      return extension === 'pdf' ? 'pdf' : 'document';
    }
    
    if (['mp3', 'wav', 'm4a', 'aac'].includes(extension || '')) {
      return 'audio';
    }
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return 'document'; // Will be processed with OCR
    }
    
    return 'text';
  };

  const extractTitleFromUrl = (url: string): string => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch {
      return 'Website Link';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background-primary rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-700"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!selectedOption ? (
            // Main upload options
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Add Source
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-background-surface rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {UPLOAD_OPTIONS.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className="p-4 bg-background-surface hover:bg-background-surface/80 border border-gray-700 hover:border-gray-600 rounded-xl text-left transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <option.icon className="w-8 h-8 text-primary-blue mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-medium text-text-primary text-sm mb-1">
                      {option.title}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {option.description}
                    </p>
                  </motion.button>
                ))}
              </div>

              <p className="text-xs text-text-muted text-center mt-6">
                Supports files up to 200MB • Multiple formats accepted
              </p>
            </div>
          ) : selectedOption === 'url' || selectedOption === 'youtube' ? (
            // URL input form
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  {selectedOption === 'youtube' ? 'Add YouTube Video' : 'Add Website'}
                </h2>
                <button
                  onClick={() => setSelectedOption(null)}
                  className="p-2 hover:bg-background-surface rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {selectedOption === 'youtube' ? 'YouTube URL' : 'Website URL'}
                  </label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder={selectedOption === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://example.com'}
                      className="w-full pl-10 pr-4 py-3 input-primary"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedOption(null)}
                    className="flex-1 btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleUrlSubmit}
                    disabled={!urlInput.trim() || isUploading}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? 'Adding...' : 'Add Source'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : selectedOption === 'text' ? (
            // Text input form
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Paste Text
                </h2>
                <button
                  onClick={() => setSelectedOption(null)}
                  className="p-2 hover:bg-background-surface rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Text Content
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste your text content here..."
                    className="w-full h-32 px-4 py-3 input-primary resize-none"
                    autoFocus
                  />
                  <p className="text-xs text-text-muted mt-1">
                    {textInput.split(/\s+/).filter(word => word.length > 0).length} words
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedOption(null)}
                    className="flex-1 btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleTextSubmit}
                    disabled={!textInput.trim() || isUploading}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? 'Adding...' : 'Add Text'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};