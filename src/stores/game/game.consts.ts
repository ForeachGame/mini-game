import type { IGameState } from './game.types'

export const INITIAL_GAME_STATE: IGameState = {
  isStarted: false,
  isOverHitZone: false,
  isRotating: false,
  pointerAngle: 0,
  successfulHits: 0,
  currentHitRange: 120,
  centerRange: 0,
  lastTimestamp: 0,
  isWin: false,
  isLoose: false,
  countdown: 3,
}
