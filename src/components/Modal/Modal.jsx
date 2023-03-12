import React, { useEffect } from 'react';
import styles from '../styles.module.css';
import PropTypes from 'prop-types';

function Modal({ onClose, children, show }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, show]);

  return (
    <div
      className={show ? styles.modalBackdrop : styles.hidden}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
