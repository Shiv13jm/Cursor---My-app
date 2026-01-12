"use client";

export default function StatsCards({ apiKeys }) {
  const totalKeys = apiKeys.length;
  const activeKeys = apiKeys.filter((k) => k.status === "active").length;
  const revokedKeys = apiKeys.filter((k) => k.status === "revoked").length;

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
      {/* Total Keys */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 sm:w-5 sm:h-5">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs sm:text-sm">Total</p>
            <p className="text-lg sm:text-2xl font-bold text-white font-mono">{totalKeys}</p>
          </div>
        </div>
      </div>

      {/* Active Keys */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 sm:w-5 sm:h-5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs sm:text-sm">Active</p>
            <p className="text-lg sm:text-2xl font-bold text-white font-mono">{activeKeys}</p>
          </div>
        </div>
      </div>

      {/* Revoked Keys */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-rose-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 sm:w-5 sm:h-5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs sm:text-sm">Revoked</p>
            <p className="text-lg sm:text-2xl font-bold text-white font-mono">{revokedKeys}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
