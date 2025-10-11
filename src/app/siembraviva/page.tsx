'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

const heroImage = "/generated/2025-10-11_07-14-16-234.webp";

const keyStats = [
  { label: "Target raise", value: "€100,000" },
  { label: "Revenue share", value: "10%" },
  { label: "Minimum investment", value: "€100 · 100 shares" },
  { label: "Shares available", value: "1,000 total" },
];

const impactHighlights = [
  "Traceability algorithms serve as collateral, tracking produce from farm to buyer with blockchain verification.",
  "Direct-to-buyer model eliminates intermediaries, increasing farmer income by an average of 35%.",
  "Platform already connects 2,400 smallholder farmers with regional buyers and export markets.",
];

const proceedsUse = [
  {
    title: "Platform expansion",
    detail: "Scaling marketplace infrastructure to onboard 5,000 additional farmers across Colombia's coffee and cacao regions.",
  },
  {
    title: "Traceability tech",
    detail: "Enhancing blockchain-based supply chain tracking with IoT sensors for real-time quality monitoring and carbon footprint calculations.",
  },
  {
    title: "Market access",
    detail: "Establishing export partnerships with EU specialty food distributors and premium restaurant chains seeking verified sustainable sourcing.",
  },
];

export default function SiembraVivaPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const goalAmount = 100000;
  const raisedAmount = 68000;
  const progress = Math.round((raisedAmount / goalAmount) * 100);

  const projectData = {
    title: "SiembraViva Digital Marketplace",
    slug: "siembraviva",
    revenueShare: 10,
    targetAmount: 100000,
    raisedAmount: 68000,
    minimumInvestment: 50,
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="border-b border-[--color-border]/70 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="text-sm font-semibold text-[--color-primary]">
            ← Back to opportunities
          </Link>
          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">AgriTech marketplace</span>
        </div>
      </header>

      <main className="space-y-16">
        <section className="bg-white pt-12">
          <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Colombia • AgriTech
                </span>
                <h1 className="text-3xl font-semibold leading-tight text-[--color-primary] sm:text-4xl">
                  SiembraViva AgriTech Marketplace
                </h1>
              </div>
              <div className="overflow-hidden rounded-[36px] border border-[--color-border]/60 bg-white shadow-xl">
                <Image
                  src={heroImage}
                  alt="Colombian farmers using SiembraViva digital marketplace on mobile devices"
                  width={1400}
                  height={1100}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-slate-600">
                  Invest in Colombia&apos;s leading digital marketplace connecting smallholder farmers directly with buyers. Your stake funds platform expansion backed by proprietary traceability algorithms that serve as growth capital collateral.
                </p>
                <ul className="grid gap-3">
                  {impactHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="space-y-6 rounded-[32px] border border-[--color-border]/70 bg-white p-8 shadow-xl lg:mt-[7.5rem]">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  <span>Funding progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  €{raisedAmount.toLocaleString("en-GB", { minimumFractionDigits: 0 })} raised • €{(goalAmount - raisedAmount).toLocaleString("en-GB", { minimumFractionDigits: 0 })} remaining
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {keyStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-lg font-semibold text-[--color-primary]">{stat.value}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-600"
              >
                Invest
              </button>
              <p className="text-xs leading-relaxed text-slate-500">
                Shares issued and escrowed by Bank of Cyprus Impact Desk. Minimum subscription: €100 for 100 shares. Funds are released once the full €100,000 target is reached.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-[#f8fafc] py-16">
          <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold leading-tight text-[--color-primary]">
                Project snapshot
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                SiembraViva eliminates exploitative middlemen by connecting smallholder farmers directly with buyers through a transparent digital marketplace. Blockchain-based traceability algorithms provide supply chain verification while serving as IP collateral for growth financing.
              </p>
              <ul className="grid gap-3">
                {impactHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-[--color-border]/60 bg-white shadow-lg">
                  <Image
                    src="/generated/2025-10-11_08-21-15-094.webp"
                    alt="Colombian farmers using smartphones to access digital marketplace"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[--color-border]/60 bg-white shadow-lg">
                  <Image
                    src="/generated/2025-10-11_08-22-22-430.webp"
                    alt="Farmers collaborating to prepare products for market distribution"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-[28px] border border-[--color-border]/70 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Use of funds</p>
              <div className="space-y-5">
                {proceedsUse.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <p className="text-sm font-semibold text-[--color-primary]">{item.title}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pb-16">
          <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-start">
            <div className="space-y-4 rounded-[28px] border border-[--color-border]/70 bg-[--color-muted] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Investor note</p>
              <p className="text-sm leading-relaxed text-slate-600">
                Dividends are issued quarterly from 10% of net income until investors achieve a 3.2x multiple. Transparent reporting is delivered via Zipa dashboards and email recaps.
              </p>
            </div>
            <div className="space-y-4 rounded-[28px] border border-[--color-border]/70 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Founder message</p>
              <p className="text-sm leading-relaxed text-slate-600">
                &ldquo;Every transaction on SiembraViva means a farmer gets paid fairly and on time. This funding will help us reach thousands more families who deserve direct market access.&rdquo; — Carlos Mendoza, Co-Founder & CEO
              </p>
              <p className="text-xs text-slate-500">Questions? Email partners@andeanresilience.co for detailed financials, farmer testimonials, and traceability documentation.</p>
            </div>
          </div>
        </section>
      </main>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        project={projectData}
      />
    </div>
  );
}
