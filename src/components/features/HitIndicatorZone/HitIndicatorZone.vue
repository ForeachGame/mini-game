<script setup lang="ts">
import { HitIndicator } from '@/components/entities'
import { useGameStore } from '@/stores'

const gameStore = useGameStore()
</script>

<template>
  <div class="hit-indicator-zone">
    <HitIndicator
      v-for="n in 6"
      :key="n"
      :is-active="n <= gameStore.getGameState.successfulHits"
    />
  </div>
</template>

<style scoped>
.hit-indicator-zone {
  display: flex;
  width: max-content;
  gap: 4px;
  background: rgba(0, 0, 0, 0.75);
  border: 4px solid rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
</style>
