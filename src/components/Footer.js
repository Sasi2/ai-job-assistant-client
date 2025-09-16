import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-custom mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-robot text-primary me-2 fs-4"></i>
              <h5 className="gradient-text mb-0">AI Job Assistant</h5>
            </div>
            <p className="text-muted small mb-0">
              Helping bootcamp graduates optimize their resumes with AI-powered insights.
            </p>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="mb-3">
              <h6 className="text-muted mb-2">Built With</h6>
              <div className="d-flex justify-content-md-end gap-3 flex-wrap">
                <span className="badge bg-light text-dark">
                  <i className="fab fa-react me-1"></i>React.js
                </span>
                <span className="badge bg-light text-dark">
                  <i className="fab fa-node-js me-1"></i>Node.js
                </span>
                <span className="badge bg-light text-dark">
                  <i className="fas fa-database me-1"></i>Express.js
                </span>
              </div>
            </div>
            
          
          </div>
        </div>
        
        <hr className="my-4" style={{ opacity: 0.1 }} />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted small mb-0">
              © 2025 Veera Saideep Sasank Vulavakayala. All rights reserved.
            </p>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <a href="https://github.com/Sasi2" className="text-muted text-decoration-none">
                <i className="fab fa-github me-1"></i>GitHub
              </a>
              <a href="https://www.linkedin.com/in/veera-saideep-sasank-vulavakayala-49314b2b8/" className="text-muted text-decoration-none">
                <i className="fab fa-linkedin me-1"></i>LinkedIn
              </a>
              <a href="https://sasi2.github.io/Portfolio-Website/" className="text-muted text-decoration-none">
                <i className="fas fa-envelope me-1"></i>Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
