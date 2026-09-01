import React from 'react';

export const RouteLoading: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative flex items-center justify-center w-14 h-14">
        <div className="w-12 h-12 rounded-full border-3 border-[#BC2639]/20 border-t-[#BC2639] animate-spin" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
        Loading...
      </span>
    </div>
  );
};
