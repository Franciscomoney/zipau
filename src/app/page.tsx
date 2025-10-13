import Link from "next/link";
import Image from "next/image";
import RiskRatingSlider from "@/components/RiskRatingSlider";

const opportunities = [
  {
    title: "Cyprus: Maria's Olive Loop Furniture",
    description:
      "Circular studio turning olive pits, pomace, and pruning waste into heirloom furniture for boutique hotels and design-forward homes.",
    region: "Cyprus",
    sector: "Circular Design",
    raise: "€5,000 target",
    progress: 48,
    apr: "20% equity share",
    lead: "Lead partner: Limassol Circular Cooperative",
    image: "/generated/2025-10-11_07-13-39-081.webp",
    slug: "maria",
    riskRating: 7, // Low-Medium Risk
    ipCollateral: "Circular Design Patent + Brand Trademark",
    dividendSchedule: "Quarterly starting Month 4",
  },
  {
    title: "Greece: Eco-Corridor Gallikos Delta",
    description:
      "Restoring the Gallikos River Delta with pollution mitigation, biodiversity labs, and school programs built on proprietary eco-mapping IP.",
    region: "Greece",
    sector: "Climate Infrastructure",
    raise: "€25,000 target",
    progress: 35,
    apr: "15% equity share",
    lead: "Lead supporters: Aegean Impact Reserve",
    image: "/generated/2025-10-11_07-13-58-156.webp",
    slug: "gallikos",
    riskRating: 4, // Medium Risk
    ipCollateral: "Eco-Mapping Algorithm + Biodiversity Database",
    dividendSchedule: "Quarterly starting Month 6",
  },
  {
    title: "Colombia: SiembraViva",
    description:
      "Digital marketplace connecting smallholder farmers directly with buyers, using traceability algorithms as collateral for growth capital.",
    region: "Colombia",
    sector: "AgriTech",
    raise: "€100,000 target",
    progress: 68,
    apr: "10% equity share",
    lead: "Institutional partner: Andean Resilience Fund",
    image: "/generated/2025-10-11_07-14-16-234.webp",
    slug: "siembraviva",
    riskRating: 6, // Medium Risk
    ipCollateral: "Traceability Algorithm + Platform Software",
    dividendSchedule: "Quarterly starting Month 3",
  },
];

const heroImage = "/generated/2025-10-11_07-21-55-293.webp";

const filters = [
  "All opportunities",
  "Community wealth",
  "Climate resilience",
  "Inclusive tech",
];

type Opportunity = (typeof opportunities)[number];

function HighlightOpportunity({ opportunity }: { opportunity: Opportunity }) {
  const progressDegrees = Math.max(0, Math.min(100, opportunity.progress)) * 3.6;
  const progressRingStyle = {
    background: `conic-gradient(var(--color-primary) ${progressDegrees}deg, rgba(15, 31, 47, 0.12) ${progressDegrees}deg)`,
  };

  return (
    <article className="premium-card overflow-hidden p-0 lg:grid lg:grid-cols-[1.05fr_1fr]">
      <div className="space-y-6 p-8 sm:p-10 lg:p-12">
        {/* Header with region, sector, and progress circle */}
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[--color-muted] px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[--color-primary]">
              {opportunity.region}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {opportunity.sector}
            </span>
          </div>
          {/* Progress circle moved to header */}
          <div className="relative h-16 w-16 rounded-full flex-shrink-0" style={progressRingStyle}>
            <div className="absolute inset-[4px] flex items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-sm font-semibold text-[--color-primary]">
                {opportunity.progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Title and description */}
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold leading-tight text-[--color-primary] sm:text-3xl">
            {opportunity.title}
          </h3>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {opportunity.description}
          </p>
        </div>

        {/* Key metrics grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Raise target</p>
            <p className="mt-2 text-lg font-semibold text-[--color-primary]">
              {opportunity.raise}
            </p>
          </div>
          <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Equity share</p>
            <p className="mt-2 text-lg font-semibold text-[--color-primary]">
              {opportunity.apr}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50 px-5 py-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              IP Collateral
            </p>
            <p className="mt-2 text-sm font-semibold text-emerald-900">
              {opportunity.ipCollateral}
            </p>
          </div>
          <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] px-5 py-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Dividend schedule</p>
            <p className="mt-2 text-sm font-semibold text-[--color-primary]">
              {opportunity.dividendSchedule}
            </p>
          </div>
        </div>
        
        {/* Risk Rating Slider */}
        <RiskRatingSlider riskRating={opportunity.riskRating} />

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${opportunity.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[--color-primary] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[--color-primary]/90"
          >
            View project details
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 11.5L11.5 4M11.5 4H5.5M11.5 4V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href={`/${opportunity.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Invest
          </Link>
        </div>
      </div>
      <div className="relative isolate overflow-hidden">
        <Image
          src={opportunity.image}
          alt={`${opportunity.title} visual`}
          width={960}
          height={720}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-8 flex flex-col gap-3 text-white">
          <span className="text-xs uppercase tracking-[0.24em] text-white/70">
            Impact snapshot
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-white/85">
            Supported by {opportunity.lead}. Investors receive {opportunity.apr} with quarterly
            reporting baked into the deal flow.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
              {opportunity.raise}
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
              {opportunity.progress}% funded
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-[--color-border]/70 bg-white/60 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/zipa-logo-horizontal.png"
              alt="Zipa - Decentralized Bank"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="rounded-lg border-2 border-slate-900 bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 hover:border-slate-800">
              Login
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-white py-20">
          <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-[--color-primary]">
                  Stablecoin Bank for IP-Backed Investments
                </p>
                <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-[#0f1f2f] sm:text-6xl lg:text-7xl">
                  Where IP Becomes Capital
                </h1>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                Invest globally with USDT or USDC. Acquire equity shares secured by intellectual property. Receive quarterly dividends automatically—no banks, no borders, no delays.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/start-investing" className="inline-flex items-center justify-center gap-2 rounded-full bg-[--color-secondary] px-8 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-amber-300/30 transition hover:shadow-amber-300/50">
                  Invest
                </Link>
                <Link href="/launch-project" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-[--color-primary] hover:text-[--color-primary]">
                  Raise
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={opportunities[0].image}
                      alt="Maria's furniture workshop"
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-[--color-accent]/20 to-[--color-accent]/5" />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-[--color-secondary]/30 to-[--color-secondary]/10" />
                  <div className="overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={opportunities[1].image}
                      alt="Gallikos Delta restoration"
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={opportunities[2].image}
                      alt="SiembraViva farmers"
                      width={400}
                      height={250}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-1/2 h-28 w-28 -translate-y-1/2 rounded-3xl bg-gradient-to-br from-[--color-primary]/20 to-[--color-primary]/5" />
            </div>
          </div>
        </section>

        {/* What is Zipa Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-20 border-y border-slate-200">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[--color-primary]/10 px-4 py-2 text-sm font-semibold text-[--color-primary]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  What is Zipa?
                </div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  The World&apos;s First Decentralized Bank That Treats IP as Collateral
                </h2>
              </div>
              <p className="text-lg text-center text-slate-600 max-w-3xl mx-auto">
                The first stablecoin bank where anyone can invest in creators raising $1,000-$100,000. Fund projects instantly with USDT/USDC—no traditional banking required.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">No credit checks required</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Traditional banks don&apos;t understand innovation. We do.</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">IP-backed investments</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Patents, trademarks, copyrights, and algorithms as collateral</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">You own shares, not debt</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Acquire real equity with dividend rights</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">Quarterly dividend payments</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Receive returns every 3 months as projects grow</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">Invest with stablecoins</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Use USDT or USDC—instant global payments, no currency conversion</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="opportunities" className="bg-[#f8fafc] py-20">
          <div className="container space-y-12">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                Featured Opportunities
              </p>
            </div>
            <div className="space-y-12">
              {opportunities.map((item) => (
                <HighlightOpportunity key={item.title} opportunity={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Investor Protection Section */}
        <section className="bg-white py-20 border-y border-slate-200">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[--color-primary]/10 px-4 py-2 text-sm font-semibold text-[--color-primary]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  How We Protect Investors
                </div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Your Investment is Secured by Real Assets
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="premium-card p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">IP Verification</h3>
                  <p className="text-sm text-slate-600">All intellectual property is legally validated before listing</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[--color-muted] text-[--color-primary]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Blockchain Escrow</h3>
                  <p className="text-sm text-slate-600">Funds held on-chain in smart contract escrow, released when milestones are met</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Quarterly Reporting</h3>
                  <p className="text-sm text-slate-600">Transparent financial updates every 3 months</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Collateral Rights</h3>
                  <p className="text-sm text-slate-600">If project fails, IP ownership transfers to investors</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Risk Ratings</h3>
                  <p className="text-sm text-slate-600">Every project rated (Low/Medium/High risk)</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Truly Global</h3>
                  <p className="text-sm text-slate-600">Invest from any country with USDT/USDC—no bank account required</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-white">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                Simple Process
              </p>
              <h2 className="text-3xl font-semibold leading-tight">
                How It Works
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-600">
                Building your IP-backed portfolio and earning returns is easier than you think.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="premium-card flex flex-col gap-6 p-8 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[--color-primary] to-[--color-accent] text-2xl font-bold text-white">
                  1
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Browse IP-Backed Projects</h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    Explore vetted projects from creators worldwide. Each listing shows the IP collateral, funding goal (&lt;$100k), equity share offered, and quarterly dividend terms.
                  </p>
                </div>
              </div>
              <div className="premium-card flex flex-col gap-6 p-8 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[--color-primary] to-[--color-accent] text-2xl font-bold text-white">
                  2
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Acquire Equity Shares</h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    Invest as little as $100 or as much as you want. You&apos;re buying shares in the project, not making a donation. Your stake is secured by the creator&apos;s intellectual property.
                  </p>
                </div>
              </div>
              <div className="premium-card flex flex-col gap-6 p-8 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[--color-primary] to-[--color-accent] text-2xl font-bold text-white">
                  3
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Earn Quarterly Dividends</h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    As the project generates revenue, you receive your share every 3 months. Track your portfolio, view IP documentation, and manage your investments from your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-choose-us" className="bg-[#f8fafc] py-20">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-semibold leading-tight">
                Why Zipa vs Traditional Banks?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-600">
                Join thousands of investors building IP-backed portfolios and earning quarterly dividends.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="premium-card flex flex-col gap-4 p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[--color-muted] text-[--color-primary]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Simple &amp; Accessible</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Forget complex financial jargon. Our platform is designed for everyone, no matter your experience with investing.
                </p>
              </div>
              <div className="premium-card flex flex-col gap-4 p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[--color-muted] text-[--color-primary]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Real Returns</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Your support isn&apos;t just a donation. It&apos;s an investment that pays you back, creating a sustainable cycle of good.
                </p>
              </div>
              <div className="premium-card flex flex-col gap-4 p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[--color-muted] text-[--color-primary]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Transparency</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  See exactly where your money is going and track the progress of the projects you support.
                </p>
              </div>
              <div className="premium-card flex flex-col gap-4 p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[--color-muted] text-[--color-primary]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Global Community</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Connect with creators and a community of like-minded individuals from around the world who are all working towards a better future.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[--color-border] bg-white/80 backdrop-blur-lg">
        <div className="container py-10">
          <div className="text-center">
            <p className="text-lg font-semibold text-[--color-primary]">
              Ready to invest with USDT or USDC?
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Join investors worldwide earning quarterly dividends from IP-backed projects. No banks, no borders, instant settlement.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
