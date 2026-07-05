// Mini-courbe d'évolution (0–100 %) sans dépendance.
export function Sparkline({ points }: { points: number[] }) {
  const w = 84
  const h = 22
  const n = points.length
  const x = (i: number) => (n === 1 ? 0 : (i / (n - 1)) * w)
  const y = (p: number) => h - 2 - (Math.max(0, Math.min(100, p)) / 100) * (h - 4)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p).toFixed(1)}`).join(' ')
  const last = points[n - 1]
  return (
    <svg className="spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <line x1="0" y1={y(50)} x2={w} y2={y(50)} stroke="var(--line)" strokeWidth="1" strokeDasharray="2 3" />
      <path d={d} fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(n - 1)} cy={y(last)} r="2.6" fill={last >= 70 ? 'var(--good)' : last < 45 ? 'var(--bad)' : 'var(--gold)'} />
    </svg>
  )
}
