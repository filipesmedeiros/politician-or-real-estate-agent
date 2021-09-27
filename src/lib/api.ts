import type { Picture, Profession } from '$lib/types'
import { PICTURES } from '$lib/mocks/pictures'
import { randomItemFromArray } from './utils/randomItemFromArray'

export const callApi = (
  customFetch: typeof fetch | undefined,
  ...params: Parameters<typeof fetch>
): ReturnType<typeof fetch> =>
  (customFetch ?? fetch)(params[0], {
    ...params[1],
    headers: [['Content-Type', 'application/json']],
  })

export const vote = (
  {
    pictureId,
    profession,
    userId,
  }: { pictureId: string; profession: Profession; userId: string },
  customFetch?: typeof fetch,
): Promise<{ correct: boolean; newCorrectPercentage: number }> => {
  const picture = PICTURES.find(({ pictureId: id }) => pictureId === id)
  if (picture === undefined) throw new Error('pictureNotFound')

  return new Promise(res =>
    res({
      correct: profession === picture.profession,
      newCorrectPercentage: picture.correctPercentage,
    }),
  )
}
//   callApi(customFetch, `/vote/${pictureId}`, {
//     method: 'POST',
//     headers: [['Content-Type', 'application/json']],
//     body: JSON.stringify({ prefession }),
//   }).then(res => res.ok)

export const getRandomPicture = (
  userId: string,
  customFetch?: typeof fetch,
): Promise<Picture> => new Promise(res => res(randomItemFromArray(PICTURES)))
// callApi(customFetch, '/pictures/random').then(res => res.json())
