import type { RequestHandler } from '@sveltejs/kit'

import type { Profession } from '$lib/types'
import PICTURES from '$lib/mocks/pictures'
import USERS from '$lib/mocks/users'
import { PROFESSIONS } from '$lib/constants'

export const post: RequestHandler<
  null,
  {
    userId: string
    profession: Profession
  }
> = async ({ body, params: { pictureId } }) => {
  if (body === undefined) {
    return { status: 400 }
  }
  const { userId, profession } = body

  if (userId === undefined) {
    return { status: 401 }
  }
  // TODO: change to go to database
  const picture = PICTURES.find(pic => pic.pictureId === pictureId)

  if (picture === undefined) {
    console.log('picture')
    return { status: 400 }
  }

  // TODO: change to go to database
  const user = USERS.find(user => user.userId === userId)

  if (user === undefined) {
    return { status: 401 }
  }

  if (!PROFESSIONS.includes(profession)) {
    console.log('profession')
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
