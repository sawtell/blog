---
layout: post
title:  "HTTP Authentication with PHP"
date:   2015-01-15
categories: PHP
tags: PHP
published: true
---

This is useful if you are using a hosting solution that makes it tricky or impossible to implement HTTP authentication with the web server.

The example below is providing authentication on all paths prefixed with `private`.

{% highlight php %}
<?php
$path = $_GET['path'];
$access = TRUE;
// If the path matches the private path
if (preg_match('/^private\/[a-z0-9\/]*/i', $path)) {
  if (!isset($_SERVER['PHP_AUTH_USER'])) {
    // Prompt for username and password.
    header('WWW-Authenticate: Basic realm="Protected"');
    // Display access denied if user hits cancel.
    $access = FALSE;
  }
  else {
    if ($_SERVER['PHP_AUTH_USER'] != 'username' || 
    (!isset($_SERVER['PHP_AUTH_PW']) && $_SERVER['PHP_AUTH_PW'] != 'password')) {
      $access = FALSE;
    }
  }
  if (!$access) {
    // Print a 401 page.
    header('HTTP/1.0 401 Unauthorized');
    print 'You are not authorized to access this page.';
    exit();
  }
}
{% endhighlight %}


{% highlight php %}
<?php
require_once($GLOBALS['g_campsiteDir']. "/$ADMIN_DIR/country/common.php");
require_once($GLOBALS['g_campsiteDir']. "/classes/SimplePager.php");
camp_load_translation_strings("api");
 
$f_country_language_selected = camp_session_get('f_language_selected', '');
$f_country_offset = camp_session_get('f_country_offset', 0);
if (empty($f_country_language_selected)) {
    $f_country_language_selected = null;
}
$ItemsPerPage = 20;
$languages = Language::GetLanguages(null, null, null, array(), array(), true);
$numCountries = Country::GetNumCountries($f_country_language_selected);
 
$pager = new SimplePager($numCountries, $ItemsPerPage, "index.php?");
 
$crumbs = array();
$crumbs[] = array(getGS("Configure"), "");
$crumbs[] = array(getGS("Countries"), "");
echo camp_html_breadcrumbs($crumbs);
 
?>
 
<?php  if ($g_user->hasPermission("ManageCountries")) { ?>
<table BORDER="0" CELLSPACING="0" CELLPADDING="1">
    <tr>
        <td><a href="add.php"><?php putGS("Add new"); ?></a></td>
    </tr>
</table>
{% endhighlight %}

{% highlight html %}
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html><head>
<title>A Tiny Page</title>
<style type="text/css">
<!--
      p { font-size:15pt; color:#000 }
    -->
</style></head><!-- real comment -->
<body bgcolor="#FFFFFF" text="#000000" link="#0000CC">
<script language="javascript" type="text/javascript">
      function changeHeight(h) {
        var tds = document.getElementsByTagName("td");
        for(var i = 0; i < tds.length; i++) {
          tds[i].setAttribute("height", h + "px");
      }}
</script>
<h1>abc</h1>
<h2>def</h2>
<p>Testing page</p>
</body></html>
{% endhighlight %}

{% highlight js %}
var undefined,
    xui,
    window     = this,
    string     = new String('string'),
    document   = window.document,
    simpleExpr = /^#?([\w-]+)$/,
{% endhighlight %}

{% highlight scss %}
/* Colours for syntax highlighting */
$string:     #7EB478;
$keyword:    #6398EA;
$variable:   #e1bcad;
$number:     #BEDFFF;
$identifier: #83B2E2;
$comment:    #707070;
$background: #2E2E2E;
$colour:     #eaeaea;

.highlight {
  color: $colour;
  pre, code {
    background: $background;
  }
  * { font-weight: normal !important }
  // Plain
  .nb, .na { color: $colour }
  // Literal Numbers
  .m, .mf, .mh, .mi, .mo, .il { color: $number }
  // Literal Strings
  .s, .sb, .sc, .sd, .s2, .se, .sh, .si, .sx, .sr, .s1, .ss { color: $string }
  // Variables
  .vc, .vg, .vi, .nv { color: $variable }
  // Keywords
  .k, .nc, .nf, .kc, .kd, .kp, .kr, .kt { color: $keyword;}
  // Identifiers
  .nt, .nx { color: $identifier }
  // Comments
  .c, .cm, .cp, .c1, .cs { color: $comment; font-style: normal }
}
.highlight .err { color: #a61717; background-color: #e3d2d2 } /* Error */
{% endhighlight %}
