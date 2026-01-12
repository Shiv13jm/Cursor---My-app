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
  // Show setup guide if Supabase is not configured
  if (!isSupabaseConfigured) {
    return <SetupGuide />;
  }

  return <DashboardContent />;
}

function DashboardContent() {
  // API Keys hook
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

  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Handlers
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight font-mono">
                API Keys
              </h1>
              <p className="text-slate-400 mt-1">
                Manage your API keys for authentication
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Create New Key
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
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Quick Tips</h3>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Keep your API keys secure and never share them publicly</li>
                  <li>• Revoke keys immediately if you suspect they have been compromised</li>
                  <li>• Use different keys for development and production environments</li>
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

      {/* Toast Notification */}
      <Toast show={showToast} />
    </div>
  );
}
