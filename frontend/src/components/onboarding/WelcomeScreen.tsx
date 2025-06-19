import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';
import { OnboardingStep } from '../../types';

interface WelcomeScreenProps {
  step: OnboardingStep;
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ step, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
      {/* App icon/logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-blue to-primary-dark rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="relative">
            <FileText className="w-10 h-10 text-white" strokeWidth={1.5} />
            <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1" />
          </div>
        </div>
      </motion.div>

      {/* Welcome text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome to
        </h1>
        <h2 className="text-3xl font-bold text-gradient mb-4">
          Open Notebook
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          Turn your documents into a personalized AI expert
        </p>
      </motion.div>

      {/* Main feature highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <div className="w-20 h-20 bg-primary-blue/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">1</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          {step.title}
        </h3>
        <p className="text-text-secondary leading-relaxed">
          {step.subtitle}
        </p>
      </motion.div>

      {/* Action button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={onNext}
          className="w-full btn-primary text-lg py-4 shadow-glow"
        >
          {step.action}
        </button>
      </motion.div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-sm text-text-secondary mt-8"
      >
        AI-powered research assistant with source citations
      </motion.p>
    </div>
  );
};