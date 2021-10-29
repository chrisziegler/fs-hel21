import axios from 'axios'
const baseUrl = '/api/login'

const login = async user => {
  try {
    const response = await axios.post(baseUrl, user)
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

export default login
