import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Clock, Globe, Wand2 } from 'lucide-react';
import { Notebook, AudioOverview } from '../../types';

interface AudioGeneratorProps {
  notebook: Notebook;
  onGenerated: (audio: AudioOverview) => void;
  onClose: () => void;
}

const VOICE_OPTIONS = [
  { id: 'discussion', label: 'Discussion', description: 'Two hosts having a conversation', voices: 2 },
  { id: 'interview', label: 'Interview', description: 'Interview-style Q&A format', voices: 2 },
  { id: 'summary', label: 'Summary', description: 'Single narrator overview', voices: 1 },
  { id: 'debate', label: 'Debate', description: 'Multiple perspectives discussion', voices: 3 }
];

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'it', label: 'Italian', flag: '🇮🇹' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' }
];

const DURATION_OPTIONS = [
  { id: 'short', label: 'Short', description: '3-5 minutes', duration: 240 },
  { id: 'medium', label: 'Medium', description: '8-12 minutes', duration: 600 },
  { id: 'long', label: 'Long', description: '15-20 minutes', duration: 1080 }
];

export const AudioGenerator: React.FC<AudioGeneratorProps> = ({
  notebook,
  onGenerated,
  onClose
}) => {
  const [selectedVoiceStyle, setSelectedVoiceStyle] = useState('discussion');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedDuration, setSelectedDuration] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate generation progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Mock generated audio
      const mockAudio: AudioOverview = {
        id: `audio-${Date.now()}`,
        notebook_id: notebook.id,
        title: `${notebook.name} - AI Discussion`,
        duration: DURATION_OPTIONS.find(d => d.id === selectedDuration)?.duration || 600,
        url: '/mock-audio.mp3',
        waveform_data: Array.from({ length: 64 }, () => Math.random()),
        status: 'ready',
        language: selectedLanguage,
        voices: [selectedVoiceStyle],
        created_at: new Date().toISOString()
      };

      setTimeout(() => {
        onGenerated(mockAudio);
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Audio generation failed:', error);
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const selectedVoiceOption = VOICE_OPTIONS.find(v => v.id === selectedVoiceStyle);
  const selectedLangOption = LANGUAGE_OPTIONS.find(l => l.code === selectedLanguage);
  const selectedDurationOption = DURATION_OPTIONS.find(d => d.id === selectedDuration);

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
          {!isGenerating ? (
            // Configuration UI
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Generate Audio Overview
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-background-surface rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Voice Style */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Voice Style
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {VOICE_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedVoiceStyle(option.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedVoiceStyle === option.id
                          ? 'border-primary-blue bg-primary-blue/10 text-text-primary'
                          : 'border-gray-600 bg-background-surface text-text-secondary hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs opacity-80">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Duration
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {DURATION_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedDuration(option.id)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        selectedDuration === option.id
                          ? 'border-primary-blue bg-primary-blue/10 text-text-primary'
                          : 'border-gray-600 bg-background-surface text-text-secondary hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs opacity-80">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Language
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGE_OPTIONS.slice(0, 6).map((option) => (
                    <button
                      key={option.code}
                      onClick={() => setSelectedLanguage(option.code)}
                      className={`p-3 rounded-lg border flex items-center space-x-2 transition-all ${
                        selectedLanguage === option.code
                          ? 'border-primary-blue bg-primary-blue/10 text-text-primary'
                          : 'border-gray-600 bg-background-surface text-text-secondary hover:border-gray-500'
                      }`}
                    >
                      <span className="text-lg">{option.flag}</span>
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-background-surface rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-2">Generation Summary</h4>
                <div className="space-y-1 text-sm text-text-secondary">
                  <div>Style: {selectedVoiceOption?.label} ({selectedVoiceOption?.voices} voice{selectedVoiceOption?.voices !== 1 ? 's' : ''})</div>
                  <div>Duration: {selectedDurationOption?.description}</div>
                  <div>Language: {selectedLangOption?.flag} {selectedLangOption?.label}</div>
                  <div>Sources: {notebook.sources.filter(s => s.status === 'ready').length} documents</div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Generate Audio Overview</span>
              </button>
            </div>
          ) : (
            // Generation Progress UI
            <div className="p-6 text-center">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-primary-blue to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Wand2 className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Generating Audio Overview
              </h3>
              
              <p className="text-text-secondary mb-6">
                Creating your {selectedDurationOption?.description.toLowerCase()} AI discussion...
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <motion.div
                  className="bg-primary-blue h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${generationProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <p className="text-sm text-text-muted">
                {Math.round(generationProgress)}% complete
              </p>

              {generationProgress === 100 && (
                <motion.p
                  className="text-sm text-green-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✓ Audio generation complete!
                </motion.p>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};