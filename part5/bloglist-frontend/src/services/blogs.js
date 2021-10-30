import axios from 'axios'
const baseUrl = '/api/blogs'

// private variable - set from outside module (App.js)
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(baseUrl, newObj, config)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create }
