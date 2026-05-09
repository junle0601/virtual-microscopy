import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/apiClient';

const PhaseContext = createContext();

export const PhaseContextProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionRecordId, setSessionRecordId] = useState(null);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [unlockedCases, setUnlockedCases] = useState(['normal']);

  // Initialize session once on app load
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // 1. Check localStorage for existing session ID
        let currentSessionId = localStorage.getItem('bloodSimulationSessionId');
        
        // 2. If not found, generate a new one and save to localStorage
        if (!currentSessionId) {
          currentSessionId = crypto.randomUUID();
          localStorage.setItem('bloodSimulationSessionId', currentSessionId);
        }
        
        setSessionId(currentSessionId);

        // 3. Check if this session already exists in PocketBase
        try {
          const existingSession = await pb.collection('sessions').getFirstListItem(`sessionId="${currentSessionId}"`, { 
            $autoCancel: false 
          });
          
          // Session exists, store its record ID for future updates
          setSessionRecordId(existingSession.id);
          if (existingSession.caseSelected) {
            setSelectedCase(existingSession.caseSelected);
          }
          
        } catch (err) {
          // 4. If not found (404 error), create ONE new session record
          if (err.status === 404) {
            const newSession = await pb.collection('sessions').create({
              sessionId: currentSessionId,
              caseSelected: '',
              status: 'active'
            }, { $autoCancel: false });
            
            setSessionRecordId(newSession.id);
          } else {
            console.error('Error checking for existing session:', err);
          }
        }
      } catch (error) {
        console.error('Critical error initializing session:', error);
      }
    };

    initializeSession();
  }, []);

  const completePhase = (phase) => {
    if (!completedPhases.includes(phase)) {
      setCompletedPhases((prev) => [...prev, phase]);
    }
  };

  const selectCase = async (caseId) => {
    setSelectedCase(caseId);
    
    // Update the existing session record instead of creating a new one
    if (sessionRecordId) {
      try {
        await pb.collection('sessions').update(sessionRecordId, {
          caseSelected: caseId,
          status: 'started'
        }, { $autoCancel: false });
      } catch (error) {
        console.error('Error updating session case:', error);
      }
    }
  };

  const unlockAllCases = () => {
    setUnlockedCases(['normal', 'anaemia', 'leukemia', 'platelet']);
  };

  return (
    <PhaseContext.Provider
      value={{
        sessionId,
        sessionRecordId,
        completedPhases,
        completePhase,
        selectedCase,
        selectCase,
        unlockedCases,
        unlockAllCases
      }}
    >
      {children}
    </PhaseContext.Provider>
  );
};

export const usePhase = () => {
  const context = useContext(PhaseContext);
  if (!context) {
    throw new Error('usePhase must be used within PhaseContextProvider');
  }
  return context;
};