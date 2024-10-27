export interface IGameState {
  isStarted: boolean
  isOverHitZone: boolean
  isRotating: boolean
  pointerAngle: number
  successfulHits: number
  currentHitRange: number
  centerRange: number
  lastTimestamp: number
  isWin: boolean
  isLoose: boolean
  countdown: number
}
