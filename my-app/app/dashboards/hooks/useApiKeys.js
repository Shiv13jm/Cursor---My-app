"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// Generate a random API key
function generateApiKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const prefix = "sk_live_";
  let key = prefix;
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export default function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch API keys
  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      const mappedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        key: item.key,
        createdAt: new Date(item.created_at).toISOString().split("T")[0],
        lastUsed: item.last_used
          ? new Date(item.last_used).toISOString().split("T")[0]
          : "Never",
        status: item.status,
      }));

      setApiKeys(mappedData);
    } catch (err) {
      console.error("Error fetching API keys:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create API key
  const createApiKey = async (name) => {
    setSaving(true);
    try {
      const newKeyData = {
        name,
        key: generateApiKey(),
        status: "active",
      };

      console.log("Inserting:", newKeyData);

      const { data, error: insertError } = await supabase
        .from("api_keys")
        .insert([newKeyData])
        .select()
        .single();

      console.log("Insert result - data:", data, "error:", insertError);

      if (insertError) throw insertError;
      if (!data) throw new Error("No data returned from insert. Check table permissions.");

      const newKey = {
        id: data.id,
        name: data.name,
        key: data.key,
        createdAt: new Date(data.created_at).toISOString().split("T")[0],
        lastUsed: "Never",
        status: data.status,
      };

      setApiKeys((prev) => [newKey, ...prev]);
      return { success: true };
    } catch (err) {
      console.error("Error saving API key:", JSON.stringify(err, null, 2));
      const errorMsg = err?.message || err?.error_description || err?.details ||
        (typeof err === 'object' ? JSON.stringify(err) : String(err)) ||
        "Failed to save API key. Make sure RLS is disabled in Supabase.";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setSaving(false);
    }
  };

  // Update API key
  const updateApiKey = async (id, name) => {
    setSaving(true);
    try {
      const { error: updateError } = await supabase
        .from("api_keys")
        .update({ name })
        .eq("id", id);

      if (updateError) throw updateError;

      setApiKeys((prev) =>
        prev.map((key) => (key.id === id ? { ...key, name } : key))
      );
      return { success: true };
    } catch (err) {
      console.error("Error updating API key:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  };

  // Delete API key
  const deleteApiKey = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from("api_keys")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setApiKeys((prev) => prev.filter((key) => key.id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting API key:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Toggle API key status
  const toggleStatus = async (id) => {
    const key = apiKeys.find((k) => k.id === id);
    const newStatus = key.status === "active" ? "revoked" : "active";

    try {
      const { error: updateError } = await supabase
        .from("api_keys")
        .update({ status: newStatus })
        .eq("id", id);

      if (updateError) throw updateError;

      setApiKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, status: newStatus } : k))
      );
      return { success: true };
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Fetch on mount
  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  return {
    apiKeys,
    loading,
    error,
    saving,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    toggleStatus,
    clearError,
  };
}

