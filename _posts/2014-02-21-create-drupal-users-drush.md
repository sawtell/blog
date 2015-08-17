---
title:  "Create Drupal users with Drush"
date:   2014-02-21
categories: Drupal
tags: Drupal
redirect_from:
  - /create-drupal-users-drush/
---

This is especially useful if you don't have a login to create accounts through the web interface.

{% highlight bash %}
# create user
drush ucrt newUser --mail="user@example.com" --password="passw0rd"
# add a role to the new user
drush urol administrator newUser
{% endhighlight %}

