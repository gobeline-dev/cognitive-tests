// Emblème : cercle bleu et anneau de 12 étoiles (clin d'œil au drapeau européen).
export function Emblem() {
  const stars = []
  for (let i = 0; i < 12; i++) {
    const a = ((i * 30 - 90) * Math.PI) / 180
    stars.push({ cx: 23 + 13 * Math.cos(a), cy: 23 + 13 * Math.sin(a) })
  }
  return (
    <div className="emblem">
      <svg viewBox="0 0 46 46" width={46} height={46} aria-hidden="true">
        <circle cx={23} cy={23} r={22} fill="#0B3D91" />
        <g fill="#F2B705">
          {stars.map((s, i) => (
            <circle key={i} cx={s.cx.toFixed(1)} cy={s.cy.toFixed(1)} r={1.8} />
          ))}
        </g>
      </svg>
    </div>
  )
}
