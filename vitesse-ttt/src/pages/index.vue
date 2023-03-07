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

const gameData = ref(structuredClone(initialGameData))

const startGame = async (amount) => {
  gameData.value.amount = amount
  gameData.value.start = true
}

const cancelGame = async () => {
  Object.assign(gameData.value, initialGameData)
}

const setGameData = (newGameData) => {
  console.log('setGameData, newGameData: ', newGameData)
  gameData.value = newGameData

  console.log('setGameData, gameData.value: ', gameData.value)
  console.log('setGameData, gameData.value.history: ', gameData.value.history[1])
  // The newGameData contains a history array. This needs to be cloned.
  // Otherwise, the history array will be the same as the old one.
  // Object.assign(gameData.value, newGameData)
}
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
      <Game
        :game-data="gameData"
        @game-data-change="setGameData"
      />
    </header>
  </div>
</template>
