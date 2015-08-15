---
title:  "How to add meta tags the Drupal way"
date:   2013-12-10
categories: Drupal
tags: Drupal
---
When adding meta tags to the site `<head>`, use [drupal_add_html_head()] in the `template.php` file.

{% highlight php %}
<?php
/**
 * Implements template_preprocess_html().
 */
function mytheme_preprocess_html(&$vars) {
  // Add mobile meta tags
  $mobile_meta = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1, maximum-scale=1'
    )
  );
  drupal_add_html_head($mobile_meta, 'mytheme_mobile_meta');
  // add meta tag for the homepage only
  if (drupal_is_front_page()) {
    // Add a pinterest auth tag
    $pinterest_auth = array(
      '#tag' => 'meta',
      '#attributes' => array(
        'name' => 'p:domain_verify',
        'content' => 'xxxxxxxxxxxxxxxxxxxxxxx',
      ),
    );
    drupal_add_html_head($pinterest_auth, 'mytheme_pinterest_auth');
  }
}
{% endhighlight %}

[drupal_add_html_head()]: https://api.drupal.org/api/drupal/includes%21common.inc/function/drupal_add_html_head/7
