import axios from 'axios'

const baseUrl = 'http://www.localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async object => {
  const response = await axios.post(baseUrl, object)
  return response.data
}
