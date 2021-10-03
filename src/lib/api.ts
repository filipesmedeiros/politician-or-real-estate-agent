import type { Picture, Profession } from '$lib/types'

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
): Promise<{ correct: boolean; newCorrectPercentage: number }> =>
  callApi(customFetch, `/pictures/${pictureId}/vote`, {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify({ userId, profession }),
  }).then(res => res.json())

export const getRandomPictureIds = (
  userId: string,
  limit = 20,
  customFetch?: typeof fetch,
): Promise<string[]> =>
  callApi(customFetch, `/pictures/random?userId=${userId}&limit=${limit}`).then(
    res => res.json(),
  )

export const getPicture = (
  pictureId: string,
  customFetch?: typeof fetch,
): Promise<Picture> =>
  callApi(customFetch, `/pictures/${pictureId}`).then(res => res.json())
