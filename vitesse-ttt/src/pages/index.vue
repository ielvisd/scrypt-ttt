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
  console.log('cancelGame, gameData.value: ', gameData.value)
  // Reset the gameData to the initial value.
  gameData.value = structuredClone(initialGameData)
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
        :started="gameData.start"
        @cancel="cancelGame"
      />
      <Game
        :game-data="gameData"
        @game-data-change="setGameData"
      />
    </header>
  </div>
</template>
