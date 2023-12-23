/*
Web Socket is a protocol that provides full-duplex(multiway) communication 
i.e allows communication in both directions simultaneously. 
It is a modern web technology in which there is a continuous connection between the user’s browser(client) and the server. 
In this type of communication, between the web server and the web browser, both of them can send messages to each other at any point in time.
*/

const http=require('http');
const express=require('express');
const app=express();
const server=http.createServer(app);  
const {Server}=require('socket.io');
const io=new Server(server); //socket.io server 

io.on('connection',(socket)=>{
    console.log('A user connected With Id : ',socket.id);
    socket.on('user-messgae',(message)=>{
        console.log("A new User Message -> ",message);
        io.emit('user-messgae',message);
    })
})

app.use(express.static('public'));
app.use(express.json());
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});