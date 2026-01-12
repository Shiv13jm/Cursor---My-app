"use client";

import { useState } from "react";
import Link from "next/link";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Form states
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc",
    timezone: "UTC",
  });
  
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    securityAlerts: true,
    usageReports: false,
    marketing: false,
  });

  const [plan] = useState({
    name: "Pro",
    price: "$29/month",
    apiKeys: "12 / 25",
    apiCalls: "45,230 / 100,000",
    nextBilling: "Feb 1, 2026",
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "user" },
    { id: "billing", label: "Billing", icon: "card" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "security", label: "Security", icon: "shield" },
  ];

  const TabIcon = ({ icon }) => {
    switch (icon) {
      case "user":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        );
      case "card":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        );
      case "bell":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        );
      case "shield":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/dashboards" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Settings</h1>
            <p className="text-slate-400 text-sm hidden sm:block">Manage your account settings</p>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>
        </Link>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
              <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <TabIcon icon={tab.icon} />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
                
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                    JD
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium">
                      Change Avatar
                    </button>
                    <p className="text-slate-500 text-xs mt-2">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Timezone</label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="PST">Pacific Time</option>
                        <option value="IST">India Standard Time</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50"
                  >
                    {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                  </button>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">{plan.name} Plan</h3>
                      <p className="text-emerald-400 font-semibold">{plan.price}</p>
                    </div>
                    <Link href="/pricing" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium text-center">
                      Upgrade Plan
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-black/20 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">API Keys Used</p>
                      <p className="text-white font-semibold">{plan.apiKeys}</p>
                      <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "48%" }} />
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">API Calls This Month</p>
                      <p className="text-white font-semibold">{plan.apiCalls}</p>
                      <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: "45%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">•••• •••• •••• 4242</p>
                      <p className="text-slate-500 text-sm">Expires 12/26</p>
                    </div>
                    <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                      Update
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Billing History</h3>
                  <div className="space-y-3">
                    {[
                      { date: "Jan 1, 2026", amount: "$29.00", status: "Paid" },
                      { date: "Dec 1, 2025", amount: "$29.00", status: "Paid" },
                      { date: "Nov 1, 2025", amount: "$29.00", status: "Paid" },
                    ].map((invoice, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-slate-400 text-sm">{invoice.date}</span>
                        <span className="text-white">{invoice.amount}</span>
                        <span className="text-emerald-400 text-sm">{invoice.status}</span>
                        <button className="text-slate-400 hover:text-white text-sm">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: "emailUpdates", label: "Email Updates", desc: "Get notified about product updates and new features" },
                    { key: "securityAlerts", label: "Security Alerts", desc: "Receive alerts about security issues and suspicious activity" },
                    { key: "usageReports", label: "Weekly Usage Reports", desc: "Get weekly summaries of your API usage" },
                    { key: "marketing", label: "Marketing Emails", desc: "Receive tips, offers, and promotional content" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key] ? "bg-emerald-500" : "bg-white/10"}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? "translate-x-6" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSave}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  Save Preferences
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Two-Factor Authentication</h3>
                  <p className="text-slate-400 text-sm mb-4">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium">
                    Enable 2FA
                  </button>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-rose-400 mb-2">Danger Zone</h3>
                  <p className="text-slate-400 text-sm mb-4">Permanently delete your account and all associated data</p>
                  <button className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors text-sm font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
