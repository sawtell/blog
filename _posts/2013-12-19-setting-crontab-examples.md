---
title:  "Setting up a crontab with examples"
date:   2013-12-19
categories: SysAdmin
tags: SysAdmin
redirect_from:
  - /setting-crontab-examples/
---
Create or edit a crontab by running:

`crontab -e`
Specify the following fields to configure the job


Minute | Hour | Day of Month | Month | Day of Week | Command
--- | --- | --- | --- | --- | ---
0 - 59 | 0 - 23 | 1 - 31 | 1 - 12 | 0 - 6 | `command-to-run`

Setting the fields.

* \* (aterisk) is a wildcard for every.
* \- (hyphen) is used to for every, within a range
* , (comma) is an and operator
* / (forward slash) is used for increments

Below are some examples

{% highlight bash %}
* * * * * drush @mysite core-cron -y # Run every minute
30 * * * * drush @mysite core-cron -y # Run every hour at 30 minutes past
0, 30 * * * * drush @mysite core-cron -y # Run every half an hour
0/10 * * * * drush @mysite core-cron -y # Run every 10 minutes from the hour
00 9-13 * * * drush @mysite core-cron -y # Run every hour between 9am and 1pm
00 9 * * 5 drush @mysite core-cron -y # Run at 9am every Friday
{% endhighlight %}

There are also special strings that can be used to denote frequency:

* @reboot - Run on server boot
* @yearly
* @annually
* @monthly
* @weekly
* @daily
* @midnight
* @hourly
