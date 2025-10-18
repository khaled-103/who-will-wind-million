// src/components/ui/PrimaryButton.tsx
import React from "react";
import clsx from "clsx";

interface PrimaryButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children, className, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "cursor-pointer px-6 py-2 rounded-xl font-semibold text-millionaire-dark bg-yellow-300 active:scale-95 transition-all duration-200 )]",
        className
      )}
    >
      {children}
    </button>
  );
}
