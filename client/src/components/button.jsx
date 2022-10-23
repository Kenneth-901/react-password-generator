import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components"

const ButtonComponent = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border-radius: 0.3rem;
    padding: 0 ${(props) => 
      props.size === "sm" ? "1.1rem"
      : props.size === "md" ? "1.4rem"
      : props.size === "lg" ? "1.6rem" : "1.1rem"};
    height: ${(props) => 
      props.size === "sm" ? "34px"
      : props.size === "md" ? "37px"
      : props.size === "lg" ? "40px" : "34px"};
    font-weight: 500;
    border: 1px solid #8e00b9;
  `;

const Button = ({
  disabled,
  children,
  onClick,
  isLoading,
  className,
  id,
  size,
}) => {
  return (
    <ButtonComponent
      type="button"
      className={`btn-component ${className || ''}`}
      disabled={disabled || isLoading}
      id={id}
      onClick={onClick}
    >
      {!isLoading ? children : <span>{`Loading...`}</span>}
    </ButtonComponent>
)};

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.any,
  size: PropTypes.string,
};

export default Button;
