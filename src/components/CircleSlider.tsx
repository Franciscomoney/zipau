'use client';

import { useState, useEffect, useRef } from 'react';

interface CircleSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function CircleSlider({ 
  min, 
  max, 
  step, 
  value, 
  onChange, 
  className = '' 
}: CircleSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const centerX = 120;
  const centerY = 120;
  const radius = 100;

  const getAngleFromValue = (val: number) => {
    return ((val - min) / (max - min)) * 2 * Math.PI - Math.PI / 2;
  };

  const getValueFromAngle = (angle: number) => {
    const normalizedAngle = (angle + Math.PI / 2) / (2 * Math.PI);
    return Math.round((min + normalizedAngle * (max - min)) / step) * step;
  };

  const getPositionFromValue = (val: number) => {
    const angle = getAngleFromValue(val);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging && e.type === 'mousemove') return;
    
    if (!circleRef.current) return;
    
    const rect = circleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const angle = Math.atan2(y, x);
    const newValue = Math.max(min, Math.min(max, getValueFromAngle(angle)));
    
    // Ensure the value is a multiple of step
    const steppedValue = Math.round(newValue / step) * step;
    const finalValue = Math.max(min, Math.min(max, steppedValue));
    
    onChange(finalValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const position = getPositionFromValue(value);
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={circleRef}
        className="relative w-60 h-60 cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Background circle */}
        <svg
          width="240"
          height="240"
          className="absolute inset-0"
          viewBox="0 0 240 240"
        >
          <circle
            cx="120"
            cy="120"
            r="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-200"
          />
          
          {/* Progress arc */}
          <circle
            cx="120"
            cy="120"
            r="100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 100}`}
            strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
            className="transition-all duration-300 ease-out"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '120px 120px' }}
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005b7f" />
              <stop offset="100%" stopColor="#0097a7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Handle */}
        <div
          className="absolute w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out"
          style={{
            left: position.x,
            top: position.y,
          }}
        />

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              €{value.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Investment Amount
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}