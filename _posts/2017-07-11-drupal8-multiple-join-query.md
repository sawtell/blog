---
title:  "Multiple join query in Drupal 8"
date:   2017-07-11
categories: Drupal
tags: Drupal
---

You can find some information on database queries in Drupal 8 [here](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Database%21database.api.php/group/database/8.3.x) but it doesn't offer many examples in the way of joins.

Here's an example:

{% highlight php %}
<?php
  $query = $db->select('node_field_data', 'n');
  $query->join('node__field_one', 'one', 'one.entity_id = n.nid');
  $query->join('node__field_two', 'two', 'two.entity_id = n.nid');
  $query->join('node__field_three', 'three', 'three.entity_id = n.nid');
  
  $sessions = $query
    ->fields('n', ['title', 'created'])
    ->fields('one', ['field_one_value'])
    ->fields('two', ['field_two_value'])
    ->condition('n.status', 1)
    ->condition('two.field_two_value', $arg1)
    ->condition('three.field_three_value', $arg2)
    ->orderBy('n.created', 'ASC')
    ->execute();
{% endhighlight %}
