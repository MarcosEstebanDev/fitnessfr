"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };

export const Button = ({ variant = "primary", className = "", ...rest }: Props) => {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:opacity-95"
      : "bg-white border border-rose-100 text-rose-700 hover:bg-rose-50";
  return <button className={`${base} ${styles} ${className}`} {...rest} />;
};

export default Button;