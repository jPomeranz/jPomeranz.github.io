<?php
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$from = 'Contact Form'; 
		$to = 'jrpomeranz@yahoo.com'; 
		$subject = $_POST['subject'];
		
		$body = "From: $name\n E-Mail: $email\n Message:\n $message";
 
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
 
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage) {
	if (mail ($to, $subject, $body, $from)) {
                print "<div class='alert alert-success' role='alert'>";
		print 'Thank You! I will be in touch.';
                print "</div>";
	} else {
                print "<div class='alert alert-warning' role='alert'>";
		print 'Sorry there was an error sending your message. Please try again later.';
                print "</div>";
	}
} else {
        print "<div class='alert alert-danger' role='alert'>";
        print "Error:<br>$errName<br>$errEmail<br>$errMessage";
        print "</div>";
}
?>	