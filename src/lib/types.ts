export type ContentType = 'text' | 'audio' | 'video' | 'image'

export interface Vote {
  itemId: string
  team: string
}

// ? improve each content type?
export type Content<T extends ContentType> = T extends 'image'
  ? {
      imageUrl: string
    }
  : T extends 'video'
  ? {
      videoUrl: string
    }
  : T extends 'text'
  ? {
      text: string
    }
  : {
      audioUrl: string
    }

export interface Item<Type extends ContentType, Theme extends ItemTheme> {
  theme: Theme
  themeInfo: ThemeInfo<Theme>
  itemId: string
  team: string
  contentType: Type
  content: Content<Type>
  correctPercentage: number
  source: string
}

export interface User {
  userId: string
  votes: Vote[]
}

export type ItemTheme = 'politician-x-real-estate-agent'

export type ThemeTeams<Theme extends ItemTheme> =
  Theme extends 'politician-x-real-estate-agent' ? 'agent' | 'politician' : ''

export type ThemeInfo<Theme extends ItemTheme> =
  Theme extends 'politician-x-real-estate-agent'
    ? {
        gender: Gender
      }
    : null

/**
 * the gender of the worker in the picture
 * null is used when the gender couldn't be determined
 * this may become more *inclusive* over time
 */
export type Gender = 'male' | 'female' | 'other' | null
