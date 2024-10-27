import { defineStore } from 'pinia'
import { ANIMATION_SPEED, Difficulty } from '@/stores/settings/settings.consts'
import type {
  IGameSetting,
  TDifficulty,
} from '@/stores/settings/settings.types'
import { computed, ref } from 'vue'

const INITIAL_SETTINGS_STATE: IGameSetting = {
  speed: ANIMATION_SPEED,
  difficulty: Difficulty.NORMAL,
  countHits: 6,
}

export const useSettingStore = defineStore('settings', () => {
  const gameSettings = ref<IGameSetting>(
    structuredClone(INITIAL_SETTINGS_STATE),
  )

  const getGameSettings = computed(() => gameSettings.value)

  const setGameSettings = (value: IGameSetting) => {
    gameSettings.value = value
  }

  const setDifficultyAction = (difficulty: TDifficulty) => {
    setGameSettings({
      ...gameSettings.value,
      difficulty,
    })
  }

  return {
    getGameSettings,
    setGameSettings,
    setDifficultyAction,
  }
})
