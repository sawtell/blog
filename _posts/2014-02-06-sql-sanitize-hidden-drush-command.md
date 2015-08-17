---
title:  "sql-sanitize: The hidden Drush command"
date:   2014-02-06
categories: Drupal
tags: Drupal
redirect_from:
  - /sql-sanitize-hidden-drush-command/ 
---

Nosing around in the Drush code I noticed that there some extra commands that are hidden from view.

One that's super useful is `drush sql-sanitize`.
What this does is rewrite all of the user emails and passwords, by default to `"user+[uid]@localhost"` and `"password"` respectively.

Perfect for a development environment, especially if the site sends out automated emails\!

{% highlight php %}
<?php
// Below is the definition for sql-sanitize
// found in commands/sql/sql.drush.inc
$items['sql-sanitize'] = array(
  'description' => "Run sanitization operations on the current database.",
  'bootstrap' => DRUSH_BOOTSTRAP_DRUSH,
  'hidden' => TRUE,
  'options' => array(
    'sanitize-password' => 'The password to assign to all accounts in the sanitization operation, or "no" to keep passwords unchanged.  Default is "password".',
    'sanitize-email' => 'The pattern for test email addresses in the sanitization operation, or "no" to keep email addresses unchanged.  May contain replacement patterns %uid, %mail or %name.  Default is "user+%uid@localhost".',
  ) + $db_url,
  'aliases' => array('sqlsan'),
);
{% endhighlight %}
