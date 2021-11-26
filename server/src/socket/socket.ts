import express, { Response } from 'express'
// const server = require("http").createServer(app);
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'

const app = express()

const httpSever = createServer(app)

const io = new Server(httpSever, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use(cors())

app.get('/', (res: Response) => {
  res.send('Running')
})

io.on('connection', (socket: Socket) => {
  socket.emit('me', socket.id)

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded')
  })

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name })
  })

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal)
  })
})

httpSever.listen(8080, () => console.log(`Server is started`))
