import Image from "next/image";
import Link from "next/link";

const heroImage = "/generated/2025-10-11_07-13-58-156.webp";

const keyStats = [
  { label: "Target raise", value: "€25,000" },
  { label: "Revenue share", value: "15%" },
  { label: "Minimum investment", value: "€50 · 50 shares" },
  { label: "Shares available", value: "500 total" },
];

const impactHighlights = [
  "Proprietary eco-mapping IP capturing pollution data, biodiversity patterns, and restoration timelines.",
  "Nature center generates income through eco-tourism, school programs, and carbon offset credits.",
  "Collaboration with Greek universities for biodiversity research and environmental education.",
];

const proceedsUse = [
  {
    title: "Pollution mitigation",
    detail: "Installing wetland filtration systems and native plant corridors to capture agricultural runoff before it reaches the delta.",
  },
  {
    title: "Biodiversity labs",
    detail: "Building field research stations with monitoring equipment for tracking bird migrations, aquatic species, and ecosystem health metrics.",
  },
  {
    title: "Educational programs",
    detail: "Launching school field trips and eco-tourism experiences that generate sustainable revenue while promoting conservation awareness.",
  },
];

export default function GallikosPage() {
  const goalAmount = 25000;
  const raisedAmount = 8750;
  const progress = Math.round((raisedAmount / goalAmount) * 100);

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="border-b border-[--color-border]/70 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="text-sm font-semibold text-[--color-primary]">
            ← Back to opportunities
          </Link>
          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Environmental restoration</span>
        </div>
      </header>

      <main className="space-y-16">
        <section className="bg-white pt-12">
          <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Greece • Environmental restoration
                </span>
                <h1 className="text-3xl font-semibold leading-tight text-[--color-primary] sm:text-4xl">
                  Gallikos Delta Eco-Corridor
                </h1>
              </div>
              <div className="overflow-hidden rounded-[36px] border border-[--color-border]/60 bg-white shadow-xl">
                <Image
                  src={heroImage}
                  alt="Gallikos Delta wetland restoration with native vegetation"
                  width={1400}
                  height={1100}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-slate-600">
                  Invest in Greece&apos;s pioneering river delta restoration project combining pollution mitigation, biodiversity conservation, and sustainable eco-tourism. Your stake funds environmental infrastructure backed by proprietary eco-mapping technology.
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
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-600">
                Invest
              </button>
              <p className="text-xs leading-relaxed text-slate-500">
                Shares issued and escrowed by Bank of Cyprus Impact Desk. Minimum subscription: €50 for 50 shares. Funds are released once the full €25,000 target is reached.
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
                The Gallikos Delta project restores critical wetland habitat while creating a sustainable revenue model through eco-tourism, carbon credits, and educational programs. Proprietary eco-mapping technology tracks restoration progress and biodiversity gains, providing transparent impact metrics for investors.
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
                    src="/generated/2025-10-11_08-20-07-597.webp"
                    alt="Environmental workers installing wetland filtration systems"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[--color-border]/60 bg-white shadow-lg">
                  <Image
                    src="/generated/2025-10-11_08-20-35-355.webp"
                    alt="Scientists monitoring bird migrations and aquatic species"
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
                Dividends are issued quarterly from 15% of net income until investors achieve a 2.8x multiple. Transparent reporting is delivered via Zipa dashboards and email recaps.
              </p>
            </div>
            <div className="space-y-4 rounded-[28px] border border-[--color-border]/70 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Project Director message</p>
              <p className="text-sm leading-relaxed text-slate-600">
                &ldquo;The Gallikos Delta has suffered decades of pollution and habitat loss. This project proves that ecological restoration can be financially sustainable while delivering measurable environmental benefits.&rdquo; — Dr. Elena Papadopoulos, Project Director
              </p>
              <p className="text-xs text-slate-500">Questions? Email info@aegeanimpact.gr for detailed environmental assessments and revenue projections.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
