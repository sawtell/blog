---
title:  "Git delete tag"
date:   2014-12-04
categories: Git
tags: Git
---

### @See: [How to: Delete a remote Git tag]
 
{% highlight bash %}
# Assuming the tag to delete is "1.3.5-rc1"
git tag -d 1.3.5-rc1
git push origin :refs/tags/1.3.5-rc1
{% endhighlight %}

[How to: Delete a remote Git tag]: http://nathanhoad.net/how-to-delete-a-remote-git-tag
