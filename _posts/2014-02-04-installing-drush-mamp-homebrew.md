---
title:  "Installing drush for MAMP with Homebrew"
date:   2014-02-04
categories: SysAdmin
tags: SysAdmin
---

###Install Homebrew

By far, the quickest and easiest way of installing Drush is via Homebrew.
If you don't already have Homebrew installed you can use the link above to find out more or just paste the below into the terminal.

{% highlight bash %}
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
{% endhighlight %}

###Install Drush

Before installing Drush you may first have to install Git.

{% highlight bash %}
brew install git
In a simialr fashion, install Drush

brew install drush
{% endhighlight %}

You can check Drush is ready to use by typing drush in the terminal and you'll see a list of the available commands.
Almost there but you will need to make sure that Drush uses the MAMP mysql.sock file.

{% highlight bash %}
sudo mkdir /var/mysql
sudo ln -s /Applications/MAMP/tmp/mysql/mysql.sock /var/mysql/mysql.sock
{% endhighlight %}

Finally, you will need to add the MAMP bin folder added to your $PATH. You can do this by adding the following line to your .bash_profile

{% highlight bash %}
export PATH=$PATH:/Applications/MAMP/Library/bin
{% endhighlight %}

###Optional

You can tell drush to use a specific PHP executable by setting the variable DRUSH_PHP

{% highlight bash %}
# set the path to the version of PHP MAMP is running
export DRUSH_PHP="/Applications/MAMP/bin/php/php5.4.10/bin/php"
{% endhighlight %}
