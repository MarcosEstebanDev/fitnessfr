import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, loading, className = "", ...props }) => (
  <button
    disabled={loading || props.disabled}
    className={`w-full bg-gradient-to-r from-indigo-500 to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg hover:from-indigo-600 hover:to-blue-800 transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {loading ? "Procesando..." : children}
  </button>
);