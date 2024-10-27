<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useGameStore, useSettingStore } from '@/stores'
import { CButton, MouseIcon } from '@/components/shared'
import { HitPointer, HitZone } from '@/components/entities'
import { HitIndicatorZone } from '@/components/features'

const gameStore = useGameStore()
const settingState = useSettingStore()

const gameState = computed(() => gameStore.getGameState)

const isLoose = computed(() => gameStore.getGameState.isLoose)
const isWin = computed(() => gameStore.getGameState.isWin)
const centerRange = computed(() => gameStore.getGameState.centerRange)
const currentHitRange = computed(() => gameStore.getGameState.currentHitRange)
const pointerAngle = computed(() => gameStore.getGameState.pointerAngle)

const animationSpeed = ref(settingState.getGameSettings.speed)

const ctx = ref<CanvasRenderingContext2D | null>(null)

const timeout = ref(0)

const canvas = useTemplateRef('canvas')
const pointer = useTemplateRef('pointer')

const pointerStyle = computed(() => ({
  transform: `rotate(${pointerAngle.value}deg)`,
}))

let animationFrameId: number

function animate(timestamp: number) {
  if (!gameState.value.isRotating) return

  const deltaTime = (timestamp - gameState.value.lastTimestamp) / 1000

  gameStore.setGameState({
    ...gameState.value,
    lastTimestamp: timestamp,
    pointerAngle: (pointerAngle.value + animationSpeed.value * deltaTime) % 360,
  })

  checkIfOverHitZone()
  draw()

  animationFrameId = requestAnimationFrame(animate)
}

function hit() {
  if (!gameState.value.isStarted || gameState.value.countdown > 0) return

  gameStore.setGameState({
    ...gameState.value,
    isRotating: false,
  })

  cancelAnimationFrame(animationFrameId)

  const hitMin = (centerRange.value - currentHitRange.value / 2 + 360) % 360
  const hitMax = (centerRange.value + currentHitRange.value / 2 + 360) % 360

  const normalizedPointerAngle = (pointerAngle.value + 360) % 360

  const isSuccessful =
    hitMin < hitMax
      ? normalizedPointerAngle >= hitMin && normalizedPointerAngle <= hitMax
      : normalizedPointerAngle >= hitMin || normalizedPointerAngle <= hitMax

  if (!isSuccessful) {
    gameStore.looseAction()
    return
  }

  gameStore.hitAction()

  if (gameStore.checkIsWinAction()) {
    gameStore.winAction()
    return
  }
  gameStore.nextRoundAction()
  animationFrameId = requestAnimationFrame(animate)
}

function checkIfOverHitZone() {
  const hitMin = (centerRange.value - currentHitRange.value / 2 + 360) % 360
  const hitMax = (centerRange.value + currentHitRange.value / 2 + 360) % 360
  const normalizedPointerAngle = (pointerAngle.value + 360) % 360

  const isOverHitZone =
    hitMin < hitMax
      ? normalizedPointerAngle >= hitMin && normalizedPointerAngle <= hitMax
      : normalizedPointerAngle >= hitMin || normalizedPointerAngle <= hitMax

  gameStore.setGameState({
    ...gameState.value,
    isOverHitZone,
  })
}

function draw() {
  if (!canvas.value || !ctx.value) return

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

  const centerX = canvas.value.width / 2
  const centerY = canvas.value.height / 2
  const radius = canvas.value.width / 2

  ctx.value.beginPath()
  ctx.value.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.value.fillStyle = '#000'
  ctx.value.fill()

  ctx.value.globalCompositeOperation = 'destination-out'

  drawHitZoneSector(ctx.value, centerX, centerY, radius)

  ctx.value.globalCompositeOperation = 'source-over'
}

function drawHitZoneSector(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
) {
  const startAngle =
    ((centerRange.value - currentHitRange.value / 2 - 90) * Math.PI) / 180
  const endAngle =
    ((centerRange.value + currentHitRange.value / 2 - 90) * Math.PI) / 180

  ctx.beginPath()
  ctx.moveTo(centerX, centerY)

  if (startAngle < endAngle) {
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  } else {
    // Если сектор пересекает границу 360°/0°
    ctx.arc(centerX, centerY, radius, startAngle, 2 * Math.PI)
    ctx.arc(centerX, centerY, radius, 0, endAngle)
  }

  ctx.closePath()
  ctx.fill()
}

function startGame() {
  gameStore.startGameAction()
  timeout.value = setTimeout(() => {
    if (canvas.value) {
      ctx.value = canvas.value.getContext('2d')
    }
    gameStore.setGameStateStartGame()
    animationFrameId = requestAnimationFrame(animate)
  }, 3000)
}

onMounted(() => {
  if (timeout.value) clearTimeout(timeout.value)
  gameStore.setInitialGameStateAction()
  document.addEventListener('keypress', event => {
    if (event.key === 'e' || event.key === 'у') {
      hit()
    }
  })
})

function restartGame() {
  if (timeout.value) clearTimeout(timeout.value)
  gameStore.setInitialGameStateAction()
  if (!canvas.value || !ctx.value) return
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
}

watch([centerRange, currentHitRange, pointerAngle], draw)
</script>

<template>
  <div class="game">
    <div class="game-wrapper">
      <div class="game-field" :class="[isLoose && 'is-loose']">
        <HitPointer ref="pointer" :style="pointerStyle" />
        <HitZone
          :is-over-hit-zone="gameState.isOverHitZone"
          :is-loose="isLoose"
        >
          <canvas
            ref="canvas"
            class="hit-zone"
            width="156"
            height="156"
          ></canvas>
        </HitZone>
        <div
          class="game-field__info"
          :class="[isLoose && 'is-loose']"
          @click="hit"
        >
          <button
            class="start-button"
            style="display: flex"
            v-if="!gameState.isStarted"
            @click="startGame"
          >
            Старт
          </button>
          <MouseIcon v-else-if="gameState.countdown === 0" />
          <div v-else style="color: #fff; font-size: 18px">
            {{ gameState.countdown }}
          </div>
        </div>
      </div>
      <HitIndicatorZone />
    </div>
  </div>
  <div v-if="isLoose || isWin">
    <div class="messages">
      {{ isLoose ? 'Поражение' : 'Победа' }}
    </div>
    <div class="buttons">
      <CButton @click="$router.push({ path: '/' })"> Закрыть</CButton>
      <CButton @click="restartGame()"> Рестарт</CButton>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-direction: column;
}

.game-field {
  width: 160px;
  height: 160px;
  border: 2px solid #d9d9d9;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &.is-loose {
    border-color: #ff3333;
  }
}

.start-button {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.game-field__info {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: #000;
  border-radius: 50%;
  border: 2px solid #d9d9d9;
  z-index: 50;

  &.is-loose {
    border-color: #ff3333;
  }
}

.messages {
  color: #fff;
  font-size: 22px;
  text-transform: uppercase;
}

.messages,
.buttons {
  height: 60px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}
</style>
