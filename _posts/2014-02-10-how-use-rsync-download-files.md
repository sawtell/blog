---
title:  "How to use Rsync to download files"
date:   2014-02-10
categories: SysAdmin
tags: SysAdmin
redirect_from:
  - /how-use-rsync-download-files/
---

###@See: [How to use Rsync to synchronise directories]
Also, if you're looking to synchronise Drupal files, you would be better using [Drush rsync] 

{% highlight bash %}
rsync [options] Source [Source...] Destination
{% endhighlight %}

>Rsync, which stands for "remote sync", is a remote and local file synchronization tool. It uses an algorithm that minimizes the amount of data copied by only moving the portions of files that have changed.
>
>...
>
>The -a option is a combination flag.
>
>It stands for "archive" and syncs recursively and preserves symbolic links, special and device files, modification times, group, owner, and permissions.
>
>It is more commonly used than -r and is usually what you want to use.

{% highlight bash %}
# Push changes to a server
rsync -a ~/dir1/ username@remote_host:destination_directory/

#Pull change to a local directory
rsync -a username@remote_host:/home/username/dir1/ place_to_sync_on_local_machine/
{% endhighlight %}

[How to use Rsync to synchronise directories]: https://www.digitalocean.com/community/articles/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps
[Drush rsync]: {% post_url 2014-03-19-synchronising-files-drush-rsync %}
