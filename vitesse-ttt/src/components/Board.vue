<!-- eslint-disable no-console -->
<script setup lang="ts">
// import Square from './Square.vue'
import { defineProps, onBeforeMount, ref, watch } from 'vue'
import type { SquareData } from '../types'

const props = defineProps({
  squares: {
    type: Array,
    required: true,
  },
  winnerSquares: {
    type: Array,
    default: null,
  },
})

const emit = defineEmits<{
  (e: 'squareClick', square: SquareData): void
}>()

// Create a board array that will be used to render the squares. This board should be reactive.
const board: { index: number; value: unknown }[][] = ref([])

// Add a watcher to the squares prop that will update the board when the squares prop changes. The new board will be created from the new squares.
watch(() => props.squares, (newSquares) => {
  console.log('in watch, newSquares: ', newSquares)
  console.log('board is: ', board.value)
  // Loop through the board and update the value of each square.
  board.value.forEach((columns: any[], i: number) => {
    columns.forEach((square: { value: unknown }, j: number) => {
      square.value = newSquares[i * 3 + j]
    })
  })
})

function createBoard(row: number, col: number) {
  const newBoard = []
  let cellCounter = 0

  for (let i = 0; i < row; i += 1) {
    const columns = []
    for (let j = 0; j < col; j += 1) {
      columns.push({ index: cellCounter, value: props.squares[cellCounter] })
      cellCounter++
    }
    newBoard.push(columns)
  }

  return newBoard
}

function getWinnerClass(index: unknown) {
  return props.winnerSquares
    && (props.winnerSquares[0] === index
      || props.winnerSquares[1] === index
      || props.winnerSquares[2] === index)
    ? 'square--green'
    : ''
}

onBeforeMount(() => {
  board.value = createBoard(3, 3)
})
</script>

<template>
  <div>
    <div v-for="(columns, i) in board" :key="i" class="board-row">
      <Square
        v-for="(square, j) in columns"
        :key="(i * 3) + j"
        :winner-class="getWinnerClass(square.index)"
        :value="square"
        @square-click="
          (square: any) => {
            emit('squareClick', square)
          }"
      />
    </div>
  </div>
</template>

<style scoped>
.board-row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
