'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import RiskRatingSlider from "@/components/RiskRatingSlider";

const heroImage = "/generated/usa-brooklyn-hiphop-producer.png";

const keyStats = [
  { label: "Loan Amount", value: "$5,000" },
  { label: "Interest Rate", value: "25% APR" },
  { label: "Minimum Lend", value: "$50" },
  { label: "Loan Term", value: "24 months" },
];

const highlights = [
  "15 Beat Catalog with major label placements earning $1,200/month from streaming and beat sales.",
  "Producer Tag IP Rights included, used across multiple commercial releases and artist collaborations.",
  "1.2M streams/month plus $800 in direct beat sales, verified through DistroKid and BeatStars analytics.",
];

const useOfFunds = [
  {
    title: "Professional studio build",
    detail: "Upgrade to professional mixing console, high-end studio monitors, acoustic treatment, and soundproofing for client sessions.",
  },
  {
    title: "Sample library expansion",
    detail: "Invest in premium sample packs, exclusive drum kits, and professional VST plugins to diversify production capabilities.",
  },
  {
    title: "Marketing and branding",
    detail: "Launch producer website, professional branding package, and targeted social media advertising to attract higher-paying clients.",
  },
];

export default function BrooklynProducerPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const loanAmount = 5000;
  const fundedAmount = 1400;
  const progress = Math.round((fundedAmount / loanAmount) * 100);

  const projectData = {
    title: "USA: Brooklyn Hip-Hop Producer Catalog",
    slug: "brooklyn-producer",
    revenueShare: 25,
    targetAmount: 5000,
    raisedAmount: 1400,
    minimumInvestment: 50,
    riskRating: 5,
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="border-b border-[--color-border]/70 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="text-sm font-semibold text-[--color-primary]">
            ← Back to loan opportunities
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-[--color-primary]">
              Dashboard
            </Link>
            <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Hip-Hop Production</span>
          </div>
        </div>
      </header>

      <main className="space-y-16">
        <section className="bg-white pt-12">
          <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  United States • Music Production
                </span>
                <h1 className="text-3xl font-semibold leading-tight text-[--color-primary] sm:text-4xl">
                  Brooklyn Hip-Hop Producer Catalog
                </h1>
              </div>
              <div className="overflow-hidden rounded-[36px] border border-[--color-border]/60 bg-white shadow-xl">
                <Image
                  src={heroImage}
                  alt="Brooklyn hip-hop producer working in professional home studio"
                  width={1400}
                  height={1100}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-slate-600">
                  Brooklyn-based producer with placements on major label albums, earning $1,200/month from beat sales and streaming. Borrowing to build professional studio and expand sample library to attract higher-paying artist clients.
                </p>
                <ul className="grid gap-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="space-y-6 rounded-[32px] border border-[--color-border]/70 bg-white p-8 shadow-xl lg:mt-[7.5rem]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[--color-primary]">Loan Details</h3>
                <div className="relative h-16 w-16 rounded-full" style={{
                  background: `conic-gradient(var(--color-primary) ${progress * 3.6}deg, rgba(15, 31, 47, 0.12) ${progress * 3.6}deg)`,
                }}>
                  <div className="absolute inset-[4px] flex items-center justify-center rounded-full bg-white shadow-sm">
                    <span className="text-sm font-semibold text-[--color-primary]">
                      {progress}%
                    </span>
                  </div>
                </div>
              </div>

              <RiskRatingSlider riskRating={projectData.riskRating} />

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
                  ${fundedAmount.toLocaleString("en-US")} funded • ${(loanAmount - fundedAmount).toLocaleString("en-US")} remaining
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
                Lend Now
              </button>
              <p className="text-xs leading-relaxed text-slate-500">
                Collateral held as ERC-1155 NFT tokens in smart contract escrow. Monthly repayments of $245 in USDT/USDC. Lenders earn 25% APR. If default after 90 days, collateral NFT tokens unlock for resale.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-[#f8fafc] py-16">
          <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold leading-tight text-[--color-primary]">
                Loan snapshot
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                This Brooklyn-based producer has built credibility with major label placements and consistent revenue from both streaming and direct beat sales. The catalog of 15 beats generates reliable income, with verified analytics showing strong performance across platforms.
              </p>
              <ul className="grid gap-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-[--color-border]/60 bg-white shadow-lg">
                  <Image
                    src="/generated/brooklyn-detail-1.png"
                    alt="Producer hands working on MPC drum machine creating beats"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[--color-border]/60 bg-white shadow-lg">
                  <Image
                    src="/generated/brooklyn-detail-2.png"
                    alt="Professional vocal booth and recording setup in Brooklyn studio"
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
                {useOfFunds.map((item) => (
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
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Lender protection</p>
              <p className="text-sm leading-relaxed text-slate-600">
                Lenders receive ERC-1155 tokens representing fractional ownership of the 15-beat catalog plus producer tag IP rights. Monthly repayments are made in USDT/USDC. After 90 days of default, your collateral NFT tokens unlock and can be sold on the IP marketplace or licensed directly.
              </p>
            </div>
            <div className="space-y-4 rounded-[28px] border border-[--color-border]/70 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Borrower message</p>
              <p className="text-sm leading-relaxed text-slate-600">
                &ldquo;I&apos;ve been producing in Brooklyn for 5 years with placements on major labels. This loan will help me upgrade to a professional studio where I can host artist sessions and command higher rates. Your support takes my career to the next level.&rdquo; — Brooklyn Producer
              </p>
              <p className="text-xs text-slate-500">Questions? View verified streaming data and collateral details on your dashboard after lending.</p>
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
