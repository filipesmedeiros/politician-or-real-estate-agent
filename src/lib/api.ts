import type { ContentType, Item, ItemTheme } from '$lib/types'

export const callApi = (
  customFetch: typeof fetch | undefined,
  ...params: Parameters<typeof fetch>
): ReturnType<typeof fetch> =>
  (customFetch ?? fetch)(params[0], {
    ...params[1],
    headers: [['Content-Type', 'application/json']],
  })

export const vote = (
  { itemId, team, userId }: { itemId: string; team: string; userId: string },
  customFetch?: typeof fetch,
): Promise<{ correct: boolean; newCorrectPercentage: number }> =>
  callApi(customFetch, `/items/${itemId}/vote`, {
    method: 'POST',
    body: JSON.stringify({ userId, team }),
  }).then(res => res.json())

export const getRandomItemIds = (
  userId: string,
  limit = 20,
  customFetch?: typeof fetch,
): Promise<string[]> =>
  callApi(customFetch, `/pictures/random?userId=${userId}&limit=${limit}`).then(
    res => res.json(),
  )

export const getItem = <
  Type extends ContentType = 'image',
  Theme extends ItemTheme = 'politician-x-real-estate-agent',
>(
  itemId: string,
  customFetch?: typeof fetch,
): Promise<Item<Type, Theme>> =>
  callApi(customFetch, `/pictures/${itemId}`).then(res => res.json())
