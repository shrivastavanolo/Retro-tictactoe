import Square from './Square'
import { useGameStore } from '../stores/game'
import Confetti from 'react-confetti'

export default function Board() {
    const xIsNext = useGameStore((state) => state.xIsNext)
    const setXIsNext = useGameStore((state) => state.setXIsNext)
    const squares = useGameStore((state) => state.squares)
    const setSquares = useGameStore((state) => state.setSquares)
    const player = xIsNext ? 'X' : 'O'
    const winner = calculateWinner(squares)
    const turns = calculateTurns(squares)
    const status = calculateStatus(winner, turns, player)
    const resetGame = useGameStore((state) => state.resetGame)

    function handleClick(i: number) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
      }

      function calculateWinner(squares: (string | null)[]) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
      
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i]
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
          }
        }
      
        return null
      }
      
      function calculateTurns(squares: (string | null)[]) {
        return squares.filter((square: string | null ) => !square).length
      }
      
      function calculateStatus(winner: string | null, turns: number, player: string) {
        if (!winner && !turns) return 'Draw'
        if (winner) return `PLAYER ${winner} WINS!`
        return `Next player: ${player}`
      }

      return (
        <>
        {winner && <Confetti recycle={false} numberOfPieces={500} />}
        <div className="nes-container is-dark with-title">
          <p className="title">TIC TAC TOE</p>
      
          <p className="nes-text is-success">
            {status}
          </p>

          {(winner || status === 'Draw') && (
            <button
              className="nes-btn is-success"
              onClick={resetGame}
              style={{ width: "100%" }}
            >
              Play Again
            </button>
          )}
      
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 80px)",
              gap: "4px",
            }}
          >
            {squares.map((square, squareIndex) => (
              <Square
                key={squareIndex}
                value={square}
                onSquareClick={() => handleClick(squareIndex)}
              />
            ))}
          </div>
        </div>
        </>
      )
  }
