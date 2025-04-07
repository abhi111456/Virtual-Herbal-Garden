import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">{children}</div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
