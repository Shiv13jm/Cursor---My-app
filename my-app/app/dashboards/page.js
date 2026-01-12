"use client";

import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase";
import useApiKeys from "./hooks/useApiKeys";
import {
  Sidebar,
  SetupGuide,
  StatsCards,
  ApiKeysTable,
  CreateEditModal,
  DeleteConfirmModal,
  Toast,
  ErrorBanner,
} from "./components";

export default function Dashboard() {
  if (!isSupabaseConfigured) {
    return <SetupGuide />;
  }
  return <DashboardContent />;
}

function DashboardContent() {
  const {
    apiKeys,
    loading,
    error,
    saving,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    toggleStatus,
    clearError,
  } = useApiKeys();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleCreate = () => {
    setEditingKey(null);
    setFormData({ name: "" });
    setShowModal(true);
  };

  const handleEdit = (apiKey) => {
    setEditingKey(apiKey);
    setFormData({ name: apiKey.name });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (editingKey) {
      const result = await updateApiKey(editingKey.id, formData.name);
      if (result.success) {
        setShowModal(false);
        setFormData({ name: "" });
      }
    } else {
      const result = await createApiKey(formData.name);
      if (result.success) {
        setShowModal(false);
        setFormData({ name: "" });
      }
    }
  };

  const handleDelete = async () => {
    if (showDeleteConfirm) {
      await deleteApiKey(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const handleToggleStatus = async (id) => {
    await toggleStatus(id);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 md:w-80 h-60 md:h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-60 md:w-80 h-60 md:h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-60 md:w-80 h-60 md:h-80 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 lg:ml-20`}>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-12">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight font-mono text-center lg:text-left">
                API Keys
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 text-center lg:text-left hidden sm:block">
                Manage your API keys for authentication
              </p>
            </div>

            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span className="hidden sm:inline">Create New Key</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>

          {/* Error Banner */}
          <ErrorBanner error={error} onDismiss={clearError} />

          {/* Stats Cards */}
          <StatsCards apiKeys={apiKeys} />

          {/* API Keys Table */}
          <ApiKeysTable
            apiKeys={apiKeys}
            loading={loading}
            onEdit={handleEdit}
            onDelete={(id) => setShowDeleteConfirm(id)}
            onToggleStatus={handleToggleStatus}
            onCreate={handleCreate}
            onCopy={handleCopy}
          />

          {/* Usage Tips */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 sm:w-5 sm:h-5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Quick Tips</h3>
                <ul className="text-slate-400 text-xs sm:text-sm space-y-1">
                  <li>• Keep your API keys secure and never share them publicly</li>
                  <li className="hidden sm:block">• Revoke keys immediately if you suspect they have been compromised</li>
                  <li className="hidden sm:block">• Use different keys for development and production environments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateEditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editingKey={editingKey}
        formData={formData}
        setFormData={setFormData}
        saving={saving}
      />

      <DeleteConfirmModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={handleDelete}
      />

      <Toast show={showToast} />
    </div>
  );
}
