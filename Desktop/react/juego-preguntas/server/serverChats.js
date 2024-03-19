const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Permite todos los orígenes
    methods: ["GET", "POST"]  // Métodos permitidos
  }
});

let users = {};  // Este objeto almacenará los nombres de usuario y los IDs de socket

const usuariosConectados = new Set(); // Guarda los nombres de los usuarios conectados




function createRoomId(userId1, userId2) {
  return [userId1, userId2].sort().join('-');
}

io.on('connection', (socket) => {



  //console.log('Un usuario se ha conectado');

  socket.on('userConnected', (username) => {
    if (username && typeof username === 'string' && username.trim() !== '') {
      users[username] = socket.id;
  
      // Agregar un console.log para imprimir los usuarios
      console.log('Usuarios conectados:', users);
/////////////////////////////////////////////////
      usuariosConectados.add(username);
      io.emit('usuarioConectado', username);
//////////////////////////////////////////////
    } else {
      console.log('No hay usuarios aún. El nombre de usuario es inválido.');
    }
  });

  let usernames = {}; // Este objeto mapeará los IDs de socket a los nombres de usuario


  socket.on('userConnected', (username) => {
    users[username] = socket.id;
    usernames[socket.id] = username;
//////////////////////////////////////////////
console.log('Usuarios conectados:', users);
////////////////////////////////////////

usuariosConectados.add(username);
      io.emit('usuarioConectado', username);

  });



  socket.on('startPrivateChat', (otherUsername, callback) => {
    console.log("se escucho el evento")
    try {
      if (users[otherUsername]) {
        const roomId = createRoomId(socket.id, users[otherUsername]);
        socket.join(roomId);
        console.log(`Emitiendo mensaje a ${users[otherUsername]}`);
  
        const senderUsername = usernames[socket.id]; // Buscar el nombre del remitente usando el ID de socket
        console.log(users[socket.id])
    
      
        const receiverSocketId = users[otherUsername];
        // Emitir un mensaje al otro usuario y esperar una confirmación de recepción
      
        let message = 'te envio un mensaje ' + senderUsername;
        io.to(receiverSocketId).emit('test', message,senderUsername);
       

  
        // Emitir una confirmación de vuelta al cliente que emitió el evento
        callback('received');
      } else {
        socket.emit('error', 'El otro usuario no está conectado');
      }
    } catch {
      console.error
    }
  });
  

 
  
  socket.on('privateChatMessage', (msg, otherUsername) => {
    const senderSocketId = socket.id;
    const receiverSocketId = users[otherUsername];
    const senderUsername = Object.keys(users).find(key => users[key] === senderSocketId);
  
    if (receiverSocketId) {
      // Emitir el mensaje al socket del remitente
      io.to(senderSocketId).emit('privateChatMessage', { msg, sender: senderUsername });
  
      // Emitir el mensaje al socket del destinatario
      io.to(receiverSocketId).emit('privateChatMessage', { msg, sender: senderUsername });

    } else {
      // Si el destinatario no está conectado, emitir un error al remitente
      socket.emit('error', 'El otro usuario no está conectado');
    }
  });
  
  


// Escucha el evento 'getUsuariosConectados' y responde con la lista de usuarios 
socket.on('obtenerUs', () => {
  // Emitir el evento 'usConccs' con el contenido de 'users'
  io.emit('usConccs', users);
  console.log("solicitud de usuarios")

});


///////////////////////////////////////////////////


  socket.on('disconnect', () => {
    for (let username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        break;
      }
      ////////////////////////////////////////////
      usuariosConectados.delete(socket.username);
      io.emit('usuarioDesconectado', socket.username);
    }
    console.log('El usuario se ha desconectado',socket.username);

    // Agregar un console.log para imprimir los usuarios después de la desconexión
    console.log('Usuarios conectados después de la desconexión:', users);
  });





});



server.listen(5000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
