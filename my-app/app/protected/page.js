"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

function ProtectedContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
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
      if (data.status !== "active") {
        setStatus("invalid");
        setKeyInfo({ ...data, reason: "Key is revoked" });
        setShowNotification(true);
        return;
      }
      setStatus("valid");
      setKeyInfo(data);
      setShowNotification(true);
      await supabase.from("api_keys").update({ last_used: new Date().toISOString() }).eq("id", data.id);
    } catch (err) {
      console.error("Error validating key:", err);
      setStatus("invalid");
      setShowNotification(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-60 md:w-80 h-60 md:h-80 rounded-full blur-3xl transition-colors duration-500 ${
          status === "valid" ? "bg-emerald-500/20" : status === "invalid" ? "bg-rose-500/20" : "bg-slate-500/10"
        }`} />
        <div className="absolute top-1/2 -left-40 w-60 md:w-80 h-60 md:h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <Link 
            href="/" 
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Protected Resource</h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">API key validation result</p>
          </div>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Validating API Key...</h2>
            <p className="text-slate-400 text-sm sm:text-base">Please wait while we verify your credentials</p>
          </div>
        )}

        {/* Valid State */}
        {status === "valid" && (
          <div className="bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 sm:w-10 sm:h-10">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">Access Granted! 🎉</h2>
            <p className="text-emerald-400 text-center text-sm sm:text-base mb-6 sm:mb-8">Your API key is valid</p>
            
            {keyInfo && (
              <div className="bg-black/30 rounded-xl p-4 sm:p-6 mb-6">
                <h3 className="text-white font-medium mb-4 text-sm sm:text-base">Key Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-slate-400">Name</span>
                    <span className="text-white font-medium">{keyInfo.name}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-slate-400">Status</span>
                    <span className="text-emerald-400">Active</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/playground" className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors text-center text-sm sm:text-base">
                Test Another Key
              </Link>
              <Link href="/dashboards" className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-all text-center text-sm sm:text-base">
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* Invalid State */}
        {status === "invalid" && (
          <div className="bg-white/5 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border-2 border-rose-500/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 sm:w-10 sm:h-10">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">Access Denied</h2>
            <p className="text-rose-400 text-center text-sm sm:text-base mb-6 sm:mb-8">
              {keyInfo?.reason || "Invalid API key - The key doesn't exist or is incorrect"}
            </p>
            
            <div className="bg-black/30 rounded-xl p-4 sm:p-6 mb-6">
              <h3 className="text-white font-medium mb-3 text-sm sm:text-base">Possible reasons:</h3>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  The API key doesn't exist in our database
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  The API key has been revoked or deleted
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  There's a typo in the key you entered
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/playground" className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors text-center text-sm sm:text-base">
                Try Again
              </Link>
              <Link href="/dashboards" className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-xl transition-all text-center text-sm sm:text-base">
                Create New Key
              </Link>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
          <span className="text-slate-600 hidden sm:block">•</span>
          <Link href="/dashboards" className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
            Go to Dashboard →
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
          <div className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-2xl border ${
            status === "valid" ? "bg-emerald-500 border-emerald-400" : "bg-rose-500 border-rose-400"
          } text-white text-sm sm:text-base`}>
            <span className="font-semibold">{status === "valid" ? "Valid API Key!" : "Invalid Key"}</span>
            <button onClick={() => setShowNotification(false)} className="ml-2 p-1 hover:bg-white/20 rounded-lg">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

export default function Protected() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProtectedContent />
    </Suspense>
  );
}
