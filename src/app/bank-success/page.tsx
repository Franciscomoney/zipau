'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function BankSuccessContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [connectionData, setConnectionData] = useState({
    subscriptionId: '',
    code: '',
    timestamp: ''
  });

  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const subscriptionId = searchParams.get('subscriptionid');

  useEffect(() => {
    // If accessing from localhost, redirect to server URL with all query params
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      const searchString = window.location.search;
      const serverUrl = `http://51.178.253.51:2020/bank-success${searchString}`;
      window.location.href = serverUrl;
      return;
    }

    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Store connection data
    if (code && subscriptionId) {
      const connectionInfo = {
        subscriptionId,
        code,
        timestamp: new Date().toISOString()
      };

      setConnectionData(connectionInfo);
      localStorage.setItem('boc_connection_success', JSON.stringify(connectionInfo));
      localStorage.setItem('boc_connected', 'true');
      localStorage.setItem('boc_subscription_id', subscriptionId);
    }

    return () => clearTimeout(timer);
  }, [code, subscriptionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Processing Connection...</h2>
          <p className="text-slate-600">Please wait while we verify your Bank of Cyprus connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50">
      <header className="border-b border-white/20 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 text-lg font-semibold text-white">
              Z
            </span>
            <div>
              <p className="text-lg font-semibold">Zipa</p>
              <p className="text-sm text-slate-500">Bank Connection Success</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            <Link href="/" className="hover:text-blue-600">
              Browse Projects
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-3xl">
          <div className="text-center space-y-8">
            {/* Success Animation */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-2 border-emerald-300 animate-pulse"></div>
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-slate-900">
                🎉 Success!
              </h1>
              <h2 className="text-3xl font-semibold text-emerald-600">
                Bank of Cyprus Connected
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Your Bank of Cyprus account has been successfully connected and verified. 
                You're now ready to start investing in impactful projects!
              </p>
            </div>

            {/* Connection Details Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">Connection Details</h3>
                  <p className="text-slate-600">Your account is now linked and ready for use</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-slate-900">Status</h4>
                    </div>
                    <p className="text-emerald-600 font-medium">✓ Connected & Verified</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-slate-900">Subscription ID</h4>
                    </div>
                    <p className="text-slate-600 font-mono text-sm break-all">{connectionData.subscriptionId || 'N/A'}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-slate-900 mb-3">What's Next?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">Invest directly from your Bank of Cyprus account</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">Receive automatic quarterly dividend payments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">Track all your investments in your personal dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Investment Opportunities
              </Link>
              
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-3 bg-white text-slate-700 py-4 px-8 rounded-2xl font-semibold text-lg border-2 border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:text-blue-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Your Dashboard
              </Link>
            </div>

            {/* Additional Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-6 max-w-2xl mx-auto">
              <h4 className="font-semibold text-slate-900 mb-3">Need Help?</h4>
              <p className="text-slate-600 text-sm mb-4">
                If you have any questions about your Bank of Cyprus connection or need assistance with investing, 
                our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:support@zipa.app"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  📧 support@zipa.app
                </a>
                <span className="hidden sm:block text-slate-300">•</span>
                <a
                  href="tel:+357-22-123456"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  📞 +357 22 123 456
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BankSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <BankSuccessContent />
    </Suspense>
  );
}