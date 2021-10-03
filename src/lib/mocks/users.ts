import type { User } from '$lib/types'

const USER_MARTINS: User = {
  userId: 'f41da268-e00c-4905-acdb-60e9d81a68de',
  votes: [
    {
      pictureId: '95bf77e9-5198-475c-8476-76d825e928f5',
      profession: 'politician',
    },
    { pictureId: 'e0592e43-2232-4ba7-8967-1476f8da07f2', profession: 'agent' },
  ],
}

const USER_MEDEIROS: User = {
  userId: '0f81d0db-3ac8-48eb-ab92-1a73551ba185',
  votes: [
    { pictureId: '95bf77e9-5198-475c-8476-76d825e928f5', profession: 'agent' },
    {
      pictureId: 'e0592e43-2232-4ba7-8967-1476f8da07f2',
      profession: 'politician',
    },
  ],
}

export default [USER_MARTINS, USER_MEDEIROS]
