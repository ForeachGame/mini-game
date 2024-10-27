<script setup lang="ts">
import { useSettingStore } from '@/stores'
import { computed } from 'vue'
import { Difficulty } from '@/stores/settings/settings.consts'
import { CButton } from '@/components/shared'

const settings = useSettingStore()
const selectedDifficulty = computed(() => settings.getGameSettings.difficulty)
</script>

<template>
  <div class="difficulty-switcher">
    <CButton
      :class="{ active: selectedDifficulty === Difficulty.NORMAL }"
      @click="settings.setDifficultyAction(Difficulty.NORMAL)"
    >
      Средняя
    </CButton>
    <CButton
      :class="{ active: selectedDifficulty === Difficulty.HARD }"
      @click="settings.setDifficultyAction(Difficulty.HARD)"
    >
      Сложная
    </CButton>
  </div>
</template>

<style scoped>
.difficulty-switcher {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.difficulty-switcher button {
  padding: 10px 20px;
  border: none;
  background-color: #ccc;
  cursor: pointer;
  font-size: 16px;
}

.difficulty-switcher button.active {
  background-color: #007bff;
  color: #fff;
}

.difficulty-switcher button:not(:last-child) {
  margin-right: 10px;
}
</style>
