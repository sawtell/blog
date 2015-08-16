---
title:  "Adding custom tokens to Webform 3.x"
date:   2014-01-03
categories: Drupal
tags: Drupal
---

There has been a couple of occassions where I have needed to add a custom token to the webform module (ver. 3.x).
The way I have done it is as follows.

Alter the webform with `hook_form_alter()`
Traverse the form and check for any instances of the custom token replacing them with something useful
Override the token help theme with `hook_theme_registery_alter()` and add the custom token to the list with a helpful message.

{% highlight php %}
<?php
// define the custom token
define('MYMODULE_TOKEN', '%mymodule_token');

/**
 * Implements hook_form_alter().
 */
function mymodule_form_alter(&$form, &$form_state, $form_id) {
  // make sure we are looking at a webform form
  if (preg_match('/webform_client_form_[0-9]*/', $form_id)) {
    // replace instance of MYMODULE_TOKEN
    foreach ($form_items as $name => &$form_item) {
      // loop through the form items recursively to account for fieldsets
      _mymodule_recurse_form_item($name, $form_item);
    }
  }
}
{% endhighlight %}

See below for the definition of the helper function that drills down through fieldsets to find instances of the custom token. In this case, only hidden fields are checked.

{% highlight php %}
<?php
/**
 * @param $name
 * @param $form_item
 */
function _mymodule_recurse_form_item($name, &$form_item) {
  if (substr($name, 0, 1) != '#') {
    // check for type fieldset and drill down form items
    if ($form_item['#type'] == 'fieldset') {
      foreach ($form_item as $key => &$item) {
        _mymodule_recurse_form_item($key, $item);
      }
    }
    // check if the field is a hidden field
    if ($form_item['#type'] == 'hidden') {
      if (isset($form_item['#default_value'])) {
        // replace the token if it is set as the value
        if (trim($form_item['#default_value']) == MYMODULE_TOKEN) {
          // Run the logic here to define $new_value
          $form_item['#default_value'] = $new_value;
        }
      }
    }
    // if the type is value it could be a secure hidden field
    if ($form_item['#type'] == 'value') {
      if (isset($form_item['#value'])) {
        // replace the token if it is set as the value
        if (trim($form_item['#value']) == MYMODULE_TOKEN)  {
          // Run the logic here to define $new_value
          $form_item['#value'] = $new_value;
        }
      }
    }
  }
}
{% endhighlight %}

Now to override the help text.

{% highlight php %}
<?php
/**
 * Implements hook_theme_registry_alter().
 */
function mymodule_theme_registry_alter(&$theme_registry) {
  $theme_registry['webform_token_help']['theme path'] = drupal_get_path('module', 'mymodule');
  $theme_registry['webform_token_help']['function'] = 'mymodule_webform_token_help';
}

/**
 * Theme function to override theme_webform_token_help().
 *
 * @param $variables
 * @return string
 */
function mymodule_webform_token_help($variables) {
  // Look at theme_webform_token_help() for the default content 
  // ...
  // Just stick in the new token somewhere here and a description of what it is.
}
{% endhighlight %}
