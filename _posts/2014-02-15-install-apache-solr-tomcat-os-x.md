---
title:  "Install Apache Solr on Tomcat - OS X"
date:   2014-02-15
categories: SysAdmin
tags: SysAdmin
redirect_from:
  - /install-apache-solr-tomcat-os-x/
---

To get Apache Solr running with Tomcat on OS X there are just a few steps to take

* Install Homebrew if you don't already have it
* Install Tomcat
* Install Solr
* Let Tomcat know about Solr
* Ensure Tomcat has all the required packages to start Solr

###Install Tomcat

{% highlight bash %}
brew install tomcat
{% endhighlight %}

NB: If you want a specific version of Tomcat, use: brew search tomcat
You may need to tap a repository to install older versions

###Install Solr

{% highlight bash %}
brew install solr
{% endhighlight %}

NB: As mentioned before, you can install older versions of solr if desired.

###solr.xml

An XML file is used to install the Solr app on Tomcat. To set this up, follow the commands below but make sure to put the correct version numbers in.

{% highlight bash %}
# Replace [VERSION] with the correct value
cd /usr/local/Cellar/tomcat/[VERSION]/libexec/conf
mkdir -p Catalina/localhost && cd Catalina/locahost
{% endhighlight %}

Once in the localhost directory, using whichever editor you prefer, create the file "solr.xml" and paste in the following snippit. **Remember to change the version**.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<Context docBase="/usr/local/Cellar/solr/[SOLR-VERSION]/libexec/example/webapps/solr.war" debug="0" crossContext="true">
  <Environment name="solr/home" type="java.lang.String" value="/usr/local/Cellar/solr/[SOLR-VERSION]/libexec/example/solr" override="true"/>
</Context>
{% endhighlight %}

###Copy Solr packages

All that's left to do now is copy some java files from Solr to Tomcat. You can do it through the Finder UI or with the command below, remember to change the versions.

{% highlight bash %}
cp /usr/local/Cellar/solr/[VERSION]/libexec/example/lib/ext/*.jar /usr/local/Cellar/tomcat/[VERSION]/libexec/lib
{% endhighlight %}

Done\!

You can start and stop Tomcat with the commands below. Once it's running, visit `http://localhost:8080/solr` to check it's all working correctly.

{% highlight bash %}
# start Tomcat
catalina start
# stop Tomcat
catalina stop
{% endhighlight %}

