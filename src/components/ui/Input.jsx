import React from "react";

const Input = ({ type, placeholder, className, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border p-2 rounded-lg ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
