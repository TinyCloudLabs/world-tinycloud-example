'use client';
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const ErudaProvider = dynamic(
  () => import('@/providers/Eruda').then((c) => c.ErudaProvider),
  { ssr: false },
);

const TinyCloudProvider = dynamic(
  () => import('@/providers/TinyCloudProvider').then((c) => c.TinyCloudProvider),
  { ssr: false },
);

// Define props for ClientProviders
interface ClientProvidersProps {
  children: ReactNode;
  session: Session | null; // Use the appropriate type for session from next-auth
}

/**
 * ClientProvider wraps the app with essential context providers.
 *
 * - ErudaProvider:
 *     - Should be used only in development.
 *     - Enables an in-browser console for logging and debugging.
 *
 * - TinyCloudProvider:
 *     - Provides TinyCloud Web SDK context throughout the app.
 *     - Handles Web3 provider initialization and session management.
 *
 * - MiniKitProvider:
 *     - Required for MiniKit functionality.
 *
 * This component ensures all providers are available to all child components.
 */
export default function ClientProviders({
  children,
  session,
}: ClientProvidersProps) {
  return (
    <ErudaProvider>
      <TinyCloudProvider>
        <MiniKitProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </MiniKitProvider>
      </TinyCloudProvider>
    </ErudaProvider>
  );
}
