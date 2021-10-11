import type { RequestHandler } from '@sveltejs/kit'

import PICTURES from '$lib/mocks/pictures'

// TODO: contribute to the types (output type seems to be wrong)
// docs: https://kit.svelte.dev/docs#routing-endpoints
export const get: RequestHandler = async ({ params: { pictureId } }) => {
  // `find` docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  // TODO: replace with database lookup
  const picture = PICTURES.find(pic => pic.itemId === pictureId)

  if (picture === undefined)
    return {
      status: 404,
    }

  return { body: JSON.stringify(picture) }
}
