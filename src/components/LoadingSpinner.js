import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="glass-card">
      <div className="loading-container">
        <div className="spinner-custom mb-3"></div>
        <h4 className="gradient-text mb-2">
          <i className="fas fa-robot me-2"></i>
          AI is analyzing your resume...
        </h4>
        <p className="text-muted mb-3">
          This usually takes 10-30 seconds
        </p>
        
        <div className="progress mb-3" style={{ height: '6px', width: '200px', margin: '0 auto' }}>
          <div 
            className="progress-bar" 
            style={{ 
              background: 'var(--primary-gradient)',
              animation: 'progress-animation 2s ease-in-out infinite'
            }}
          ></div>
        </div>
        
        <small className="text-muted">
          <i className="fas fa-shield-alt me-1"></i>
          Your data is processed securely and not stored
        </small>
      </div>
      
      <style jsx>{`
        @keyframes progress-animation {
          0% { width: 10%; }
          50% { width: 80%; }
          100% { width: 10%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;