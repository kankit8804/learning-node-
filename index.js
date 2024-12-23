
import express from 'express'

const app = express()

const port  = 3000

app.use(express.json()) // any data come from frontend in json format we will accept

let teaData = []
let nextId = 1

// Add a new tea

app.post('/teas', (req, res) => {
  
  const {name, price} = req.body
  const newTea = {id: nextId++, name, price}

  teaData.push(newTea)
  res.status(201).send(newTea)
})

// get all tea
app.get('/teas', (req, res) => {
  res.status(200).send(teaData)
})


// get tea using id.
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))

  if(!tea) {
    return res.status(404).send(`Tea not found`)
  }

  res.status(200).send(tea)

})

// update tea

app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))

  if(!tea){
    return res.status(404).send(`Tea not found`)
  }

  const {name, price} = req.body
  tea.name = name
  tea.price = price
  res.send(200).send(tea)
})

// delete tea
app.delete('/teas/:id', (req, res) => {
  const tea = teaData.findIndex(t => t.id === parseInt(req.params.id))

  if(index === -1){
    return res.status(404).send(`Tea not found`)
  }

  teaData.splice(index, 1)
  return res.status(200).send('tea deleted')

})

app.listen(port, () => {
  console.log(`sweever is running at post: ${port}....`)
})