<script setup lang="ts">
// import Square from './Square.vue'
import { defineProps, onBeforeMount } from 'vue'
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
  onClick: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'squareClick', square: SquareData): void
}>()

let board: { index: number; value: unknown }[][] = []

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
  board = createBoard(3, 3)
})
</script>

<template>
  <div>
    <div v-for="(columns, i) in board" :key="i" class="board-row">
      <Square
        v-for="(square, j) in columns"
        :key="j"
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
