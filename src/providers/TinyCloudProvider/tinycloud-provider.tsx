'use client';

import { TinyCloudWeb } from '@tinycloudlabs/web-sdk';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const TinyCloudContext = createContext<TinyCloudWeb | null>(null);

export interface TinyCloudProps {
  children: ReactNode;
  config?: Record<string, unknown>;
}

export const TinyCloud = (props: TinyCloudProps) => {
  const [tcw, setTcw] = useState<TinyCloudWeb | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const instance = new TinyCloudWeb(props.config);
        setTcw(instance);
      } catch (error) {
        console.log('TinyCloud Web failed to initialize', error);
      }
    }
  }, [props.config]);

  return (
    <TinyCloudContext.Provider value={tcw}>
      {props.children}
    </TinyCloudContext.Provider>
  );
};

/**
 * Hook to access the TinyCloud Web SDK instance
 * @returns TinyCloudWeb instance or null if not initialized
 */
export const useTinyCloud = (): TinyCloudWeb | null => {
  return useContext(TinyCloudContext);
};

/**
 * Hook to check if TinyCloud is ready for use
 * @returns boolean indicating if TinyCloud is initialized
 */
export const useTinyCloudReady = (): boolean => {
  const tcw = useContext(TinyCloudContext);
  return tcw !== null;
};