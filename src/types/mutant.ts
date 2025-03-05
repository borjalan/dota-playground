// src/types/mutant.ts
export interface Mutant {
  _id: string
  name: string
  realName?: string
  species: string
  affiliation: string[]
  powers: string[]
  firstAppearance: number
  isAlive: boolean
  aliases?: string[]
  creator?: string
  weaknesses?: string[]
  bio?: string
}

// Simple mutant, like me, I had two girlfriends and both left me
export interface SimpleMutant {
  _id: string
  name: string
  powers: string[]
  species: string
  firstAppearance: number
}
