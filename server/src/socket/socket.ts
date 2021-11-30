
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer()

const io = new Server(httpServer, {
  pingTimeout: 30000,
})

io.on('connection', (socket: Socket) => {
  socket.on('join', function (data) {
    socket.join(data.roomId)

    io.to(data.roomId).emit('ready')

    socket.on('disconnect', () => {
      io.to(data.roomId).emit('disconnected')
    })
  })
})

httpServer.listen(3000, function () {
  console.log('listening')
})

