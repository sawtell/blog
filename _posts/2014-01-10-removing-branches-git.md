---
title:  "Removing branches in Git"
date:   2014-01-10
categories: Git
tags: Git
---

Spend long enough working on a codebase and you'll eventually end up with a number of branches on your remote that are redundant. This is either because they're now merged into master or maybe just simply aren't required anymore.

When this happens you can clean up the git repo by pruning these branches.

{% highlight bash %}
# Show all branches, local and remote
git branch -a
# Show remote branches merged into master
git branch -r --merged
# Show remote branches not merged into master
git branch -r --no-merged
{% endhighlight %}

Now you should have a good idea of which branches you can safely remove from the remote.

There are two ways to delete remote branches depending on which version of git you are running.

{% highlight bash %}
# v1.7.0 +
git push origin --delete my-branch
# v1.5.0
git push origin :my-branch

# It is also possible to use the following.
# Although the branches still show up in the Github/Bitbucket UI, for me at least...
git branch -rd origin/my-branch
{% endhighlight %}
