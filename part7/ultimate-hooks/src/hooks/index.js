import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clear,
  }
}
export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(`${baseUrl}`)
      .then(response => setResources(response.data))
      .catch(err => console.log(err.message))
  }, [baseUrl])

  const create = async newObject => {
    try {
      const response = await axios.post(baseUrl, newObject)
      setResources(resources.concat(response.data))
    } catch (exception) {
      console.log(exception)
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}
