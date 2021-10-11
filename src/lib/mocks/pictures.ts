import type { Item } from '$lib/types'

const MALE_POLITICIAN: Item<'image', 'politician-x-real-estate-agent'> = {
  theme: 'politician-x-real-estate-agent',
  contentType: 'image',
  content: {
    imageUrl:
      'https://www.expressofelgueiras.com/wp-content/uploads/2021/06/amandio-serrano-chega-felgueiras-2-678x381.jpg',
  },
  itemId: '95bf77e9-5198-475c-8476-76d825e928f5',
  source:
    'https://www.expressofelgueiras.com/autarquicas-candidato-do-chega-em-felgueiras-defende-uma-mudanca-de-ciclo-politico/',
  themeInfo: { gender: 'male' },
  correctPercentage: 0.56,
  team: 'black',
}

const FEMALE_POLITICIAN: Item<'image', 'politician-x-real-estate-agent'> = {
  theme: 'politician-x-real-estate-agent',
  contentType: 'image',
  content: {
    imageUrl:
      'https://pressminho.b-cdn.net/2021/08/Joana-quintela-movimento-51-ponte-de-lima.png',
  },
  itemId: 'e0592e43-2232-4ba7-8967-1476f8da07f2',
  source:
    'https://www.pressminho.pt/autarquicas-independente-joana-quintela-e-a-1-a-mulher-a-concorrer-a-camara-de-ponte-de-lima/',
  themeInfo: { gender: 'female' },
  correctPercentage: 0.53,
  team: 'black',
}

const FEMALE_AGENT: Item<'image', 'politician-x-real-estate-agent'> = {
  theme: 'politician-x-real-estate-agent',
  contentType: 'image',
  content: {
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C4E03AQGtuDKwUMKjxg/profile-displayphoto-shrink_800_800/0/1607442320837?e=1638403200&v=beta&t=76H_vYNb-91aOvApBiwIqYsP19YBsIXGL5E7BXIvVR0',
  },
  itemId: 'a34ebcc1-f7ae-461b-b988-9d4bcc4bffc4',
  source: 'https://www.linkedin.com/in/sara-martins-b8941930/',
  themeInfo: { gender: 'female' },
  correctPercentage: 0.47,
  team: 'white',
}

const MALE_AGENT: Item<'image', 'politician-x-real-estate-agent'> = {
  theme: 'politician-x-real-estate-agent',
  contentType: 'image',
  content: {
    imageUrl:
      'https://scontent.flis8-2.fna.fbcdn.net/v/t1.6435-9/170748070_108416934690702_1766689405262464191_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MjMAK5ofXfEAX8NSj1W&_nc_ht=scontent.flis8-2.fna&oh=0f0cb26b2a2c6b1dff13fa9ba34f81c2&oe=6174A7A5',
  },
  itemId: 'c34d26f4-07c6-4e24-a647-4cc981e7f6e2',
  source:
    'https://www.facebook.com/Fernando-Silva-Agente-Imobili%C3%A1rio-107230398142689/?__tn__=-UC*F',
  themeInfo: { gender: 'male' },
  correctPercentage: 0.49,
  team: 'white',
}

export default [MALE_AGENT, FEMALE_AGENT, FEMALE_POLITICIAN, MALE_POLITICIAN]
