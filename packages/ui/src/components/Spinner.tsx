"use client";

import { LoaderCircleIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {}

export default function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <LoaderCircleIcon
      {...props}
      className={twMerge("animate-spin", className)}
    />
  );
}
