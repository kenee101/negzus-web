"use client";

import { smoothScrollTo } from "@/utils/smoothScrollTo";
import { smoothScrollToTop } from "@/utils/smoothScrollToTop";

export const NavLink = ({ href, children, onClick, className = "" }) => {
  const handleClick = (e) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      // Smooth scroll to section
      const targetId = href.substring(1);
      smoothScrollTo(targetId);
    } else if (href === "/") {
      // Smooth scroll to top
      smoothScrollToTop();
    } else if (onClick) {
      // Custom onClick handler
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 ${className}`}
    >
      {children}
    </a>
  );
};
