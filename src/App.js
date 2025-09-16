import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import ResumeForm from './components/ResumeForm';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';

function App() {
  // State management
  const [formData, setFormData] = useState({
    resume: '',
    jobDescription: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // API base URL - will use proxy in development
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear any existing errors when user starts typing
    if (error) setError('');
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.resume.trim()) {
      setError('Please enter your resume');
      return false;
    }
    if (!formData.jobDescription.trim()) {
      setError('Please enter the job description');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      setShowToast(true);
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/analyze`, {
        resume: formData.resume,
        jobDescription: formData.jobDescription
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      if (response.data.success) {
        setResults(response.data.data);
        // Smooth scroll to results
        setTimeout(() => {
          const resultsElement = document.getElementById('results-section');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        throw new Error(response.data.error || 'Analysis failed');
      }

    } catch (err) {
      console.error('Analysis error:', err);
      
      let errorMessage = 'Analysis failed. Please try again.';
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (err.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (err.response?.status === 500) {
        errorMessage = err.response.data?.error || 'Server error. Please try again later.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Clear results
  const handleReset = () => {
    setResults(null);
    setError('');
    setFormData({
      resume: '',
      jobDescription: ''
    });
  };

  // Check server health on component mount
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/health`);
        console.log('✅ Server connection established');
      } catch (err) {
        console.warn('⚠️ Server connection failed:', err.message);
      }
    };

    checkServerHealth();
  }, [API_BASE_URL]);

  return (
    <div className="App">
      <Navbar />
      
      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* Header Section */}
            <div className="glass-card p-4 mb-4 text-center">
              <h1 className="gradient-text mb-3 floating-animation">
                <i className="fas fa-briefcase me-3"></i>
                Smart Resume Optimizer
              </h1>
              <p className="lead text-muted mb-0">
                Upload your resume and job description to get AI-powered suggestions 
                using your bootcamp skills!
              </p>
            </div>

            {/* Form Section */}
            <ResumeForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              loading={loading}
              onReset={handleReset}
              showReset={results !== null}
            />

            {/* Loading Section */}
            {loading && <LoadingSpinner />}

            {/* Results Section */}
            {results && (
              <div id="results-section">
                <ResultsDisplay results={results} />
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />

      {/* Toast Notification */}
      <ToastNotification
        show={showToast}
        message={error}
        type="error"
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;
