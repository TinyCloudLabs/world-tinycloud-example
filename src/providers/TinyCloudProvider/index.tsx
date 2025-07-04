'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const TinyCloud = dynamic(() => import('./tinycloud-provider').then((c) => c.TinyCloud), {
  ssr: false,
});

export interface TinyCloudProviderProps {
  children: ReactNode;
  config?: Record<string, unknown>;
  enabled?: boolean;
}

export const TinyCloudProvider = (props: TinyCloudProviderProps) => {
  // Allow conditional disabling of TinyCloud
  if (props.enabled === false) {
    return props.children;
  }
  
  return <TinyCloud config={props.config}>{props.children}</TinyCloud>;
};