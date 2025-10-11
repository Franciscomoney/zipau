"use client";

import Link from "next/link";
import { useState } from "react";

export default function LaunchProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    region: "",
    sector: "",
    description: "",
    targetRaise: "",
    revenueShare: "",
    minimumInvestment: "",
    totalShares: "",
    impactHighlight1: "",
    impactHighlight2: "",
    impactHighlight3: "",
    useOfFunds1Title: "",
    useOfFunds1Detail: "",
    useOfFunds2Title: "",
    useOfFunds2Detail: "",
    useOfFunds3Title: "",
    useOfFunds3Detail: "",
    founderName: "",
    founderMessage: "",
    contactEmail: "",
    heroImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project submission:", formData);
    alert("Project submitted successfully! Our team will review your submission and contact you within 48 hours.");
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="border-b border-[--color-border]/70 bg-white/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="text-sm font-semibold text-[--color-primary]">
            ← Back to home
          </Link>
          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Launch your project</span>
        </div>
      </header>

      <main className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl font-bold text-[--color-primary]">Launch Your Impact Project</h1>
            <p className="text-lg text-slate-600">
              Share your social impact venture with our community of conscious investors. Fill out the form below to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Information */}
            <section className="space-y-6 rounded-[28px] border border-[--color-border]/70 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[--color-primary]">Basic Information</h2>

              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-semibold text-slate-700">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                  placeholder="e.g., Maria's Olive Loop Furniture"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="region" className="text-sm font-semibold text-slate-700">
                    Region/Country *
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., Cyprus"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sector" className="text-sm font-semibold text-slate-700">
                    Sector *
                  </label>
                  <input
                    type="text"
                    id="sector"
                    name="sector"
                    required
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., Circular Design, AgriTech"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-slate-700">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                  placeholder="Describe what your project does and its social impact..."
                />
              </div>
            </section>

            {/* Funding Details */}
            <section className="space-y-6 rounded-[28px] border border-[--color-border]/70 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[--color-primary]">Funding Details</h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="targetRaise" className="text-sm font-semibold text-slate-700">
                    Target Raise (€) *
                  </label>
                  <input
                    type="number"
                    id="targetRaise"
                    name="targetRaise"
                    required
                    value={formData.targetRaise}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., 5000"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="revenueShare" className="text-sm font-semibold text-slate-700">
                    Revenue Share (%) *
                  </label>
                  <input
                    type="number"
                    id="revenueShare"
                    name="revenueShare"
                    required
                    value={formData.revenueShare}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., 20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="minimumInvestment" className="text-sm font-semibold text-slate-700">
                    Minimum Investment (€) *
                  </label>
                  <input
                    type="number"
                    id="minimumInvestment"
                    name="minimumInvestment"
                    required
                    value={formData.minimumInvestment}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., 10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="totalShares" className="text-sm font-semibold text-slate-700">
                    Total Shares Available *
                  </label>
                  <input
                    type="number"
                    id="totalShares"
                    name="totalShares"
                    required
                    value={formData.totalShares}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>
            </section>

            {/* Impact Highlights */}
            <section className="space-y-6 rounded-[28px] border border-[--color-border]/70 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[--color-primary]">Impact Highlights</h2>
              <p className="text-sm text-slate-600">List 3 key impact points about your project</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="impactHighlight1" className="text-sm font-semibold text-slate-700">
                    Impact Highlight 1 *
                  </label>
                  <input
                    type="text"
                    id="impactHighlight1"
                    name="impactHighlight1"
                    required
                    value={formData.impactHighlight1}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., Creates employment for 6 single mothers"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="impactHighlight2" className="text-sm font-semibold text-slate-700">
                    Impact Highlight 2 *
                  </label>
                  <input
                    type="text"
                    id="impactHighlight2"
                    name="impactHighlight2"
                    required
                    value={formData.impactHighlight2}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., Diverts 2.1 tonnes of waste from landfills annually"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="impactHighlight3" className="text-sm font-semibold text-slate-700">
                    Impact Highlight 3 *
                  </label>
                  <input
                    type="text"
                    id="impactHighlight3"
                    name="impactHighlight3"
                    required
                    value={formData.impactHighlight3}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., Uses sustainable, locally-sourced materials"
                  />
                </div>
              </div>
            </section>

            {/* Use of Funds */}
            <section className="space-y-6 rounded-[28px] border border-[--color-border]/70 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[--color-primary]">Use of Funds</h2>
              <p className="text-sm text-slate-600">Describe how you plan to use the raised funds (3 categories)</p>

              <div className="space-y-6">
                <div className="space-y-4 rounded-xl border border-slate-200 p-4">
                  <div className="space-y-2">
                    <label htmlFor="useOfFunds1Title" className="text-sm font-semibold text-slate-700">
                      Category 1 Title *
                    </label>
                    <input
                      type="text"
                      id="useOfFunds1Title"
                      name="useOfFunds1Title"
                      required
                      value={formData.useOfFunds1Title}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                      placeholder="e.g., Equipment upgrades"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="useOfFunds1Detail" className="text-sm font-semibold text-slate-700">
                      Category 1 Details *
                    </label>
                    <textarea
                      id="useOfFunds1Detail"
                      name="useOfFunds1Detail"
                      required
                      value={formData.useOfFunds1Detail}
                      onChange={handleChange}
                      rows={2}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                      placeholder="Provide specific details about this expense category..."
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200 p-4">
                  <div className="space-y-2">
                    <label htmlFor="useOfFunds2Title" className="text-sm font-semibold text-slate-700">
                      Category 2 Title *
                    </label>
                    <input
                      type="text"
                      id="useOfFunds2Title"
                      name="useOfFunds2Title"
                      required
                      value={formData.useOfFunds2Title}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                      placeholder="e.g., Marketing and distribution"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="useOfFunds2Detail" className="text-sm font-semibold text-slate-700">
                      Category 2 Details *
                    </label>
                    <textarea
                      id="useOfFunds2Detail"
                      name="useOfFunds2Detail"
                      required
                      value={formData.useOfFunds2Detail}
                      onChange={handleChange}
                      rows={2}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                      placeholder="Provide specific details about this expense category..."
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200 p-4">
                  <div className="space-y-2">
                    <label htmlFor="useOfFunds3Title" className="text-sm font-semibold text-slate-700">
                      Category 3 Title *
                    </label>
                    <input
                      type="text"
                      id="useOfFunds3Title"
                      name="useOfFunds3Title"
                      required
                      value={formData.useOfFunds3Title}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                      placeholder="e.g., Team expansion"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="useOfFunds3Detail" className="text-sm font-semibold text-slate-700">
                      Category 3 Details *
                    </label>
                    <textarea
                      id="useOfFunds3Detail"
                      name="useOfFunds3Detail"
                      required
                      value={formData.useOfFunds3Detail}
                      onChange={handleChange}
                      rows={2}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                      placeholder="Provide specific details about this expense category..."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Founder Information */}
            <section className="space-y-6 rounded-[28px] border border-[--color-border]/70 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[--color-primary]">Founder Information</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="founderName" className="text-sm font-semibold text-slate-700">
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    id="founderName"
                    name="founderName"
                    required
                    value={formData.founderName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="e.g., Maria Ioannou"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="founderMessage" className="text-sm font-semibold text-slate-700">
                    Founder Message *
                  </label>
                  <textarea
                    id="founderMessage"
                    name="founderMessage"
                    required
                    value={formData.founderMessage}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="A personal message to potential investors about your mission and vision..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="text-sm font-semibold text-slate-700">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </section>

            {/* Project Images */}
            <section className="space-y-6 rounded-[28px] border border-[--color-border]/70 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[--color-primary]">Project Images</h2>
              <p className="text-sm text-slate-600">Provide a URL to your hero image (we'll add image upload functionality soon)</p>

              <div className="space-y-2">
                <label htmlFor="heroImage" className="text-sm font-semibold text-slate-700">
                  Hero Image URL *
                </label>
                <input
                  type="url"
                  id="heroImage"
                  name="heroImage"
                  required
                  value={formData.heroImage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-600"
              >
                Submit Project
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-[--color-primary] hover:text-[--color-primary]"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
