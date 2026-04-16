"use client"

import Link from "next/link"

interface LogoProps {
  variant?: "light" | "dark"
  size?: "sm" | "md" | "lg"
  href?: string
}

const sizes = {
  sm: { symbol: 28, text: "text-lg" },
  md: { symbol: 36, text: "text-xl" },
  lg: { symbol: 48, text: "text-2xl" },
}

export function Logo({ variant = "light", size = "md", href = "/" }: LogoProps) {
  const { symbol, text } = sizes[size]
  const textColor = variant === "light" ? "text-white" : "text-[#0d1b3e]"

  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      {/* Símbolo geométrico Group Legacy */}
      <svg
        width={symbol}
        height={symbol}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Losango dourado (esquerda) */}
        <path
          d="M10 50 L40 15 L55 50 L40 72 Z"
          fill="#c9a84c"
        />
        {/* Losango prata (direita) */}
        <path
          d="M90 50 L60 85 L45 50 L60 28 Z"
          fill="#b0b0b0"
        />
      </svg>

      {/* Texto */}
      <div className={`flex flex-col leading-none ${textColor}`}>
        <span className={`${text} font-bold tracking-wide`}>
          GROUP <span className="text-[#b0b0b0] font-light">LEGACY</span>
        </span>
        <span className="text-[10px] text-[#c9a84c] tracking-[0.15em] uppercase font-medium mt-0.5">
          Accountant Report
        </span>
      </div>
    </Link>
  )
}
