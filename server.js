var http = require('http');

httpServer = http.createServer(function(req, res){
	console.log('Lol');
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

var users = {};

io.sockets.on('connection', function(socket){
	console.log('New user');

	var me = false;

	/**
	* Gestion des users
	*/
	for(var k in users ){
		socket.emit('newUser', users[k]);
	}

	socket.on('login', function(user){
		me = user;

		me.id  = user.username;

		io.sockets.emit('logged', {username : me.id});

		io.sockets.emit('newUser', {username : me.id});

		users[me.id] = me;
	});

	socket.on('disconnect', function(){
		if(!me){
			return false;
		}

		delete users[me.id];
		socket.broadcast.emit('disUser', me);
	});

	/**
	* Gestion des messages
	*/
	socket.on('sendMessage', function(message){
		io.sockets.emit('addMessage', {username: me.id, message: message});
	});

	socket.on('writeMessage', function(){
		socket.broadcast.emit('addWriteNotif', me);
	});

	socket.on('resetMessage', function(){
		socket.broadcast.emit('removeWriteNotif', me);
	});
});