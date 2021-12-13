import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

// const baseUrl = 'https://restcountries.com/v3.1/name/aruba?fullText=true'
const baseUrl = 'https://restcountries.com/v2/name'

const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`${baseUrl}/${name}?fullText=true`).then(response => {
      setCountry(response.data)
      console.log(response.data)
    })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.message === 'Not Found') {
    return <div>not found...</div>
  }

  return (
    <div>
      {/* <h3>temp</h3> */}
      <h3>{country[0].name} </h3>
      <div>capital {country[0].capital} </div>
      <div>population {country[0].population}</div>
      <img
        src={country[0].flags.png}
        height="100"
        alt={`flag of ${country[0].name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = e => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        {/* <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        /> */}
        <button>find</button>
      </form>

      <Country country={country} />
      {/* <Country name={name} /> */}
    </div>
  )
}

export default App
