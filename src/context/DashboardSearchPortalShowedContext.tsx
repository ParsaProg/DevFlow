// contexts/PortalContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface PortalContextType {
  showPortal: boolean;
  openPortal: () => void;
  closePortal: () => void;
  togglePortal: () => void;
}

interface PortalProviderProps {
  children: ReactNode;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider = ({ children }: PortalProviderProps) => {
  const [showPortal, setShowPortal] = useState<boolean>(false);

  const openPortal = useCallback(() => setShowPortal(true), []);
  const closePortal = useCallback(() => setShowPortal(false), []);
  const togglePortal = useCallback(() => setShowPortal(prev => !prev), []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K (Mac) to open
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        openPortal();
      }
      
      // Escape to close
      if (event.key === 'Escape' && showPortal) {
        event.preventDefault();
        closePortal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openPortal, closePortal, showPortal]);

  return (
    <PortalContext.Provider value={{ showPortal, openPortal, closePortal, togglePortal }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = (): PortalContextType => {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};