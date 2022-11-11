import React, { memo } from 'react';
import PropTypes from 'prop-types';
import "../styles/_card.scss"

const CardButton = ({
  title,
  src,
  alt,
  onClick,
  selectedTab,
  className,
  renderBody,
  renderFooter,
  noAccess,
  titleButton,
}) => {
  const handleOnClick = (event) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  if (noAccess) {
    return (
      <div
        role="button"
        tabIndex={-1}
        className={`card card-button no-pointer h-100 ${className || ''}`}
      >
        {title && (
          <div className="card-header">
            <div className="header-title">
              {title}
            </div>
          </div>
        )}
        <div className="card-body">
          <div className="row h-100">
            <div className="col text-center my-auto">
              <div className="text-gray">
                Restricted View
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={-1}
      className={`test ${onClick ? 'hoverable' : 'no-pointer'}  ${selectedTab ? 'selected' : ''} ${className || ''}`}
      onClick={handleOnClick}
    >
      {title && (
        <>
          {titleButton ? (
            <div className="header-title d-flex flex-row align-items-center justify-content-md-between">
              {title}
              <div>
                {titleButton()}
              </div>
            </div>
          ) : (
            <div className="header-title">
              {title}
            </div>

          )}
        </>
      )}
      {src && <img className="card-img-top" src={src} alt={alt} />}
      <div className="card-body">
        {renderBody()}
      </div>
      {renderFooter && (
        <div className="card-footer">
          {renderFooter()}
        </div>
      )}
    </div>
  );
};

CardButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.any,
  titleButton: PropTypes.func,
  alt: PropTypes.string,
  onClick: PropTypes.any,
  renderBody: PropTypes.func,
  renderFooter: PropTypes.func,
  selectedTab: PropTypes.bool,
  noAccess: PropTypes.bool,
};

export default memo(CardButton);
