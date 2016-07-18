---
title:  "Display a views attachment on first page only"
date:   2016-07-15
categories: Drupal
tags: Drupal
---

See [https://www.drupal.org/node/794982#comment-4308854](https://www.drupal.org/node/794982#comment-4308854)

> First, create an argument for your attachment.
  Make it Global:Null
  Select Provide default argument for the "Action to take if argument is not present"
  Add a word of plain text into the Default argument input box, pick whatever word you want
  Under validator options, select PHP code.
  Put the following code in the PHP validate code textarea:
> 
> return ! isset($_GET['page']);
