import clsx from "clsx";

// src/components/MillionaireLogo.tsx
export default function Logo({ className }: { className?: string }) {
  return (
    <img src="/images/logo.png" alt="logo image" className={clsx(className)} />
  );
}
