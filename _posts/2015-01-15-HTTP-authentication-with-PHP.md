---
title:  "HTTP Authentication with PHP"
date:   2015-01-15
categories: PHP
tags: PHP
---

This is useful if you are using a hosting solution that makes it tricky or impossible to implement HTTP authentication with the web server.

The example below is providing authentication on all paths prefixed with `private`.

{% highlight php %}
<?php
$path = $_GET['path'];
$access = TRUE;
// If the path matches the private path
if (preg_match('/^private\/[a-z0-9\/]*/i', $path)) {
  if (!isset($_SERVER['PHP_AUTH_USER'])) {
    // Prompt for username and password.
    header('WWW-Authenticate: Basic realm="Protected"');
    // Display access denied if user hits cancel.
    $access = FALSE;
  }
  else {
    if ($_SERVER['PHP_AUTH_USER'] != 'username' || 
    (!isset($_SERVER['PHP_AUTH_PW']) && $_SERVER['PHP_AUTH_PW'] != 'password')) {
      $access = FALSE;
    }
  }
  if (!$access) {
    // Print a 401 page.
    header('HTTP/1.0 401 Unauthorized');
    print 'You are not authorized to access this page.';
    exit();
  }
}
{% endhighlight %}
