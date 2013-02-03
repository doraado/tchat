jQuery(function($){

	var socket = io.connect('http://localhost:1337');
	
	var $salon = $('#salon');
	var username = false;

	/**
	* Gestion des users
	*/	
	$('#login_form').submit(function(event){
		event.preventDefault();

		username = $('#username').val().split(' ').join('_');

		if(username){
			if($('#'+username).text()){
				$(this).append("<br>Nom d'utilisateur déjà utilisé.");
			}
			else{
				socket.emit('login', {
					username : username,
				});

				$(this).fadeOut(function(){
					$('#message_form').fadeIn();
					$('title').prepend(username+' - ');
				});	
			}
		}
		else{
			$(this).append("<br>Veuillez saisir un nom d'utilisateur.");
		}

	});

	socket.on('logged', function(user){
		$salon.prepend('<p class="new_user_notif">' + user.username + ' vient de se connecter</p>');
	});

	socket.on('newUser', function(user){
		$('#list_user ul').append('<li id="' + user.username +'">' + user.username + ' <span></span></li>');
	});

	socket.on('disUser', function(user){
		$('#'+user.id).remove();

		$salon.prepend('<p class="new_user_notif">' + user.username + ' vient de se déconnecter</p>');
	});

	/**
	* Gestion des messages
	*/
	var $message = $('#message');

	$('#message_form').submit(function(event){
		event.preventDefault();

		var message = $message.val();

		if( message ){
			socket.emit('sendMessage', message);
			$message.val('');
			$message.focus();
		}
	})

	$message.keyup(function(){
		if($message.val()){
			socket.emit('writeMessage');
		}
		else{
			socket.emit('resetMessage');
		}
	});

	socket.on('addMessage', function(data){
		var res = '<h3>'+data.username+'</h3>';
		res += '<p class="message">'+data.message+'</p>';
		$salon.prepend(res);

		$('#'+data.username+' span').text('');
	});

	socket.on('addWriteNotif', function(user){
		$('#'+user.id+' span').text("est en train d'écrire");
	});

	socket.on('removeWriteNotif', function(user){
		$('#'+user.id+' span').text('');
	});
});