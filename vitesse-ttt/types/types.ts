export interface SquareData {
  label: 'X' | 'O'
  tx?: string
  n: number
}

export interface GameData {
  amount: number
  name: string
  date: Date
  history: Array<
        {
          squares: Array<SquareData | null>
        }
    >
  currentStepNumber: number
  isAliceTurn: boolean
  start: boolean
}
