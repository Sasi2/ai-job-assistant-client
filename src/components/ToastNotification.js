import React, { useEffect } from 'react';

const ToastNotification = ({ show, message, type = 'error', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  const getToastConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: 'fas fa-check-circle',
          bgClass: 'bg-success',
          title: 'Success'
        };
      case 'warning':
        return {
          icon: 'fas fa-exclamation-triangle',
          bgClass: 'bg-warning',
          title: 'Warning'
        };
      case 'info':
        return {
          icon: 'fas fa-info-circle',
          bgClass: 'bg-info',
          title: 'Info'
        };
      case 'error':
      default:
        return {
          icon: 'fas fa-exclamation-circle',
          bgClass: 'bg-danger',
          title: 'Error'
        };
    }
  };

  const config = getToastConfig(type);

  return (
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 1050 }}
    >
      <div 
        className={`toast show toast-custom border-0 shadow-lg`}
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className={`toast-header ${config.bgClass} text-white border-0`}>
          <i className={`${config.icon} me-2`}></i>
          <strong className="me-auto">{config.title}</strong>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body p-3">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;