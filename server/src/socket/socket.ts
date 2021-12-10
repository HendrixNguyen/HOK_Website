import { Server, Socket } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer()

const io = new Server(httpServer, {
  pingTimeout: 30000,
})

const users: Array<string> = []

io.on('connection', (socket: Socket) => {
  socket.on('join', function () {
    socket.emit('me', socket.id)

    users.push(socket.id)
    if (users.length % 2 == 0) {
      const [roomId, room] = users.slice(-2)
      io.to(roomId).emit('Matched', { roomId: room })
    }

    socket.on('disconnect', () => {
      socket.broadcast.emit('callEnded')
    })
  })
})

httpServer.listen(3001, function () {
  console.log('listening')
})
