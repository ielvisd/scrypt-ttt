<!-- eslint-disable no-console -->
<script setup>
import { ref } from 'vue'

const initialGameData = {
  amount: 0,
  name: 'tic-tac-toe',
  date: new Date(),
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  currentStepNumber: 0,
  isAliceTurn: true,
  start: false,
}

const gameData = ref(initialGameData)

const startGame = async (amount) => {
  gameData.value.amount = amount
  gameData.value.start = true
}

const cancelGame = async () => {
  Object.assign(gameData.value, initialGameData)
}

const setGameData = newGameData => (gameData.value = newGameData)
</script>

<template>
  <div class="App">
    <header class="App-header">
      <h2>Play Tic-Tac-Toe on Bitcoin</h2>
      <TitleBar
        :on-start="startGame"
        :on-cancel="cancelGame"
        :started="gameData.start"
      />
      <Game :game-data="gameData" :set-game-data="setGameData" />
    </header>
  </div>
</template>
