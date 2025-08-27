"use client";

export const FloatingElement = ({ children, delay = 0 }) => (
  <div
    className="animate-bounce"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: "3s",
      animationIterationCount: "infinite",
    }}
  >
    {children}
  </div>
);
