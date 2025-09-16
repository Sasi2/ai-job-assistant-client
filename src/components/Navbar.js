import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom mb-4">
      <div className="container">
        <a className="navbar-brand fw-bold fs-3 gradient-text floating-animation" href="/">
          <i className="fas fa-robot me-2"></i>
          AI Job Assistant
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-muted" href="#about">
                <i className="fas fa-info-circle me-1"></i>
                About
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link text-muted" 
                href="https://github.com/Sasi2" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fab fa-github me-1"></i>
                GitHub
              </a>
            </li>
            <li className="nav-item">
              <span className="nav-link text-success">
                <i className="fas fa-circle pulse-dot me-1" style={{ fontSize: '0.5rem' }}></i>
                Online
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;