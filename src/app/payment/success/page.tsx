'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      checkPaymentStatus(orderId);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await fetch('/api/payment/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();
      setPaymentStatus(result);
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--color-primary] mx-auto mb-4"></div>
          <p className="text-slate-600">Checking payment status...</p>
        </div>
      </div>
    );
  }

  const getStatusInfo = (orderStatus: string | number) => {
    const status = String(orderStatus);
    switch (status) {
      case '0':
        return {
          isSuccessful: false,
          isPending: true,
          statusText: 'Order Registered',
          description: 'Your order has been registered but payment is not yet completed.',
          color: 'yellow',
          icon: 'clock'
        };
      case '1':
        return {
          isSuccessful: false,
          isPending: true,
          statusText: 'Pre-authorized',
          description: 'Amount is on hold on your account (two-phase payment).',
          color: 'yellow',
          icon: 'clock'
        };
      case '2':
        return {
          isSuccessful: true,
          isPending: false,
          statusText: 'Payment Successful',
          description: 'Your payment has been fully authorized and processed successfully!',
          color: 'green',
          icon: 'check'
        };
      case '3':
        return {
          isSuccessful: false,
          isPending: false,
          statusText: 'Authorization Canceled',
          description: 'The authorization has been canceled.',
          color: 'red',
          icon: 'x'
        };
      case '4':
        return {
          isSuccessful: false,
          isPending: false,
          statusText: 'Refunded',
          description: 'The transaction has been refunded.',
          color: 'blue',
          icon: 'refresh'
        };
      case '5':
        return {
          isSuccessful: false,
          isPending: true,
          statusText: 'Authorization in Progress',
          description: 'Your bank is processing the authorization.',
          color: 'yellow',
          icon: 'clock'
        };
      case '6':
        return {
          isSuccessful: false,
          isPending: false,
          statusText: 'Authorization Declined',
          description: 'Your payment was declined by the bank.',
          color: 'red',
          icon: 'x'
        };
      default:
        console.log('Unknown order status:', status, 'Type:', typeof status);
        return {
          isSuccessful: false,
          isPending: false,
          statusText: `Unknown Status (${status})`,
          description: `Payment status is unknown: ${status}. Please contact support.`,
          color: 'gray',
          icon: 'question'
        };
    }
  };

  const statusInfo = paymentStatus?.orderStatus ? getStatusInfo(paymentStatus.orderStatus) : null;
  const isSuccessful = statusInfo?.isSuccessful || false;
  const isPending = statusInfo?.isPending || false;

  // Debug logging
  console.log('Payment status received:', paymentStatus);
  console.log('Order status value:', paymentStatus?.orderStatus, 'Type:', typeof paymentStatus?.orderStatus);
  console.log('Status info:', statusInfo);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[--color-border]/70 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="text-sm font-semibold text-[--color-primary]">
            ← Back to home
          </Link>
          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Payment Status
          </span>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-2xl">
          <div className="text-center space-y-8">
            {/* Status Icon */}
            <div className="flex justify-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                statusInfo?.color === 'green' 
                  ? 'bg-emerald-100 text-emerald-600'
                  : statusInfo?.color === 'red'
                  ? 'bg-red-100 text-red-600'
                  : statusInfo?.color === 'yellow'
                  ? 'bg-yellow-100 text-yellow-600'
                  : statusInfo?.color === 'blue'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {statusInfo?.icon === 'check' ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : statusInfo?.icon === 'x' ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : statusInfo?.icon === 'clock' ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : statusInfo?.icon === 'refresh' ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Status Message */}
            <div className="space-y-4">
              <h1 className={`text-3xl font-semibold ${
                statusInfo?.color === 'green' 
                  ? 'text-emerald-600'
                  : statusInfo?.color === 'red'
                  ? 'text-red-600'
                  : statusInfo?.color === 'yellow'
                  ? 'text-yellow-600'
                  : statusInfo?.color === 'blue'
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}>
                {statusInfo?.statusText || 'Payment Status'}
              </h1>
              
              <p className="text-lg text-slate-600">
                {statusInfo?.description || 'Unable to determine payment status.'}
              </p>
            </div>

            {/* Payment Details */}
            {paymentStatus && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left">
                <h2 className="font-semibold text-blue-600 mb-4">Payment Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Order ID:</span>
                    <span className="font-mono text-xs">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <span className={`font-medium ${
                      statusInfo?.color === 'green' 
                        ? 'text-emerald-600'
                        : statusInfo?.color === 'red'
                        ? 'text-red-600'
                        : statusInfo?.color === 'yellow'
                        ? 'text-yellow-600'
                        : statusInfo?.color === 'blue'
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}>
                      {statusInfo?.statusText} (Code: {paymentStatus.orderStatus})
                    </span>
                  </div>
                  {paymentStatus.amount && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amount:</span>
                      <span className="font-medium">
                        €{(paymentStatus.amount / 100).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {paymentStatus.currency && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Currency:</span>
                      <span className="font-medium">
                        {paymentStatus.currency === '978' ? 'EUR' : paymentStatus.currency}
                      </span>
                    </div>
                  )}
                  {paymentStatus.actionCodeDescription && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Action:</span>
                      <span className="font-medium text-slate-700">
                        {paymentStatus.actionCodeDescription}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse More Projects
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
              
              {!isSuccessful && !isPending && (
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                >
                  Try Again
                </button>
              )}
              
              {isPending && (
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600"
                >
                  Refresh Status
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="rounded-lg bg-slate-50 p-6 text-left">
              <h3 className="font-medium text-slate-700 mb-2">
                What happens next?
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                {isSuccessful ? (
                  <>
                    <p>• You'll receive a confirmation email with your investment details</p>
                    <p>• Your funds will be held in escrow until the project reaches its funding target</p>
                    <p>• Once funded, you'll start receiving quarterly dividend payments</p>
                    <p>• You can track your investment progress in your dashboard</p>
                  </>
                ) : isPending ? (
                  <>
                    <p>• Your payment is being processed by your bank</p>
                    <p>• This may take a few minutes to complete</p>
                    <p>• You can refresh this page to check the latest status</p>
                    <p>• You'll receive an email once the payment is confirmed</p>
                  </>
                ) : (
                  <>
                    <p>• Please check your payment method and try again</p>
                    <p>• If the issue persists, contact our support team</p>
                    <p>• Your card has not been charged</p>
                    <p>• You can try a different payment method</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}