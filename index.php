<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Mon Tchat</title>

	<link rel="stylesheet" type="text/css" href="css/myStyle.css">
</head>
<body>
	<h1>Tchat</h1>

	<form id="login_form" method="POST">
		<label for="username">Name</label>
		<input name="username" type="text" id="username" size="50">
		<input type="submit" value="Let's tchat">
	</form>

	<form id="message_form" method="POST">
		<label for="message">Message</label>
		<input name="message" type="text" id="message" size="100">
		<input type="submit" value="Envoyer">
	</form>

	<hr>
	<div id="tchat">
		<h1>Salon</h1>
		<div id="salon"></div>
	</div>

	<hr>
	<div id="list_user">
		<h1>Utilisateurs connectés</h1>
		<ul></ul>
	</div>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script type="text/javascript" src="http://localhost:1337/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="js/client.js"></script>
</body>
</html>

	