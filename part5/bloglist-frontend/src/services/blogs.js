import axios from 'axios'
const baseUrl = '/api/blogs'

// private variable - set from outside module (App.js)
let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
// export default { setToken, getAll, create }
