import path from "path"
import http from "http"
import express from "express"
import { Server } from "socket.io"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3300

const server = http.createServer(app)

const io = new Server(server)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/chat", (req, res) => {
  io.on("connection", (socket) => {
    console.log("a user connected")
  })
  
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg)
    })
  })
  res.sendFile(__dirname + "/index.html")
})

server.listen(port, () => {
  console.log(`Chat app listening on *:${port}`)
})