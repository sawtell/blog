---
title:  "MySQL query - order results by an array"
date:   2011-12-03
categories: Database
tags: Database
redirect_from:
  - /mysql-query-order-results-array/
---
###The Problem

You want to get a list of items with the ids (5, 2, 1, 3) and output them in the same order. However, just running a select query will return the items in the order (1, 2, 3, 5):

{% highlight php %}
<?php
$list = 5, 2, 1, 3;
$query = "SELECT * FROM [table-name] WHERE id IN ($list)";
// the resultant rows would be 1, 2, 3, 5
{% endhighlight %}

###The Solution

To order the results correctly you need to build a list of ORDER BY items describing the weights of the ids. This will look like:

{% highlight php %}
ORDER BY id = 5 DESC, id = 2 DESC, id = 1 DESC, id = 3 DESC
{% endhighlight %}

Putting it all together gives the following.

{% highlight php %}
<?php
$ids = array(5, 2, 1, 3);
$list = implode(',', $ids);
$order_array = 'ORDER BY';
foreach ($ids as $item) {
  $order_array .= ' id = ' . $item . ' DESC,';
}
$order_array = trim($order_array, ',');
$query = "SELECT * FROM [table-name] WHERE id IN ($list) $order_array";
{% endhighlight %}
