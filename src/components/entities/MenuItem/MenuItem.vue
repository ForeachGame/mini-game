<script setup lang="ts">
import type { IMenuItem } from './types'

withDefaults(defineProps<IMenuItem>(), {
  link: '',
  text: '',
})
</script>

<template>
  <li class="menu-item">
    <button @click="$router.push({ path: link })">{{ text }}</button>
  </li>
</template>

<style scoped>
.menu-item {
  list-style: none;
}

button {
  border: none;
  background: none;
  font-size: inherit;
  color: inherit;
  text-align: center;
  cursor: pointer;
  padding: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
}
</style>
