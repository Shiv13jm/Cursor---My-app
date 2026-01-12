"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and testing",
    features: [
      "3 API Keys",
      "1,000 API calls/month",
      "Basic analytics",
      "Community support",
      "7-day log retention",
    ],
    limitations: [
      "No team members",
      "Rate limited to 10 req/min",
    ],
    cta: "Get Started",
    href: "/dashboards",
    popular: false,
    gradient: "from-slate-500 to-slate-600",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professional developers and startups",
    features: [
      "25 API Keys",
      "100,000 API calls/month",
      "Advanced analytics",
      "Priority email support",
      "30-day log retention",
      "5 team members",
      "Custom key prefixes",
      "Webhooks",
    ],
    limitations: [],
    cta: "Start Free Trial",
    href: "/dashboards",
    popular: true,
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large teams and organizations",
    features: [
      "Unlimited API Keys",
      "1,000,000 API calls/month",
      "Real-time analytics",
      "24/7 dedicated support",
      "90-day log retention",
      "Unlimited team members",
      "Custom key prefixes",
      "Webhooks & Events",
      "SSO/SAML",
      "SLA guarantee",
      "Custom contracts",
    ],
    limitations: [],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
    gradient: "from-violet-500 to-purple-500",
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.",
  },
  {
    question: "What happens if I exceed my API call limit?",
    answer: "We'll notify you when you're approaching your limit. If you exceed it, requests will be rate-limited until your next billing cycle or you upgrade.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes! Pro plan comes with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. Cancel anytime with no questions asked. You'll retain access until the end of your billing period.",
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">KeyVault</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/docs" className="text-slate-400 hover:text-white transition-colors px-3 py-2 text-sm sm:text-base">
            Docs
          </Link>
          <Link href="/auth/signin" className="text-slate-400 hover:text-white transition-colors px-3 py-2 text-sm sm:text-base">
            Sign In
          </Link>
          <Link href="/dashboards" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all font-medium text-sm sm:text-base border border-white/10">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Simple, transparent pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Choose your plan
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${billingPeriod === "monthly" ? "text-white" : "text-slate-500"}`}>Monthly</span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
              className="relative w-14 h-7 bg-white/10 rounded-full transition-colors"
            >
              <div className={`absolute top-1 w-5 h-5 bg-emerald-500 rounded-full transition-transform ${billingPeriod === "yearly" ? "translate-x-8" : "translate-x-1"}`} />
            </button>
            <span className={`text-sm ${billingPeriod === "yearly" ? "text-white" : "text-slate-500"}`}>
              Yearly <span className="text-emerald-400 text-xs">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all hover:scale-[1.02] ${
                plan.popular ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10" : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  {billingPeriod === "yearly" && plan.price !== "$0"
                    ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                    : plan.price}
                </span>
                <span className="text-slate-400">{plan.period}</span>
              </div>

              <Link
                href={plan.href}
                className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all mb-8 ${
                  plan.popular
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/25"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 flex-shrink-0 mt-0.5">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span className="text-slate-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                >
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-slate-400 flex-shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <p className="text-slate-400 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Need a custom plan?</h3>
            <p className="text-slate-400 mb-6 text-sm sm:text-base">Contact us for custom pricing and enterprise features.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-100 transition-all"
            >
              Contact Sales
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 KeyVault. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-500 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
