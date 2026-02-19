interface IcoProps {
  d: string
  cls?: string
}

function Ico({ d, cls = 'w-4 h-4' }: IcoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
      <path d={d} />
    </svg>
  )
}

export const Icons = {
  check: <Ico d="M20 6L9 17l-5-5" />,
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  right: <Ico d="M9 18l6-6-6-6" />,
  down: <Ico d="M6 9l6 6 6-6" />,
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  fire: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400">
      <path d="M12 23c-3.87 0-7-3.13-7-7 0-2.38 1.19-4.47 3-5.74V4c0-.55.45-1 1-1s1 .45 1 1v5.26c.63-.43 1.29-.76 2-1V2c0-.55.45-1 1-1s1 .45 1 1v7.26c.71.24 1.37.57 2 1V6c0-.55.45-1 1-1s1 .45 1 1v4.26c1.81 1.27 3 3.36 3 5.74 0 3.87-3.13 7-7 7z" />
    </svg>
  ),
}
