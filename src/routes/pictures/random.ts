import type { RequestHandler } from '@sveltejs/kit'

import { PICTURES } from '$lib/mocks/pictures'
import { randomItemFromArray } from '$lib/utils/randomItemFromArray'

// docs: https://kit.svelte.dev/docs#routing-endpoints
export const get: RequestHandler = async () => {
  const randomPicture = randomItemFromArray(PICTURES)
  return { body: JSON.stringify(randomPicture) }
}
