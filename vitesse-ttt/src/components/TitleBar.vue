<script setup lang="ts">
import { defineEmits, ref } from 'vue'

const props = defineProps({
  onStart: Function,
  started: Boolean,
})

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const amountRef = ref(null)

const onStart = async () => {
  const amount = parseInt(amountRef.value.value)
  if (amount < 50000) {
    alert('invalid amount, at least 50000 satoshis')
    return
  }

  if (!isNaN(amount))
    props.onStart(amount)
  else
    console.error(`${amountRef.value.value} is not a number`)
}

const onCancel = () => {
  props.onCancel()
}
</script>

<template>
  <div>
    <template v-if="props.started">
      The game is in progress ...
      <button
        class="pure-button cancel" amountRef placeholder="in satoshis" @click="$emit('cancel')"
      >
        Restart
      </button>
    </template>
    <template v-else>
      <label>Bet amount:
        <input
          ref="amountRef" type="number" name="amount" min="1" :defaultValue="50000" placeholder="in satoshis"
        >
      </label>
      <button
        class="pure-button start" @click="onStart"
      >
        Start
      </button>
    </template>
  </div>
</template>
