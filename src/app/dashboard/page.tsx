'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Investment {
  id: string;
  projectTitle: string;
  projectSlug: string;
  projectDescription: string;
  projectIcon: string;
  projectImage: string;
  contributedAmount: number;
  estimatedQuarterlyReturn: number;
  nextPayoutDate: string;
  totalPaid: number;
  revenueShare: number;
  projectProgress: number;
  investmentDate: string;
  status: 'active' | 'completed' | 'pending';
}

export default function DashboardPage() {
  const [investments] = useState<Investment[]>([
    {
      id: 'inv-001',
      projectTitle: "Maria's Olive Loop Furniture",
      projectSlug: 'maria',
      projectDescription: "Circular studio turning olive pits, pomace, and pruning waste into heirloom furniture for boutique hotels and design-forward homes.",
      projectIcon: '🪑',
      projectImage: '/generated/2025-10-11_07-13-39-081.webp',
      contributedAmount: 500,
      estimatedQuarterlyReturn: 125,
      nextPayoutDate: '2024-04-15',
      totalPaid: 0,
      revenueShare: 20,
      projectProgress: 48,
      investmentDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 'inv-002',
      projectTitle: "Eco-Corridor Gallikos Delta",
      projectSlug: 'gallikos',
      projectDescription: "Restoring the Gallikos River Delta with pollution mitigation, biodiversity labs, and school programs built on proprietary eco-mapping IP.",
      projectIcon: '🌿',
      projectImage: '/generated/2025-10-11_07-13-58-156.webp',
      contributedAmount: 1000,
      estimatedQuarterlyReturn: 150,
      nextPayoutDate: '2024-04-15',
      totalPaid: 0,
      revenueShare: 15,
      projectProgress: 35,
      investmentDate: '2024-01-20',
      status: 'active'
    },
    {
      id: 'inv-003',
      projectTitle: "SiembraViva Digital Marketplace",
      projectSlug: 'siembraviva',
      projectDescription: "Digital marketplace connecting smallholder farmers directly with buyers, using traceability algorithms as collateral for growth capital.",
      projectIcon: '🌾',
      projectImage: '/generated/2025-10-11_07-14-16-234.webp',
      contributedAmount: 2500,
      estimatedQuarterlyReturn: 250,
      nextPayoutDate: '2024-04-15',
      totalPaid: 0,
      revenueShare: 10,
      projectProgress: 68,
      investmentDate: '2024-02-01',
      status: 'active'
    }
  ]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.contributedAmount, 0);
  const totalEstimatedQuarterly = investments.reduce((sum, inv) => sum + inv.estimatedQuarterlyReturn, 0);
  const totalPaid = investments.reduce((sum, inv) => sum + inv.totalPaid, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 text-lg font-semibold text-white">
              Z
            </span>
            <div>
              <p className="text-lg font-semibold">Zipa</p>
              <p className="text-sm text-slate-500">Investor Dashboard</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            <Link href="/" className="hover:text-blue-600">
              Browse Projects
            </Link>
            <Link href="/dashboard" className="text-blue-600 font-semibold">
              Dashboard
            </Link>
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="py-8">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Investment Dashboard</h1>
            <p className="text-slate-600">Track your impact investments and returns</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Total Invested</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">€{totalInvested.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Est. Quarterly Return</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">€{totalEstimatedQuarterly.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Next Payout</h3>
              </div>
              <p className="text-2xl font-bold text-amber-600">{formatDate('2024-04-15')}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Total Received</h3>
              </div>
              <p className="text-2xl font-bold text-purple-600">€{totalPaid.toLocaleString()}</p>
            </div>
          </div>

          {/* Investments List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Your Investments</h2>
            
            {investments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No investments yet</h3>
                <p className="text-slate-600 mb-6">Start investing in impactful projects to see them here.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Browse Projects
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 11.5L11.5 4M11.5 4H5.5M11.5 4V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {investments.map((investment) => (
                  <div key={investment.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                        {investment.projectIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/${investment.projectSlug}`}
                          className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          {investment.projectTitle}
                        </Link>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {investment.projectDescription}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                            {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                          </span>
                          <span className="text-xs text-slate-500">
                            Invested {formatDate(investment.investmentDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Your Investment</p>
                        <p className="text-lg font-semibold text-slate-900">€{investment.contributedAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Est. Quarterly Return</p>
                        <p className="text-lg font-semibold text-emerald-600">€{investment.estimatedQuarterlyReturn.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Next Payout</p>
                        <p className="text-sm font-semibold text-slate-900">{formatDate(investment.nextPayoutDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Received</p>
                        <p className="text-sm font-semibold text-slate-900">€{investment.totalPaid.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Revenue Share:</span>
                        <span className="text-sm font-semibold text-slate-900">{investment.revenueShare}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Progress:</span>
                        <span className="text-sm font-semibold text-slate-900">{investment.projectProgress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}