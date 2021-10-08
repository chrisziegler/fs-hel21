const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
// const fs = require('fs')
const morgan = require('morgan')

morgan.token('info', req => JSON.stringify(req.info))

app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')))
app.use(express.json())
// const appLogStream = fs.createWriteStream(path.join(__dirname, 'app.log'))
app.use(
  morgan(
    ':method :url :status :res[content-length] :response-time ms :info',
    // { stream: appLogStream },
  ),
)

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

// GET Index Route
app.get('/', (req, res) => {
  res.send(
    `<div style='text-align: center; margin-top: 5rem; font-size: 1.5rem'>Go to <a href="/api/persons">/api/persons</a> for api</div>`,
  )
})

// GET Info Route
app.get('/info', (req, res) => {
  res.send(
    `<div style="margin: 16px 0 0 8px">
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`,
  )
})

// FAVICON error handling
// app.get('/favicon.ico', (req, res) => {
//   return res.sendStatus(204)
// })

// GET All Route
app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

// SHOW Route
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.filter(p => p.id === id)

  if (!person.length) {
    return res.status(404).json({ error: 'person not found' })
  }
  res.status(200).json(person)
})

const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

// CREATE Route
app.post('/api/persons', (req, res) => {
  const { body } = req
  req.info = body
  if (!body.name || !body.number) {
    return res
      .status(400)
      .json({ error: 'request must include name and number' })
  } else if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  res.json(person)
})

// DESTROY Route
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const exists = persons.some(p => p.id === id)
  if (!exists) {
    return res.status(404).json({ error: 'person not found' })
  }
  persons = persons.filter(p => p.id !== id)
  res.sendStatus(204)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
