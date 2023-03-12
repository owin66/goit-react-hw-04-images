import React, { Component } from 'react';
import styles from '../styles.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      window.addEventListener('keydown', this.handleKeyDown);
    }

    if (prevProps.show && !this.props.show) {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, children, show } = this.props;
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
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
