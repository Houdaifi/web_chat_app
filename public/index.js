// Make connection
var socket = io();

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', () => {
    socket.emit('isTyping', {
        author: handle.value
    });
});

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('isTyping', (data) => {
    document.getElementById('is_typing').style.visibility = "visible";
    document.getElementById('is_typing').innerHTML = data.author + " is Typping...";
});