'use client';

import { useState, useEffect } from 'react';
import CircleSlider from './CircleSlider';

interface ProjectData {
  title: string;
  slug: string;
  revenueShare: number;
  targetAmount: number;
  raisedAmount: number;
  minimumInvestment: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

export default function PaymentModal({ isOpen, onClose, project }: PaymentModalProps) {
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project && isOpen) {
      const initialAmount = Math.max(project.minimumInvestment, 100);
      setInvestmentAmount(initialAmount);
      setError('');
    }
  }, [project, isOpen]);

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

  if (!isOpen || !project) return null;

  const estimatedQuarterlyIncome = calculateEstimatedIncome(investmentAmount, project.revenueShare);
  const progress = Math.round((project.raisedAmount / project.targetAmount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600">
              Invest in {project.title}
            </h2>
            <p className="text-slate-600 mt-1">
              Choose your investment amount and see your estimated quarterly returns
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* Investment Selection */}
            <div className="space-y-6">
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
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Your Investment
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      €{investmentAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Est. Quarterly Income
                    </p>
                    <p className="text-2xl font-bold text-emerald-600">
                      €{estimatedQuarterlyIncome.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-semibold text-blue-600 mb-3">
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
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Payment Details
                </h3>

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
                        className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Minimum: €{project.minimumInvestment}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-4">
                    <h4 className="font-medium text-slate-700 mb-2">Payment Method</h4>
                    <p className="text-sm text-slate-600">
                      You'll be redirected to our secure payment gateway to complete your investment using your debit or credit card.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing || investmentAmount < project.minimumInvestment}
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      isProcessing || investmentAmount < project.minimumInvestment
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isProcessing 
                      ? 'Processing...' 
                      : investmentAmount < project.minimumInvestment
                        ? `Minimum investment: €${project.minimumInvestment}`
                        : `Invest €${investmentAmount.toLocaleString()}`
                    }
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By confirming, you agree to our terms of service and investment agreement.
                    Your funds will be held in escrow until the project reaches its funding target.
                  </p>
                </div>
              </div>

              {/* Project Info */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-semibold text-blue-600 mb-3">
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
      </div>
    </div>
  );
}