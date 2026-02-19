interface XPBadgeProps {
  xp: number
  level: number
}

export function XPBadge({ xp, level }: XPBadgeProps) {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-700/30 rounded-lg px-3 py-1.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">
        {level}
      </div>
      <div className="text-xs">
        <div className="text-amber-400 font-semibold">{xp.toLocaleString()} XP</div>
        <div className="text-amber-600">Level {level}</div>
      </div>
    </div>
  )
}
