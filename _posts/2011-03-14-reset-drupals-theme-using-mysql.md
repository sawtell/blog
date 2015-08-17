---
title:  "Reset Drupal's theme using MySQL"
date:   2011-03-14
categories: Drupal
tags: Drupal
redirect_from: 
  - /reset-drupals-theme-using-mysql/
---
It's possible to break everything by doing something so little for example renaming/removing the current theme without disabling it first.
It may also be the case that a new theme is installed which gives that white screen of death.

Hopefully fixing the problem should be painless if you have access to phpMyAdmin (or through SSH) with a few lines of MySQL

First, set Garland as default.

{% highlight mysql %}
UPDATE system SET status=1 WHERE name = 'garland';
{% endhighlight %}

This alone won't fix the issue as the default theme is still set in the variables table and also more than likely in the cache.
Change the variable value.

{% highlight mysql %}
UPDATE variable SET value='s:7:"garland"' WHERE name = 'theme_default';
Then make sure the cache is cleared. TRUNCATE will drop all the rows in the cache table.

TRUNCATE cache;
{% endhighlight %}
