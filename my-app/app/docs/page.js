"use client";

import { useState } from "react";
import Link from "next/link";

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "authentication", label: "Authentication" },
  { id: "api-keys", label: "API Keys" },
  { id: "rate-limits", label: "Rate Limits" },
  { id: "errors", label: "Error Handling" },
  { id: "sdks", label: "SDKs & Libraries" },
];

const codeExamples = {
  curl: `curl -X GET "https://api.keyvault.dev/v1/validate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  javascript: `const response = await fetch('https://api.keyvault.dev/v1/validate', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,
  python: `import requests

response = requests.get(
    'https://api.keyvault.dev/v1/validate',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)

print(response.json())`,
};

export default function Docs() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeLanguage, setActiveLanguage] = useState("curl");
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">KeyVault</span>
            </Link>
            <span className="text-slate-500">/</span>
            <span className="text-white font-medium">Documentation</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors px-3 py-2 text-sm">
              Pricing
            </Link>
            <Link href="/dashboards" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all font-medium text-sm border border-white/10">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                      activeSection === section.id
                        ? "bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-500"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-2">Need Help?</h4>
                <p className="text-slate-400 text-xs mb-3">Can't find what you're looking for?</p>
                <Link href="/contact" className="text-emerald-400 text-sm font-medium hover:text-emerald-300">
                  Contact Support →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile section selector */}
            <div className="lg:hidden mb-6">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>{section.label}</option>
                ))}
              </select>
            </div>

            {/* Getting Started */}
            {activeSection === "getting-started" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Getting Started</h1>
                  <p className="text-slate-400 text-lg">Learn how to integrate KeyVault into your application in minutes.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Start Guide</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Create an Account</h3>
                        <p className="text-slate-400 text-sm">Sign up for a free KeyVault account to get started.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Generate an API Key</h3>
                        <p className="text-slate-400 text-sm">Navigate to the Dashboard and create your first API key.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Make Your First Request</h3>
                        <p className="text-slate-400 text-sm">Use your API key to authenticate requests to our API.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                    <div className="flex gap-2">
                      {["curl", "javascript", "python"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setActiveLanguage(lang)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            activeLanguage === lang
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={copyCode}
                      className="flex items-center gap-2 px-3 py-1 text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {copied ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-emerald-300 font-mono whitespace-pre">
                      {codeExamples[activeLanguage]}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {/* Authentication */}
            {activeSection === "authentication" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Authentication</h1>
                  <p className="text-slate-400 text-lg">Learn how to authenticate your API requests.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Bearer Token Authentication</h2>
                  <p className="text-slate-400 mb-4">
                    KeyVault uses Bearer token authentication. Include your API key in the Authorization header of each request.
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                    <span className="text-cyan-400">Authorization:</span> <span className="text-emerald-400">Bearer YOUR_API_KEY</span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                  <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 flex-shrink-0">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <div>
                      <h4 className="text-amber-400 font-semibold mb-1">Security Notice</h4>
                      <p className="text-slate-400 text-sm">Never expose your API key in client-side code or public repositories. Always use environment variables.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API Keys */}
            {activeSection === "api-keys" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">API Keys</h1>
                  <p className="text-slate-400 text-lg">Manage and understand your API keys.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Key Types</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Live Keys</h4>
                      <p className="text-slate-400 text-sm">Use for production environments. Starts with <code className="text-emerald-400">tvly_live_</code></p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Test Keys</h4>
                      <p className="text-slate-400 text-sm">Use for development and testing. Starts with <code className="text-cyan-400">tvly_test_</code></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rate Limits */}
            {activeSection === "rate-limits" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Rate Limits</h1>
                  <p className="text-slate-400 text-lg">Understand API rate limiting.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4 text-slate-400 font-medium">Plan</th>
                        <th className="text-left py-4 px-4 text-slate-400 font-medium">Requests/min</th>
                        <th className="text-left py-4 px-4 text-slate-400 font-medium">Requests/month</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 text-white">Free</td>
                        <td className="py-4 px-4 text-slate-400">10</td>
                        <td className="py-4 px-4 text-slate-400">1,000</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 text-white">Pro</td>
                        <td className="py-4 px-4 text-slate-400">100</td>
                        <td className="py-4 px-4 text-slate-400">100,000</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 text-white">Enterprise</td>
                        <td className="py-4 px-4 text-slate-400">1,000</td>
                        <td className="py-4 px-4 text-slate-400">1,000,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Errors */}
            {activeSection === "errors" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Error Handling</h1>
                  <p className="text-slate-400 text-lg">Common error codes and how to handle them.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { code: "401", name: "Unauthorized", desc: "Invalid or missing API key" },
                    { code: "403", name: "Forbidden", desc: "API key doesn't have permission" },
                    { code: "429", name: "Too Many Requests", desc: "Rate limit exceeded" },
                    { code: "500", name: "Internal Error", desc: "Something went wrong on our end" },
                  ].map((error) => (
                    <div key={error.code} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-lg font-mono text-sm h-fit">{error.code}</span>
                      <div>
                        <h4 className="text-white font-semibold">{error.name}</h4>
                        <p className="text-slate-400 text-sm">{error.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SDKs */}
            {activeSection === "sdks" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">SDKs & Libraries</h1>
                  <p className="text-slate-400 text-lg">Official libraries for popular languages.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Node.js", icon: "🟢", command: "npm install @keyvault/node" },
                    { name: "Python", icon: "🐍", command: "pip install keyvault" },
                    { name: "Go", icon: "🔵", command: "go get github.com/keyvault/go" },
                    { name: "Ruby", icon: "💎", command: "gem install keyvault" },
                  ].map((sdk) => (
                    <div key={sdk.name} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{sdk.icon}</span>
                        <h4 className="text-white font-semibold">{sdk.name}</h4>
                      </div>
                      <code className="block p-3 bg-slate-900 rounded-lg text-sm text-emerald-400 font-mono">
                        {sdk.command}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
