---
title:  "Retain filters on apachesolr_panels search form"
date:   2012-12-04
categories: Drupal
tags: Drupal
---
I have been using the [apachesolr_panels] module in a project recently and couldn't find an option to retain filters when performing a keyword search.

I used a form alter hook to add in the required info and override the submit

{% highlight php %}
<?php
/**
 * Implements hook_form_FORM_ID_alter().
 */
function mymodule_form_apachesolr_panels_search_form_alter(&$form, $form_state) {
  // add ability to retain filters when performing a keyword search
  // see apachesolr_search.pages.inc
  $form['basic']['get'] = array(
    '#type' => 'hidden',
    '#default_value' => json_encode(array_diff_key($_GET, array('q' => 1, 'page' => 1, 'solrsort' => 1, 'retain-filters' => 1))),
  );
  $env = apachesolr_default_environment();
  if (apachesolr_has_searched($env)) {
    $query = apachesolr_current_query($env);
    // We use the presence of filter query params as a flag for the retain filters checkbox.
    $fq = $query->getParam('fq');
  }
  if ($fq || isset($form_state['input']['retain-filters'])) {
    $form['basic']['retain-filters'] = array(
      '#type' => 'checkbox',
      '#title' => t('Retain current filters'),
      '#default_value' => (int) !empty($_GET['retain-filters']),
    );
  }
  // override default submit
  $form['#submit'][] = 'mymodule_panels_search_form_submit';
}
{% endhighlight %}
In the form alter, a hidden field with the current search information is stored and the retain filters option is added if there are active filters. On submit, the form will call the functionmymodule_panels_search_form_submit


{% highlight php %}
<?php
/**
 * Submit override for apachesolr_panels_search_form.
 * See apachesolr_panels_search_block_form_submit() and apachesolr_search_custom_page_search_form_submit().
 */
function mymodule_panels_search_form_submit($form, &$form_state) {
  // Allow core to ensure we have control of the redirect destination.
  $form_state['values']['search_block_form'] = $form_state['values']['apachesolr_panels_search_form'];
  $form_state['values']['apachesolr_panels_search_block'] = $form_state['values']['apachesolr_panels_search_form'];
  search_box_form_submit($form, $form_state);
  // set no_redirect to false so that the redirect query options are used
  $form_state['no_redirect'] = FALSE;
  // Redirect to the specified search page.
  $path = $form_state['args'][0];
  $redirect = $path . '/' . rawurlencode($form_state['values']['apachesolr_panels_search_form']);
  // retain filters or remove them
  $get = array();
  if (isset($form_state['values']['get'])) {
    $get = json_decode($form_state['values']['get'], TRUE);
  }
  if (!empty($form_state['values']['retain-filters'])) {
    // Add our saved values
    $get['retain-filters'] = '1';
  }
  else {
    // Remove all filters
    if (!empty($search_page['settings']['apachesolr_search_allow_user_input'])) {
      unset($get['fq']);
    }
    if (module_exists('facetapi')) {
      unset($get['f']);
    }
  }
  // Add the query values into the redirect.
  $form_state['redirect'] = array($redirect, array('query' => $get));
}
{% endhighlight %}

[apachesolr_panels]: http://drupal.org/project/apachesolr_panels
