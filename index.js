var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
	socket.emit('chat message', 'you have connected');
	socket.broadcast.emit('chat message', 'someone has connected');

	socket.on('disconnect', function(){
		socket.broadcast.emit('chat message', 'someone has disconnected');
	});
	socket.on('chat message', function(msg){
		console.log('message', msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
