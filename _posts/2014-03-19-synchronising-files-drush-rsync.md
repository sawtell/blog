---
title:  "Synchronising files with Drush rsync"
date:   2014-03-19
categories: Drupal
tags: Drupal
---

I previously wrote a post about [synchronising files using rsync]. However, Drush allows for a much more convenient way to sync files between environments.

The defualt settings run an `rsync` with the arguments `akz`

{% highlight bash %}
# Sync files from live env to local
# Avoid syncing cache folders such as css, js and styles
drush rsync @live_alias:%files @local_alias:%files --exclude-paths=styles:css:js --verbose

# See all available options
drush rsync --help
{% endhighlight %}

[synchronising files using rsync]: {% post_url 2014-02-10-how-use-rsync-download-files %}
