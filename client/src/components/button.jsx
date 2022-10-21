import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  disabled,
  children,
  onClick,
  isLoading,
  className,
}) => (
  <button
    type="button"
    className={`btn btn-brand ${className || ''}`}
    disabled={disabled || isLoading}
    onClick={onClick}
  >
    {!isLoading ? children : <span>{`Loading...`}</span>}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
