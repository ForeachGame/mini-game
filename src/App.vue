<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="game-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #222;
}
</style>
