'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import RiskRatingSlider from "@/components/RiskRatingSlider";

const heroImage = "/generated/brazil-mc-favela-funk.png";

const keyStats = [
  { label: "Loan Amount", value: "$3,500" },
  { label: "Interest Rate", value: "30% APR" },
  { label: "Minimum Lend", value: "$50" },
  { label: "Loan Term", value: "12 months" },
];

const highlights = [
  "12 Master Recordings plus Publishing Rights generating revenue from 200K+ monthly Spotify listeners.",
  "Viral TikTok presence with 850K streams/month and growing social media engagement across platforms.",
  "Established fan base in Brazilian funk (funk carioca) scene with sold-out local performances.",
];

const useOfFunds = [
  {
    title: "Album production",
    detail: "Fund professional recording sessions for 8-track album with top Brazilian funk producers to expand catalog and streaming potential.",
  },
  {
    title: "Tour preparation",
    detail: "Cover costs for tour logistics, merchandise production, and promotional materials for regional tour across Brazil.",
  },
  {
    title: "Music video production",
    detail: "Produce 3 high-quality music videos to capitalize on viral TikTok momentum and grow international audience.",
  },
];

export default function MCFavelaPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const loanAmount = 3500;
  const fundedAmount = 2835;
  const progress = Math.round((fundedAmount / loanAmount) * 100);

  const projectData = {
    title: "Brazil: MC Favela's Catalog",
    slug: "mcfavela",
    revenueShare: 30,
    targetAmount: 3500,
    raisedAmount: 2835,
    minimumInvestment: 50,
    riskRating: 7,
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
            <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Brazilian Funk</span>
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
                  Brazil • Funk Carioca
                </span>
                <h1 className="text-3xl font-semibold leading-tight text-[--color-primary] sm:text-4xl">
                  MC Favela&apos;s Catalog
                </h1>
              </div>
              <div className="overflow-hidden rounded-[36px] border border-[--color-border]/60 bg-white shadow-xl">
                <Image
                  src={heroImage}
                  alt="MC Favela performing in vibrant Rio de Janeiro favela setting"
                  width={1400}
                  height={1100}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-slate-600">
                  Brazilian funk artist with 200K monthly Spotify listeners and viral TikTok presence. Using master recordings as collateral to fund album production and tour. Strong fan base with 850K streams/month and growing international reach.
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
                Collateral held as ERC-1155 NFT tokens in smart contract escrow. Monthly repayments of $330 in USDT/USDC. Lenders earn 30% APR. If default after 90 days, collateral NFT tokens unlock for resale.
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
                MC Favela has built a strong presence in the Brazilian funk scene with consistent streaming revenue and viral social media engagement. The 12-track catalog generates reliable income, with verified TikTok and Spotify analytics showing rapid growth potential.
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
                    src="/generated/brazil-detail-1.png"
                    alt="TikTok analytics showing viral video performance and engagement metrics"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[--color-border]/60 bg-white shadow-lg">
                  <Image
                    src="/generated/brazil-detail-2.png"
                    alt="Recording setup in Rio favela with vibrant community background"
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
                Lenders receive ERC-1155 tokens representing fractional ownership of the 12 master recordings plus publishing rights. Monthly repayments are made in USDT/USDC. After 90 days of default, your collateral NFT tokens unlock and can be sold on the IP marketplace or licensed directly.
              </p>
            </div>
            <div className="space-y-4 rounded-[28px] border border-[--color-border]/70 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Borrower message</p>
              <p className="text-sm leading-relaxed text-slate-600">
                &ldquo;I&apos;ve been building my career in the favelas of Rio for years. With this support, I can produce a professional album and tour Brazil, bringing funk carioca to bigger audiences. Your investment helps me reach the next level.&rdquo; — MC Favela
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
