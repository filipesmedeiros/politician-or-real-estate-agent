import type { RequestHandler } from '@sveltejs/kit'

import PICTURES from '$lib/mocks/pictures'
import randomItemsFromArray from '$lib/utils/randomItemsFromArray'
import USERS from '$lib/mocks/users'
import setMinus from '$lib/utils/setMinus'

// docs: https://kit.svelte.dev/docs#routing-endpoints
export const get: RequestHandler = async ({ query }) => {
  const limit = Number(query.get('limit') ?? '20')
  const userId = query.get('userId')

  if (userId === null) {
    return { status: 401 }
  }

  // TODO: replace with database lookup
  const user = USERS.find(user => user.userId === userId)

  if (user === undefined) {
    return { status: 401 }
  }

  const userVotedOnSet = new Set(user.votes.map(({ pictureId }) => pictureId))
  const allPictureIdsSet = new Set(PICTURES.map(({ pictureId }) => pictureId))
  const validPictureIdsSet = setMinus(allPictureIdsSet, userVotedOnSet)

  const validPictureIds: string[] = []
  validPictureIdsSet.forEach(pictureId => validPictureIds.push(pictureId))

  // TODO: replace with database lookup
  const randomPictureIds = randomItemsFromArray(validPictureIds, limit)

  const pictureIds: string[] = []
  randomPictureIds.forEach(pictureId => pictureIds.push(pictureId))

  return { body: JSON.stringify(pictureIds) }
}
