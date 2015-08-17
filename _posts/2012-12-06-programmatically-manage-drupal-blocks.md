---
title:  "Programmatically manage Drupal blocks"
date:   2013-01-11
categories: Drupal
tags: Drupal
redirect_from:
  - /programmatically-manage-drupal-blocks/
---
Managing blocks through code can be very valuable, especially if you are running clean deployments of just the codebase. You can use hook_block_info_alter() to configure the default blocks disable/move/change visibility status.

{% highlight php %}
<?php
/**
 * Implements hook_block_info_alter().
 */
function mymodule_block_info_alter(&$blocks, $theme, $code_blocks) {
  // move navigation to footer
  $blocks['system']['navigation']['region'] = 'footer';
  // disable the powered by drupal block and login block
  $blocks['system']['powered-by']['status'] = 0;
  $blocks['user']['login']['status'] = 0;
  // change the visibility to front page only
  $blocks['search']['form']['visibility'] = BLOCK_VISIBILITY_LISTED;
  $blocks['search']['form']['pages'] = '';
}
{% endhighlight %}

The same options can be used to manage your own blocks:

{% highlight php %}
/**
 * Implements hook_block_info().
 */
function mymodule_block_info() {
  $blocks = array();
  $blocks['mymodule_block_example'] = array(
    'info' => t('MyModule: Block example'),
    'status' => 1,
    'region' => 'header',
    'visibility' => BLOCK_VISIBILITY_LISTED,
    'pages' => '',
  );
  return $blocks;
}
{% endhighlight %}
