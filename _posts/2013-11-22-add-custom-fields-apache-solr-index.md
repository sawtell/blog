---
title:  "Add custom fields to the Apache Solr index"
date:   2013-11-22
categories: Drupal
tags: Drupal
redirect_from:
  - /add-custom-fields-apache-solr-index/
---
>Note: This was written using [apachesolr] version 7.x-1.5

The apachesolr module defines a hook that allows a search document to be updated before it is sent to the Solr server for indexing. Actually, I lied, there are two.

`hook_apachesolr_index_document_build` and `hook_apachesolr_index_document_build_ENTITY_TYPE` (for specific entity types).

{% highlight php %}
<?php
/**
 * Implements hook_apachesolr_index_documents_build_ENTITY_TYPE().
 */
function mymodule_apachesolr_index_document_build_node(ApacheSolrDocument $document, $entity, $env_id) {
  // While indexing article node content
  if ($entity->type == 'article') {
    // Get the field value that needs to be indexed
    if ($fields = field_get_items('node', $entity, 'field_example_field')) {
      // Only need the first value
      $value = field_view_value('node', $entity, 'field_example_field', $fields[0]);
      // Add the value to the document to be indexed. ss_ prefix denotes a string type
      $document->setField('ss_index_field_name', $value);
    }
  }
}
{% endhighlight %}

The content is added to Solr via the line `$document->setField('index_field_name', $value);`
While the example is very simple, this can be used to index values from complex relationships that wouldn't normally be possible.

Any content that already exists in the index will need to be reindexed.

Now that that new custom field exists, it can be made available for the search results display.
Using `hook_apachesolr_query_prepare` the search query can be altered, in this case to add the new field.

{% highlight php %}
<?php
/**
 * Implements hook_apachesolr_query_prepare().
 */
function mymodule_apachesolr_query_prepare(DrupalSolrQueryInterface $query) {
  // Make 'index_field_name' available for search results
  $query->addParam('fl', 'ss_index_field_name');
}
{% endhighlight %}

The new field can also be used to filter search results, again using `hook_apachesolr_query_prepare`.

{% highlight php %}
<?php
/**
 * Implements hook_apachesolr_query_prepare().
 */
function mymodule_apachesolr_query_prepare(DrupalSolrQueryInterface $query) {
  // filter where 'index_field_name' = 'indexed_value'
  $query->addFilter('ss_index_field_name', 'indexed_value');
}
{% endhighlight %}


[apachesolr]: http://drupal.org/project/apachesolr
