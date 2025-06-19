import React from 'react';
import { motion } from 'framer-motion';

interface ProgressDotsProps {
  current: number;
  total: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ current, total }) => {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === current
              ? 'bg-primary-blue w-6'
              : index < current
              ? 'bg-primary-blue/60'
              : 'bg-gray-600'
          }`}
          initial={{ scale: 0.8 }}
          animate={{ scale: index === current ? 1.2 : 1 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
};