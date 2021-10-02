import type { RequestHandler } from '@sveltejs/kit'

import { PICTURES } from '$lib/mocks/pictures'
import type { Profession } from '$lib/types'
import { USERS } from '$lib/mocks/users'
import { PROFESSIONS } from '$lib/constants'

export const post: RequestHandler = async ({ body }) => {
  if (typeof body !== 'string') {
    return { status: 400 }
  }
  const { pictureId, userId, profession } = JSON.parse(body) as {
    pictureId: string
    userId: string
    profession: Profession
  }

  if (pictureId === undefined) {
    return { status: 400 }
  }

  if (userId === undefined) {
    return { status: 401 }
  }
  // TODO: change to go to database
  const picture = PICTURES.find(pic => pic.pictureId === pictureId)

  if (picture === undefined) {
    return { status: 400 }
  }

  // TODO: change to go to database
  const user = USERS.find(user => user.userId === userId)

  if (user === undefined) {
    return { status: 401 }
  }

  if (!PROFESSIONS.includes(profession)) {
    return { status: 400 }
  }

  if (user.votes.some(vote => vote.pictureId === pictureId)) {
    return { status: 403 }
  }

  return {
    body: {
      correct: picture.profession === profession,
      newCorrectPercentage: picture.correctPercentage,
    },
  }
}
