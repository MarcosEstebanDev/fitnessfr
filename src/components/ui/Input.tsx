"use client";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { className?: string };

const Input = React.forwardRef<HTMLInputElement, Props>(({ className = "", ...rest }, ref) => (
  <input
    ref={ref}
    {...rest}
    className={
      `block w-full rounded-lg border border-rose-200 bg-white/80 px-3 py-2 text-sm placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 shadow-sm ` +
      className
    }
  />
));
Input.displayName = "Input";

export { Input };
export default Input;