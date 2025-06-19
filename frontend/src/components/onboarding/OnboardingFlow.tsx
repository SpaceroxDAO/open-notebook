import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './WelcomeScreen';
import { FeatureScreen } from './FeatureScreen';
import { ProgressDots } from './ProgressDots';
import { ONBOARDING_STEPS } from '@utils/constants';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-background-primary flex flex-col safe-top safe-bottom">
      {/* Header with skip button */}
      <div className="flex justify-between items-center p-4">
        <div className="w-12" /> {/* Spacer */}
        <ProgressDots current={currentStep} total={ONBOARDING_STEPS.length} />
        <button
          onClick={handleSkip}
          className="text-text-secondary text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1"
          >
            {currentStep === 0 ? (
              <WelcomeScreen step={step} onNext={handleNext} />
            ) : (
              <FeatureScreen 
                step={step} 
                onNext={handleNext}
                onPrevious={handlePrevious}
                isLast={currentStep === ONBOARDING_STEPS.length - 1}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};