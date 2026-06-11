type SquareProps = {
  value: string | null
  onSquareClick: () => void
}

export default function Square({ value, onSquareClick }: SquareProps) {
  let color = ''

  if (value === 'X') color = 'is-primary'
  if (value === 'O') color = 'is-warning'

  return (
    <button
      className={`nes-btn ${color}`}
      style={{
        width: "80px",
        height: "80px",
        fontSize: "2rem",
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}
