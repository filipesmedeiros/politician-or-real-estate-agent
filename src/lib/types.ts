export type Profession = 'agent' | 'politician'

/**
 * the gender of the worker in the picture
 * null is used when the gender couldn't be determined
 * this may become more *inclusive* over time
 */
export type Gender = 'male' | 'female' | 'other' | null

export interface Vote {
  pictureId: string 
  profession: Profession
}

export interface Picture {
  profession: Profession
  gender: Gender
  pictureId: string
  imageUrl: string
  correctPercentage: number
  infoSource: string
}

export interface User {
  userId: string
  votes: Vote[]
}