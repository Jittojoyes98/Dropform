import React from "react";
import { cn } from "@/lib/utils";

function CircularProgressLoader({ className, size = 40, ...props }) {
  return (
    <div
      className={cn("relative inline-flex", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className="absolute inset-0"
        viewBox="22 22 44 44"
        width={size}
        height={size}
      >
        <circle
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3.6"
        />
      </svg>
      <svg
        className="absolute inset-0 animate-spin"
        viewBox="22 22 44 44"
        width={size}
        height={size}
        style={{ animationDuration: "550ms" }}
      >
        <circle
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke="#d2ddec"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeDasharray="80, 200"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
}

export { CircularProgressLoader };
