import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-label="Offline mode active"
      className="fixed bottom-3 left-3 z-40 flex items-center gap-2 rounded-full bg-[#1A1A2E] px-3.5 py-2 text-xs font-bold text-[#FFF8E7] shadow-lg border-2 border-[#FFD60A]"
    >
      <WifiOff className="h-4 w-4 text-[#FFD60A]" />
      <span>Offline Ready</span>
    </div>
  );
};
