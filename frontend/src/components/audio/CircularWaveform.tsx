import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { WAVEFORM } from '@utils/constants';

interface CircularWaveformProps {
  waveformData: number[];
  isPlaying: boolean;
  progress: number; // 0-100
  onPlayPause: () => void;
  size?: number;
}

export const CircularWaveform: React.FC<CircularWaveformProps> = ({
  waveformData,
  isPlaying,
  progress,
  onPlayPause,
  size = 200
}) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = WAVEFORM.RADIUS;
  
  // Generate waveform bars positioned in a circle
  const waveformBars = useMemo(() => {
    const bars = [];
    const barCount = Math.min(waveformData.length, WAVEFORM.BARS);
    const angleStep = (2 * Math.PI) / barCount;
    
    for (let i = 0; i < barCount; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const amplitude = waveformData[i] || 0;
      const barHeight = WAVEFORM.MIN_HEIGHT + (amplitude * WAVEFORM.MAX_HEIGHT);
      
      // Calculate bar position
      const innerRadius = radius - barHeight / 2;
      const outerRadius = radius + barHeight / 2;
      
      const x1 = centerX + Math.cos(angle) * innerRadius;
      const y1 = centerY + Math.sin(angle) * innerRadius;
      const x2 = centerX + Math.cos(angle) * outerRadius;
      const y2 = centerY + Math.sin(angle) * outerRadius;
      
      // Determine if this bar should be "active" based on progress
      const barProgress = (i / barCount) * 100;
      const isActive = barProgress <= progress;
      
      bars.push({
        id: i,
        x1,
        y1,
        x2,
        y2,
        amplitude,
        isActive,
        angle
      });
    }
    
    return bars;
  }, [waveformData, progress, size]);

  return (
    <div className="relative">
      {/* Circular background */}
      <motion.div
        className="circular-waveform"
        style={{ width: size, height: size }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* SVG waveform */}
        <svg
          width={size}
          height={size}
          className="absolute inset-0"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          
          {/* Waveform bars */}
          {waveformBars.map((bar) => (
            <motion.line
              key={bar.id}
              x1={bar.x1}
              y1={bar.y1}
              x2={bar.x2}
              y2={bar.y2}
              stroke={bar.isActive ? "#4285f4" : "rgba(255, 255, 255, 0.3)"}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                strokeWidth: isPlaying && bar.isActive ? [2, 3, 2] : 2
              }}
              transition={{ 
                opacity: { duration: 0.3, delay: bar.id * 0.01 },
                strokeWidth: { 
                  duration: 0.8, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }
              }}
            />
          ))}
          
          {/* Progress circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#4285f4"
            strokeWidth="3"
            strokeDasharray={`${(progress / 100) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${centerX} ${centerY})`}
            opacity={progress > 0 ? 0.8 : 0}
          />
        </svg>
        
        {/* Play/Pause button */}
        <motion.button
          className="absolute inset-0 m-auto w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
          onClick={onPlayPause}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <motion.div
            initial={false}
            animate={{ scale: isPlaying ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </motion.div>
        </motion.button>
        
        {/* Animated glow effect when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-blue/50"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
      
      {/* Center frequency indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-2 h-2 bg-primary-blue rounded-full" />
      </motion.div>
    </div>
  );
};