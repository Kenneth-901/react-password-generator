import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

const styles = (styleMode) => {
  if (styleMode === 'fullscreen') {
    return 'modal-fullscreen';
  } if (styleMode === '100-fullscreen') {
    return 'modal-100-fullscreen';
  } if (styleMode === '95-width-screen') {
    return 'modal-95-width-screen';
  }
  if (styleMode === 'small') {
    return 'modal-small';
  } if (styleMode === 'smallest') {
    return 'modal-smallest';
  }
  if (styleMode === 'medium') {
    return 'modal-medium';
  }
  if (styleMode === 'large') {
    return 'modal-large';
  }
  if (styleMode === 'auto-width') {
    return 'modal-auto-width';
  }
  if (styleMode === 'image-crop') {
    return 'modal-image-crop';
  }
  return 'modal-default';
};

const overlayClass = (name) => {
  if (name === 'front') {
    return 'z-index-999';
  }
  return name || '';
};

const CustomModal = ({
  children,
  isOpen,
  onAfterOpen,
  onRequestClose,
  title,
  onClick,
  styleMode,
  overlayClassName,
}) => (
  <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onRequestClose}
    className={styles(styleMode)}
    overlayClassName={`modal-overlay ${overlayClass(overlayClassName)}`}
    ariaHideApp={false}
  >
    <div className="modal-container">
      <div className="modal-header">
        <div className="fs-subtitle font-weight-bold">{title}</div>
        <IoClose
          onClick={onClick}
        />
      </div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  </Modal>
);

CustomModal.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.any,
  onRequestClose: PropTypes.any,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onAfterOpen: PropTypes.func,
  styleMode: PropTypes.string,
  overlayClassName: PropTypes.string,
};

/**
 * Use this in the modal to provide a two layer separation in the modal.
 */
export const TopLayerModalContainer = ({ children }) => (
  <div className="modal-top-layer">
    <div>
      {children}
    </div>
  </div>
);

TopLayerModalContainer.propTypes = {
  children: PropTypes.any,
};

export default CustomModal;
