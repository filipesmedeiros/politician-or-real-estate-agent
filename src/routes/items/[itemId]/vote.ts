import type { RequestHandler } from '@sveltejs/kit'

import PICTURES from '$lib/mocks/pictures'
import USERS from '$lib/mocks/users'

export const post: RequestHandler<
  null,
  {
    userId: string
    team: string
  }
> = async ({ body, params: { itemId } }) => {
  if (body === undefined) {
    return { status: 400 }
  }
  const { userId, team } = body

  if (userId === undefined) {
    return { status: 401 }
  }
  // TODO: change to go to database
  const item = PICTURES.find(pic => pic.itemId === itemId)

  if (item === undefined) {
    return { status: 400 }
  }

  // TODO: change to go to database
  const user = USERS.find(user => user.userId === userId)

  if (user === undefined) {
    return { status: 401 }
  }

  if (user.votes.some(vote => vote.itemId === itemId)) {
    return { status: 403 }
  }

  return {
    body: {
      correct: item.team === team,
      newCorrectPercentage: item.correctPercentage,
    },
  }
}
