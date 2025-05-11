import React, { useEffect } from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Erro</h3>
          <button className="modal-close" onClick={onClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Fechar</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;