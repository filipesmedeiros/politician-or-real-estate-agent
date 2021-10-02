import type { RequestHandler } from '@sveltejs/kit'

import { PICTURES } from '$lib/mocks/pictures'
import randomItemsFromArray from '$lib/utils/randomItemsFromArray'

// docs: https://kit.svelte.dev/docs#routing-endpoints
export const get: RequestHandler = async ({ query }) => {
  const limit = Number(query.get('limit') ?? '20')

  // TODO: replace with database lookup
  const randomPictures = randomItemsFromArray(PICTURES, limit)
  const ids: string[] = []
  randomPictures.forEach(pic => ids.push(pic.pictureId))

  return { body: JSON.stringify(ids) }
}
