---
title:  "Drupal - Remove system CSS styles"
date:   2011-11-22
categories: Drupal
tags: Drupal
---
There's been many a time where I've created the perfect CSS in a static site design only for it to be pulled to pieces by Drupal's system styles.
The solution is `hook_css_alter(&$css)` which can reside in your template.php file:

{% highlight php %}
<?php
function mytheme_css_alter(&$css) {
  // Remove defaults.css file.
  unset($css[drupal_get_path('module', 'system') . '/defaults.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'user') . '/user.css']);
  // .. etc..
}
{% endhighlight %}

To find out which stylesheets need to be removed, use web-developer tools / firebug and check which css file the styles are coming from.

Note: this might be impossible if you have CSS aggregation enbaled
