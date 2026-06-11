import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useGameStore = create(
  combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
    return {
      setSquares: (nextSquares) => {
        set((state) => ({
          squares:
            typeof nextSquares === 'function'
              ? nextSquares(state.squares)
              : nextSquares,
        }))
      },
      setXIsNext: (nextXIsNext) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === 'function'
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }))
      },
    }
  }),
)
