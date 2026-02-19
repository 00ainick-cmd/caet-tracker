interface BarProps {
  pct: number
  h?: string
  color?: string
  label?: string
  showPct?: boolean
}

export function Bar({ pct, h = 'h-2', color = 'bg-emerald-500', label, showPct = true }: BarProps) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1 text-slate-400">
          <span>{label}</span>
          {showPct && <span>{pct}%</span>}
        </div>
      )}
      <div className={`bg-slate-700 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${color} ${h} rounded-full transition-all duration-700`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  )
}
