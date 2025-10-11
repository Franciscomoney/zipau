'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CircleSlider from '@/components/CircleSlider';
import RiskRatingSlider from '@/components/RiskRatingSlider';

interface ProjectData {
  title: string;
  slug: string;
  revenueShare: number;
  targetAmount: number;
  raisedAmount: number;
  minimumInvestment: number;
  riskRating: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get('project') || 'maria';
  
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [project, setProject] = useState<ProjectData | null>(null);

  // Project data - in a real app, this would come from an API
  const projects: Record<string, ProjectData> = {
    maria: {
      title: "Maria's Olive Loop Furniture",
      slug: "maria",
      revenueShare: 20,
      targetAmount: 5000,
      raisedAmount: 2400,
      minimumInvestment: 10,
      riskRating: 7,
    },
    gallikos: {
      title: "Eco-Corridor Gallikos Delta",
      slug: "gallikos",
      revenueShare: 15,
      targetAmount: 25000,
      raisedAmount: 8750,
      minimumInvestment: 25,
      riskRating: 4,
    },
    siembraviva: {
      title: "SiembraViva Digital Marketplace",
      slug: "siembraviva",
      revenueShare: 10,
      targetAmount: 100000,
      raisedAmount: 68000,
      minimumInvestment: 50,
      riskRating: 6,
    },
  };

  useEffect(() => {
    const projectData = projects[projectSlug];
    if (projectData) {
      setProject(projectData);
      setInvestmentAmount(Math.max(projectData.minimumInvestment, 100));
    }
  }, [projectSlug]);

  const calculateEstimatedIncome = (amount: number, revenueShare: number) => {
    // Assuming the project generates revenue equal to 2x the target amount annually
    const annualRevenue = project?.targetAmount ? project.targetAmount * 2 : 10000;
    const quarterlyRevenue = annualRevenue / 4;
    const investorShare = (amount / (project?.targetAmount || 1)) * revenueShare / 100;
    return Math.round(quarterlyRevenue * investorShare);
  };

  const handleInvestmentChange = (amount: number) => {
    setInvestmentAmount(amount);
    setError('');
  };

  const handleConfirmPayment = async () => {
    if (!project) return;
    
    if (investmentAmount < project.minimumInvestment) {
      setError(`Minimum investment is €${project.minimumInvestment}`);
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const orderNumber = `ZIPA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const response = await fetch('/api/payment/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: investmentAmount * 100, // Convert to cents
          currency: '978', // EUR
          description: `Investment in ${project.title}`,
          orderNumber,
        }),
      });

      const result = await response.json();

      if (result.success && result.formUrl) {
        // Redirect to payment gateway
        window.location.href = result.formUrl;
      } else {
        setError(result.error || 'Payment registration failed');
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-700">Project not found</h1>
          <Link href="/" className="text-[--color-primary] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const estimatedQuarterlyIncome = calculateEstimatedIncome(investmentAmount, project.revenueShare);
  const progress = Math.round((project.raisedAmount / project.targetAmount) * 100);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[--color-border]/70 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href={`/${project.slug}`} className="text-sm font-semibold text-[--color-primary]">
            ← Back to project
          </Link>
          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Investment Payment
          </span>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Investment Selection */}
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-[--color-primary] mb-2">
                  Invest in {project.title}
                </h1>
                <p className="text-slate-600">
                  Choose your investment amount and see your estimated quarterly returns
                </p>
              </div>

              {/* Circle Slider */}
              <div className="flex justify-center">
                <CircleSlider
                  min={project.minimumInvestment}
                  max={Math.min(project.targetAmount - project.raisedAmount, 10000)}
                  step={10}
                  value={investmentAmount}
                  onChange={handleInvestmentChange}
                />
              </div>

              {/* Investment Details */}
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Your Investment
                    </p>
                    <p className="text-2xl font-bold text-[--color-primary]">
                      €{investmentAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Est. Quarterly Income
                    </p>
                    <p className="text-2xl font-bold text-emerald-600">
                      €{estimatedQuarterlyIncome.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Risk Rating Slider */}
                <div className="rounded-2xl border border-[--color-border]/70 bg-white p-6">
                  <RiskRatingSlider riskRating={project.riskRating} />
                </div>

                <div className="rounded-2xl border border-[--color-border]/70 bg-white p-6">
                  <h3 className="font-semibold text-[--color-primary] mb-3">
                    Investment Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Revenue Share:</span>
                      <span className="font-medium">{project.revenueShare}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Project Progress:</span>
                      <span className="font-medium">{progress}% funded</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Remaining Target:</span>
                      <span className="font-medium">
                        €{(project.targetAmount - project.raisedAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-[--color-border]/70 bg-white p-8 shadow-lg">
                <h2 className="text-xl font-semibold text-[--color-primary] mb-6">
                  Payment Details
                </h2>

                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Investment Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => handleInvestmentChange(Number(e.target.value))}
                        min={project.minimumInvestment}
                        max={project.targetAmount - project.raisedAmount}
                        step="10"
                        className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Minimum: €{project.minimumInvestment}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-4">
                    <h3 className="font-medium text-slate-700 mb-2">Payment Method</h3>
                    <p className="text-sm text-slate-600">
                      You'll be redirected to our secure payment gateway to complete your investment using your debit or credit card.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing || investmentAmount < project.minimumInvestment}
                    className="w-full bg-[--color-primary] text-white py-4 px-6 rounded-lg font-semibold transition hover:bg-[--color-primary]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Invest €${investmentAmount.toLocaleString()}`}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By confirming, you agree to our terms of service and investment agreement.
                    Your funds will be held in escrow until the project reaches its funding target.
                  </p>
                </div>
              </div>

              {/* Project Info */}
              <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] p-6">
                <h3 className="font-semibold text-[--color-primary] mb-3">
                  About This Investment
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-slate-600">
                    You're investing in {project.title} and will receive {project.revenueShare}% of the project's quarterly revenue.
                  </p>
                  <p className="text-slate-600">
                    Your investment will be held in escrow by Bank of Cyprus Impact Desk until the project reaches its €{project.targetAmount.toLocaleString()} funding target.
                  </p>
                  <p className="text-slate-600">
                    Once funded, you'll receive quarterly dividend payments based on the project's performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}