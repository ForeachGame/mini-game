export type TDifficulty = 'normal' | 'hard'

export interface IGameSetting {
  speed: number
  difficulty: TDifficulty
  countHits: number
}
