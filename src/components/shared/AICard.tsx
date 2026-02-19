import type { ReactNode } from 'react'

interface AICardProps {
  title: string
  variant?: 'info' | 'success' | 'warning' | 'tip'
  children: ReactNode
}

const variantStyles = {
  info: 'border-cyan-800/40 bg-cyan-950/30',
  success: 'border-emerald-800/40 bg-emerald-950/30',
  warning: 'border-amber-800/40 bg-amber-950/30',
  tip: 'border-violet-800/40 bg-violet-950/30',
}

const dotStyles = {
  info: 'bg-cyan-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  tip: 'bg-violet-400',
}

export function AICard({ title, variant = 'info', children }: AICardProps) {
  return (
    <div className={`border rounded-lg p-3 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]} animate-pulse`} />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          AI · {title}
        </span>
      </div>
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  )
}
