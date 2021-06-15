const http = require("http")
const express = require('express')
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

let lastSocket
let n = 0

// pra ajudar em debug
global.lastSocket = lastSocket
global.n = n

app.use(express.static('public'))

app.get('/emit', (req, res) => {
  n = n + 1
  const data = `emit ${n}`
  res.status(200).end(data)
  lastSocket.emit('message', data)
})

io.on("connection", socket => {
  console.log('conexão')
  socket.on("message", console.log)
  lastSocket = socket
})

server.listen(3000)

