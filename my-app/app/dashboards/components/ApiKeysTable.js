"use client";

import { useState } from "react";

function maskKey(key) {
  if (key.length <= 16) return key;
  return key.substring(0, 8) + "••••••••" + key.substring(key.length - 4);
}

export default function ApiKeysTable({
  apiKeys,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreate,
  onCopy,
}) {
  const [visibleKeys, setVisibleKeys] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleKeyVisibility = (id) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (text, id) => {
    setCopiedId(id);
    onCopy(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-8 sm:p-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm sm:text-base">Loading API keys...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (apiKeys.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-8 sm:p-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 sm:w-7 sm:h-7">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>
          <p className="text-slate-400 text-sm sm:text-base">No API keys yet</p>
          <button
            onClick={onCreate}
            className="text-emerald-400 hover:text-emerald-300 font-medium text-sm sm:text-base"
          >
            Create your first key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Name</th>
              <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">API Key</th>
              <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Created</th>
              <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Last Used</th>
              <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Status</th>
              <th className="text-right py-4 px-6 text-slate-400 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((apiKey) => (
              <tr
                key={apiKey.id}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-6">
                  <span className="text-white font-medium">{apiKey.name}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <code className="text-slate-400 font-mono text-sm bg-white/5 px-3 py-1.5 rounded-lg">
                      {visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                      title={visibleKeys[apiKey.id] ? "Hide API key" : "Show API key"}
                    >
                      {visibleKeys[apiKey.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => handleCopy(apiKey.key, apiKey.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                      title="Copy to clipboard"
                    >
                      {copiedId === apiKey.id ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-400 text-sm">{apiKey.createdAt}</td>
                <td className="py-4 px-6 text-slate-400 text-sm">{apiKey.lastUsed}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onToggleStatus(apiKey.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      apiKey.status === "active"
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${apiKey.status === "active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                    {apiKey.status}
                  </button>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(apiKey)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(apiKey.id)}
                      className="p-2 hover:bg-rose-500/20 rounded-lg transition-colors text-slate-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Visible only on mobile */}
      <div className="lg:hidden divide-y divide-white/5">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="p-4">
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium text-sm">{apiKey.name}</span>
              <button
                onClick={() => onToggleStatus(apiKey.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  apiKey.status === "active"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/20 text-rose-400"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${apiKey.status === "active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                {apiKey.status}
              </button>
            </div>

            {/* API Key */}
            <div className="flex items-center gap-2 mb-3">
              <code className="flex-1 text-slate-400 font-mono text-xs bg-white/5 px-3 py-2 rounded-lg truncate">
                {visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
              </code>
              <button
                onClick={() => toggleKeyVisibility(apiKey.id)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
              >
                {visibleKeys[apiKey.id] ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
              <button
                onClick={() => handleCopy(apiKey.key, apiKey.id)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
              >
                {copiedId === apiKey.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Meta info and actions */}
            <div className="flex items-center justify-between">
              <div className="text-slate-500 text-xs space-y-0.5">
                <p>Created: {apiKey.createdAt}</p>
                <p>Last used: {apiKey.lastUsed}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(apiKey)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(apiKey.id)}
                  className="p-2 hover:bg-rose-500/20 rounded-lg transition-colors text-slate-400 hover:text-rose-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
