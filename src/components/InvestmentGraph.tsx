'use client';

import { useState, useRef } from 'react';

interface Investment {
  id: string;
  projectTitle: string;
  contributedAmount: number;
  estimatedQuarterlyReturn: number;
  nextPayoutDate: string;
  totalPaid: number;
  investmentDate: string;
  status: 'active' | 'completed' | 'pending';
}

interface InvestmentGraphProps {
  investments: Investment[];
}

interface DataPoint {
  date: string;
  contributions: number;
  projectedValue: number;
  isDividendDate: boolean;
  dividendAmount?: number;
  dividendBreakdown?: Array<{
    projectTitle: string;
    amount: number;
    projectId: string;
  }>;
}

interface TooltipData {
  x: number;
  y: number;
  date: string;
  dividendAmount: number;
  breakdown: Array<{
    projectTitle: string;
    amount: number;
    projectId: string;
  }>;
}

export default function InvestmentGraph({ investments }: InvestmentGraphProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate data points for the graph
  const calculateDataPoints = (): DataPoint[] => {
    const dataPoints: DataPoint[] = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2025-12-31');
    
    // Get all unique dates (investment dates and payout dates)
    const allDates = new Set<string>();
    investments.forEach(inv => {
      allDates.add(inv.investmentDate);
      allDates.add(inv.nextPayoutDate);
    });
    
    // Add quarterly payout dates for the next 2 years
    const quarterlyDates = [];
    for (let year = 2024; year <= 2025; year++) {
      for (let quarter = 1; quarter <= 4; quarter++) {
        const month = (quarter - 1) * 3 + 1;
        quarterlyDates.push(`${year}-${month.toString().padStart(2, '0')}-15`);
      }
    }
    quarterlyDates.forEach(date => allDates.add(date));
    
    // Sort dates
    const sortedDates = Array.from(allDates).sort();
    
    let cumulativeContributions = 0;
    let cumulativeProjectedValue = 0;
    
    sortedDates.forEach(date => {
      const currentDate = new Date(date);
      if (currentDate < startDate || currentDate > endDate) return;
      
      // Add contributions from investments made on or before this date
      const contributionsOnDate = investments
        .filter(inv => new Date(inv.investmentDate) <= currentDate)
        .reduce((sum, inv) => sum + inv.contributedAmount, 0);
      
      // Calculate projected value (contributions + estimated returns)
      const projectedValueOnDate = investments
        .filter(inv => new Date(inv.investmentDate) <= currentDate)
        .reduce((sum, inv) => {
          const quartersElapsed = Math.max(0, Math.floor((currentDate.getTime() - new Date(inv.investmentDate).getTime()) / (1000 * 60 * 60 * 24 * 90)));
          return sum + inv.contributedAmount + (inv.estimatedQuarterlyReturn * quartersElapsed);
        }, 0);
      
      // Check if this is a dividend payout date
      const isDividendDate = quarterlyDates.includes(date);
      const dividendBreakdown = isDividendDate ? investments
        .filter(inv => new Date(inv.investmentDate) <= currentDate)
        .map(inv => ({
          projectTitle: inv.projectTitle,
          amount: inv.estimatedQuarterlyReturn,
          projectId: inv.id
        })) : [];
      const dividendAmount = isDividendDate ? dividendBreakdown.reduce((sum, item) => sum + item.amount, 0) : 0;
      
      dataPoints.push({
        date,
        contributions: contributionsOnDate,
        projectedValue: projectedValueOnDate,
        isDividendDate,
        dividendAmount: isDividendDate ? dividendAmount : undefined,
        dividendBreakdown: isDividendDate ? dividendBreakdown : undefined
      });
    });
    
    return dataPoints;
  };

  const dataPoints = calculateDataPoints();
  
  // Debug: Log dividend dates
  console.log('Dividend dates:', dataPoints.filter(p => p.isDividendDate).map(p => ({ date: p.date, amount: p.dividendAmount, breakdown: p.dividendBreakdown })));
  
  if (dataPoints.length === 0) {
    return null;
  }

  // Graph dimensions and scaling - make it responsive
  const width = 1000;
  const height = 400;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate total invested amount
  const totalInvested = investments.reduce((sum, inv) => sum + inv.contributedAmount, 0);
  
  // Find min/max values for scaling
  const maxValue = Math.max(
    totalInvested,
    ...dataPoints.map(d => Math.max(d.contributions, d.projectedValue))
  );
  const minValue = 0;

  // Scale function
  const scaleY = (value: number) => 
    padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  // Scale function for X axis (time)
  const scaleX = (index: number) => 
    padding + (index / (dataPoints.length - 1)) * chartWidth;

  // Generate step line for projected value (only increases at dividend payout points)
  const stepPath = dataPoints
    .map((point, index) => {
      if (index === 0) {
        return `M ${scaleX(index)} ${scaleY(point.projectedValue)}`;
      } else {
        // Only create steps at dividend payout points
        if (point.isDividendDate) {
          // Horizontal line to the dividend point, then vertical line up to the new value
          return `H ${scaleX(index)} V ${scaleY(point.projectedValue)}`;
        } else {
          // For non-dividend points, just move horizontally (no vertical change)
          return `H ${scaleX(index)}`;
        }
      }
    })
    .join(' ');

  // Generate area path for projected value (step line)
  const areaPath = `${stepPath} L ${scaleX(dataPoints.length - 1)} ${scaleY(minValue)} L ${scaleX(0)} ${scaleY(minValue)} Z`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header with toggle button */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Investment Performance & Projections</h3>
            <p className="text-sm text-slate-600">Track your contributions and future projected returns</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-600">Projected Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-slate-600">Dividend Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-slate-500" style={{borderTop: '2px dashed #6b7280'}}></div>
              <span className="text-slate-600">Total Invested</span>
            </div>
          </div>
          <svg 
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Graph content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6">
          <div className="bg-slate-50 rounded-xl p-4 relative">
            <div className="w-full overflow-x-auto">
              <svg ref={svgRef} width={width} height={height} className="w-full h-auto min-w-full">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Total invested baseline */}
              <line
                x1={padding}
                y1={scaleY(totalInvested)}
                x2={width - padding}
                y2={scaleY(totalInvested)}
                stroke="#374151"
                strokeWidth="4"
                strokeDasharray="8,4"
                opacity="0.9"
              />
              
              {/* Baseline label - positioned above the line on the left */}
              <text
                x={padding + 10}
                y={scaleY(totalInvested) - 15}
                textAnchor="start"
                className="text-sm fill-slate-800 font-bold"
              >
                Total Invested: €{totalInvested.toLocaleString()}
              </text>
              
              {/* Area under projected value curve */}
              <path d={areaPath} fill="url(#areaGradient)" />
              
              {/* Projected value line - step representation */}
              <path 
                d={stepPath} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8,4"
              />
              
              {/* Dividend payout markers with interaction - positioned on step line */}
              {dataPoints.map((point, index) => {
                if (!point.isDividendDate || !point.dividendBreakdown) return null;
                return (
                  <g key={`dividend-${index}`}>
                    <circle
                      cx={scaleX(index)}
                      cy={scaleY(point.projectedValue)}
                      r="8"
                      fill="#f59e0b"
                      stroke="white"
                      strokeWidth="2"
                      className="hover:r-12 transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => {
                        setTooltip({
                          x: scaleX(index),
                          y: scaleY(point.projectedValue),
                          date: point.date,
                          dividendAmount: point.dividendAmount || 0,
                          breakdown: point.dividendBreakdown || []
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                    <circle
                      cx={scaleX(index)}
                      cy={scaleY(point.projectedValue)}
                      r="4"
                      fill="white"
                    />
                  </g>
                );
              })}
              
              {/* Y-axis labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const value = minValue + (maxValue - minValue) * ratio;
                const y = scaleY(value);
                const isTotalInvested = Math.abs(value - totalInvested) < 1; // Check if this is the total invested line
                
                // Skip showing the total invested value on the Y-axis since it's shown above the line
                if (isTotalInvested) {
                  return (
                    <g key={ratio}>
                      <line 
                        x1={padding - 12} 
                        y1={y} 
                        x2={padding} 
                        y2={y} 
                        stroke="#374151" 
                        strokeWidth="3"
                      />
                    </g>
                  );
                }
                
                return (
                  <g key={ratio}>
                    <line 
                      x1={padding - 10} 
                      y1={y} 
                      x2={padding} 
                      y2={y} 
                      stroke="#cbd5e1" 
                      strokeWidth="1"
                    />
                    <text 
                      x={padding - 15} 
                      y={y + 4} 
                      textAnchor="end" 
                      className="text-xs fill-slate-500"
                    >
                      €{Math.round(value).toLocaleString()}
                    </text>
                  </g>
                );
              })}
              
              {/* X-axis labels */}
              {dataPoints.filter((_, index) => index % Math.ceil(dataPoints.length / 6) === 0).map((point, index) => {
                const originalIndex = dataPoints.findIndex(p => p === point);
                return (
                  <g key={index}>
                    <line x1={scaleX(originalIndex)} y1={height - padding} x2={scaleX(originalIndex)} y2={height - padding + 10} stroke="#cbd5e1" strokeWidth="1"/>
                    <text x={scaleX(originalIndex)} y={height - padding + 25} textAnchor="middle" className="text-xs fill-slate-500">
                      {new Date(point.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                    </text>
                  </g>
                );
              })}
              </svg>
            </div>
            
            {/* Interactive Tooltip */}
            {tooltip && (
              <div 
                className="absolute bg-white border border-slate-200 rounded-lg shadow-xl p-4 pointer-events-none z-50"
                style={{
                  left: `${tooltip.x + 20}px`,
                  top: `${tooltip.y - 80}px`,
                  transform: 'translateY(-50%)'
                }}
              >
                <div className="text-sm font-semibold text-slate-900 mb-2">
                  Dividend Payout - {new Date(tooltip.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
                <div className="text-lg font-bold text-amber-600 mb-3">
                  €{tooltip.dividendAmount.toLocaleString()}
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Breakdown by Project:</div>
                  {tooltip.breakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-slate-700 truncate max-w-[200px]">{item.projectTitle}</span>
                      <span className="font-semibold text-slate-900 ml-2">€{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}