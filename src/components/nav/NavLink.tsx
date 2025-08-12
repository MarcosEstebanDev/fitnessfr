"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink = ({ href, children, onClick }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
        active
          ? "bg-indigo-600 text-white shadow"
          : "text-indigo-100 hover:bg-indigo-500/30 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};