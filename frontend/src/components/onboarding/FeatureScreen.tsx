import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  MessageSquare, 
  Headphones,
  Globe,
  FileText,
  Play,
  Mic
} from 'lucide-react';
import { OnboardingStep } from '../../types';

interface FeatureScreenProps {
  step: OnboardingStep;
  onNext: () => void;
  onPrevious: () => void;
  isLast: boolean;
}

const getFeatureIcon = (stepId: number) => {
  switch (stepId) {
    case 1:
      return Upload;
    case 2:
      return MessageSquare;
    case 3:
      return Headphones;
    default:
      return FileText;
  }
};

const getFeatureVisual = (stepId: number) => {
  switch (stepId) {
    case 1:
      return <SourceUploadVisual />;
    case 2:
      return <ChatVisual />;
    case 3:
      return <AudioVisual />;
    default:
      return null;
  }
};

export const FeatureScreen: React.FC<FeatureScreenProps> = ({ 
  step, 
  onNext, 
  onPrevious, 
  isLast 
}) => {
  const IconComponent = getFeatureIcon(step.id);

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
      {/* Feature icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-primary-blue/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </div>
      </motion.div>

      {/* Visual demonstration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        {getFeatureVisual(step.id)}
      </motion.div>

      {/* Feature description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-text-primary mb-3">
          {step.title}
        </h3>
        <p className="text-text-secondary leading-relaxed mb-4">
          {step.subtitle}
        </p>
        <p className="text-sm text-text-muted">
          {step.description}
        </p>
      </motion.div>

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full max-w-sm space-y-4"
      >
        <button
          onClick={onNext}
          className="w-full btn-primary text-lg py-4"
        >
          {isLast ? 'Get Started' : 'Continue'}
        </button>
        
        <button
          onClick={onPrevious}
          className="w-full btn-secondary text-lg py-4"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
};

// Visual components for each feature
const SourceUploadVisual: React.FC = () => (
  <div className="w-64 h-40 bg-background-surface rounded-xl p-4 border border-gray-700">
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
        <FileText className="w-4 h-4 text-red-500" />
      </div>
      <span className="text-sm text-text-primary">research_paper.pdf</span>
    </div>
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
        <Globe className="w-4 h-4 text-blue-500" />
      </div>
      <span className="text-sm text-text-primary">wikipedia.org</span>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
        <Play className="w-4 h-4 text-red-600" />
      </div>
      <span className="text-sm text-text-primary">Tutorial Video</span>
    </div>
  </div>
);

const ChatVisual: React.FC = () => (
  <div className="w-64 h-40 bg-background-surface rounded-xl p-4 border border-gray-700 space-y-3">
    <div className="flex justify-end">
      <div className="chat-bubble-user text-sm">
        What are the main findings?
      </div>
    </div>
    <div className="flex justify-start">
      <div className="bg-background-secondary text-text-primary rounded-chat rounded-bl-sm max-w-[80%] px-3 py-2 text-sm">
        The study found three key results
        <span className="inline-flex items-center justify-center w-4 h-4 bg-primary-blue text-white text-xs rounded-full ml-1">1</span>
        <span className="inline-flex items-center justify-center w-4 h-4 bg-primary-blue text-white text-xs rounded-full ml-1">2</span>
      </div>
    </div>
  </div>
);

const AudioVisual: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="w-32 h-32 bg-gradient-to-br from-primary-chat to-primary-dark rounded-full flex items-center justify-center mb-4 relative">
      {/* Circular waveform visualization */}
      <div className="absolute inset-4 rounded-full border-2 border-white/20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-white/60 rounded-full"
            style={{
              height: `${Math.random() * 20 + 10}px`,
              left: '50%',
              top: '50%',
              transformOrigin: '50% 50%',
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${24 + Math.random() * 8}px)`,
            }}
          />
        ))}
      </div>
      <Mic className="w-8 h-8 text-white relative z-10" />
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-text-primary">AI Discussion</p>
      <p className="text-xs text-text-secondary">8:45 duration</p>
    </div>
  </div>
);