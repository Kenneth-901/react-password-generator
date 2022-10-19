import React from 'react';
import PropTypes from 'prop-types';

const InlineDetails = ({
  title, label, className, leftClassName, rightClassName,
}) => (
  <div className={`inline-details ${className || ''}`}>
    <div className={`left ${leftClassName || ''}`}>{title}</div>
    <div className={`right ${rightClassName || ''}`}>{label || '-'}</div>
  </div>
);

InlineDetails.propTypes = {
  title: PropTypes.any,
  label: PropTypes.any,
  className: PropTypes.string,
  leftClassName: PropTypes.string,
  rightClassName: PropTypes.string,
};

export default InlineDetails;