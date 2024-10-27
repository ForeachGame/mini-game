import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Difficulty } from '@/stores/settings/settings.consts'
import { useSettingStore } from '@/stores'
import type { IGameState } from './game.types'
import { INITIAL_GAME_STATE } from './game.consts'

export const useGameStore = defineStore('game', () => {
  const settings = useSettingStore()

  // State
  const gameState = ref<IGameState>(structuredClone(INITIAL_GAME_STATE))

  const interval = ref(0)

  // Getters
  const getGameState = computed(() => gameState.value)

  // Setters

  const setGameState = (value: IGameState) => {
    gameState.value = value
  }

  // Actions
  const hitAction = () => {
    setGameState({
      ...gameState.value,
      successfulHits: gameState.value.successfulHits + 1,
      currentHitRange: calculateCurrentHitRange(),
    })
  }

  const winAction = () => {
    console.log('Победа')
    setGameState({ ...gameState.value, isWin: true, isRotating: false })
  }
  const looseAction = () => {
    console.log('Проигрыш')
    setGameState({ ...gameState.value, isLoose: true, isRotating: false })
  }

  const startGameAction = () => {
    setGameState({
      ...gameState.value,
      isStarted: true,
    })

    interval.value = setInterval(() => {
      setGameState({
        ...gameState.value,
        countdown: gameState.value.countdown - 1,
      })
      if (gameState.value.countdown <= 0) clearInterval(interval.value)
    }, 1000)
  }

  const setGameStateStartGame = () => {
    setGameState({
      ...gameState.value,
      successfulHits: 0,
      pointerAngle: 0,
      isRotating: true,
      currentHitRange: 120,
      centerRange: getRandomCenter(),
      lastTimestamp: performance.now(),
    })
  }

  const stopGameAction = () => {}

  const calculateCurrentHitRange = () => {
    const n = gameState.value.successfulHits
    if (settings.getGameSettings.difficulty === Difficulty.NORMAL) {
      return 120 / (1 + n * 0.4)
    } else {
      return 120 / (1 + n * 0.8)
    }
  }

  function getRandomCenter() {
    return Math.random() * (210 - 150) + 150
  }

  const checkIsWinAction = (): boolean =>
    gameState.value.successfulHits >= settings.getGameSettings.countHits

  const nextRoundAction = () => {
    setGameState({
      ...gameState.value,
      centerRange: getRandomCenter(),
      isRotating: true,
      lastTimestamp: performance.now(),
    })
  }

  const setInitialGameStateAction = () => {
    if (interval.value) {
      clearInterval(interval.value)
    }
    setGameState(structuredClone(INITIAL_GAME_STATE))
  }

  return {
    gameState,
    getGameState,
    setGameState,
    hitAction,
    startGameAction,
    stopGameAction,
    winAction,
    looseAction,
    checkIsWinAction,
    nextRoundAction,
    setGameStateStartGame,
    setInitialGameStateAction,
  }
})
