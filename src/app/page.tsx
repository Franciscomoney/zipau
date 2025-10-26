import Link from "next/link";
import Image from "next/image";
import RiskRatingSlider from "@/components/RiskRatingSlider";

const loanOpportunities = [
  {
    title: "Kenya: Motif's Afrobeats Catalog",
    description:
      "Nairobi-based music producer with 8 released tracks earning $520/month from Spotify, Apple Music, and YouTube. Seeking capital to fund studio equipment and 2 music videos.",
    region: "Kenya",
    sector: "Music",
    loanAmount: "$2,000",
    progress: 62,
    apr: "35% APR",
    term: "18 months",
    image: "/generated/kenya-motif-afrobeats.png",
    slug: "motif",
    riskRating: 6, // Medium Risk
    ipCollateral: "8 Master Recordings + Producer Tag Rights",
    repaymentSchedule: "Monthly payments of $135",
    monthlyStreams: "85,000 streams/month",
  },
  {
    title: "USA: Brooklyn Hip-Hop Producer Catalog",
    description:
      "Brooklyn-based producer with placements on major label albums, earning $1,200/month from beat sales and streaming. Borrowing to build professional studio and expand sample library.",
    region: "United States",
    sector: "Music",
    loanAmount: "$5,000",
    progress: 28,
    apr: "25% APR",
    term: "24 months",
    image: "/generated/usa-brooklyn-hiphop-producer.png",
    slug: "brooklyn-producer",
    riskRating: 5, // Medium Risk
    ipCollateral: "15 Beat Catalog + Producer Tag IP + Sample Pack Rights",
    repaymentSchedule: "Monthly payments of $245",
    monthlyStreams: "1.2M streams/month + $800 beat sales",
  },
  {
    title: "Brazil: MC Favela's Catalog",
    description:
      "Brazilian funk artist with 200K monthly Spotify listeners and viral TikTok presence. Using master recordings as collateral to fund album production and tour.",
    region: "Brazil",
    sector: "Music",
    loanAmount: "$3,500",
    progress: 81,
    apr: "30% APR",
    term: "12 months",
    image: "/generated/brazil-mc-favela-funk.png",
    slug: "mcfavela",
    riskRating: 7, // Low-Medium Risk
    ipCollateral: "12 Master Recordings + Publishing Rights",
    repaymentSchedule: "Monthly payments of $330",
    monthlyStreams: "200K+ listeners, 850K streams/month",
  },
];

const heroImage = "/generated/2025-10-11_07-21-55-293.webp";

const filters = [
  "All loans",
  "Music",
  "Film & Video",
  "Podcasts",
];

type LoanOpportunity = (typeof loanOpportunities)[number];

function HighlightLoanOpportunity({ loan }: { loan: LoanOpportunity }) {
  const progressDegrees = Math.max(0, Math.min(100, loan.progress)) * 3.6;
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
              {loan.region}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {loan.sector}
            </span>
          </div>
          {/* Progress circle moved to header */}
          <div className="relative h-16 w-16 rounded-full flex-shrink-0" style={progressRingStyle}>
            <div className="absolute inset-[4px] flex items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-sm font-semibold text-[--color-primary]">
                {loan.progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Title and description */}
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold leading-tight text-[--color-primary] sm:text-3xl">
            {loan.title}
          </h3>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {loan.description}
          </p>
        </div>

        {/* Key metrics grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Loan Amount</p>
            <p className="mt-2 text-lg font-semibold text-[--color-primary]">
              {loan.loanAmount}
            </p>
          </div>
          <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Interest Rate</p>
            <p className="mt-2 text-lg font-semibold text-[--color-primary]">
              {loan.apr}
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
              {loan.ipCollateral}
            </p>
          </div>
          <div className="rounded-2xl border border-[--color-border]/70 bg-[--color-muted] px-5 py-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Repayment</p>
            <p className="mt-2 text-sm font-semibold text-[--color-primary]">
              {loan.repaymentSchedule}
            </p>
          </div>
        </div>

        {/* Risk Rating Slider */}
        <RiskRatingSlider riskRating={loan.riskRating} />

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${loan.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[--color-primary] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[--color-primary]/90"
          >
            View loan details
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
            href={`/${loan.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Lend Now
          </Link>
        </div>
      </div>
      <div className="relative isolate overflow-hidden">
        <Image
          src={loan.image}
          alt={`${loan.title} visual`}
          width={960}
          height={720}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-8 flex flex-col gap-3 text-white">
          <span className="text-xs uppercase tracking-[0.24em] text-white/70">
            Loan Metrics
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-white/85">
            {loan.monthlyStreams}. Lenders earn {loan.apr} over {loan.term} with monthly repayments secured by IP collateral.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
              {loan.loanAmount} loan
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
              {loan.progress}% funded
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
                  IP-Backed Credit for the Creative Economy
                </p>
                <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-[#0f1f2f] sm:text-6xl lg:text-7xl">
                  Banks Don&apos;t Lend to Artists. We Do.
                </h1>
              </div>
              <div className="max-w-xl space-y-4">
                <p className="text-lg leading-relaxed text-slate-600">
                  Artists generate $110B annually but can't get loans—banks don't accept music masters as collateral.
                </p>
                <div className="space-y-2">
                  <p className="text-base leading-relaxed text-slate-700">
                    <span className="font-semibold text-[--color-primary]">If you're an artist:</span> Borrow against your IP. No credit checks.
                  </p>
                  <p className="text-base leading-relaxed text-slate-700">
                    <span className="font-semibold text-[--color-primary]">If you're a lender:</span> Earn 20-50% APR in stablecoins with fractional NFT collateral.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/start-investing" className="inline-flex items-center justify-center gap-2 rounded-full bg-[--color-secondary] px-8 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-amber-300/30 transition hover:shadow-amber-300/50">
                  Start Lending
                </Link>
                <Link href="/launch-project" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-[--color-primary] hover:text-[--color-primary]">
                  Borrow Funds
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={loanOpportunities[0].image}
                      alt="Kenyan music producer"
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
                      src={loanOpportunities[1].image}
                      alt="Brooklyn music producer"
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={loanOpportunities[2].image}
                      alt="Brazilian artist"
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
                  Banks Reject IP as Collateral. Blockchain Doesn&apos;t.
                </h2>
              </div>
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <p className="text-lg text-slate-600">
                  We built infrastructure to:
                </p>
                <div className="space-y-3 text-left">
                  <p className="text-base text-slate-700">
                    <span className="font-semibold text-[--color-primary]">→</span> Tokenize master recordings into ERC-1155 NFT collateral
                  </p>
                  <p className="text-base text-slate-700">
                    <span className="font-semibold text-[--color-primary]">→</span> Verify streaming revenue automatically on-chain
                  </p>
                  <p className="text-base text-slate-700">
                    <span className="font-semibold text-[--color-primary]">→</span> Match borrowers earning $110B with lenders seeking real yield
                  </p>
                </div>
                <p className="text-lg font-semibold text-slate-900 pt-2">
                  Result: Artists access capital. Lenders earn 20-50% APR. No banks required.
                </p>
              </div>
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
                  <p className="text-sm text-slate-600 pl-13">Borrow against your IP, not your credit score. Your art is the collateral.</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">Fractional NFT collateral</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Each lender receives tokens representing their share of master recordings</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">Earn 20-50% APR</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Lend from $50 and earn high yields in stablecoins</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">Monthly repayments</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Artists repay monthly; you earn interest on your stablecoin capital</p>
                </div>
                <div className="premium-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-900">X402 cross-chain protocol</p>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">Lend on any chain, artists receive on theirs—seamless cross-chain lending</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="opportunities" className="bg-[#f8fafc] py-20">
          <div className="container space-y-12">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                Active Loan Opportunities
              </p>
            </div>
            <div className="space-y-12">
              {loanOpportunities.map((item) => (
                <HighlightLoanOpportunity key={item.title} loan={item} />
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
                  How We Protect Lenders
                </div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Your Capital is Secured by IP Collateral NFTs
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
                  <h3 className="text-lg font-semibold text-slate-900">Collateral Liquidation</h3>
                  <p className="text-sm text-slate-600">If artist defaults, lenders receive fractional IP NFTs to resell or license</p>
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
                How Lending Works
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-600">
                Earn 20-50% APR by lending to artists worldwide. Your capital is secured by fractional IP NFT collateral.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="premium-card flex flex-col gap-6 p-8 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[--color-primary] to-[--color-accent] text-2xl font-bold text-white">
                  1
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Browse Active Loans</h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    Artists list their IP (music masters, films, algorithms) with verified streaming revenue. Each loan shows APR (20-50%), term length, collateral NFT details, and repayment schedule.
                  </p>
                </div>
              </div>
              <div className="premium-card flex flex-col gap-6 p-8 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[--color-primary] to-[--color-accent] text-2xl font-bold text-white">
                  2
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Lend & Receive NFT Tokens</h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    Lend from $50 in USDT/USDC. Instantly receive ERC-1155 tokens representing your fractional ownership of the IP collateral. The master recordings are locked in smart contract escrow.
                  </p>
                </div>
              </div>
              <div className="premium-card flex flex-col gap-6 p-8 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[--color-primary] to-[--color-accent] text-2xl font-bold text-white">
                  3
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Earn Monthly Payments</h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    Artists repay monthly in stablecoins. You earn 20-50% APR. If they default after 90 days, your collateral NFT tokens unlock—sell them on our IP marketplace or license the masters yourself.
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
                Why Zipa Beats Traditional Lending?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-600">
                Banks reject 99% of creative borrowers. DeFi lending platforms don&apos;t accept IP collateral. Zipa bridges both worlds.
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
                <h3 className="text-xl font-semibold">Higher Yields</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Earn 20-50% APR vs 3-8% in traditional DeFi. Your capital works harder because emerging market artists pay premium rates for access to global liquidity.
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
                <h3 className="text-xl font-semibold">Real Collateral</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Unlike crypto lending, your loans are backed by income-generating IP. Master recordings keep earning royalties even if the artist defaults.
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
                <h3 className="text-xl font-semibold">Transparent On-Chain</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Every loan, repayment, and collateral transfer is on-chain. Track your NFT tokens in real-time. No hidden fees or opaque terms.
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
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Cross-Chain Global</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  X402 protocol enables artists to borrow on Tron, lenders to fund on Ethereum. True borderless finance without dealing with banks or exchange restrictions.
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
              Ready to earn 20-50% APR lending to artists?
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Join lenders worldwide earning high yields from IP-backed loans. Artists borrow, you earn, all powered by X402. No banks, no borders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
