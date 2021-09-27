import { v4 as uuid } from 'uuid'

const getUserId = (): string => {
  const storedUserId = localStorage.getItem('userId')
  if (storedUserId !== null) {
    return storedUserId
  } else {
    const newUserId = uuid()
    localStorage.setItem('userId', newUserId)
    return newUserId
  }
}

export default getUserId
