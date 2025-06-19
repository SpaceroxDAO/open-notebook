import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import { cn } from '@utils/cn';

interface VoiceInputButtonProps {
  isRecording: boolean;
  onToggle: () => void;
  className?: string;
  disabled?: boolean;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  isRecording,
  onToggle,
  className,
  disabled = false
}) => {
  return (
    <motion.button
      className={cn(
        "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200",
        isRecording
          ? "bg-red-500 text-white shadow-lg"
          : "bg-background-surface text-text-secondary hover:text-text-primary border border-gray-600 hover:border-gray-500",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onToggle}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      aria-label={isRecording ? "Stop recording" : "Start voice input"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isRecording ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isRecording ? (
          <Square className="w-5 h-5" fill="currentColor" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </motion.div>
      
      {/* Recording indicator */}
      {isRecording && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-400"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [1, 0.5, 1] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
};