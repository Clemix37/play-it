// PACKAGES
const compression = require('compression');
const express = require('express');
const bp = require('body-parser');
const dotEnv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { deleteRoom } = require('./general/fonctions');
const roomRoutes = require("./routes/room.route");
const RoomPlayer = require('./models/roomPlayer.model');
// Server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
}); 
// CONFIGURATION
dotEnv.config();
const PORT = process.env.PORT || 5000;
const PORT_SOCKET = 4000;
const buildPath = path.join(__dirname, './client/build');
app.use(express.static(buildPath)); // On précise où on veut trouver les fichiers statiques
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Évite les empty body dans les requêtes POST
app.use(bp.urlencoded({
  extended:true
}));

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err=>{
    console.error("Erreur lors de la Connexion à la base de donées", err);
    process.exit();
  });

// ROUTES
app.listen(PORT, ()=>{
    console.log(`Lance sur http://localhost:${PORT}/ !`);
});
app.use(roomRoutes);

// SOCKETS
const NEW_USER_EVT = "newUser";
const ROOM_DELETED_EVT = "roomDeleted";
const USER_DISCONNECT = "userDisconnected";
io.on('connection', async (socket) => {
    //console.log(socket);
    console.log(`Client ${socket.id} connected`);
  
    // Join a conversation
    const { roomId, roomPlayerId } = socket.handshake.query;
    socket.join(roomId);
    console.log(roomId, roomPlayerId);
    const roomPlayer = await RoomPlayer.findById(roomPlayerId);

    io.in(roomId).emit(NEW_USER_EVT, {sender: socket.id, roomPlayer, roomId});

    // Listen for new user
    // socket.on(NEW_USER_EVT, (data) => {
    //   console.log(data);
    // });

    // Listen for deleted room
    socket.on(ROOM_DELETED_EVT, (data) => {
      io.in(roomId).emit(ROOM_DELETED_EVT, data);
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", async () => {
      if(roomPlayer?.estAdmin) {
        await deleteRoom(roomId);
        io.in(roomId).emit(ROOM_DELETED_EVT);
      }else{
        const userId = roomPlayer._id;
        io.in(roomId).emit(USER_DISCONNECT, {userId});
        await RoomPlayer.findOneAndDelete(userId);
      }
      console.log(`Client ${socket.id} diconnected`);
      socket.leave(roomId);
    });
});
  
server.listen(PORT_SOCKET, () => {
    console.log(`Socket listening on *:${PORT_SOCKET}`);
});