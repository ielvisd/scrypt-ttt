<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import type { SquareData } from '../types'

const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
  winnerClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'squareClick', square: SquareData): void
}>()

const squareData = props.value as SquareData | null

const tx = squareData?.tx ? `https://test.whatsonchain.com/tx/${squareData.tx}` : ''
</script>

<template>
  <div class="squarewapper">
    <button
      class="square" :class="[winnerClass]"
      @click="emit('squareClick', squareData)"
    >
      <a v-if="squareData.value" :href="tx" target="_blank" title="Click to see the transaction" rel="noreferrer">{{ squareData.value.label }}</a>
    </button>
    <div v-if="squareData" class="squareicon">
      {{ squareData.n }}
    </div>
  </div>
</template>
