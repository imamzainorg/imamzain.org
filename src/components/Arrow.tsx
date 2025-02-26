import React from "react";

const Arrow = ({ className = "", size = 24, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth={1}
      color={color}
    >
      <path
        d="M5 12H19M5 12L11 6M5 12L11 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
