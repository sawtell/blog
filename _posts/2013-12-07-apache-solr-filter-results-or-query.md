---
title:  "Apache Solr - filter results with an OR query"
date:   2011-12-07
categories: Drupal
tags: Drupal
redirect_from:
  - /apache-solr-filter-results-or-query/
---
By default, adding filters to the query object will use the *AND* operator. To use **OR**, you will need to add a `SolrFilterSubQuery`.

{% highlight php %}
<?php
/**
 * Implements hook_apachesolr_query_prepare().
 */
function mymodule_apachesolr_query_prepare($query) {
  // filter search to show Article OR Page content types
  // Create sub query to handle "OR"
  $sub_q = new SolrFilterSubQuery();
  // OR operator is used by default
  $sub_q->addFilter('bundle', 'article');
  $sub_q->addFilter('bundle', 'page');
  // apply the query
  $query->addFilterSubQuery($sub_q);
}
{% endhighlight %}
