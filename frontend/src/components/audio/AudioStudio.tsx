import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Download, Share } from 'lucide-react';
import { CircularWaveform } from './CircularWaveform';
import { AudioGenerator } from './AudioGenerator';
import { Notebook, AudioOverview } from '../../types';

interface AudioStudioProps {
  notebook: Notebook;
}

export const AudioStudio: React.FC<AudioStudioProps> = ({ notebook }) => {
  const [currentAudio, setCurrentAudio] = useState<AudioOverview | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);

  // Mock audio data for demonstration
  const mockAudio: AudioOverview = {
    id: 'audio-1',
    notebook_id: notebook.id,
    title: 'Free to Attach: Assistant Advancement Explained',
    duration: 645, // 10:45 in seconds
    url: '/mock-audio.mp3',
    waveform_data: Array.from({ length: 64 }, () => Math.random()),
    status: 'ready',
    language: 'en',
    voices: ['host1', 'host2'],
    created_at: new Date().toISOString()
  };

  useEffect(() => {
    // Initialize with mock audio for demo
    setCurrentAudio(mockAudio);
  }, []);

  useEffect(() => {
    if (currentAudio?.url) {
      const audio = new Audio(currentAudio.url);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration || currentAudio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      setAudioElement(audio);
      
      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, [currentAudio]);

  const handlePlayPause = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (seconds: number) => {
    if (!audioElement) return;
    audioElement.currentTime = Math.max(0, Math.min(duration, seconds));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentAudio) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-primary-dark rounded-full flex items-center justify-center">
            <Play className="w-10 h-10 text-white ml-1" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Create Audio Overview
            </h2>
            <p className="text-text-secondary">
              Turn your sources into an engaging AI-powered discussion
            </p>
          </div>
          
          <button
            onClick={() => setShowGenerator(true)}
            className="btn-primary"
          >
            Generate Audio
          </button>
        </motion.div>
        
        {showGenerator && (
          <AudioGenerator
            notebook={notebook}
            onGenerated={setCurrentAudio}
            onClose={() => setShowGenerator(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background-primary">
      {/* Audio player */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          className="space-y-8 text-center max-w-sm w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Circular waveform */}
          <CircularWaveform
            waveformData={currentAudio.waveform_data}
            isPlaying={isPlaying}
            progress={progress}
            onPlayPause={handlePlayPause}
          />
          
          {/* Audio info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              {currentAudio.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {formatTime(duration)} • AI Discussion
            </p>
          </div>
          
          {/* Control buttons */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => handleSeek(currentTime - 15)}
              className="p-3 rounded-full bg-background-surface text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Skip back 15 seconds"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-primary-blue text-white shadow-lg hover:bg-primary-dark transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
            
            <button
              onClick={() => handleSeek(currentTime + 15)}
              className="p-3 rounded-full bg-background-surface text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Skip forward 15 seconds"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <div 
              className="w-full h-1 bg-gray-700 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                handleSeek(percent * duration);
              }}
            >
              <div 
                className="h-full bg-primary-blue rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Action buttons */}
      <motion.div 
        className="p-4 border-t border-gray-700 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex space-x-3">
          <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
        
        <button
          onClick={() => setShowGenerator(true)}
          className="w-full btn-primary"
        >
          Generate New Audio
        </button>
      </motion.div>
      
      {showGenerator && (
        <AudioGenerator
          notebook={notebook}
          onGenerated={setCurrentAudio}
          onClose={() => setShowGenerator(false)}
        />
      )}
    </div>
  );
};