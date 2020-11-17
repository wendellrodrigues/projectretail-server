const express         = require ('express');
const fs              = require ('fs')
const https           = require('https')
const http            = require('http')
const path            = require('path')
const bodyParser      = require('body-parser');
const routes          = require('./routes/routes')
const port            = 3000

const socketIO        = require('socket.io');
let socket            = require('socket.io-client')('http://localhost:8000');
const socketPort      = 5000;

//For state
const users           = require('./users/users')
const currentUser     = require('./users/currentUser')

const app             = express();
const appSocket       = express();
const server          = http.createServer(appSocket);
const io              = socketIO(server);

// Body parser Middleware parses HTTP requests into readable json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes PATH
app.use('/routes', routes);

app.listen(port, () => {
  console.log(`App is listening on PORT ${port}`)
});

// server.listen(socketPort, () => console.log(`Socket listening on PORT ${socketPort}`))

// //Setting up a socket with the namespace "connection" for new sockets
// io.on("connection", socket => {
//   console.log("New client connected");

//   //Here we listen on a new namespace called "incoming data"
//   socket.on("incoming data", (data)=>{
//       //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
//      socket.broadcast.emit("outgoing data", {num: data});
//   });

//   //A special namespace "disconnect" for when a client disconnects
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });

/**
 * Sends session state to ipad every 2 seconds
 */
// setInterval(function() {
//   let user = currentUser
//   console.log(user)
//   socket.emit('incoming data', user);
// }, 2000)



