'use client';

import { useTinyCloud, useTinyCloudReady } from '@/providers/TinyCloudProvider/tinycloud-provider';

/**
 * TinyCloudStatus component displays the status and basic info about TinyCloud Web SDK.
 * This component is useful for verifying that the TinyCloudProvider is working correctly.
 */
export const TinyCloudStatus = () => {
  const tcw = useTinyCloud();
  const isReady = useTinyCloudReady();

  return (
    <div className="flex flex-col gap-2 rounded-xl w-full border-2 border-gray-200 p-4">
      <h3 className="text-lg font-semibold">TinyCloud Status</h3>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex flex-row justify-between">
          <span>SDK Ready:</span>
          <span className={isReady ? 'text-green-600' : 'text-red-600'}>
            {isReady ? 'Yes' : 'No'}
          </span>
        </div>
        {tcw && (
          <>
            <div className="flex flex-row justify-between">
              <span>Address:</span>
              <span className="text-gray-600 font-mono text-xs">
                {tcw.address() || 'Not connected'}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Chain ID:</span>
              <span className="text-gray-600">
                {tcw.chainId() || 'Unknown'}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Session:</span>
              <span className={tcw.session() ? 'text-green-600' : 'text-orange-600'}>
                {tcw.session() ? 'Active' : 'Not signed in'}
              </span>
            </div>
          </>
        )}
      </div>
      {tcw && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <button
            onClick={() => tcw.signIn()}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mr-2"
          >
            Sign In
          </button>
          <button
            onClick={() => tcw.signOut()}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};