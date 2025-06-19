import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingFlow } from '@components/onboarding/OnboardingFlow';
import { MainApp } from '@components/MainApp';
import { STORAGE_KEYS } from '@utils/constants';

export const App: React.FC = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if onboarding has been completed
    const checkOnboardingStatus = () => {
      try {
        const completed = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
        setIsOnboardingCompleted(completed === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setIsOnboardingCompleted(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
      setIsOnboardingCompleted(true);
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-primary">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Routes>
        <Route
          path="/onboarding"
          element={
            isOnboardingCompleted ? (
              <Navigate to="/app" replace />
            ) : (
              <OnboardingFlow onComplete={handleOnboardingComplete} />
            )
          }
        />
        <Route
          path="/app/*"
          element={
            isOnboardingCompleted ? (
              <MainApp />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            <Navigate 
              to={isOnboardingCompleted ? "/app" : "/onboarding"} 
              replace 
            />
          }
        />
      </Routes>
    </div>
  );
};