<script setup lang="ts">
import { MainMenu } from '@/components/widgets'
import type { IMenuItem } from '@/components/entities/types'

const menuItems: IMenuItem[] = [
  {
    link: '/game',
    text: 'Играть',
  },
  {
    link: '/settings',
    text: 'Настройки',
  },
]
</script>

<template>
  <MainMenu :items="menuItems" />
</template>

<style scoped></style>
