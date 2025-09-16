import React from 'react';

const ProgressRing = ({ percentage = 0, size = 120 }) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color based on percentage
  const getColor = (percent) => {
    if (percent >= 80) return '#00b894'; // Green
    if (percent >= 60) return '#fdcb6e'; // Yellow
    if (percent >= 40) return '#fd79a8'; // Pink
    return '#e17055'; // Red
  };

  const color = getColor(percentage);

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="8"
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          style={{
            strokeDasharray,
            strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.8s ease-in-out'
          }}
        />
        
        {/* Percentage text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="24"
          fontWeight="bold"
          fill={color}
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressRing;