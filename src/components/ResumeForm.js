import React from 'react';

const ResumeForm = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  loading, 
  onReset, 
  showReset 
}) => {
  
  const handleTextareaChange = (field) => (e) => {
    onInputChange(field, e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const sampleResume = `John Doe
Full-Stack Web Developer
Email: john.doe@email.com | LinkedIn: linkedin.com/in/johndoe

TECHNICAL SKILLS
• Frontend: HTML5, CSS3, JavaScript ES6, React.js, Bootstrap
• Backend: Node.js, Express.js, MongoDB, PostgreSQL
• Tools: Git, GitHub, NPM, Command Line

EXPERIENCE
Junior Developer - Tech Startup (2023-Present)
• Built responsive web applications using React and Bootstrap
• Developed RESTful APIs with Node.js and Express
• Managed databases using MongoDB and PostgreSQL
• Collaborated using Git version control

PROJECTS
E-Commerce Website
• Full-stack application using React, Node.js, and MongoDB
• Implemented user authentication and payment processing
• Responsive design with Bootstrap framework

EDUCATION
The Complete Web Development Bootcamp (2023)
• Full-stack development certification
• 600+ hours of hands-on coding experience`;

  const sampleJobDescription = `Junior Full-Stack Developer
TechCorp Solutions

We're looking for a passionate Junior Full-Stack Developer to join our growing team.

REQUIREMENTS:
• Proficiency in JavaScript, HTML5, and CSS3
• Experience with React.js and modern frontend frameworks
• Knowledge of Node.js and Express.js
• Database experience (MongoDB or PostgreSQL)
• Familiarity with Git version control
• Understanding of RESTful API development
• Bootstrap or similar CSS framework experience

NICE TO HAVE:
• Authentication implementation experience
• Deployment knowledge (Heroku, GitHub Pages)
• UI/UX design understanding
• Agile development experience

RESPONSIBILITIES:
• Develop and maintain web applications
• Collaborate with team members on feature development
• Write clean, maintainable code
• Participate in code reviews`;

  const loadSampleData = () => {
    onInputChange('resume', sampleResume);
    onInputChange('jobDescription', sampleJobDescription);
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">
            <i className="fas fa-file-alt me-2 text-primary"></i>
            Your Resume
          </label>
          <textarea
            className="form-control custom-textarea"
            value={formData.resume}
            onChange={handleTextareaChange('resume')}
            placeholder="Paste your current resume here..."
            rows="8"
            disabled={loading}
          />
          <small className="form-text text-muted mt-1">
            <i className="fas fa-lightbulb me-1"></i>
            Include your technical skills, experience, and projects
          </small>
        </div>
        
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">
            <i className="fas fa-bullseye me-2 text-success"></i>
            Job Description
          </label>
          <textarea
            className="form-control custom-textarea"
            value={formData.jobDescription}
            onChange={handleTextareaChange('jobDescription')}
            placeholder="Paste the job description here..."
            rows="8"
            disabled={loading}
          />
          <small className="form-text text-muted mt-1">
            <i className="fas fa-target me-1"></i>
            Include requirements, responsibilities, and preferred skills
          </small>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={loadSampleData}
          disabled={loading}
        >
          <i className="fas fa-magic me-2"></i>
          Load Sample Data
        </button>

        {showReset && (
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={onReset}
            disabled={loading}
          >
            <i className="fas fa-refresh me-2"></i>
            Start Over
          </button>
        )}

        <button
          type="button"
          className={`btn btn-gradient text-white px-5 py-3 ${loading ? '' : 'pulse-animation'}`}
          onClick={onSubmit}
          disabled={loading || !formData.resume.trim() || !formData.jobDescription.trim()}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Analyzing...
            </>
          ) : (
            <>
              <i className="fas fa-magic me-2"></i>
              Optimize My Resume
            </>
          )}
        </button>
      </div>

      {/* Character counts */}
      <div className="row mt-3">
        <div className="col-md-6">
          <small className="text-muted">
            Resume: {formData.resume.length} characters
          </small>
        </div>
        <div className="col-md-6">
          <small className="text-muted">
            Job Description: {formData.jobDescription.length} characters
          </small>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;