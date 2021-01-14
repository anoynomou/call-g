
var express = require("express");
var app = express();
var PORT = process.env.PORT || 443  
var Http = require('http').createServer(app).listen(PORT);
var socket = require('socket.io')(Http);
var {v4: uuidV4} = require('uuid')

app.set('view engine','ejs')
app.use(express.static('views'))

app.get('/',(req,res)=>{res.redirect(`/${uuidV4()}`)})

app.get('/:room',(req,res)=>{
  res.render('room',{roomId:req.params.room})
})
socket.on('connection',socket1 =>{
   socket1.on('join-room',(roomid,userid)=>{
   socket1.join(roomid)
   socket1.to(roomid).broadcast.emit("user-connected",userid)

socket1.on('disconnect',()=>{socket1.to(roomid).broadcast.emit('user-d',userid)
    })
  })
})






