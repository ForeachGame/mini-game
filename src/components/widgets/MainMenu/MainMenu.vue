<script setup lang="ts">
import { MenuItem } from '@/components/entities'
import type { IMainMenuProps } from './types'

defineProps<IMainMenuProps>()
</script>

<template>
  <nav class="main-menu" v-if="items.length > 0">
    <ul>
      <MenuItem
        v-for="item in items"
        :key="item.link"
        :link="item.link"
        :text="item.text"
      />
    </ul>
  </nav>
</template>

<style scoped>
.main-menu {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 44px;
    color: #fff;
  }
}
</style>
