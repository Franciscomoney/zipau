"use client";

import Link from "next/link";
import { useState } from "react";

export default function StartInvestingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agreeToTerms: false,
  });

  const [bankConnected, setBankConnected] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleBankConnect = () => {
    // Simulate bank connection
    alert("Connecting to Bank of Cyprus... This will redirect to secure banking authentication.");
    setTimeout(() => {
      setBankConnected(true);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankConnected) {
      alert("Please connect your Bank of Cyprus account to continue.");
      return;
    }
    console.log("Investor registration:", formData);
    alert("Registration successful! You can now start investing in impact projects.");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="border-b border-[--color-border]/70 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="text-sm font-semibold text-[--color-primary]">
            ← Back to home
          </Link>
          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Start Investing</span>
        </div>
      </header>

      <main className="py-16">
        <div className="container max-w-2xl">
          <div className="space-y-4 mb-12 text-center">
            <h1 className="text-4xl font-bold text-[--color-primary]">Start Your Impact Journey</h1>
            <p className="text-lg text-slate-600">
              Create your investor account in minutes and start supporting social impact projects.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Card */}
            <div className="rounded-[32px] border border-[--color-border]/70 bg-white p-8 shadow-xl">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-[--color-primary]">Your Information</h2>

                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="+357 ..."
                  />
                </div>
              </div>
            </div>

            {/* Bank Connection Card */}
            <div className="rounded-[32px] border border-[--color-border]/70 bg-white p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[--color-primary] to-[--color-accent]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="9 22 9 12 15 12 15 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[--color-primary]">Connect Your Bank</h2>
                    <p className="text-sm text-slate-600">Secure connection via Bank of Cyprus</p>
                  </div>
                </div>

                {!bankConnected ? (
                  <button
                    type="button"
                    onClick={handleBankConnect}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[--color-primary] bg-white px-6 py-4 text-base font-semibold text-[--color-primary] transition hover:bg-[--color-primary] hover:text-white"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Connect Bank of Cyprus Account
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 px-6 py-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-emerald-600"
                    >
                      <path
                        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="22 4 12 14.01 9 11.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-base font-semibold text-emerald-700">
                      Bank of Cyprus Connected
                    </span>
                  </div>
                )}

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5 flex-shrink-0 text-slate-500"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Your banking information is secured with 256-bit encryption. We use Bank of Cyprus&apos;s official API for secure authentication. We never store your banking credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="rounded-[32px] border border-[--color-border]/70 bg-white p-8 shadow-xl">
              <div className="space-y-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-5 w-5 rounded border-slate-300 text-[--color-primary] transition focus:ring-2 focus:ring-[--color-primary]/20"
                  />
                  <span className="text-sm text-slate-600">
                    I agree to the{" "}
                    <Link href="#" className="font-semibold text-[--color-primary] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="font-semibold text-[--color-primary] hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand that investments carry risks and past performance does not guarantee future returns.
                  </span>
                </label>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={!bankConnected}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Registration
                  </button>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-[--color-primary] hover:text-[--color-primary]"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </form>

          {/* Benefits Section */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[--color-muted] text-[--color-primary]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-700">Curated Projects</p>
              <p className="text-xs text-slate-600">Vetted social impact ventures</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[--color-muted] text-[--color-primary]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-700">Quarterly Returns</p>
              <p className="text-xs text-slate-600">Regular dividend payments</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[--color-muted] text-[--color-primary]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-700">Full Transparency</p>
              <p className="text-xs text-slate-600">Track your impact in real-time</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
