import { v4 as uuid } from 'uuid'

import type { Picture } from '$lib/types'

const MALE_POLITICIAN: Picture = {
  pictureId: uuid(),
  imageUrl:
    'https://www.expressofelgueiras.com/wp-content/uploads/2021/06/amandio-serrano-chega-felgueiras-2-678x381.jpg',
  infoSource:
    'https://www.expressofelgueiras.com/autarquicas-candidato-do-chega-em-felgueiras-defende-uma-mudanca-de-ciclo-politico/',
  gender: 'male',
  correctPercentage: 0.56,
  profession: 'politician',
}

const FEMALE_POLITICIAN: Picture = {
  pictureId: uuid(),
  imageUrl:
    'https://pressminho.b-cdn.net/2021/08/Joana-quintela-movimento-51-ponte-de-lima.png',
  infoSource:
    'https://www.pressminho.pt/autarquicas-independente-joana-quintela-e-a-1-a-mulher-a-concorrer-a-camara-de-ponte-de-lima/',
  gender: 'female',
  correctPercentage: 0.53,
  profession: 'politician',
}

const FEMALE_AGENT: Picture = {
  pictureId: uuid(),
  imageUrl:
    'https://media-exp1.licdn.com/dms/image/C4E03AQGtuDKwUMKjxg/profile-displayphoto-shrink_800_800/0/1607442320837?e=1638403200&v=beta&t=76H_vYNb-91aOvApBiwIqYsP19YBsIXGL5E7BXIvVR0',
  infoSource: 'https://www.linkedin.com/in/sara-martins-b8941930/',
  gender: 'female',
  correctPercentage: 0.47,
  profession: 'agent',
}

const MALE_AGENT: Picture = {
  pictureId: uuid(),
  imageUrl:
    'https://scontent.flis8-2.fna.fbcdn.net/v/t1.6435-9/170748070_108416934690702_1766689405262464191_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MjMAK5ofXfEAX8NSj1W&_nc_ht=scontent.flis8-2.fna&oh=0f0cb26b2a2c6b1dff13fa9ba34f81c2&oe=6174A7A5',
  infoSource:
    'https://www.facebook.com/Fernando-Silva-Agente-Imobili%C3%A1rio-107230398142689/?__tn__=-UC*F',
  gender: 'male',
  correctPercentage: 0.49,
  profession: 'agent',
}

export const PICTURES = [
  MALE_AGENT,
  FEMALE_AGENT,
  FEMALE_POLITICIAN,
  MALE_POLITICIAN,
]
