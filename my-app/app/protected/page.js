"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function Protected() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading, valid, invalid
  const [keyInfo, setKeyInfo] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const apiKey = searchParams.get("key");
    
    if (!apiKey) {
      setStatus("invalid");
      setShowNotification(true);
      return;
    }

    validateKey(apiKey);
  }, [searchParams]);

  const validateKey = async (key) => {
    if (!isSupabaseConfigured) {
      setStatus("invalid");
      setShowNotification(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .eq("key", key)
        .single();

      if (error || !data) {
        setStatus("invalid");
        setShowNotification(true);
        return;
      }

      // Check if the key is active
      if (data.status !== "active") {
        setStatus("invalid");
        setKeyInfo({ ...data, reason: "Key is revoked" });
        setShowNotification(true);
        return;
      }

      // Key is valid!
      setStatus("valid");
      setKeyInfo(data);
      setShowNotification(true);

      // Update last_used timestamp
      await supabase
        .from("api_keys")
        .update({ last_used: new Date().toISOString() })
        .eq("id", data.id);

    } catch (err) {
      console.error("Error validating key:", err);
      setStatus("invalid");
      setShowNotification(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl transition-colors duration-500 ${
          status === "valid" ? "bg-emerald-500/20" : status === "invalid" ? "bg-rose-500/20" : "bg-slate-500/10"
        }`} />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/playground"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Protected Resource
            </h1>
            <p className="text-slate-400 mt-1">
              API key validation result
            </p>
          </div>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin mb-6" />
              <h2 className="text-xl font-semibold text-white mb-2">Validating API Key...</h2>
              <p className="text-slate-400 text-center">
                Please wait while we verify your credentials
              </p>
            </div>
          </div>
        )}

        {/* Valid Key State */}
        {status === "valid" && (
          <div className="bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Access Granted! 🎉
            </h2>
            <p className="text-emerald-400 text-center mb-8">
              Your API key is valid and can be used to access protected resources
            </p>

            {/* Key Details */}
            {keyInfo && (
              <div className="bg-black/30 rounded-xl p-6 mb-6">
                <h3 className="text-white font-medium mb-4">Key Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name</span>
                    <span className="text-white font-medium">{keyInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Created</span>
                    <span className="text-white">{new Date(keyInfo.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Protected Content Example */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Protected Content Unlocked</h4>
                  <p className="text-slate-400 text-sm">
                    You now have access to all protected API endpoints. Use this key in your Authorization header to make authenticated requests.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <Link
                href="/playground"
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors text-center"
              >
                Test Another Key
              </Link>
              <Link
                href="/dashboards"
                className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-all text-center"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* Invalid Key State */}
        {status === "invalid" && (
          <div className="bg-white/5 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Access Denied
            </h2>
            <p className="text-rose-400 text-center mb-8">
              {keyInfo?.reason || "Invalid API key - The key you provided doesn't exist or is incorrect"}
            </p>

            {/* Error Details */}
            <div className="bg-black/30 rounded-xl p-6 mb-6">
              <h3 className="text-white font-medium mb-3">Possible reasons:</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  The API key doesn't exist in our database
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  The API key has been revoked or deleted
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  There's a typo in the key you entered
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <Link
                href="/playground"
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors text-center"
              >
                Try Again
              </Link>
              <Link
                href="/dashboards"
                className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-xl transition-all text-center"
              >
                Create New Key
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Notification Popup */}
      <div
        className={`fixed top-6 right-6 z-50 transition-all duration-500 ${
          showNotification
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-8 pointer-events-none"
        }`}
      >
        <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
          status === "valid"
            ? "bg-emerald-500 border-emerald-400 text-white"
            : "bg-rose-500 border-rose-400 text-white"
        }`}>
          {status === "valid" ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <p className="font-semibold">Valid API Key!</p>
                <p className="text-sm opacity-90">Access granted to protected resources</p>
              </div>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <div>
                <p className="font-semibold">Invalid Key</p>
                <p className="text-sm opacity-90">Access denied - key not found</p>
              </div>
            </>
          )}
          <button
            onClick={() => setShowNotification(false)}
            className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

