# Zipa - Impact Investment Platform

A premium crowdfunding platform for social-impact ventures that connects investors with meaningful projects driving positive change. Built with modern web technologies and inspired by platforms like Republic, Zipa provides a comprehensive investment experience with detailed project tracking and interactive dashboards.

## 🌟 Main Purpose

Zipa democratizes impact investing by making it accessible to individual investors while supporting innovative social-impact ventures. The platform focuses on projects that create measurable environmental and social benefits, offering investors both financial returns and the satisfaction of contributing to positive change.

## ✨ Key Features

### 🏠 **Investment Discovery**
- **Curated Project Portfolio**: Carefully selected social-impact ventures across various sectors
- **Detailed Project Profiles**: Comprehensive information including impact metrics, financial projections, and team backgrounds
- **Visual Storytelling**: High-quality imagery and engaging content to showcase project potential
- **Risk Assessment**: Clear risk ratings and investment guidelines for informed decision-making

### 📊 **Interactive Dashboard**
- **Investment Performance Tracking**: Real-time visualization of portfolio performance
- **Interactive Investment Graph**: 
  - Step-based projected value visualization
  - Dividend payout tracking with detailed breakdowns
  - Total invested baseline reference (€4,000)
  - Interactive tooltips showing project-specific dividend contributions
- **Portfolio Analytics**: Comprehensive view of investment returns and projected growth
- **Foldable Components**: Clean, organized interface with expandable sections

### 💰 **Investment Management**
- **Multiple Investment Options**: Support for various investment amounts and structures
- **Revenue Share Models**: Transparent revenue sharing based on project performance
- **Quarterly Returns**: Predictable dividend payouts with detailed project breakdowns
- **Progress Tracking**: Real-time updates on project milestones and funding progress

### 🎯 **Featured Projects**

#### **Maria's Olive Loop Furniture** 🪑
- **Location**: Cyprus
- **Focus**: Circular economy and sustainable furniture
- **Impact**: Transforming olive waste into heirloom furniture
- **Target**: Boutique hotels and design-forward homes
- **Revenue Share**: 20%

#### **Eco-Corridor Gallikos Delta** 🌿
- **Location**: Greece
- **Focus**: Environmental restoration and biodiversity
- **Impact**: River delta restoration with pollution mitigation
- **Innovation**: Proprietary eco-mapping IP and biodiversity research
- **Revenue Share**: 15%

#### **SiembraViva Digital Marketplace** 🌾
- **Location**: Colombia
- **Focus**: Agricultural technology and farmer empowerment
- **Impact**: Connecting smallholder farmers with buyers
- **Innovation**: Traceability algorithms as collateral for growth capital
- **Revenue Share**: 10%

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4 for modern, responsive design
- **UI Components**: Custom-built components with accessibility in mind
- **Charts & Visualization**: Custom SVG-based interactive graphs
- **Development**: ESLint for code quality and consistency

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zipa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:2020](http://localhost:2020)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Investor dashboard with portfolio tracking
│   ├── maria/            # Maria's Olive Loop project page
│   ├── gallikos/         # Gallikos Delta project page
│   ├── siembraviva/      # SiembraViva project page
│   ├── payment/          # Investment payment flow
│   └── start-investing/  # Investment initiation page
├── components/            # Reusable UI components
│   ├── InvestmentGraph.tsx    # Interactive portfolio visualization
│   ├── RiskRatingSlider.tsx   # Risk assessment component
│   ├── PaymentModal.tsx       # Investment payment interface
│   └── CircleSlider.tsx       # Custom circular input component
└── lib/                   # Utility functions and helpers

public/
└── generated/            # Project images and assets
```

## 🎨 Design Philosophy

Zipa emphasizes clean, professional design with a focus on:
- **Accessibility**: WCAG-compliant components and interactions
- **User Experience**: Intuitive navigation and clear information hierarchy
- **Trust**: Transparent financial information and project details
- **Impact**: Visual storytelling that highlights social and environmental benefits

## 📈 Investment Features

### **Portfolio Visualization**
- Interactive step-based growth charts
- Dividend payout tracking with project breakdowns
- Total invested baseline for easy reference
- Hover tooltips with detailed financial information

### **Risk Management**
- Clear risk rating system (1-10 scale)
- Transparent project progress tracking
- Revenue share models based on project performance
- Quarterly dividend projections

### **Project Tracking**
- Real-time funding progress
- Milestone achievement tracking
- Impact metrics and outcomes
- Team updates and project news

## 🌍 Impact Focus

Zipa is committed to supporting projects that create measurable positive impact:

- **Environmental**: Climate action, biodiversity conservation, circular economy
- **Social**: Community development, education, healthcare access
- **Economic**: Job creation, local economic development, sustainable livelihoods
- **Innovation**: Technology solutions for social and environmental challenges

## 🤝 Contributing

We welcome contributions to improve Zipa's impact and functionality. Please read our contributing guidelines and code of conduct before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions about investments, project partnerships, or technical support, please contact our team through the platform or visit our website.

---

**Zipa** - Where Impact Meets Investment 🌱💰