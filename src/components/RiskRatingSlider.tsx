'use client';

interface RiskRatingSliderProps {
  riskRating: number; // 1-10 scale where 1 is highest risk (red) and 10 is lowest risk (green)
  className?: string;
}

export default function RiskRatingSlider({ riskRating, className = '' }: RiskRatingSliderProps) {
  // Convert 1-10 scale to percentage for positioning (1 = 0%, 10 = 100%)
  const position = ((riskRating - 1) / 9) * 100;
  
  // Determine risk level text and color
  const getRiskLevel = (rating: number) => {
    if (rating <= 3) return { text: 'High Risk', color: 'text-red-600' };
    if (rating <= 6) return { text: 'Medium Risk', color: 'text-yellow-600' };
    return { text: 'Low Risk', color: 'text-green-600' };
  };

  const riskLevel = getRiskLevel(riskRating);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        <span>Risk Rating</span>
        <span className={riskLevel.color}>{riskLevel.text}</span>
      </div>
      
      {/* Risk slider track */}
      <div className="relative">
        <div className="h-2.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
          {/* Arrow indicator */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
            style={{ left: `calc(${position}% - 6px)` }}
          >
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-slate-800"></div>
          </div>
        </div>
        
        {/* Risk level markers */}
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>High Risk</span>
          <span>Low Risk</span>
        </div>
      </div>
    </div>
  );
}