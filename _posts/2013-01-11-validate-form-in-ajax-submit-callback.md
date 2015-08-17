---
title:  "Validate form in AJAX submit callback"
date:   2012-12-05
categories: Drupal
tags: Drupal
redirect_from:
  - /validate-form-ajax-submit-callback/
---
Using an AJAX callback on a form submit doesn't call the validate functions by default and means that form values can be submitted and saved without being confirmed as valid.
I'm not sure of the best solution for this problem is, but below is the way I handle it.

{% highlight php %}
<?php
// when creating or altering the form..
{
  $form['#prefix'] = '<div id="formwrapper">';
  $form['#suffix'] = '</div>';
  // the submit button
  $form['save']['#ajax'] = array(
    'callback' => 'mymodule_form_ajax_submit',
    'wrapper' => 'formwrapper',
    'method' => 'replace',
    'effect' => 'fade',
  );
 // ...
}

function mymodule_from_ajax_submit($form, &$form_state) {
  // validate the form
  drupal_validate_form('mymodule_form_id', $form, $form_state);
  // if there are errors, return the form to display the error messages
  if (form_get_errors()) {
    $form_state['rebuild'] = TRUE;
    return $form;
  }
  // process the form
  mymodule_form_id_submit($form, $form_state);
  $output = array(
    '#markup' => 'Form submitted.'
  );
  // return the confirmation message
  return $output;
}
{% endhighlight %}
