'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RiskRatingSlider from '@/components/RiskRatingSlider';
import InvestmentGraph from '@/components/InvestmentGraph';

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
  riskRating: number;
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
      status: 'active',
      riskRating: 7
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
      status: 'active',
      riskRating: 4
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
      status: 'active',
      riskRating: 6
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
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-[--color-primary] transition-colors">
              Browse Projects
            </Link>
            <button className="rounded-lg border-2 border-slate-900 bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 hover:border-slate-800">
              Sign out
            </button>
          </div>
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

          {/* Investment Performance Graph */}
          <div className="mb-8">
            <InvestmentGraph investments={investments} />
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
                {investments.map((investment) => {
                  const progressDegrees = Math.max(0, Math.min(100, investment.projectProgress)) * 3.6;
                  const progressRingStyle = {
                    background: `conic-gradient(var(--color-primary) ${progressDegrees}deg, rgba(15, 31, 47, 0.12) ${progressDegrees}deg)`,
                  };

                  return (
                    <div key={investment.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                      {/* Header with icon, title, and progress circle */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
                            {investment.projectIcon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link 
                              href={`/${investment.projectSlug}`}
                              className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors block"
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
                        {/* Progress circle in header */}
                        <div className="relative h-14 w-14 rounded-full flex-shrink-0" style={progressRingStyle}>
                          <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-white shadow-sm">
                            <span className="text-xs font-semibold text-[--color-primary]">
                              {investment.projectProgress}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Key metrics grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Your Investment</p>
                          <p className="text-lg font-semibold text-slate-900 mt-1">€{investment.contributedAmount.toLocaleString()}</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Est. Quarterly Return</p>
                          <p className="text-lg font-semibold text-emerald-600 mt-1">€{investment.estimatedQuarterlyReturn.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Next Payout</p>
                          <p className="text-sm font-semibold text-slate-900 mt-1">{formatDate(investment.nextPayoutDate)}</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Received</p>
                          <p className="text-sm font-semibold text-slate-900 mt-1">€{investment.totalPaid.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Risk Rating Slider */}
                      <div className="mb-4">
                        <RiskRatingSlider riskRating={investment.riskRating} />
                      </div>

                      {/* Footer with additional info */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Revenue Share:</span>
                          <span className="text-sm font-semibold text-slate-900">{investment.revenueShare}%</span>
                        </div>
                        <Link
                          href={`/${investment.projectSlug}`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}