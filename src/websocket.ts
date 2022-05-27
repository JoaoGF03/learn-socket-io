import { io } from './http';

interface RoomUser {
  socketId: string;
  username: string;
  room: string;
}

const users: RoomUser[] = [];

interface Message {
  username: string;
  room: string;
  message: string;
  createdAt: Date;
}

const messages: Message[] = [];

io.on('connection', socket => {
  socket.on('select_room', (data, callBack) => {
    socket.join(data.room);

    const userInRoom = users.find(
      user => user.username === data.username && user.room === data.room,
    );

    if (userInRoom) {
      userInRoom.socketId = socket.id;
    } else {
      users.push({
        socketId: socket.id,
        username: data.username,
        room: data.room,
      });
    }

    const messagesRoom = getMessagesRoom(data.room);
    callBack(messagesRoom);
  });

  socket.on('send_message', data => {
    const message: Message = {
      username: data.username,
      room: data.room,
      message: data.message,
      createdAt: new Date(),
    };

    messages.push(message);

    io.to(data.room).emit('receive_message', message);
  });
});

function getMessagesRoom(room: string): Message[] {
  return messages.filter(message => message.room === room);
}
