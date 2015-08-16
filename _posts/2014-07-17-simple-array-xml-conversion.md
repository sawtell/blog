---
title:  "Simple array to XML conversion"
date:   2014-07-17
categories: PHP
tags: PHP
---

For those times where you need to convert an array to XML whilst maintaining the structure of the data. There are a number of examples of array_to_xml functions on places like [StackOverflow] but I like the simplicity of my recursive function below.

{% highlight php %}
<?php
function array_to_xml($array) {
  $xml = '';
  foreach ($array as $key => $value) {
    if (is_array($value)) {
      $xml .= '<' . $key . '>' . array_to_xml($value) . '</' . $key . '>';
    }
    else {
      $xml .= '<' . $key . '>' . $value . '</' . $key . '>';
    }
  }
  return $xml;
}
{% endhighlight %}

[StackOverflow]: http://stackoverflow.com/questions/9152176/convert-an-array-to-xml-or-json
