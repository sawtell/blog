---
title:  "Tomcat - cannot find ./bin/catalina.sh"
date:   2012-10-23
categories: Drupal
tags: Drupal
---
A routine installation of Tomcat and for some reason, trying to start up the server I get the following error:

`Cannot find ./bin/catalina.sh`
The permissions simply need to be changed on the executable files:

{% highlight bash %}
chmod +x bin/*.sh
chmod +x bin/*.jar
{% endhighlight %}
