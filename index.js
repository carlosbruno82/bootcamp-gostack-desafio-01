const express = require('express');

const server = express()

server.use(express.json())

const project = []


// Middleware
// Local verificar o ID existente
function checkId(req, res, next) {
  const { id } = req.params
  const findId = project.find(obj => obj.id == id)

  if (!findId) {
    return res.status(400).json({ error: 'ID no exists.' })
  }
  return next()
}

// Global contagem de requisições
server.use((req, res, next) => {
  console.count('Número de requisição')

  next()
})


// POST
server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body

  project.push({ id, title, tasks })  

  return res.json(project)
})

//GET
server.get('/projects', (req, res) => {
  return res.json(project)
})

//PUT
server.put('/projects/:id', checkId, (req, res) => {
  const { id } = req.params
  
  const { title } = req.body

  const findId = project.find(obj => obj.id == id)

  findId.title = title

  return res.json(project)

})

// DELETE
server.delete('/projects/:id', checkId, (req, res) => {
  const { id } = req.params
  
  const findId = project.findIndex(obj => obj.id == id)
  
  project.splice(findId, 1)

  return res.send()
})

// POST  tasks
server.post('/projects/:id/tasks', checkId, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const findId = project.find(obj => obj.id == id)
  findId.tasks = title

  return res.json(project)
})

server.listen(3000)