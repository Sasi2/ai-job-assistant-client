import React from 'react';
import ProgressRing from './ProgressRing';

const ResultsDisplay = ({ results }) => {
  const {
    matchingSkills = [],
    missingSkills = [],
    improvements = [],
    overallMatch = '0%',
    summary = '',
    recommendedProjects = [],
    confidence = {},
    skillsBreakdown = {}
  } = results;

  // Extract percentage from overallMatch string
  const matchPercentage = parseInt(overallMatch.replace('%', '')) || 0;

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'fas fa-exclamation-circle';
      case 'medium': return 'fas fa-info-circle';
      case 'low': return 'fas fa-check-circle';
      default: return 'fas fa-info-circle';
    }
  };

  const renderSkillsByCategory = (skills, type = 'matching') => {
    const categoryMap = {
      frontend: { icon: 'fab fa-html5', label: 'Frontend', color: '#e34c26' },
      backend: { icon: 'fas fa-server', label: 'Backend', color: '#68217a' },
      tools: { icon: 'fas fa-tools', label: 'Tools', color: '#f39c12' },
      web3: { icon: 'fab fa-ethereum', label: 'Web3', color: '#627eea' },
      general: { icon: 'fas fa-cogs', label: 'General', color: '#2c3e50' }
    };

    const breakdown = type === 'matching' ? skillsBreakdown.matching : skillsBreakdown.missing;
    
    if (!breakdown) {
      // Fallback: render all skills without categorization
      return skills.map((skill, index) => (
        <span 
          key={index} 
          className={`skill-badge ${type === 'missing' ? 'missing' : ''}`}
        >
          {skill}
        </span>
      ));
    }

    return Object.entries(breakdown)
      .filter(([category, categorySkills]) => categorySkills.length > 0)
      .map(([category, categorySkills]) => (
        <div key={category} className="mb-3">
          <h6 className="text-muted mb-2">
            <i 
              className={`${categoryMap[category]?.icon} me-2`} 
              style={{ color: categoryMap[category]?.color }}
            ></i>
            {categoryMap[category]?.label}
          </h6>
          <div>
            {categorySkills.map((skill, index) => (
              <span 
                key={index} 
                className={`skill-badge ${type === 'missing' ? 'missing' : ''}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ));
  };

  return (
    <div className="glass-card p-4">
      <div className="text-center mb-4">
        <h2 className="gradient-text mb-3">
          <i className="fas fa-chart-line me-3"></i>
          Analysis Results
        </h2>
        <p className="text-muted">
          Generated on {new Date(results.analysisDate || Date.now()).toLocaleDateString()}
        </p>
      </div>

      {/* Overall Match Section */}
      <div className="result-section p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="mb-3">
              <i className="fas fa-percentage text-primary me-2"></i>
              Overall Match Score
            </h3>
            <p className="text-muted mb-3">{summary}</p>
            
            {confidence && (
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <span className={`badge ${confidence.level === 'high' ? 'bg-success' : confidence.level === 'medium' ? 'bg-warning' : 'bg-secondary'}`}>
                  {confidence.level?.toUpperCase()} CONFIDENCE
                </span>
                <small className="text-muted">
                  {confidence.matchingCount} of {confidence.totalRelevantSkills} relevant skills matched
                </small>
              </div>
            )}
          </div>
          
          <div className="col-md-4 text-center">
            <ProgressRing percentage={matchPercentage} />
            <div className="mt-2">
              <h4 className="gradient-text">{overallMatch}</h4>
              <small className="text-muted">Job Match</small>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="result-section p-4 h-100">
            <h4 className="text-success mb-3">
              <i className="fas fa-check-circle me-2"></i>
              Skills You Have ({matchingSkills.length})
            </h4>
            <div className="skills-container">
              {renderSkillsByCategory(matchingSkills, 'matching')}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="result-section p-4 h-100">
            <h4 className="text-warning mb-3">
              <i className="fas fa-plus-circle me-2"></i>
              Skills to Highlight ({missingSkills.length})
            </h4>
            <div className="skills-container">
              {renderSkillsByCategory(missingSkills, 'missing')}
            </div>
          </div>
        </div>
      </div>

      {/* Improvements Section */}
      {improvements.length > 0 && (
        <div className="result-section p-4 mb-4">
          <h4 className="text-info mb-4">
            <i className="fas fa-lightbulb me-2"></i>
            Suggested Improvements ({improvements.length})
          </h4>
          
          {improvements.map((improvement, index) => (
            <div 
              key={index} 
              className={`improvement-item p-3 ${getPriorityClass(improvement.priority)}`}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <i className={`${getPriorityIcon(improvement.priority)} me-2 text-primary`}></i>
                    <h6 className="mb-0 text-primary">{improvement.category}</h6>
                  </div>
                  
                  <p className="mb-2">{improvement.suggestion}</p>
                  
                  {improvement.skillsInvolved && improvement.skillsInvolved.length > 0 && (
                    <div className="mt-2">
                      <small className="text-muted d-block mb-1">Related Skills:</small>
                      {improvement.skillsInvolved.map((skill, skillIndex) => (
                        <span key={skillIndex} className="badge bg-light text-dark me-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <span className={`badge ${getPriorityClass(improvement.priority)} ms-3`}>
                  {improvement.priority?.toUpperCase() || 'MEDIUM'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommended Projects */}
      {recommendedProjects && recommendedProjects.length > 0 && (
        <div className="result-section p-4">
          <h4 className="text-info mb-3">
            <i className="fas fa-project-diagram me-2"></i>
            Recommended Projects
          </h4>
          <div className="row">
            {recommendedProjects.map((project, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-rocket text-primary me-2"></i>
                      <h6 className="card-title mb-0">Project {index + 1}</h6>
                    </div>
                    <p className="card-text small text-muted">{project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center mt-4">
        <button 
          className="btn btn-outline-primary me-3"
          onClick={() => window.print()}
        >
          <i className="fas fa-print me-2"></i>
          Print Results
        </button>
        
        <button 
          className="btn btn-outline-success"
          onClick={() => {
            const resultsText = `Resume Analysis Results\n\nOverall Match: ${overallMatch}\n\nSummary: ${summary}\n\nMatching Skills: ${matchingSkills.join(', ')}\n\nSkills to Highlight: ${missingSkills.join(', ')}\n\nImprovements:\n${improvements.map(imp => `- ${imp.category}: ${imp.suggestion}`).join('\n')}`;
            navigator.clipboard.writeText(resultsText);
            alert('Results copied to clipboard!');
          }}
        >
          <i className="fas fa-copy me-2"></i>
          Copy Results
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;