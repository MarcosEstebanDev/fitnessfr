"use client";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
  id?: string;
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className = "", label, id, containerClassName = "", ...rest }, ref) => {
    return (
      <div className={containerClassName}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-rose-800 mb-1">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          {...rest}
          className={
            `block w-full rounded-lg border border-rose-200 bg-white/80 px-3 py-2 text-sm placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 shadow-sm ` +
            className
          }
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
export default Input;