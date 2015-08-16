---
title:  "Redirect search block to default Apache Solr search page"
date:   2015-01-08
categories: Drupal
tags: Drupal
---

For some reason the default search page option on Apache Solr search pages isn't respected. This form alter hook and submit handler do the trick.

{% highlight php %}
<?php
/**
 * Implements hook_form_FORM_ID_alter().
 */
function my_module_form_search_block_form_alter(&$form, &$form_state) {
  unset($form['#submit']['apachesolr_search_form_search_submit']);
  $form['#submit'][] = 'my_module_search_form_submit';
}

/**
 * Submit callback for search block form.
 *
 * @param $form
 * @param $form_state
 */
function my_module_search_form_submit($form, &$form_state) {
  $search_page = apachesolr_search_page_load(variable_get('apachesolr_search_default_search_page', 'core_search'));
  $form_state['redirect'] = $search_page['search_path'] . '/' . trim($form_state['values']['search_block_form']);
}
{% endhighlight %}
