import type { RequestHandler } from '@sveltejs/kit'

import { PICTURES } from '$lib/mocks/pictures'

// docs: https://kit.svelte.dev/docs#routing-endpoints
export const get: RequestHandler = async ({ params }) => {
  const { pictureId } = params

  // `find` docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const picture = PICTURES.find(pic => pic.pictureId === pictureId)
  return { body: JSON.stringify(picture) }
}
