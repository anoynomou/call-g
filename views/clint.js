
var socket = io('/');
var peer = new Peer();
var videogrid= document.getElementById('video-grid')
var myvedeo = document.createElement('video');
myvedeo.muted = true;
var peers= {}
navigator.mediaDevices.getUserMedia({
video:true,audio:true}).then(stream=>{

  addvideostreem(myvedeo,stream)
  peer.on('call',call=>{
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream',userVideoStream=>{addvideostreem(video,userVideoStream)})
  })
socket.on("user-connected",userid =>{
  connectToNewUser(userid,stream)

})
})

socket.on("user-d",(userid)=>{console.log("ki")})

peer.on('open',id=>{socket.emit('join-room',ROOM_ID,id)})

function connectToNewUser(userid,stream){
  const video = document.createElement("video")
  const call = peer.call(userid,stream)
  call.on('stream',userVideoStream=>{
    addvideostreem(video,userVideoStream)
call.on('close',()=>{video.remove()})
peers[userid] = call
})

}

function addvideostreem(video,stream){
video.srcObject = stream;
video.addEventListener('loadedmetadata',()=>{video.play()})
videogrid.append(video)
}
