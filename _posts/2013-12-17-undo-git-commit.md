---
title:  "Undo a git commit"
date:   2013-12-17
categories: Git
tags: Git
---
Undo a local git commit with [git-reset].

Use `HEAD~1` for the last commit or `HEAD~2` for the last two commits, and so on.

{% highlight bash %}
git reset --soft HEAD~1
git status # This will show the changes just undone
# Make changes
git add .
git commit -m "Useful message here"
{% endhighlight %}

[git-reset]: http://git-scm.com/docs/git-reset
