import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components"

// const ButtonComponent = styled.button`
//     position: relative;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     text-decoration: none;
//     vertical-align: middle;
//     cursor: pointer;
//     outline: none;
//     border-radius: 0.3rem;
//     padding: 0 ${(props) => 
//       props.size === "sm" ? "1.1rem"
//       : props.size === "md" ? "1.4rem"
//       : props.size === "lg" ? "1.6rem" : "1.1rem"};
//     height: ${(props) => 
//       props.size === "sm" ? "34px"
//       : props.size === "md" ? "37px"
//       : props.size === "lg" ? "40px" : "34px"};
//     font-weight: 500;
//     border: 1px solid #8e00b9;
//     background-color: white;
//     transition: 0.2s;
//     margin-bottom: 0.5rem;

//     &:hover {
//       background: rgba(27, 156, 252, 0.1);
//       transform: scale(1);
//     }
//   `;

const ButtonComponent = styled.button`
  height: 2rem;
  padding: 0 2rem;
  border-radius: 0.375rem;
  background: #4503dc;
  color: #ffffff;
  box-shadow: 0 0.4rem 0 0 #3700b8;
  letter-spacing: 1px;
  transition: all 0.3s;
  margin: 20px auto 5px auto;

  &:active {
    transform: translateY(0.3rem);
    box-shadow: 0 0.2rem 0 0 #3700b8;
  }

  &:focus{
    outline: none;
  }
`;

const Button = ({
  disabled,
  children,
  onClick,
  isLoading,
  className,
  id,
  size,
  type,
}) => {
  return (
    <ButtonComponent
      type={type || "button"}
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
  type: PropTypes.string,
};

export default Button;
