var http = require('http');

httpServer = http.createServer(function(req, res){
	console.log('Lol');
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket){
	console.log('New user');
});