const { Server } = require('socket.io');

const io = new Server({ cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
  socket.on("newmessage", (payload) => {
    console.log(payload)
    io.emit("newmessage" , payload)
  })  
});

io.listen(4000);
