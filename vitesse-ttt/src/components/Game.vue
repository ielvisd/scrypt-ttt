<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import type { GameData, SquareData } from '../types'

const props = defineProps({
  gameData: {
    type: Object as () => GameData,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'gameDataChange', data: GameData): void
}>()

const isAliceTurn = ref(props.gameData.isAliceTurn)
const currentStepNumber = ref(props.gameData.currentStepNumber)
const history = ref(props.gameData.history)
const winner = ref(null)
const winnerRow = ref(null)

const calculateWinner = (squares: SquareData[]) => {
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

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[b] && squares[c] && squares[a].label === squares[b].label && squares[a].label === squares[c].label) {
      console.log('hello?sdlfkasdofa')
      winner.value = squares[a]
      winnerRow.value = lines[i]
      return
    }
  }

  winner.value = null
  winnerRow.value = null
}

// gameData can change from the parent component. Add a watcher to the gameData prop that will update the local state when the gameData prop changes.
watch(() => props.gameData, (newGameData) => {
  isAliceTurn.value = newGameData.isAliceTurn
  currentStepNumber.value = newGameData.currentStepNumber
  history.value = newGameData.history
  calculateWinner(history.value[currentStepNumber.value].squares)
})

const canMove = (i: { index: number; value: string }, squares: SquareData[]) => {
  if (!props.gameData.start) {
    alert('Please start the game!')
    return
  }

  if (winner.value || squares[i.index])
    return false

  return true
}

// i is an Object. It is the index and value of the square.
const handleClick = (i: { index: number; value: string }) => {
  const current = history.value[currentStepNumber.value]
  const squares = current.squares.slice()

  if (!canMove(i, squares)) {
    console.error('can not move now!')
    return
  }

  squares[i.index] = {
    label: isAliceTurn.value ? 'X' : 'O',
    n: history.value.length,
  }

  const gameData_ = {
    history: history.value.concat([{
      squares,
    }]),
    isAliceTurn: winner.value ? isAliceTurn.value : !isAliceTurn.value,
    currentStepNumber: history.value.length,
    start: true,
  }

  // Handle local updates and emit game state
  isAliceTurn.value = gameData_.isAliceTurn
  currentStepNumber.value = gameData_.currentStepNumber
  history.value = gameData_.history

  emit('gameDataChange', gameData_)
  calculateWinner(squares)
}

const current = computed(() => history.value[currentStepNumber.value])

const status = computed(() => {
  if (winner.value)
    // If there is a winner, show the winner which is the opposite of the current player.
    return `Winner: ${isAliceTurn.value ? 'Bob' : 'Alice'} - ${winner.value.label}`

  return `Next player: ${isAliceTurn.value ? 'Alice' : 'Bob'}`
})

const end = computed(() => {
  if (winner.value)
    return `Winner: ${winner.value.label}`

  if (current.value.squares.every((square: any) => square))
    return 'Draw!'

  return ''
})
</script>

<template>
  <div class="game">
    <div class="game-board">
      <div class="game-title">
        <div v-if="!isAliceTurn && !winner" class="bob">
          Bob <img src="../../assets/bob.png" alt="">
        </div>
        <div v-else-if="!winner" class="alice">
          Alice <img src="../../assets/alice.jpg" alt="">
        </div>
        <div class="game-status flex justify-center items-center">
          <p>
            {{ status }}
          </p>
          <div v-if="isAliceTurn && winner" class="bob ml-4">
            <img src="../../assets/bob.png" alt="">
          </div>
          <div v-else-if="winner" class="alice ml-4">
            <img src="../../assets/alice.jpg" alt="">
          </div>
        </div>
      </div>

      <Board mt-4 :squares="current.squares" :winner-squares="winnerRow" @square-click="handleClick" />

      <div class="game-bottom">
        {{ end }}
      </div>
    </div>
  </div>
</template>
