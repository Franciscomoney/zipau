'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

function StartInvestingContent() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [connectionStep, setConnectionStep] = useState<'initial' | 'connecting' | 'redirecting' | 'success' | 'error'>('initial');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    mobileNumber: ''
  });
  
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const subscriptionId = searchParams.get('subscriptionid');

  useEffect(() => {
    // Check if user is returning from Bank of Cyprus authorization
    console.log('URL params - code:', code, 'subscriptionId:', subscriptionId);
    
    if (code && subscriptionId) {
      console.log('Bank of Cyprus callback detected, setting success state');
      setConnectionStep('success');
      setIsConnected(true);
      // Store the connection info in localStorage for persistence
      localStorage.setItem('boc_connected', 'true');
      localStorage.setItem('boc_subscription_id', subscriptionId);
    }
  }, [code, subscriptionId]);

  // Check if user was previously connected
  useEffect(() => {
    const isPreviouslyConnected = localStorage.getItem('boc_connected') === 'true';
    const storedSubscriptionId = localStorage.getItem('boc_subscription_id');
    
    if (isPreviouslyConnected && storedSubscriptionId) {
      setConnectionStep('success');
      setIsConnected(true);
    }
  }, []);

  const handleDisconnectBank = () => {
    localStorage.removeItem('boc_connected');
    localStorage.removeItem('boc_subscription_id');
    setConnectionStep('initial');
    setIsConnected(false);
  };

  const handleRegistrationChange = (field: string, value: string) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log('Registration data:', registrationData);
    // Store registration data and proceed to bank connection
    localStorage.setItem('user_registration', JSON.stringify(registrationData));
    setShowRegistrationForm(false);
    // Proceed to bank connection
    handleConnectBank();
  };

  const handleConnectBank = async () => {
    setIsConnecting(true);
    setError('');
    setConnectionStep('connecting');

    try {
      // Step 1: Get auth token
      const authResponse = await fetch('/api/boc/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const authResult = await authResponse.json();

      if (!authResult.success) {
        throw new Error(authResult.error || 'Failed to authenticate with Bank of Cyprus');
      }

      // Step 2: Create subscription
      const subscriptionResponse = await fetch('/api/boc/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: authResult.access_token,
        }),
      });

      const subscriptionResult = await subscriptionResponse.json();

      if (!subscriptionResult.success) {
        throw new Error(subscriptionResult.error || 'Failed to create subscription');
      }

      // Step 3: Redirect to Bank of Cyprus authorization
      setConnectionStep('redirecting');

      const redirectUri = 'http://localhost:2020/bank-success';
      const authUrl = `https://sandbox-apis.bankofcyprus.com/df-boc-org-sb/sb/psd2/oauth2/authorize?response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=UserOAuth2Security&client_id=e0aa7524ace12e4d901818d5501a1a49&subscriptionid=${subscriptionResult.subscription_id}`;

      // Redirect to Bank of Cyprus
      window.location.href = authUrl;

    } catch (err) {
      console.error('Bank connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to Bank of Cyprus');
      setConnectionStep('error');
      setIsConnecting(false);
    }
  };

  const getStepContent = () => {
    switch (connectionStep) {
      case 'connecting':
        return {
          title: 'Connecting to Bank of Cyprus...',
          description: 'Setting up secure connection to your bank account.',
          icon: '🔄',
          showSpinner: true
        };
      case 'redirecting':
        return {
          title: 'Redirecting to Bank of Cyprus',
          description: 'You will be redirected to complete the authorization process.',
          icon: '🔗',
          showSpinner: true
        };
      case 'success':
        return {
          title: '🎉 Bank of Cyprus Integration Successful!',
          description: 'Your bank account has been successfully connected and approved. You can now make investments directly from your account and receive automatic dividend payments.',
          icon: '✅',
          showSpinner: false
        };
      case 'error':
        return {
          title: 'Connection Failed',
          description: error || 'There was an error connecting to Bank of Cyprus. Please try again.',
          icon: '❌',
          showSpinner: false
        };
      default:
        return {
          title: isConnected ? 'Bank of Cyprus Account Connected' : 'Connect Your Bank of Cyprus Account',
          description: isConnected 
            ? 'Your Bank of Cyprus account is already connected. You can manage your connection or start investing.'
            : 'Link your Bank of Cyprus account to enable seamless investments and automatic dividend payments.',
          icon: isConnected ? '✅' : '🏦',
          showSpinner: false
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-[--color-border]/70 bg-white/60 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/zipa-logo-horizontal.png"
              alt="Zipa - Decentralized Bank"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
          <Link href="/dashboard" className="rounded-lg border-2 border-slate-900 bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 hover:border-slate-800">
            Login
          </Link>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-2xl">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-slate-900">
                Start Your Investment Journey
              </h1>
              <p className="text-lg text-slate-600">
                Connect your Bank of Cyprus account to begin investing in impactful projects
              </p>
            </div>

            {/* Connection Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <div className="space-y-6">
                {/* Status Icon */}
                <div className="flex justify-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
                    connectionStep === 'success' 
                      ? 'bg-emerald-100 text-emerald-600'
                      : connectionStep === 'error'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {stepContent.showSpinner ? (
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-current"></div>
                    ) : (
                      stepContent.icon
                    )}
                  </div>
                </div>

                {/* Status Content */}
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {stepContent.title}
                  </h2>
                  <p className="text-slate-600">
                    {stepContent.description}
                  </p>
                </div>

                {/* Registration Form or Action Buttons */}
                {connectionStep === 'initial' && (
                  <div className="space-y-4">
                    {!isConnected ? (
                      <>
                        {!showRegistrationForm ? (
                          <>
                            <button
                              onClick={() => setShowRegistrationForm(true)}
                              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold transition hover:bg-blue-700"
                            >
                              Get Started - Complete Registration
                            </button>
                            
                            <div className="text-sm text-slate-500">
                              <p>• Complete your profile to start investing</p>
                              <p>• Connect your Bank of Cyprus account securely</p>
                              <p>• Enable automatic dividend payments</p>
                            </div>
                          </>
                        ) : (
                          <div className="space-y-6">
                            <div className="text-center">
                              <h3 className="text-lg font-semibold text-slate-900 mb-2">Complete Your Registration</h3>
                              <p className="text-slate-600">Please provide your details to start investing</p>
                            </div>

                            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Full Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={registrationData.fullName}
                                  onChange={(e) => handleRegistrationChange('fullName', e.target.value)}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter your full name"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={registrationData.email}
                                  onChange={(e) => handleRegistrationChange('email', e.target.value)}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter your email address"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Mobile Number *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={registrationData.mobileNumber}
                                  onChange={(e) => handleRegistrationChange('mobileNumber', e.target.value)}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter your mobile number"
                                />
                              </div>

                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => setShowRegistrationForm(false)}
                                  className="flex-1 border border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-semibold transition hover:border-slate-400"
                                >
                                  Back
                                </button>
                                <button
                                  type="submit"
                                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition hover:bg-blue-700"
                                >
                                  Complete Registration
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-emerald-800">Account Connected</p>
                              <p className="text-sm text-emerald-600">Your Bank of Cyprus account is ready for investing</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            href="/"
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition hover:bg-blue-700"
                          >
                            Start Investing
                          </Link>
                          <Link
                            href="/dashboard"
                            className="flex-1 border border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-semibold text-center transition hover:border-blue-500 hover:text-blue-600"
                          >
                            View Dashboard
                          </Link>
                        </div>

                        <button
                          onClick={handleDisconnectBank}
                          className="w-full text-red-600 py-2 px-4 rounded-lg font-medium text-sm transition hover:bg-red-50"
                        >
                          Disconnect Bank Account
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {connectionStep === 'success' && (
                  <div className="space-y-6">
                    {/* Success Banner */}
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-emerald-800 mb-2">Integration Complete!</h3>
                          <p className="text-emerald-700 mb-3">
                            Your Bank of Cyprus account is now connected and ready for seamless investing.
                          </p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-sm font-medium text-emerald-800">Subscription ID</p>
                            <p className="text-sm text-emerald-600 font-mono">{subscriptionId || 'Connected'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What's Next */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h4 className="font-semibold text-slate-900 mb-4">What you can do now:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-slate-700">Invest directly from your bank account</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-slate-700">Receive automatic quarterly dividend payments</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-slate-700">Track all investments in your dashboard</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/"
                        className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-center transition hover:bg-blue-700 shadow-lg hover:shadow-xl"
                      >
                        Browse Investment Opportunities
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex-1 border-2 border-slate-300 text-slate-700 py-4 px-6 rounded-lg font-semibold text-center transition hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        View Your Dashboard
                      </Link>
                    </div>
                  </div>
                )}

                {connectionStep === 'error' && (
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setConnectionStep('initial');
                        setError('');
                        setIsConnecting(false);
                      }}
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold transition hover:bg-blue-700"
                    >
                      Try Again
                    </button>
                    
                    <Link
                      href="/"
                      className="block text-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      ← Back to Home
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Debug Info - Remove in production */}
            {(code || subscriptionId) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Debug Info:</h4>
                <p className="text-sm text-yellow-700">Code: {code || 'None'}</p>
                <p className="text-sm text-yellow-700">Subscription ID: {subscriptionId || 'None'}</p>
                <p className="text-sm text-yellow-700">Current Step: {connectionStep}</p>
                <p className="text-sm text-yellow-700">Is Connected: {isConnected ? 'Yes' : 'No'}</p>
                <button
                  onClick={() => {
                    setConnectionStep('success');
                    setIsConnected(true);
                  }}
                  className="mt-2 px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                >
                  Force Success State (Test)
                </button>
              </div>
            )}

            {/* Features */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Seamless Payments</h3>
                <p className="text-sm text-slate-600">Invest directly from your Bank of Cyprus account without manual transfers.</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Automatic Dividends</h3>
                <p className="text-sm text-slate-600">Receive quarterly dividends directly to your connected bank account.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StartInvestingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <StartInvestingContent />
    </Suspense>
  );
}