var socket = new WebSocket("wss://connect.websocket.in/incubus_2019?room_id=2019");

socket.onopen = function (e) {
	console.log(e);
  addMessage();
}

socket.onmessage = function(evt) {
  var data = JSON.parse(evt.data);
  console.log(data);
};

function addMessage() {
  var message = "Oi tudo bem?";
  socket.send(message);
}