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
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/playground" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Protected Resource</h1>
            <p className="text-slate-400 mt-1">API key validation result</p>
          </div>
        </div>

        {status === "loading" && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-white mb-2">Validating API Key...</h2>
          </div>
        )}

        {status === "valid" && (
          <div className="bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Access Granted!</h2>
            <p className="text-emerald-400 mb-8">Your API key is valid</p>
            {keyInfo && <p className="text-white">Key: {keyInfo.name}</p>}
            <div className="mt-8 flex gap-4">
              <Link href="/playground" className="flex-1 py-3 px-4 bg-white/5 text-white rounded-xl text-center">Test Another</Link>
              <Link href="/dashboards" className="flex-1 py-3 px-4 bg-emerald-500 text-black rounded-xl text-center">Dashboard</Link>
            </div>
          </div>
        )}

        {status === "invalid" && (
          <div className="bg-white/5 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-rose-400 mb-8">{keyInfo?.reason || "Invalid API key"}</p>
            <div className="mt-8 flex gap-4">
              <Link href="/playground" className="flex-1 py-3 px-4 bg-white/5 text-white rounded-xl text-center">Try Again</Link>
              <Link href="/dashboards" className="flex-1 py-3 px-4 bg-rose-500 text-white rounded-xl text-center">Create Key</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
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
