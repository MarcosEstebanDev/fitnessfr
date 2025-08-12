import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  translucent?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", translucent, ...rest }) => (
  <div
    className={`rounded-3xl border border-indigo-200 shadow-2xl backdrop-blur-xl ${
      translucent ? "bg-white/40" : "bg-white/50"
    } p-8 ${className}`}
    {...rest}
  >
    {children}
  </div>
);