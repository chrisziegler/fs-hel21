import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

console.log(token, setToken)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlogObject => {
  try {
    const response = await axios.post(newBlogObject)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create }
