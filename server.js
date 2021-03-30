const express = require("express"); //faz só a tratativa
const path = require("path"); // padrao node

const app = express(); // app do express
const server =  require('http').createServer(app);
const io = require('socket.io')(server);// define protocolo wss pro websocket e retorna uma função ja chamando o server

app.use(express.static(path.join(__dirname, "public"))); // chamando na pasta public
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res)=>{
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log( `socket conectado  ${socket.id}`);
    socket.emit('previousMessage', messages);
    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
});

server.listen(3000); //ouvira a porta 3000
// server.listen('https://chat-smoky-pi.vercel.app/');