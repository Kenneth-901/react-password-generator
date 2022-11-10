import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordShowAndHide = ({ field, form }) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <div>
      <i
        className={hasError ? "icon-error password-icon" : "fa fa-key password-icon"}
        onClick={() => changeShowHidePassword(!showHidePassword)}
      >
        {showHidePassword ? <FaEye/> : <FaEyeSlash/>}
      </i>
      <input
        type={showHidePassword ? "text" : "password"}
        {...field}
        placeholder="Password"
      />
    </div>
  );
};

export default PasswordShowAndHide;