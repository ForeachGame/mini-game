<script setup lang="ts">
import type { IMenuItem } from '@/components/entities/types'
import { DifficultySwitcher, MainMenu } from '@/components/widgets'

const menuItems: IMenuItem[] = [
  {
    link: '/',
    text: 'Закрыть настройки',
  },
]
</script>

<template>
  <DifficultySwitcher />
  <MainMenu :items="menuItems" />
</template>

<style scoped></style>
